/* Tests de géométrie des reprises : node --test outils/test-reprises-traces.cjs */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const racine = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(racine, 'index.html'), 'utf8');
const extrait = (a, b) => html.slice(html.indexOf(a), html.indexOf(b, html.indexOf(a)));
const contexte = vm.createContext({ window: {} });
vm.runInContext(extrait('const REPRISES_FFE =', 'const REPRISE_FIGURES_TIER =') +
    extrait('const LETTER_POINTS =', 'function couleurSelonAllure') +
    '\nthis.reprises=REPRISES_FFE;this.lettres=LETTER_POINTS;', contexte);
const { reprises, lettres } = contexte;
const traces = Object.fromEntries(Object.entries(reprises).map(([k, fiche]) => [k, contexte.construireTraceReprise(fiche)]));
const pres = (a, b, eps = .001) => Math.abs(a - b) < eps;
const en = (p, l) => pres(p.x, lettres[l].x) && pres(p.y, lettres[l].y);
const figure = (niveau, n) => traces[niveau].points.filter(p => p.figIndex === n - 1);
const mouvement = (niveau, n, type) => figure(niveau, n).filter(p => p.mouvement === type);
const dernier = pts => pts[pts.length - 1];
const aire = pts => pts.reduce((s, p, i) => { const q = pts[(i + 1) % pts.length]; return s + p.x * q.y - p.y * q.x; }, 0);

