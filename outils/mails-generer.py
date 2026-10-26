# -*- coding: utf-8 -*-
"""Genere les modeles de mails Supabase de Hype (14 langues) + des apercus par langue.
Sortie : outils/mails/reinitialisation.html, confirmation.html, objets.txt (a coller dans Supabase,
Authentication > Emails > Templates). La langue vient de {{ .Data.langue }} (user_metadata.langue,
recopiee par l appli) ; sans langue connue -> francais."""
import os, html
ICI = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ICI, "mails")
LANGUES = ["fr","en","es","it","de","ja","ar","zh","nl","pt","sv","ru","pl","ko"]
IMG = "https://2hype.fr/images/mail-cheval.jpg"
# cles : objet, pre, titre, accroche, corps, bouton, petit, signe
RESET = {
"fr": ["HYPE — ton cheval t'attend 🐴","Choisis un nouveau mot de passe en un geste.","Mot de passe oublié ?","Pas de panique : même les meilleurs cavaliers perdent parfois un étrier.","Touche le bouton ci-dessous pour choisir un nouveau mot de passe et retrouver ton cheval sur Hype.","Choisir mon nouveau mot de passe","Tu n'as rien demandé ? Ignore simplement ce message : ton mot de passe ne change pas.","À tout de suite en selle — l'équipe Hype"],
"en": ["HYPE — your horse is waiting 🐴","Pick a new password in one tap.","Forgot your password?","No panic: even the best riders lose a stirrup now and then.","Tap the button below to choose a new password and get back to your horse on Hype.","Choose my new password","Didn't ask for this? Just ignore this email: your password stays the same.","See you in the saddle — the Hype team"],
"es": ["HYPE — tu caballo te espera 🐴","Elige una nueva contraseña con un toque.","¿Olvidaste tu contraseña?","Tranquilidad: hasta los mejores jinetes pierden un estribo de vez en cuando.","Toca el botón de abajo para elegir una nueva contraseña y volver con tu caballo en Hype.","Elegir mi nueva contraseña","¿No lo has pedido tú? Ignora este mensaje: tu contraseña no cambia.","¡Nos vemos en la silla! — el equipo de Hype"],
"it": ["HYPE — il tuo cavallo ti aspetta 🐴","Scegli una nuova password con un tocco.","Password dimenticata?","Niente panico: anche i migliori cavalieri perdono una staffa ogni tanto.","Tocca il pulsante qui sotto per scegliere una nuova password e ritrovare il tuo cavallo su Hype.","Scegli la mia nuova password","Non l'hai chiesto tu? Ignora questo messaggio: la tua password non cambia.","A presto in sella — il team di Hype"],
"de": ["HYPE — dein Pferd wartet auf dich 🐴","Wähle mit einem Tipp ein neues Passwort.","Passwort vergessen?","Keine Panik: Selbst die besten Reiter verlieren mal einen Steigbügel.","Tippe auf den Button unten, um ein neues Passwort zu wählen und auf Hype zu deinem Pferd zurückzukehren.","Mein neues Passwort wählen","Das warst nicht du? Ignoriere diese E-Mail einfach: Dein Passwort bleibt unverändert.","Bis gleich im Sattel — dein Hype-Team"],
"ja": ["HYPE — きみの馬が待ってるよ 🐴","ワンタップで新しいパスワードを設定しよう。","パスワードを忘れた？","大丈夫、どんな名騎手でもたまにはあぶみを外すもの。","下のボタンをタップして新しいパスワードを決めれば、Hypeでまた愛馬に会えるよ。","新しいパスワードを設定する","心当たりがない場合は、このメールは無視してね。パスワードは変わりません。","鞍の上で待ってるね — Hypeチーム"],
"ar": ["HYPE — حصانكِ ينتظركِ 🐴","اختاري كلمة مرور جديدة بلمسة واحدة.","نسيتِ كلمة المرور؟","لا تقلقي: حتى أمهر الفرسان يفقدون الركاب أحيانًا.","المسي الزر أدناه لاختيار كلمة مرور جديدة والعودة إلى حصانكِ على Hype.","اختيار كلمة مرور جديدة","لم تطلبي ذلك؟ تجاهلي هذه الرسالة ببساطة: كلمة مرورك لن تتغيّر.","نراكِ على السرج قريبًا — فريق Hype"],
"zh": ["HYPE — 你的马在等你 🐴","轻点一下，设置新密码。","忘记密码了？","别慌：再优秀的骑手也偶尔会掉镫。","点击下方按钮设置新密码，回到 Hype 与你的马相聚。","设置我的新密码","不是你本人操作？忽略这封邮件即可，你的密码不会改变。","马鞍上见 — Hype 团队"],
"nl": ["HYPE — je paard wacht op je 🐴","Kies met één tik een nieuw wachtwoord.","Wachtwoord vergeten?","Geen paniek: zelfs de beste ruiters verliezen weleens een stijgbeugel.","Tik op de knop hieronder om een nieuw wachtwoord te kiezen en je paard op Hype terug te vinden.","Mijn nieuwe wachtwoord kiezen","Heb je dit niet aangevraagd? Negeer deze e-mail gewoon: je wachtwoord blijft hetzelfde.","Tot zo in het zadel — het Hype-team"],
"pt": ["HYPE — seu cavalo está esperando você 🐴","Escolha uma nova senha com um toque.","Esqueceu sua senha?","Calma: até os melhores cavaleiros perdem um estribo de vez em quando.","Toque no botão abaixo para escolher uma nova senha e reencontrar seu cavalo no Hype.","Escolher minha nova senha","Não foi você que pediu? É só ignorar este e-mail: sua senha continua a mesma.","Até já na sela — equipe Hype"],
"sv": ["HYPE — din häst väntar på dig 🐴","Välj ett nytt lösenord med ett tryck.","Glömt lösenordet?","Ingen panik: även de bästa ryttarna tappar en stigbygel ibland.","Tryck på knappen nedan för att välja ett nytt lösenord och komma tillbaka till din häst på Hype.","Välj mitt nya lösenord","Har du inte bett om det? Ignorera bara det här mejlet: ditt lösenord ändras inte.","Vi ses i sadeln — Hype-teamet"],
"ru": ["HYPE — твоя лошадь ждёт тебя 🐴","Выбери новый пароль в одно касание.","Не помнишь пароль?","Без паники: даже лучшие всадники иногда теряют стремя.","Нажми на кнопку ниже, чтобы выбрать новый пароль и вернуться к своей лошади в Hype.","Выбрать новый пароль","Если запрос отправлен не тобой, просто проигнорируй это письмо: пароль не изменится.","До встречи в седле — команда Hype"],
"pl": ["HYPE — twój koń na ciebie czeka 🐴","Wybierz nowe hasło jednym dotknięciem.","Nie pamiętasz hasła?","Spokojnie: nawet najlepsi jeźdźcy czasem gubią strzemię.","Dotknij przycisku poniżej, aby wybrać nowe hasło i wrócić do swojego konia w Hype.","Wybieram nowe hasło","To nie ty? Po prostu zignoruj tę wiadomość: twoje hasło się nie zmieni.","Do zobaczenia w siodle — zespół Hype"],
"ko": ["HYPE — 말이 기다리고 있어요 🐴","한 번의 터치로 새 비밀번호를 정하세요.","비밀번호를 잊어버렸나요?","걱정 마세요. 최고의 기수도 가끔은 등자를 놓친답니다.","아래 버튼을 눌러 새 비밀번호를 정하고 Hype에서 다시 말을 만나 보세요.","새 비밀번호 정하기","요청한 적이 없나요? 이 메일은 무시하셔도 돼요. 비밀번호는 바뀌지 않아요.","곧 안장 위에서 만나요 — Hype 팀"],
}
CONF = {
"fr": ["HYPE — bienvenue en selle 🐴","Confirme ton adresse pour ouvrir ton compte.","Bienvenue sur Hype !","Ton cheval piaffe déjà d'impatience.","Confirme ton adresse e-mail pour ouvrir ton compte et commencer ton voyage équestre.","Confirmer mon adresse","Tu n'as pas créé de compte Hype ? Ignore simplement ce message.","À tout de suite en selle — l'équipe Hype"],
"en": ["HYPE — welcome to the saddle 🐴","Confirm your address to open your account.","Welcome to Hype!","Your horse is already pawing the ground with excitement.","Confirm your email address to open your account and start your equestrian journey.","Confirm my address","Didn't create a Hype account? Just ignore this email.","See you in the saddle — the Hype team"],
"es": ["HYPE — ¡a la silla! 🐴","Confirma tu dirección para abrir tu cuenta.","¡Te damos la bienvenida a Hype!","Tu caballo ya está impaciente por empezar.","Confirma tu dirección de correo para abrir tu cuenta y empezar tu viaje ecuestre.","Confirmar mi dirección","¿No has creado una cuenta en Hype? Ignora este mensaje.","¡Nos vemos en la silla! — el equipo de Hype"],
"it": ["HYPE — in sella! 🐴","Conferma il tuo indirizzo per aprire il tuo account.","Ti diamo il benvenuto su Hype!","Il tuo cavallo scalpita già dall'impazienza.","Conferma il tuo indirizzo email per aprire il tuo account e iniziare il tuo viaggio equestre.","Conferma il mio indirizzo","Non hai creato un account Hype? Ignora semplicemente questo messaggio.","A presto in sella — il team di Hype"],
"de": ["HYPE — willkommen im Sattel 🐴","Bestätige deine Adresse, um dein Konto zu öffnen.","Willkommen bei Hype!","Dein Pferd scharrt schon ungeduldig mit den Hufen.","Bestätige deine E-Mail-Adresse, um dein Konto zu öffnen und deine Reitreise zu beginnen.","Meine Adresse bestätigen","Du hast kein Hype-Konto erstellt? Ignoriere diese E-Mail einfach.","Bis gleich im Sattel — dein Hype-Team"],
"ja": ["HYPE — ようこそ鞍の上へ 🐴","メールアドレスを確認してアカウントを開こう。","Hypeへようこそ！","きみの馬はもう待ちきれない様子だよ。","メールアドレスを確認して、アカウントを開き、乗馬の旅を始めよう。","メールアドレスを確認する","Hypeのアカウントを作った覚えがない場合は、このメールを無視してね。","鞍の上で待ってるね — Hypeチーム"],
"ar": ["HYPE — أهلًا بكِ على السرج 🐴","أكّدي عنوانكِ لفتح حسابكِ.","أهلًا بكِ في Hype!","حصانكِ ينتظر بفارغ الصبر.","أكّدي عنوان بريدكِ الإلكتروني لفتح حسابكِ وبدء رحلتكِ في عالم الفروسية.","تأكيد عنواني","لم تُنشئي حسابًا على Hype؟ تجاهلي هذه الرسالة ببساطة.","نراكِ على السرج قريبًا — فريق Hype"],
"zh": ["HYPE — 欢迎上马 🐴","确认你的邮箱，开启你的账户。","欢迎来到 Hype！","你的马已经迫不及待了。","确认你的邮箱地址，开启账户，开始你的马术之旅。","确认我的邮箱","没有创建过 Hype 账户？忽略这封邮件即可。","马鞍上见 — Hype 团队"],
"nl": ["HYPE — welkom in het zadel 🐴","Bevestig je adres om je account te openen.","Welkom bij Hype!","Je paard staat al te trappelen van ongeduld.","Bevestig je e-mailadres om je account te openen en aan je paardenreis te beginnen.","Mijn adres bevestigen","Heb je geen Hype-account aangemaakt? Negeer deze e-mail dan gewoon.","Tot zo in het zadel — het Hype-team"],
"pt": ["HYPE — boas-vindas à sela 🐴","Confirme seu endereço para abrir sua conta.","Boas-vindas ao Hype!","Seu cavalo já está ansioso para começar.","Confirme seu endereço de e-mail para abrir sua conta e começar sua jornada equestre.","Confirmar meu endereço","Não criou uma conta no Hype? É só ignorar este e-mail.","Até já na sela — equipe Hype"],
"sv": ["HYPE — välkommen i sadeln 🐴","Bekräfta din adress för att öppna ditt konto.","Välkommen till Hype!","Din häst skrapar redan otåligt med hovarna.","Bekräfta din e-postadress för att öppna ditt konto och börja din ryttarresa.","Bekräfta min adress","Har du inte skapat något Hype-konto? Ignorera bara det här mejlet.","Vi ses i sadeln — Hype-teamet"],
"ru": ["HYPE — добро пожаловать в седло 🐴","Подтверди адрес, чтобы открыть аккаунт.","Добро пожаловать в Hype!","Твоя лошадь уже бьёт копытом от нетерпения.","Подтверди адрес электронной почты, чтобы открыть аккаунт и начать своё конное путешествие.","Подтвердить адрес","Если аккаунт в Hype создан не тобой, просто проигнорируй это письмо.","До встречи в седле — команда Hype"],
"pl": ["HYPE — witaj w siodle 🐴","Potwierdź adres, aby otworzyć konto.","Witaj w Hype!","Twój koń już przebiera kopytami z niecierpliwości.","Potwierdź swój adres e-mail, aby otworzyć konto i rozpocząć swoją jeździecką przygodę.","Potwierdzam adres","To nie ty zakładasz konto w Hype? Po prostu zignoruj tę wiadomość.","Do zobaczenia w siodle — zespół Hype"],
"ko": ["HYPE — 안장 위에 오신 걸 환영해요 🐴","주소를 확인하고 계정을 열어 보세요.","Hype에 오신 걸 환영해요!","말이 벌써 기다리느라 발을 구르고 있어요.","이메일 주소를 확인하고 계정을 열어 승마 여행을 시작하세요.","내 주소 확인하기","Hype 계정을 만든 적이 없나요? 이 메일은 무시하셔도 돼요.","곧 안장 위에서 만나요 — Hype 팀"],
}
LIEN_TXT = {"fr":"Le bouton ne marche pas ? Copie ce lien :","en":"Button not working? Copy this link:","es":"¿El botón no funciona? Copia este enlace:","it":"Il pulsante non funziona? Copia questo link:","de":"Der Button funktioniert nicht? Kopiere diesen Link:","ja":"ボタンが使えない場合は、このリンクをコピーしてね：","ar":"الزر لا يعمل؟ انسخي هذا الرابط:","zh":"按钮无法使用？复制此链接：","nl":"Werkt de knop niet? Kopieer deze link:","pt":"O botão não funciona? Copie este link:","sv":"Fungerar inte knappen? Kopiera den här länken:","ru":"Кнопка не работает? Скопируй эту ссылку:","pl":"Przycisk nie działa? Skopiuj ten link:","ko":"버튼이 작동하지 않나요? 이 링크를 복사하세요:"}
for d in (RESET, CONF):
    assert sorted(d) == sorted(LANGUES)
    for k, v in d.items(): assert len(v) == 8, k
