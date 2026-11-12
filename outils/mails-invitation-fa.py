# -*- coding: utf-8 -*-
"""12/11 (Blandine, 15h29 : « une version en français, une version en persan ») — mail d'INVITATION en PERSAN (farsi),
même contenu que outils/mails/invitation.html (perso + écurie + 1 mois offert HYPE1MOIS), mis en page de droite à gauche.
Pour Fahimeh Vezi : envoyé en double avec la version française, une fois le persan en ligne dans l'appli.
Sortie : outils/mails/invitation-fa.html"""
import os, html
ICI = os.path.dirname(os.path.abspath(__file__))
def e(t): return html.escape(t, quote=False)
FA = "Tahoma,'Vazirmatn','Segoe UI',Arial,sans-serif"   # le persan ne s'écrit pas en italique
G = "Georgia,'Times New Roman',serif"
OR = "#C9A66B"; IV = "#F3EEE4"; GR = "#cfd6de"; FOND = "#0B1422"
OFFRE = "https://2hype.fr/?offert=HYPE1MOIS"

OBJET = "همان‌طور که قول داده بودم: این هم Hype، و اولین ماهت هدیه 🎁"
APERCU = "همان‌طور که قول داده بودم: اپلیکیشنی که برای سوارکاران، اسب‌ها و باشگاه‌ها می‌سازم. اولین ماهت هدیه است."

PERSO = [
    ("📸", "عکس‌ها و ویدیوها", "خاطرات مسابقه‌ها و تمرین‌هایت را مرتب کن و استوری بساز.", "https://2hype.fr/fr/photos-souvenirs/"),
    ("🐴", "اسب تو", "شناسنامه، اصل و نسب، شجره‌نامه، عکس‌ها و نتایجش.", "https://2hype.fr/fr/fiche-cheval/"),
    ("🏆", "مسابقه‌ها", "کل فصلت را با یک حرکت وارد کن: نتایج، رده‌بندی‌ها و امتیازها.", "https://2hype.fr/fr/concours-resultats/"),
    ("🩺", "سلامت", "مراقبت‌ها، واکسن‌ها، نعل‌بند… با یادآوری خودکار.", "https://2hype.fr/fr/sante-cheval/"),
    ("🔐", "گاوصندوق مدارک تو", "دفترچه واکسن، مدارک کامیون حمل اسب، لایسنس، قراردادها… همه پرونده‌های مهمت، امن و همیشه دم دست.", "https://2hype.fr/#coffre"),
    ("🎓", "گالوپ ۱ تا ۹ و آمادگی حرفه‌ای", "درس، کوییز و امتحان آزمایشی، به‌علاوه آمادگی برای مدارک AE، BPJEPS و DEJEPS.", "https://2hype.fr/fr/galops/"),
    ("🧭", "درساژ", "برنامه‌های درساژ با مسیر متحرک، تا از حفظشان کنی.", "https://2hype.fr/fr/reprises-dressage/"),
    ("💬", "Hey Baby", "مربی مجازی تو برای همه سؤال‌هایت، حتی از روی یک عکس.", "https://2hype.fr/fr/ia-equestre/"),
    ("🌍", "Horse Lingo", "واژگان سوارکاری به چند زبان.", "https://horselingo.fr"),
    ("🏇", "زندگی باشگاه", "دوره‌های آموزشی، مسابقه‌ها، ثبت‌نام‌ها و اطلاعات کاربردی.", "https://2hype.fr/#monecurie"),
]
PRO = [
    ("📒", "دفتر ثبت اسب‌ها", "اسب‌های حاضر، ورود و خروج، مراقبت‌ها و نسخه‌ها. جابه‌جایی‌ها برای مسابقه از روی ثبت‌نام‌ها خودکار اضافه می‌شوند. آماده چاپ برای بازرسی.", "https://2hype.fr/fr/logiciel-gestion-ecurie/"),
    ("📸", "نتایج با یک اسکرین‌شات", "فقط یک اسکرین‌شات کافی است تا شماره‌ها و نتایج سوارکارانت وارد شود.", "https://2hype.fr/fr/concours-resultats/"),
    ("💉", "یادآوری برای کل باشگاه", "واکسن، ضدانگل، نعل‌بند، دندان‌پزشک… Hype هر موعد را به‌موقع یادآوری می‌کند.", "https://2hype.fr/fr/logiciel-gestion-ecurie/"),
    ("🏠", "صفحه عمومی باشگاهت", "باشگاه، اسب‌ها و فعالیت‌هایت را معرفی کن تا بیشتر شناخته شوی و سوارکاران جدید پیدا کنی.", "https://2hype.fr/fr/centres-equestres/"),
    ("📅", "تقویم و پیام‌رسان باشگاه", "قرارهای باشگاه، ثبت‌نام‌ها، گروه‌های گفتگو و اعلان روی گوشی.", "https://2hype.fr/fr/gestion-ecurie/"),
    ("⚖️", "مدارک قانونی", "اطلاعیه‌های الزامی، سند ارزیابی ریسک، بیمه‌ها، حمل اسب: همه‌چیز ساده توضیح داده شده و Hype هر موعد را یادآوری می‌کند.", "https://2hype.fr/fr/logiciel-gestion-ecurie/"),
    ("📄", "پانسیون و قراردادها", "پرداخت‌هایی که باید دریافت کنی و قراردادهایی که باید تمدید شوند، بدون جدول جداگانه.", "https://2hype.fr/fr/logiciel-gestion-ecurie/"),
    ("💶", "حسابداری و درخواست کمک‌هزینه", "حسابداری‌ات آماده برای حسابدار، و Hey Baby برای پیدا کردن کمک‌هزینه‌های ممکن و آماده کردن پرونده‌های درخواست.", "https://2hype.fr/fr/logiciel-gestion-ecurie/"),
]

