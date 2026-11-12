# -*- coding: utf-8 -*-
"""12/11 (Blandine) — mail d'INVITATION pour des connaissances sans compte (dont des pros) : tout ce que Hype apporte
en perso et en pro (mêmes lignes que le mail d'inscription) + 1 mois offert (HYPE1MOIS). Sortie : outils/mails/invitation.html"""
import os, html
ICI = os.path.dirname(os.path.abspath(__file__))
ns = {"__file__": os.path.join(ICI, "mails-generer.py")}
exec(open(os.path.join(ICI, "mails-generer.py"), encoding="utf-8").read(), ns)   # récupère FONCTIONS (et régénère les modèles, sans effet)
F = ns["FONCTIONS"]["fr"]
def e(t): return html.escape(t, quote=False)
S = "-apple-system,'Helvetica Neue',Helvetica,Arial,sans-serif"; G = "Georgia,'Times New Roman',serif"
OR = "#C9A66B"; IV = "#F3EEE4"; GR = "#cfd6de"; FOND = "#0B1422"
OFFRE = "https://2hype.fr/?offert=HYPE1MOIS"
def liste(items):
    return "".join(f'''<tr><td style="padding:14px 0;border-top:1px solid #1a2a40;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td width="40" valign="top" style="font-size:22px;line-height:1.2;">{i}</td>
<td valign="top"><a href="{u}" style="font-family:{S};font-size:15px;font-weight:600;color:{IV};text-decoration:none;">{e(t)} <span style="color:{OR};">&#8250;</span></a>
<div style="padding:3px 0 0;font-family:{S};font-size:13.5px;line-height:1.5;color:#a9b5c2;">{e(d)}</div></td></tr></table></td></tr>''' for i, t, d, u in items)
def titre(t):
    return f'''<tr><td align="center" style="padding:40px 0 14px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="30" valign="middle"><div style="height:1px;line-height:1px;font-size:1px;background:{OR};">&nbsp;</div></td><td style="padding:0 12px;font-family:{G};font-style:italic;font-size:21px;color:{IV};white-space:nowrap;">{t}</td><td width="30" valign="middle"><div style="height:1px;line-height:1px;font-size:1px;background:{OR};">&nbsp;</div></td></tr></table></td></tr>'''
def bouton(txt, url):
    return f'''<tr><td align="center" style="padding:22px 0 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="border:1.5px solid {OR};border-radius:999px;"><a href="{url}" style="display:inline-block;padding:12px 24px;font-family:{S};font-size:13px;letter-spacing:1px;font-weight:600;color:{IV};text-decoration:none;">{txt}</a></td></tr></table></td></tr>'''
