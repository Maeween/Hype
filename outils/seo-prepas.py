# HYPE ▸ outils/seo-prepas.py — 07/11/2026 (Blandine : « ajoute les bons mots dans Google et Bing », « Référencement »).
# Fabrique les pages publiques des prépas aux diplômes d'enseignement, 4 diplômes × 14 langues :
#   /<langue>/prepa-animateur-equitation/  /<langue>/prepa-bpjeps-equitation/  /<langue>/prepa-dejeps-equitation/
# Contenu : la partie gratuite « En bref » (la même que dans l'appli) + le sommaire de la prépa + bouton « Ouvrir Hype ».
# Le détail des épreuves, la notation et les dispenses restent dans l'appli (Premium).
# Sources : hype-ecran-prepa.js (français) et i18n/prepa-<langue>.json (13 langues) ; éléments communs (Accueil, Ouvrir Hype,
# mention FFE, « FR · Langue ») repris des pages /<langue>/gestion-ecurie/. Ajoute aussi les adresses à sitemap-pages.xml
# (Google le lit ; outils/indexnow.cjs prévient Bing & co à la publication).
# Relancer après chaque changement de texte des prépas : python3 outils/seo-prepas.py
import json, re, os, html
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LG = ['fr','en','es','it','ja','de','ar','zh','nl','pt','sv','ru','pl','ko']
HREF = {'zh':'zh-Hans','pt':'pt-BR'}
NOMS = {'fr':'Français','en':'English','es':'Español','it':'Italiano','de':'Deutsch','ja':'日本語','ar':'العربية','zh':'中文','nl':'Nederlands','pt':'Português','sv':'Svenska','ru':'Русский','pl':'Polski','ko':'한국어'}
DIP = [('AE','prepa-animateur-equitation'),('BP','prepa-bpjeps-equitation'),('DE','prepa-dejeps-equitation'),('DES','prepa-desjeps-equitation')]
FR_SEO = {
 'AE': ("Prépa Animateur d'Équitation (AE) : entrée, épreuves, notation et dispenses | Hype",
        "Préparer l'AE (Animateur d'Équitation, règlement 2026) : Galop demandé, vérification avant le stage, BC1 à BC3, démonstrations longe, plat, obstacle, terrain varié et derby cross, notation et dispenses."),
 'BP': ("Prépa BPJEPS équitation : TEP, épreuves, notation et dispenses | Hype",
        "Préparer le BPJEPS mention équitation : tests d'entrée (TEP), vérification avant le stage, épreuves des BC1 à BC4, notation, dispenses et conseils pour réussir."),
 'DE': ("Prépa DEJEPS sports équestres : tests d'entrée, épreuves et dispenses | Hype",
        "Préparer le DEJEPS sports équestres : tests d'entrée techniques et pédagogique, vérification avant le stage, épreuves des UC, notation, dispenses et conseils pour réussir."),
 'DES': ("Prépa DESJEPS équitation : tests d'entrée, épreuves et dispenses | Hype",
        "Préparer le DESJEPS mention équitation, le diplôme d'instructeur : tests d'entrée, vérification avant le stage, épreuves des UC, dispenses et conseils pour réussir.")}
TX = json.load(open(os.path.join(R,'outils','seo-prepas-textes.json')))
def esc(s): return html.escape(s, quote=True)
def txt(x):
    if x is None: return ''
    if isinstance(x,str): return x
    if isinstance(x,dict): return txt(x.get('x'))
    return ''.join(s.get('t','') for s in x)
def ins(x):
    if isinstance(x,str): return esc(x)
    if isinstance(x,dict): return ins(x.get('x'))
    out=''
    for s in x:
        t=esc(s.get('t',''))
        if s.get('u'): out+='<a href="%s" rel="noopener">%s</a>'%(esc(s['u']),t)
        elif s.get('b'): out+='<strong>%s</strong>'%t
        else: out+=t
    return out
def bloc(b):
    if b['k']=='p': return '<p>%s</p>'%ins(b['x'])
    if b['k'] in('ul','ol'): return '<%s>%s</%s>'%(b['k'],''.join('<li>%s</li>'%ins(i) for i in b['it']),b['k'])
    return ''
def donnees():
    L=open(os.path.join(R,'hype-ecran-prepa.js')).read().split('\n')[9]
    fr=json.loads(L[len('window.__HYPE_PREPA_DATA = '):].rstrip(';'))
    d={'fr':{'data':fr,'ui':None}}
    for lg in LG[1:]:
        j=json.load(open(os.path.join(R,'i18n','prepa-%s.json'%lg))); d[lg]={'data':j,'ui':j['ui']}
    return d
UI_FR={'titre_DES':'Prépa DES','sous_DES':'DESJEPS mention équitation','titre_AE':'Prépa AE','sous_AE':"Animateur d'Équitation",'titre_BP':'Prépa BP','sous_BP':'BPJEPS mention équitation','titre_DE':'Prépa DE','sous_DE':'DEJEPS sports équestres'}
def commun(lg):
    s=open(os.path.join(R,lg,'gestion-ecurie','index.html')).read()
    g=lambda p: re.search(p,s,re.S).group(1)
    return {'langue':g(r'<a class="langue"[^>]*>([^<]*)<'),'accueil':g(r'<nav class="fil"[^>]*><a [^>]*>([^<]*)<'),'ouvrir':g(r'<a class="btn" href="[^"]*">([^<]*)<'),
            'pied':g(r'<footer><p>(.*?)</p>'),'locale':g(r'og:locale" content="([^"]*)'),'css':g(r'<style>(.*?)</style>')}