def liste(items):
    return "".join(f'''<tr><td style="padding:14px 0;border-top:1px solid #1a2a40;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="rtl"><tr>
<td width="40" valign="top" style="font-size:22px;line-height:1.2;">{i}</td>
<td valign="top" style="text-align:right;"><a href="{u}" style="font-family:{FA};font-size:15px;font-weight:bold;color:{IV};text-decoration:none;">{e(t)} <span style="color:{OR};">&#8249;</span></a>
<div style="padding:4px 0 0;font-family:{FA};font-size:13.5px;line-height:1.8;color:#a9b5c2;">{e(d)}</div></td></tr></table></td></tr>''' for i, t, d, u in items)
def titre(t):
    return f'''<tr><td align="center" style="padding:40px 0 14px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="30" valign="middle"><div style="height:1px;line-height:1px;font-size:1px;background:{OR};">&nbsp;</div></td><td dir="rtl" style="padding:0 12px;font-family:{FA};font-size:19px;color:{IV};white-space:nowrap;">{t}</td><td width="30" valign="middle"><div style="height:1px;line-height:1px;font-size:1px;background:{OR};">&nbsp;</div></td></tr></table></td></tr>'''
def bouton(txt, url):
    return f'''<tr><td align="center" style="padding:22px 0 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="border:1.5px solid {OR};border-radius:999px;"><a href="{url}" dir="rtl" style="display:inline-block;padding:12px 24px;font-family:{FA};font-size:14px;font-weight:bold;color:{IV};text-decoration:none;">{txt}</a></td></tr></table></td></tr>'''