for (const [niveau, fiche] of Object.entries(reprises)) {
    test(niveau + ' : toutes les figures sont continues, dans la carrière et dans le bon ordre', () => {
        const t = traces[niveau];
        assert.equal(fiche.figures.length, { g3: 10, g4: 20, g5: 20, g6: 20, g7: 22, clubelite: 22 }[niveau]);
        const vues = new Set();
        t.points.forEach((p, i) => {
            assert(Number.isFinite(p.x) && Number.isFinite(p.y) && Number.isFinite(p.dist));
            assert(p.x >= 20 - .001 && p.x <= 180 + .001 && p.y >= 20 - .001 && p.y <= 500 + .001, `${niveau} fig.${p.figIndex + 1} hors carrière : ${p.x},${p.y}`);
            vues.add(p.figIndex);
            if (i) {
                const a = t.points[i - 1];
                assert(p.dist >= a.dist);
                assert(p.figIndex >= a.figIndex, 'retour à une ancienne figure');
                assert(Math.hypot(p.x - a.x, p.y - a.y) <= 16, `saut de position ${niveau} fig.${p.figIndex + 1}`);
            }
        });
        assert.equal(vues.size, fiche.figures.length);
        assert(en(dernier(t.points), { g3: 'G', g4: 'S' }[niveau] || 'I'));
    });
    test(niveau + ' : l’arrêt final reste réellement immobile', () => {
        const t = traces[niveau], a = t.points[t.points.length - 2], b = dernier(t.points);
        assert(a.pause);
        assert(pres(b.dist - a.dist, 14));
        const p = contexte.pointADistance(t, (a.dist + b.dist) / 2);
        assert(pres(p.x, b.x) && pres(p.y, b.y));
    });
}
test('les 20 cercles complets conservent leur diamètre, leur position et leur main', () => {
    const mains = { g3: [1, -1, -1, 1], g4: [-1, 1, 1, -1], g5: [1, -1, -1, 1], g6: [-1, 1, 1, -1], g7: [-1, 1, -1, 1] };
    let nb = 0;
    for (const [niveau, attendues] of Object.entries(mains)) {
        const groupes = Object.values(Object.groupBy(traces[niveau].points.filter(p => p.mouvement === 'cercle'), p => p.figIndex));
        assert.equal(groupes.length, 4);
        groupes.forEach((pts, i) => {
            const xs = pts.map(p => p.x), ys = pts.map(p => p.y), diam = pts[0].diametre * 8;
            assert(pres(Math.max(...xs) - Math.min(...xs), diam));
            assert(pres(Math.max(...ys) - Math.min(...ys), diam));
            assert.equal(Math.sign(aire(pts)), attendues[i], `${niveau} cercle ${i + 1} mauvaise main`);
            nb++;
        });
    }
    assert.equal(nb, 20);
});
test('G5 : quatre boucles égales, quatre contacts à la piste, axe traversé perpendiculairement', () => {
    const pts = mouvement('g5', 5, 'serpentine');
    assert(pts.length > 100); assert(en(pts[0], 'A')); assert(en(dernier(pts), 'C'));
    const contacts = pts.filter(p => pres(p.x, 20) || pres(p.x, 180));
    assert.deepEqual(Array.from(contacts, p => Math.round(p.y)), [440, 320, 200, 80]);
    for (const y of [380, 260, 140]) {
        const i = pts.findIndex((p, i) => i > 0 && (pts[i - 1].x - 100) * (p.x - 100) <= 0 && pres(pts[i - 1].y, y) && pres(p.y, y));
        assert(i > 0, 'axe traversé par un segment horizontal');
    }
});
test('G3 : demi-volte et demi-volte renversée ont un demi-cercle et une oblique', () => {
    assert(mouvement('g3', 4, 'oblique').length > 2);
    const inverse = mouvement('g3', 4, 'demi-volte-renversee');
    assert(inverse.length >= 20); assert(en(dernier(inverse), 'R'));
    assert(dernier(inverse).y < inverse[inverse.length - 2].y, 'retour sur R vers le haut');
    const normale = mouvement('g3', 7, 'demi-volte');
    assert(normale.length >= 20); assert(pres(dernier(normale).x, 100));
    assert(en(dernier(figure('g3', 7)), 'F'));
});
test('G3 : les événements en X restent sur les diagonales et les raccords suivent la piste', () => {
    assert(en(dernier(figure('g3', 2)), 'V')); assert(en(dernier(figure('g3', 3)), 'S'));
    for (const n of [2, 3]) assert.equal(figure('g3', n).filter(p => p.evenement).length, 1);
    const p5 = figure('g3', 5);
    const arriveC = p5.findIndex(p => en(p, 'C'));
    assert(arriveC > 0); assert(p5.slice(0, arriveC).every(p => p.x > 179.999 || p.y < 29.001));
    const p10 = figure('g3', 10), arriveB = p10.findIndex(p => en(p, 'B'));
    assert(arriveB > 0); assert(p10.slice(0, arriveB).every(p => p.x > 179.999 || p.y < 29.001));
});
test('G5 : vers G signifie une transition sur le demi-cercle, sans nouveau trajet vers G', () => {
    for (const n of [12, 17]) {
        const pts = figure('g5', n), ev = pts.find(p => p.evenement);
        assert(ev); assert(pres(ev.x, 100) && pres(ev.y, 84));
        assert(pres(ev.vitesse, 1)); assert(!pts.some(p => en(p, 'G')));
        assert(en(dernier(pts), n === 12 ? 'S' : 'R'));
    }
});
test('G6 : les deux lignes courbes sont lisses en X et retrouvent la piste', () => {
    for (const [n, debut, fin] of [[11, 'K', 'H'], [16, 'F', 'M']]) {
        const pts = mouvement('g6', n, 'ligne-courbe');
        assert(en(pts[0], debut) && en(dernier(pts), fin));
        const i = pts.findIndex(p => en(p, 'X')), a = pts[i - 1], b = pts[i], c = pts[i + 1];
        const dx = b.x - a.x, dy = b.y - a.y, ex = c.x - b.x, ey = c.y - b.y;
        assert((dx * ex + dy * ey) / Math.hypot(dx, dy) / Math.hypot(ex, ey) > .995, 'cassure en X');
    }
});
test('G6 : les cessions quittent L-X avant X et rejoignent les intervalles demandés', () => {
    for (const [n, x] of [[4, 20], [7, 180]]) {
        const pts = mouvement('g6', n, 'cession');
        assert(pts[0].y > lettres.X.y && pts[0].y < lettres.L.y);
        assert(pres(dernier(pts).x, x));
        assert(dernier(pts).y > lettres.H.y && dernier(pts).y < lettres.S.y);
        assert(pts.every(p => p.capCorps === 0));
    }
});
test('G6 : vers L se place au milieu des diagonales, jamais après leur extrémité', () => {
    for (const [n, fin] of [[14, 'K'], [19, 'A']]) {
        const pts = figure('g6', n), ev = pts.find(p => p.evenement);
        assert(ev && en(ev, 'L')); assert(en(dernier(pts), fin));
        const a = pts.findIndex(p => p.evenement);
        assert(pts.slice(a + 1).every(p => !en(p, 'L')));
    }
});
test('G4 : avant R / M / F conserve une position avant le repère', () => {
    const premier = traces.g4.points[0];
    assert(premier.x === 180 && premier.y > lettres.R.y && premier.y < lettres.B.y);
    for (const [n, lettre] of [[14, 'M'], [17, 'F']]) {
        const ev = figure('g4', n).find(p => p.evenement);
        assert(ev && pres(Math.hypot(ev.x - lettres[lettre].x, ev.y - lettres[lettre].y), 8));
    }
});
test('les allures sont conservées sur les cercles et changent seulement aux repères', () => {
    for (const [niveau, attendues] of Object.entries({ g3: [1, 1, 1.55, 1.55], g4: [1, 1, 1.55, 1.55], g5: [1, 1, 1.55, 1.55], g6: [1, 1, 1.55, 1.55], g7: [1, 1, 1.55, 1.55] })) {
        const groupes = Object.values(Object.groupBy(traces[niveau].points.filter(p => p.mouvement === 'cercle'), p => p.figIndex));
        groupes.forEach((pts, i) => assert(pts.every(p => pres(p.vitesse, attendues[i])), `${niveau} cercle ${i + 1}`));
    }
    const pts = figure('g4', 2), ev = pts.find(p => p.evenement);
    assert(ev && pres(ev.y, 116));
    assert(pts.filter(p => p.y > 117).every(p => pres(p.vitesse, .55)), 'pas avant le départ au trot');
    assert(pts.filter(p => p.y < 115).every(p => pres(p.vitesse, 1)), 'trot après le repère');
});
test('cessions et épaules en dedans ont une orientation de corps indépendante de la trajectoire', () => {
    for (const n of [4, 8]) assert(mouvement('g7', n, 'cession').every(p => p.capCorps === 0));
    assert(mouvement('clubelite', 5, 'epaule-en-dedans').every(p => p.capCorps === 30));
    assert(mouvement('clubelite', 7, 'epaule-en-dedans').every(p => p.capCorps === -30));
});
test('Club Élite : le cheval recule sans se retourner puis peut repartir en avant', () => {
    const pts = mouvement('clubelite', 9, 'reculer');
    assert(pts.length > 2); assert(en(pts[0], 'C'));
    assert(dernier(pts).x > pts[0].x); assert(pres(dernier(pts).y, pts[0].y));
    assert(pts.every(p => pres(p.capCorps, 270) && p.vitesse === .3));
    const t = traces.clubelite, p = contexte.pointADistance(t, (pts[0].dist + dernier(pts).dist) / 2);
    assert(pres(p.capCorps, 270));
    assert(pres(contexte.capCorpsReprise(pts[0], pts[1], 270), 270));
    const repriseAvant = figure('clubelite', 10);
    assert(pres(contexte.capCorpsReprise(repriseAvant[0], repriseAvant[1], 270), 270), 'ne se retourne pas au départ en avant');
});
test('le niveau sélectionné est conservé dans tous les modes, Club Élite compris', () => {
    for (const niveau of Object.keys(reprises)) {
        contexte.memoriserNiveauReprise(niveau, 4);
        assert.equal(contexte.niveauInitialReprise(4, 'g4'), niveau);
        assert.equal(contexte.niveauInitialReprise(6, 'g4'), 'g6');
    }
});
test('les guides pointillés représentent 20 cercles et 13 demi-cercles réels', () => {
    let fermes = 0, ouverts = 0;
    for (const t of Object.values(traces)) {
        for (const guide of contexte.guidesCourbesReprise(t)) {
            assert(guide.points.length >= 20);
            const a = guide.points[0], b = dernier(guide.points);
            if (pres(a.x, b.x) && pres(a.y, b.y)) fermes++; else ouverts++;
        }
    }
    assert.equal(fermes, 20); assert.equal(ouverts, 13);
});
test('les conseils ne confondent plus les arrêts en G/S/I avec X, dans les 14 langues', () => {
    const c = vm.createContext({ window: {} });
    vm.runInContext(fs.readFileSync(path.join(racine, 'hype-dressage-conseils.js'), 'utf8'), c);
    const b = c.window.HYPE_DRESSAGE;
    assert.equal(b.ficheFigure('g4', 0).principale.label.fr, 'Arrêt avant R');
    for (const [niveau, lettre] of Object.entries({ g3: 'G', g4: 'S', g5: 'I', g6: 'I', g7: 'I', clubelite: 'I' })) {
        const f = b.ficheFigure(niveau, reprises[niveau].figures.length - 1).principale;
        const tip = f.tips.find(t => t.txt.fr.startsWith('Prépare'));
        assert.equal(Object.keys(tip.txt).length, 14);
        for (const txt of Object.values(tip.txt)) { assert(!txt.includes('X')); assert(txt.includes(lettre)); }
    }
});

if (process.env.HYPE_TRACES_JSON) fs.writeFileSync(process.env.HYPE_TRACES_JSON, JSON.stringify({ letters: lettres, traces }));
