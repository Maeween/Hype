# -*- coding: utf-8 -*-
"""12/11 (Blandine) — mail de RELANCE des comptes jamais abonnés (« les écuries sont bien vides sans toi »).
Français d'abord ; style du mail « mission d'Hypo » (Brevo). Sortie : outils/mails/relance-inactifs.html (+ aperçu)."""
import os, html
ICI = os.path.dirname(os.path.abspath(__file__))
def e(t): return html.escape(t, quote=False)
S = "-apple-system,'Helvetica Neue',Helvetica,Arial,sans-serif"; G = "Georgia,'Times New Roman',serif"
OR = "#C9A66B"; IV = "#F3EEE4"; GR = "#cfd6de"; FOND = "#0B1422"
GRATUIT = [
 ("🐴", "Tes chevaux", "Jusqu’à 2 chevaux, avec leur fiche, leurs origines, leurs photos et leur histoire.", "https://2hype.fr/fr/fiche-cheval/"),
 ("📸", "Tes souvenirs", "Tes photos de concours et d’entraînement, et jusqu’à 3 vidéos de parcours.", "https://2hype.fr/fr/photos-souvenirs/"),
 ("🏆", "Tes résultats", "Note tes résultats de concours à la main, épreuve par épreuve.", "https://2hype.fr/fr/concours-resultats/"),
 ("🎓", "Le Galop 1 en entier", "Et le début de chaque chapitre des Galops 2 à 9 pour te faire une idée.", "https://2hype.fr/fr/galops/"),
 ("💬", "Hey Baby", "Une question par jour à ton coach virtuel, même à partir d’une photo.", "https://2hype.fr/fr/ia-equestre/"),
 ("🏇", "Ton écurie", "L’agenda des stages et des concours, les inscriptions et la messagerie du club.", "https://2hype.fr/#monecurie"),
]
PREMIUM = [
 ("🎓", "Galops 1 à 9 complets", "Tous les cours, les quiz et les examens blancs, plus les prépas AE, BPJEPS et DEJEPS.", "https://2hype.fr/fr/galops/"),
 ("🏆", "Ta saison en une manipulation", "Tous tes résultats FFE importés d’un coup, avec classements et points.", "https://2hype.fr/fr/concours-resultats/"),
 ("🩺", "La santé de ton cheval", "Soins, vaccins, maréchal, dentiste… avec des rappels automatiques.", "https://2hype.fr/fr/sante-cheval/"),
 ("🐴", "Plus de place", "Jusqu’à 9 chevaux et 15 vidéos de parcours.", "https://2hype.fr/fr/fiche-cheval/"),
 ("💬", "Hey Baby sans compter", "4 questions par jour, et les conseils que ta coach t’envoie.", "https://2hype.fr/fr/ia-equestre/"),
 ("🌍", "Horse Lingo inclus", "Le vocabulaire équestre dans plusieurs langues, pour les stages et les concours à l’étranger.", "https://horselingo.fr"),
]
def liste(items):
    return "".join(f'''<tr><td style="padding:14px 0;border-top:1px solid #1a2a40;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td width="40" valign="top" style="font-size:22px;line-height:1.2;">{i}</td>
<td valign="top"><a href="{u}" style="font-family:{S};font-size:15px;font-weight:600;color:{IV};text-decoration:none;">{e(t)} <span style="color:{OR};">&#8250;</span></a>
<div style="padding:3px 0 0;font-family:{S};font-size:13.5px;line-height:1.5;color:#a9b5c2;">{e(d)}</div></td></tr></table></td></tr>''' for i, t, d, u in items)
def titre(t):
    return f'''<tr><td align="center" style="padding:40px 0 14px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="30" valign="middle"><div style="height:1px;line-height:1px;font-size:1px;background:{OR};">&nbsp;</div></td><td style="padding:0 12px;font-family:{G};font-style:italic;font-size:21px;color:{IV};white-space:nowrap;">{t}</td><td width="30" valign="middle"><div style="height:1px;line-height:1px;font-size:1px;background:{OR};">&nbsp;</div></td></tr></table></td></tr>'''
def bouton(txt, url):
    return f'''<tr><td align="center" style="padding:22px 0 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="border:1.5px solid {OR};border-radius:999px;"><a href="{url}" style="display:inline-block;padding:12px 24px;font-family:{S};font-size:13px;letter-spacing:1px;font-weight:600;color:{IV};text-decoration:none;">{txt}</a></td></tr></table></td></tr>'''