def encadre():
    return f'''<tr><td style="padding:28px 0 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #6e5d40;border-radius:14px;"><tr>
<td style="padding:18px 18px;font-family:{S};font-size:14px;line-height:1.55;color:{GR};text-align:center;"><div style="font-family:{G};font-style:italic;font-size:22px;color:{IV};padding:0 0 6px;">🎁 Ton premier mois Premium est offert</div>Crée ton compte, puis choisis <b style="color:{IV};">Premium Cavalier (mensuel)</b>&nbsp;: le code est déjà rempli. Ta carte est demandée, mais le premier mois est à 0&nbsp;&euro;, et tu peux arrêter quand tu veux avant la fin du mois.</td></tr></table></td></tr>
{bouton("PROFITER DE MON MOIS OFFERT&nbsp;&rarr;", OFFRE)}'''
LIGNE = f'<tr><td style="border-top:1px solid #1a2a40;font-size:0;line-height:0;">&nbsp;</td></tr>'
H = f'''<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="supported-color-schemes" content="dark"><title>Hype</title>
<style>a[x-apple-data-detectors]{{color:inherit!important;text-decoration:none!important}}</style></head>
<body style="margin:0;padding:0;background-color:{FOND};background-image:linear-gradient({FOND},{FOND});">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Comme promis : l’appli que je développe pour les cavaliers, leurs chevaux et les écuries. Ton premier mois est offert.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="{FOND}" style="background-color:{FOND};background-image:linear-gradient({FOND},{FOND});"><tr><td align="center" bgcolor="{FOND}" style="padding:24px 14px 30px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;">
<tr><td align="center" style="font-family:{G};font-style:italic;font-size:38px;line-height:1;color:{IV};">Hype</td></tr>
<tr><td align="center" style="padding:6px 0 18px;font-family:{S};font-size:10px;letter-spacing:4px;color:{GR};">L&rsquo;APP DES CAVALIERS</td></tr>
<tr><td style="padding:0;"><img src="https://2hype.fr/images/accueil-video-ordi-poster.jpg" width="520" alt="" style="display:block;width:100%;max-width:520px;height:auto;border:0;border-radius:14px;"></td></tr>
<tr><td style="padding:30px 4px 0;font-family:{G};font-style:italic;font-size:26px;line-height:1.25;color:{IV};">Coucou {{{{ contact.PRENOM }}}}&nbsp;!</td></tr>
<tr><td style="padding:12px 4px 0;font-family:{S};font-size:15px;line-height:1.6;color:{GR};">Comme promis, voici <b style="color:{IV};">Hype</b>, l&rsquo;appli que je développe pour les cavaliers, leurs chevaux et les écuries. Elle fonctionne sur téléphone, tablette et ordinateur, en 15 langues.<br><br>Pour que tu puisses tout tester, je t&rsquo;offre ton premier mois Premium 🎁</td></tr>
{encadre()}
{titre(e(F[0]))}
<tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">{liste(F[1])}{LIGNE}</table></td></tr>
{titre("Et pour ton écurie")}
<tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">{liste(F[4])}{LIGNE}</table></td></tr>
{bouton("DÉCOUVRIR HYPE&nbsp;&rarr;", OFFRE)}
<tr><td style="padding:30px 4px 0;font-family:{S};font-size:15px;line-height:1.6;color:{GR};">J&rsquo;ai hâte d&rsquo;avoir ton avis, surtout côté écurie&nbsp;: tes idées m&rsquo;aideront à améliorer l&rsquo;appli.<br>Gros bisous,</td></tr>
<tr><td style="padding:34px 0 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td valign="bottom" style="border-bottom:1px solid {OR};font-size:0;line-height:0;">&nbsp;</td><td width="64" valign="bottom" style="border-bottom:1px solid {OR};padding:0 18px 0 10px;font-size:0;line-height:0;"><img src="https://2hype.fr/images/poney-mail.png" width="64" alt="" style="display:block;width:64px;height:auto;border:0;"></td></tr></table></td></tr>
<tr><td style="padding:16px 0 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td width="58%" valign="bottom" style="font-family:{S};font-size:13px;line-height:1.5;color:#a9b5c2;">Et Hypo, le petit poney de l&rsquo;appli,<br>t&rsquo;attend déjà aux écuries&nbsp;! 🥕</td>
<td align="right" valign="bottom"><div style="font-family:{G};font-style:italic;font-size:30px;line-height:1;color:{IV};">Blandine 💙</div></td>
</tr></table></td></tr>
<tr><td align="center" style="padding:28px 0 0;font-family:{S};font-size:11px;letter-spacing:3px;line-height:1.9;"><a href="https://2hype.fr/" style="color:#5d6b7b;text-decoration:none;">2HYPE.FR</a><br><a href="{{{{ unsubscribe }}}}" style="color:#4a5866;font-size:11px;letter-spacing:0;">Ne plus recevoir ces mails</a></td></tr>
</table></td></tr></table></body></html>'''
open(os.path.join(ICI, "mails", "invitation.html"), "w", encoding="utf-8").write(H)
print("ok", len(H))