I = {"objet":0,"pre":1,"titre":2,"accroche":3,"corps":4,"bouton":5,"petit":6,"signe":7}
def e(t): return html.escape(t, quote=False)
def choix(textes, cle, echap=True):
    """bloc Go : {{ if eq $l "en" }}...{{ else if ... }}...{{ else }}fr{{ end }}"""
    val = (lambda lg: e(textes[lg][I[cle]]) if echap else textes[lg][I[cle]]) if isinstance(textes.get("fr"), list) else (lambda lg: e(textes[lg]))
    s = ""
    autres = [l for l in LANGUES if l != "fr"]
    for n, lg in enumerate(autres):
        s += ('{{ if eq $l "%s" }}' if n == 0 else '{{ else if eq $l "%s" }}') % lg + val(lg)
    return s + "{{ else }}" + val("fr") + "{{ end }}"
def corps(textes, champ, lg=None):
    """lg=None -> modele Supabase (conditions) ; lg='xx' -> apercu de cette langue"""
    if lg is None:
        T = lambda cle: choix(textes, cle)
        TL = choix(LIEN_TXT, None) if False else ""
        lien_txt = "".join([('{{ if eq $l "%s" }}' if n == 0 else '{{ else if eq $l "%s" }}') % l + e(LIEN_TXT[l]) for n, l in enumerate([x for x in LANGUES if x != "fr"])]) + "{{ else }}" + e(LIEN_TXT["fr"]) + "{{ end }}"
        dirv = '{{ if eq $l "ar" }}rtl{{ else }}ltr{{ end }}'
        alignv = '{{ if eq $l "ar" }}right{{ else }}left{{ end }}'
        langv = "{{ $l }}"
        tete = '{{ $l := "fr" }}{{ with .Data }}{{ with .langue }}{{ $l = . }}{{ end }}{{ end }}'
        url = "{{ .ConfirmationURL }}"
        fleche = '{{ if eq $l "ar" }}&#8592;{{ else }}&#8594;{{ end }}'
    else:
        T = lambda cle: e(textes[lg][I[cle]])
        lien_txt = e(LIEN_TXT[lg]); dirv = "rtl" if lg == "ar" else "ltr"; alignv = "right" if lg == "ar" else "left"; langv = lg; tete = ""; url = "https://2hype.fr/#exemple"; fleche = "&#8592;" if lg == "ar" else "&#8594;"
    serif = "'Cormorant Garamond',Georgia,'Times New Roman',serif"
    sans = "'Montserrat',Helvetica,Arial,sans-serif"
    return f'''{tete}<!DOCTYPE html>
<html lang="{langv}" dir="{dirv}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="supported-color-schemes" content="dark"><title>HYPE</title></head>
<body style="margin:0;padding:0;background:#070A08;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">{T("pre")}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#070A08;"><tr><td align="center" style="padding:28px 12px 36px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#0B1215;border:1px solid #23302F;border-radius:18px;overflow:hidden;" dir="{dirv}">
<tr><td style="padding:26px 0 18px;text-align:center;font-family:{serif};font-size:22px;letter-spacing:10px;color:#C9A66B;">HYPE</td></tr>
<tr><td style="padding:0;"><img src="{IMG}" width="560" alt="" style="display:block;width:100%;max-width:560px;height:auto;border:0;"></td></tr>
<tr><td style="padding:30px 32px 6px;text-align:{alignv};font-family:{serif};font-size:30px;line-height:1.2;color:#F3EEE4;">{T("titre")}</td></tr>
<tr><td style="padding:6px 32px 0;text-align:{alignv};font-family:{serif};font-style:italic;font-size:19px;line-height:1.45;color:#C9A66B;">{T("accroche")}</td></tr>
<tr><td style="padding:16px 32px 0;text-align:{alignv};font-family:{sans};font-size:15px;line-height:1.6;color:#D9D4CA;">{T("corps")}</td></tr>
<tr><td align="center" style="padding:28px 32px 6px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="border:1px solid #C9A66B;border-radius:999px;background:#101D22;">
<a href="{url}" style="display:inline-block;padding:15px 30px;font-family:{sans};font-size:15px;font-weight:600;letter-spacing:.3px;color:#F3EEE4;text-decoration:none;border-radius:999px;">{T("bouton")} {fleche}</a>
</td></tr></table></td></tr>
<tr><td style="padding:22px 32px 0;text-align:{alignv};font-family:{sans};font-size:12.5px;line-height:1.6;color:#8E978F;">{T("petit")}</td></tr>
<tr><td style="padding:14px 32px 0;text-align:{alignv};font-family:{sans};font-size:11.5px;line-height:1.5;color:#6F7872;">{lien_txt}<br><a href="{url}" style="color:#C9A66B;word-break:break-all;">{url}</a></td></tr>
<tr><td style="padding:26px 32px 30px;text-align:{alignv};font-family:{serif};font-size:17px;color:#F3EEE4;">{T("signe")}<br><a href="https://2hype.fr" style="font-family:{sans};font-size:12px;letter-spacing:2px;color:#C9A66B;text-decoration:none;">2HYPE.FR</a></td></tr>
</table></td></tr></table>
</body></html>
'''
def objet_modele(textes, nom):
    return COND_HYPE + '{{ $l := "fr" }}{{ with .Data }}{{ with .langue }}{{ $l = . }}{{ end }}{{ end }}' + choix(textes, "objet", echap=False) + "{{ else }}" + DEFAUT[nom][0] + "{{ end }}"