H = f'''<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="supported-color-schemes" content="dark"><title>Hype</title>
<style>a[x-apple-data-detectors]{{color:inherit!important;text-decoration:none!important}}</style></head>
<body style="margin:0;padding:0;background-color:{FOND};background-image:linear-gradient({FOND},{FOND});">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Hypo t’a gardé ta place. Et il s’en est passé, des choses !</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="{FOND}" style="background-color:{FOND};background-image:linear-gradient({FOND},{FOND});"><tr><td align="center" bgcolor="{FOND}" style="padding:24px 14px 30px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;">
<tr><td align="center" style="font-family:{G};font-style:italic;font-size:38px;line-height:1;color:{IV};">Hype</td></tr>
<tr><td align="center" style="padding:6px 0 18px;font-family:{S};font-size:10px;letter-spacing:4px;color:{GR};">L&rsquo;APP DES CAVALIERS</td></tr>
<tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td width="120" valign="middle"><img src="https://2hype.fr/images/poney-mail.png" width="120" alt="🐴" style="display:block;width:120px;height:auto;border:0;font-size:44px;text-align:center;color:{OR};"></td>
<td valign="middle" style="padding-left:14px;">
<div style="font-family:{G};font-style:italic;font-size:24px;line-height:1.2;color:{IV};">Coucou {{{{ contact.PRENOM }}}}&nbsp;!</div>
<div style="padding:8px 0 0;font-family:{S};font-size:15px;line-height:1.5;color:{IV};">C&rsquo;est Hypo&nbsp;! 💙</div>
<div style="font-family:{S};font-size:14px;line-height:1.5;color:{GR};">Les écuries sont bien vides sans toi&hellip;<br>Je t&rsquo;ai gardé ta place au chaud (et quelques carottes 🥕).</div>
</td></tr></table></td></tr>
<tr><td align="center" style="padding:34px 6px 0;font-family:{G};font-style:italic;font-size:26px;line-height:1.25;color:{IV};">Depuis ta dernière visite,<br>Hype a bien grandi&nbsp;!</td></tr>
<tr><td align="center" style="padding:10px 6px 0;font-family:{S};font-size:14px;line-height:1.55;color:{GR};">Voici tout ce qui t&rsquo;attend, déjà avec ton compte gratuit, et encore plus avec Premium.</td></tr>
{titre("Avec ton compte gratuit")}
<tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">{liste(GRATUIT)}<tr><td style="border-top:1px solid #1a2a40;font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>
{bouton("REVENIR SUR HYPE&nbsp;&rarr;", "https://2hype.fr/")}
{titre("Et avec Premium")}
<tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">{liste(PREMIUM)}<tr><td style="border-top:1px solid #1a2a40;font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>
<tr><td style="padding:28px 0 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #6e5d40;border-radius:14px;"><tr>
<td style="padding:18px 18px;font-family:{S};font-size:14px;line-height:1.55;color:{GR};text-align:center;"><div style="font-family:{G};font-style:italic;font-size:22px;color:{IV};padding:0 0 6px;">🎁 Ton premier mois Premium est offert</div>Pour fêter ton retour, choisis <b style="color:{IV};">Premium Cavalier (mensuel)</b>&nbsp;: le code est déjà rempli. Ta carte est demandée, mais le premier mois est à 0&nbsp;&euro;, et tu peux arrêter quand tu veux avant la fin du mois.</td></tr></table></td></tr>
{bouton("PROFITER DE MON MOIS OFFERT&nbsp;&rarr;", "https://2hype.fr/?offert=HYPE1MOIS")}
<tr><td style="padding:34px 0 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td valign="bottom" style="border-bottom:1px solid {OR};font-size:0;line-height:0;">&nbsp;</td><td width="64" valign="bottom" style="border-bottom:1px solid {OR};padding:0 18px 0 10px;font-size:0;line-height:0;"><img src="https://2hype.fr/images/poney-mail.png" width="64" alt="" style="display:block;width:64px;height:auto;border:0;"></td></tr></table></td></tr>
<tr><td style="padding:16px 0 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td width="58%" valign="bottom" style="font-family:{S};font-size:14px;line-height:1.5;color:{IV};">Allez, je t&rsquo;attends au paddock&nbsp;!<br>Ne me laisse pas finir les carottes tout seul. 🥕</td>
<td align="right" valign="bottom"><div style="font-family:{G};font-style:italic;font-size:30px;line-height:1;color:{IV};">Hypo 💙</div></td>
</tr></table></td></tr>
<tr><td align="center" style="padding:28px 0 0;font-family:{S};font-size:11px;letter-spacing:3px;line-height:1.9;"><a href="https://2hype.fr/" style="color:#5d6b7b;text-decoration:none;">2HYPE.FR</a><br><a href="{{{{ unsubscribe }}}}" style="color:#4a5866;font-size:11px;letter-spacing:0;">Ne plus recevoir ces mails</a></td></tr>
</table></td></tr></table></body></html>'''
open(os.path.join(ICI, "mails", "relance-inactifs.html"), "w", encoding="utf-8").write(H)
print("ok", len(H))