def encadre():
    return f'''<tr><td style="padding:28px 0 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #6e5d40;border-radius:14px;"><tr>
<td dir="rtl" style="padding:18px 18px;font-family:{FA};font-size:14px;line-height:1.9;color:{GR};text-align:center;"><div style="font-family:{FA};font-size:19px;font-weight:bold;color:{IV};padding:0 0 6px;">🎁 اولین ماه پریمیوم تو هدیه است</div>وارد حساب Hype خودت شو، بعد <b style="color:{IV};">Premium Cavalier (ماهانه)</b> را انتخاب کن: کد از قبل وارد شده است. کارت بانکی‌ات خواسته می‌شود، اما ماه اول ۰&nbsp;یورو است و هر وقت خواستی، قبل از پایان ماه، می‌توانی لغوش کنی.</td></tr></table></td></tr>
{bouton("استفاده از ماه هدیه‌ام&nbsp;&larr;", OFFRE)}'''
LIGNE = '<tr><td style="border-top:1px solid #1a2a40;font-size:0;line-height:0;">&nbsp;</td></tr>'
H = f'''<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="supported-color-schemes" content="dark"><title>Hype</title>
<style>a[x-apple-data-detectors]{{color:inherit!important;text-decoration:none!important}}</style></head>
<body dir="rtl" style="margin:0;padding:0;background-color:{FOND};background-image:linear-gradient({FOND},{FOND});">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">{e(APERCU)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="{FOND}" style="background-color:{FOND};background-image:linear-gradient({FOND},{FOND});"><tr><td align="center" bgcolor="{FOND}" style="padding:24px 14px 30px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="rtl" style="max-width:520px;">
<tr><td align="center" dir="ltr" style="font-family:{G};font-style:italic;font-size:38px;line-height:1;color:{IV};">Hype</td></tr>
<tr><td align="center" style="padding:8px 0 18px;font-family:{FA};font-size:12px;letter-spacing:1px;color:{GR};">اپلیکیشن سوارکاران</td></tr>
<tr><td style="padding:0;"><img src="https://2hype.fr/images/accueil-video-ordi-poster.jpg" width="520" alt="" style="display:block;width:100%;max-width:520px;height:auto;border:0;border-radius:14px;"></td></tr>
<tr><td style="padding:30px 4px 0;font-family:{FA};font-size:24px;line-height:1.5;font-weight:bold;color:{IV};text-align:right;">سلام {{{{ contact.PRENOM }}}}&rlm;!</td></tr>
<tr><td style="padding:12px 4px 0;font-family:{FA};font-size:15px;line-height:1.9;color:{GR};text-align:right;">همان‌طور که قول داده بودم، این هم <b style="color:{IV};">Hype</b>، اپلیکیشنی که برای سوارکاران، اسب‌هایشان و باشگاه‌ها می‌سازم. روی گوشی، تبلت و کامپیوتر کار می‌کند، به چندین زبان، از جمله فارسی.<br><br>برای اینکه بتوانی همه‌چیز را امتحان کنی، اولین ماه پریمیوم را به تو هدیه می‌دهم 🎁</td></tr>
{encadre()}
{titre("آنچه در Hype منتظر توست")}
<tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">{liste(PERSO)}{LIGNE}</table></td></tr>
{titre("و برای باشگاهت")}
<tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">{liste(PRO)}{LIGNE}</table></td></tr>
{bouton("آشنایی با Hype&nbsp;&larr;", OFFRE)}
<tr><td style="padding:30px 4px 0;font-family:{FA};font-size:15px;line-height:1.9;color:{GR};text-align:right;">خیلی مشتاقم نظرت را بدانم، مخصوصاً درباره بخش باشگاه: ایده‌هایت کمکم می‌کنند اپلیکیشن را بهتر کنم.<br>با کلی محبت،</td></tr>
<tr><td style="padding:34px 0 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="ltr"><tr><td valign="bottom" style="border-bottom:1px solid {OR};font-size:0;line-height:0;">&nbsp;</td><td width="64" valign="bottom" style="border-bottom:1px solid {OR};padding:0 18px 0 10px;font-size:0;line-height:0;"><img src="https://2hype.fr/images/poney-mail.png" width="64" alt="" style="display:block;width:64px;height:auto;border:0;"></td></tr></table></td></tr>
<tr><td style="padding:16px 0 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="ltr"><tr>
<td valign="bottom"><div style="font-family:{G};font-style:italic;font-size:30px;line-height:1;color:{IV};">Blandine 💙</div></td>
<td width="58%" valign="bottom" dir="rtl" style="font-family:{FA};font-size:13px;line-height:1.8;color:#a9b5c2;text-align:right;">و Hypo، پونی کوچولوی اپلیکیشن،<br>از همین حالا در اصطبل منتظرت است! 🥕</td>
</tr></table></td></tr>
<tr><td align="center" style="padding:28px 0 0;font-family:{FA};font-size:11px;line-height:1.9;"><a href="https://2hype.fr/" dir="ltr" style="color:#5d6b7b;text-decoration:none;letter-spacing:3px;font-family:Arial,sans-serif;">2HYPE.FR</a><br><a href="{{{{ unsubscribe }}}}" style="color:#4a5866;font-size:11px;">دیگر این ایمیل‌ها را دریافت نکنم</a></td></tr>
</table></td></tr></table></body></html>'''
open(os.path.join(ICI, "mails", "invitation-fa.html"), "w", encoding="utf-8").write(H)
print("ok", len(H)); print("OBJET:", OBJET)