# 26/10 : le projet Supabase est PARTAGE avec Horse Lingo (horselingo.fr). Le mail Hype ne part que si la demande vient de
# Hype (RedirectTo = https://2hype.fr) ; sinon, le mail d origine de Supabase, inchange, comme avant.
COND_HYPE = '{{ if or (eq .RedirectTo "https://2hype.fr") (eq .RedirectTo "https://2hype.fr/") }}'
DEFAUT = {
 "reinitialisation": ("Reset your password", "<h2>Reset your password</h2>\n\n<p>We received a request to reset your password. Follow the link below to choose a new one.</p>\n<p><a href=\"{{ .ConfirmationURL }}\">Reset password</a></p>\n\n<p>If you didn't request this, you can safely ignore this email.</p>"),
 "confirmation": ("Confirm your email address", "<h2>Confirm your email address</h2>\n\n<p>Follow the link below to confirm this email address and finish signing up.</p>\n<p><a href=\"{{ .ConfirmationURL }}\">Confirm email address</a></p>"),
}
os.makedirs(OUT, exist_ok=True)
os.makedirs(os.path.join(OUT, "apercus"), exist_ok=True)
for nom, textes in (("reinitialisation", RESET), ("confirmation", CONF)):
    open(os.path.join(OUT, nom + ".html"), "w", encoding="utf-8").write(COND_HYPE + corps(textes, nom) + "{{ else }}" + DEFAUT[nom][1] + "{{ end }}")
    for lg in LANGUES:
        open(os.path.join(OUT, "apercus", f"{nom}-{lg}.html"), "w", encoding="utf-8").write(corps(textes, nom, lg))
open(os.path.join(OUT, "objets.txt"), "w", encoding="utf-8").write(
"OBJET « Reset Password » (mot de passe oublié) — version 14 langues :\n" + objet_modele(RESET, "reinitialisation") +
"\n\nOBJET « Reset Password » — version de secours (si Supabase n'accepte pas les conditions dans l'objet) :\n" + RESET["fr"][0] +
"\n\nOBJET « Confirm signup » (confirmation d'inscription) — version 14 langues :\n" + objet_modele(CONF, "confirmation") +
"\n\nOBJET « Confirm signup » — version de secours :\n" + CONF["fr"][0] + "\n")
print("ok")