def page(lg,D,dip,slug,dd):
    c=commun(lg); ui=dd[lg]['ui'] or UI_FR; T=TX[lg]
    titre=ui['titre_'+dip]; sous=ui['sous_'+dip]
    if lg=='fr': mt,md=FR_SEO[dip]
    else: mt=T['titre'].replace('{titre}',titre+' ('+sous+')'); md=T['desc'].replace('{sous}',sous)
    url='https://2hype.fr/%s/%s/'%(lg,slug)
    data=dd[lg]['data'][dip]; S=data['sections']
    alt=''.join('<link rel="alternate" hreflang="%s" href="https://2hype.fr/%s/%s/">\n'%(HREF.get(l,l),l,slug) for l in LG)+'<link rel="alternate" hreflang="x-default" href="https://2hype.fr/fr/%s/">\n'%slug
    corps=''.join(bloc(b) for b in S[0]['b'])
    som='<ul>'+''.join('<li><strong>%s</strong>%s</li>'%(esc(s['titre']), ('<ul>'+''.join('<li>%s</li>'%esc(sb['titre']+((' ('+sb['m']+')') if sb.get('m') else '')) for sb in s['sous'])+'</ul>') if s['sous'] else '') for s in S[1:])+'</ul>'
    autres='<ul class="liste">'+''.join('<li><a href="https://2hype.fr/%s/%s/">%s<span class="sous">%s</span></a></li>'%(lg,sl,esc(ui['titre_'+k]),esc(ui['sous_'+k])) for k,sl in DIP if k!=dip)+'</ul>'
    ld={"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":url+"#page","url":url,"name":mt,"description":md,"inLanguage":HREF.get(lg,lg),"isPartOf":{"@id":"https://2hype.fr/#website"},"about":{"@id":"https://2hype.fr/#app"}},
        {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":c['accueil'],"item":"https://2hype.fr/%s/"%lg},{"@type":"ListItem","position":2,"name":titre,"item":url}]}]}
    langues=' · '.join(('<strong lang="%s">%s</strong>'%(HREF.get(l,l),NOMS[l])) if l==lg else ('<a href="https://2hype.fr/%s/%s/" hreflang="%s" lang="%s">%s</a>'%(l,slug,HREF.get(l,l),HREF.get(l,l),NOMS[l])) for l in LG)
    dirr=' dir="rtl"' if lg=='ar' else ''
    return f'''<!doctype html>
<html lang="{HREF.get(lg,lg)}"{dirr}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="hype-cible" content="prepa-{dip}">
<!--hype-seo-->
<title>{esc(mt)}</title>
<meta name="description" content="{esc(md)}">
<link rel="canonical" href="{url}">
{alt}<meta name="theme-color" content="#07110f">
<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Hype">
<meta property="og:locale" content="{c['locale']}">
<meta property="og:title" content="{esc(mt)}">
<meta property="og:description" content="{esc(md)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="https://2hype.fr/images/hype-partage-1200x630.jpg">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">{json.dumps(ld,ensure_ascii=False)}</script>
<!--/hype-seo-->
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
<style>{c['css']}</style>
</head>
<body>
<!--hype-texte--><header class="barre"><a class="marque" href="https://2hype.fr/{lg}/">HYPE</a><a class="langue" href="#langues">{c['langue']}</a></header>
<main>
<nav class="fil" aria-label="fil"><a href="https://2hype.fr/{lg}/">{c['accueil']}</a></nav>
<h1>{esc(titre)} — {esc(sous)}</h1>
<h2>{esc(S[0]['titre'])}</h2>{corps}<h2>{esc(T['programme'])}</h2>{som}<div class="appel"><p>{esc(T['appel'])}</p><a class="btn" href="https://2hype.fr/">{c['ouvrir']}</a></div><h2>{esc(T['autres'])}</h2>{autres}
</main>
<footer><p>{c['pied']}</p><p id="langues" style="margin-top:8px">{langues}</p></footer><!--/hype-texte-->
</body>
</html>
'''
def principal():
    dd=donnees(); urls=[]
    for dip,slug in DIP:
        for lg in LG:
            os.makedirs(os.path.join(R,lg,slug),exist_ok=True)
            open(os.path.join(R,lg,slug,'index.html'),'w').write(page(lg,None,dip,slug,dd))
        urls.append(slug)
    # sitemap-pages.xml : retire les anciennes entrées des prépas puis les remet
    p=os.path.join(R,'sitemap-pages.xml'); s=open(p).read()
    s=re.sub(r'<url>\s*<loc>https://2hype\.fr/[a-z]{2}/prepa-[a-z-]+/</loc>.*?</url>\s*','',s,flags=re.S)
    bloc=''
    for slug in urls:
        alts=''.join('    <xhtml:link rel="alternate" hreflang="%s" href="https://2hype.fr/%s/%s/"/>\n'%(HREF.get(l,l),l,slug) for l in LG)+'    <xhtml:link rel="alternate" hreflang="x-default" href="https://2hype.fr/fr/%s/"/>\n'%slug
        for lg in LG: bloc+='<url>\n    <loc>https://2hype.fr/%s/%s/</loc>\n%s  </url>\n'%(lg,slug,alts)
    s=s.replace('</urlset>',bloc+'</urlset>')
    open(p,'w').write(s)
    print('pages :',len(urls)*len(LG))
principal()
