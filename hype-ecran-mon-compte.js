/* HYPE ▸ 30/10/2026 — Page MON COMPTE (EcranMonCompte), DÉTACHÉ de index.html pour alléger le démarrage de l'appli (~76 Ko).
   Chargé seulement à l'ouverture de l'écran (voir hypeEcranDiffere dans index.html). Code d'origine déplacé SANS changement :
   il utilise les mêmes outils partagés que le reste de l'appli (useApp, useState, T, etc.), disponibles à l'exécution. */
(function () {
function EcranMonCompte() {
  var ctx = useApp();
  var setEcran = ctx.setEcran, langue = ctx.langue, profilApp = ctx.profil, setProfilApp = ctx.setProfil, tr = ctx.tr, premium = ctx.premium;
  var svSt = React.useState(false); var voirSuppr = svSt[0], setVoirSuppr = svSt[1];

  var DICT = {
    fr: { titre:"Mon compte", label:"COMPTE CAVALIER", titreIns:"REJOINS HYPE", titreCon:"BON RETOUR", phraseIns:"Ton profil te suit dans tout l'univers Hype.", phraseCon:"Heureux de te revoir en selle.", pseudo:"Pseudo", email:"Email", mdp:"Mot de passe", creer:"Créer mon compte", connecter:"Se connecter", dejaCompte:"Déjà un compte ?", pasCompte:"Pas encore de compte ?", lienCon:"Se connecter", lienIns:"S'inscrire", deconnexion:"Se déconnecter", mdpOublie:"Mot de passe oublié ?", resetEnvoye:"Email de réinitialisation envoyé ! Regarde ta boîte mail.", resetEmail:"Entre d'abord ton email ci-dessus.", retourAccueil:"Retour à l'accueil", confirme:"Compte créé ! Vérifie tes emails pour activer ton compte.", errIdent:"Email ou mot de passe incorrect.", errDeja:"Un compte existe déjà avec cet email.", errCourt:"Mot de passe : 6 caractères minimum.", errEmail:"Adresse email invalide.", errConfirm:"Confirme d'abord ton email (regarde ta boîte mail).", errGen:"Un souci est survenu. Réessaie.", indispo:"Connexion à la base indisponible.", champs:"Remplis tous les champs.", ecurie:"Écurie", ville:"Ville", connecteA:"Connecté à Hype Universe", patiente:"Un instant…" },
    en: { titre:"My account", label:"RIDER ACCOUNT", titreIns:"JOIN HYPE", titreCon:"WELCOME BACK", phraseIns:"Your profile follows you across the Hype universe.", phraseCon:"Happy to see you back in the saddle.", pseudo:"Username", email:"Email", mdp:"Password", creer:"Create my account", connecter:"Log in", dejaCompte:"Already have an account?", pasCompte:"No account yet?", lienCon:"Log in", lienIns:"Sign up", deconnexion:"Log out", mdpOublie:"Forgot your password?", resetEnvoye:"Reset email sent! Check your inbox.", resetEmail:"Enter your email above first.", retourAccueil:"Back to home", confirme:"Account created! Check your email to activate it.", errIdent:"Incorrect email or password.", errDeja:"An account already exists with this email.", errCourt:"Password: at least 6 characters.", errEmail:"Invalid email address.", errConfirm:"Please confirm your email first (check your inbox).", errGen:"Something went wrong. Try again.", indispo:"Database connection unavailable.", champs:"Fill in all fields.", ecurie:"Stable", ville:"City", connecteA:"Connected to Hype Universe", patiente:"One moment…" },
    ja: { titre:"アカウント", label:"ライダーアカウント", titreIns:"HYPE へようこそ", titreCon:"おかえりなさい", phraseIns:"プロフィールは Hype のすべてで使えます。", phraseCon:"また会えてうれしいです。", pseudo:"ニックネーム", email:"メール", mdp:"パスワード", creer:"アカウント作成", connecter:"ログイン", dejaCompte:"アカウントをお持ちですか？", pasCompte:"アカウントがまだ？", lienCon:"ログイン", lienIns:"登録する", deconnexion:"ログアウト", mdpOublie:"パスワードをお忘れですか？", resetEnvoye:"再設定メールを送信しました！受信箱をご確認ください。", resetEmail:"まず上にメールアドレスを入力してください。", retourAccueil:"ホームに戻る", confirme:"アカウント作成完了！メールを確認して有効化してください。", errIdent:"メールまたはパスワードが違います。", errDeja:"このメールのアカウントは既に存在します。", errCourt:"パスワードは6文字以上です。", errEmail:"メールアドレスが無効です。", errConfirm:"先にメールを確認して有効化してください。", errGen:"問題が発生しました。もう一度お試しください。", indispo:"データベースに接続できません。", champs:"すべての項目を入力してください。", ecurie:"クラブ", ville:"都市", connecteA:"Hype Universe に接続中", patiente:"少々お待ちください…" },
    es: { titre:"Mi cuenta", label:"CUENTA JINETE", titreIns:"ÚNETE A HYPE", titreCon:"BIENVENIDO DE NUEVO", phraseIns:"Tu perfil te sigue por todo el universo Hype.", phraseCon:"Qué alegría verte de nuevo en la silla.", pseudo:"Apodo", email:"Email", mdp:"Contraseña", creer:"Crear mi cuenta", connecter:"Iniciar sesión", dejaCompte:"¿Ya tienes cuenta?", pasCompte:"¿Aún sin cuenta?", lienCon:"Iniciar sesión", lienIns:"Registrarse", deconnexion:"Cerrar sesión", mdpOublie:"¿Olvidaste tu contraseña?", resetEnvoye:"¡Email de restablecimiento enviado! Revisa tu bandeja.", resetEmail:"Introduce primero tu email arriba.", retourAccueil:"Volver al inicio", confirme:"¡Cuenta creada! Revisa tu email para activarla.", errIdent:"Email o contraseña incorrectos.", errDeja:"Ya existe una cuenta con este email.", errCourt:"Contraseña: mínimo 6 caracteres.", errEmail:"Dirección de email no válida.", errConfirm:"Confirma primero tu email (mira tu bandeja).", errGen:"Algo salió mal. Inténtalo de nuevo.", indispo:"Conexión a la base no disponible.", champs:"Completa todos los campos.", ecurie:"Club", ville:"Ciudad", connecteA:"Conectado a Hype Universe", patiente:"Un momento…" },
    it: { titre:"Il mio account", label:"ACCOUNT CAVALIERE", titreIns:"UNISCITI A HYPE", titreCon:"BENTORNATO", phraseIns:"Il tuo profilo ti segue in tutto l'universo Hype.", phraseCon:"Felici di rivederti in sella.", pseudo:"Nickname", email:"Email", mdp:"Password", creer:"Crea il mio account", connecter:"Accedi", dejaCompte:"Hai già un account?", pasCompte:"Non hai un account?", lienCon:"Accedi", lienIns:"Registrati", deconnexion:"Esci", mdpOublie:"Password dimenticata?", resetEnvoye:"Email di reimpostazione inviata! Controlla la tua casella.", resetEmail:"Inserisci prima la tua email qui sopra.", retourAccueil:"Torna alla home", confirme:"Account creato! Controlla la tua email per attivarlo.", errIdent:"Email o password errati.", errDeja:"Esiste già un account con questa email.", errCourt:"Password: almeno 6 caratteri.", errEmail:"Indirizzo email non valido.", errConfirm:"Conferma prima la tua email (controlla la posta).", errGen:"Qualcosa è andato storto. Riprova.", indispo:"Connessione al database non disponibile.", champs:"Compila tutti i campi.", ecurie:"Club", ville:"Città", connecteA:"Connesso a Hype Universe", patiente:"Un attimo…" },
    de: { titre:"Mein Konto", label:"REITERKONTO", titreIns:"WERDE TEIL VON HYPE", titreCon:"WILLKOMMEN ZURÜCK", phraseIns:"Dein Profil begleitet dich durch das ganze Hype-Universum.", phraseCon:"Schön, dich wieder im Sattel zu sehen.", pseudo:"Benutzername", email:"E-Mail", mdp:"Passwort", creer:"Konto erstellen", connecter:"Anmelden", dejaCompte:"Schon ein Konto?", pasCompte:"Noch kein Konto?", lienCon:"Anmelden", lienIns:"Registrieren", deconnexion:"Abmelden", mdpOublie:"Passwort vergessen?", resetEnvoye:"E-Mail zum Zurücksetzen verschickt! Sieh in deinem Postfach nach.", resetEmail:"Gib zuerst oben deine E-Mail-Adresse ein.", retourAccueil:"Zurück zur Startseite", confirme:"Konto erstellt! Prüfe deine E-Mails, um es zu aktivieren.", errIdent:"E-Mail oder Passwort ist falsch.", errDeja:"Mit dieser E-Mail-Adresse besteht bereits ein Konto.", errCourt:"Passwort: mindestens 6 Zeichen.", errEmail:"Ungültige E-Mail-Adresse.", errConfirm:"Bestätige zuerst deine E-Mail-Adresse (sieh in deinem Postfach nach).", errGen:"Es ist ein Problem aufgetreten. Versuche es erneut.", indispo:"Verbindung zur Datenbank nicht verfügbar.", champs:"Fülle alle Felder aus.", ecurie:"Stall", ville:"Ort", connecteA:"Mit Hype Universe verbunden", patiente:"Einen Moment…" }, ar: { titre:"\u062d\u0633\u0627\u0628\u064a", label:"\u062d\u0633\u0627\u0628 \u0627\u0644\u0641\u0627\u0631\u0633\u0629", titreIns:"\u0627\u0646\u0636\u0645\u064a \u0625\u0644\u0649 HYPE", titreCon:"\u0645\u0631\u062d\u0628\u0627 \u0628\u0639\u0648\u062f\u062a\u0643", phraseIns:"\u064a\u0631\u0627\u0641\u0642\u0643 \u0645\u0644\u0641\u0643 \u0641\u064a \u0643\u0644 \u0639\u0627\u0644\u0645 Hype.", phraseCon:"\u0633\u0639\u064a\u062f\u0648\u0646 \u0628\u0631\u0624\u064a\u062a\u0643 \u0639\u0644\u0649 \u0627\u0644\u0633\u0631\u062c \u0645\u0646 \u062c\u062f\u064a\u062f.", pseudo:"\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645", email:"\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a", mdp:"\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631", creer:"\u0625\u0646\u0634\u0627\u0621 \u062d\u0633\u0627\u0628\u064a", connecter:"\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644", dejaCompte:"\u0644\u062f\u064a\u0643 \u062d\u0633\u0627\u0628 \u0628\u0627\u0644\u0641\u0639\u0644\u061f", pasCompte:"\u0644\u064a\u0633 \u0644\u062f\u064a\u0643 \u062d\u0633\u0627\u0628 \u0628\u0639\u062f\u061f", lienCon:"\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644", lienIns:"\u0627\u0644\u062a\u0633\u062c\u064a\u0644", deconnexion:"\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c", mdpOublie:"\u0646\u0633\u064a\u062a \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631\u061f", resetEnvoye:"\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0628\u0631\u064a\u062f \u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u062a\u0639\u064a\u064a\u0646! \u062a\u0641\u0642\u062f\u064a \u0635\u0646\u062f\u0648\u0642 \u0628\u0631\u064a\u062f\u0643.", resetEmail:"\u0623\u062f\u062e\u0644\u064a \u0628\u0631\u064a\u062f\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0623\u0639\u0644\u0627\u0647 \u0623\u0648\u0644\u0627.", retourAccueil:"\u0627\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u0627\u0644\u0635\u0641\u062d\u0629 \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629", confirme:"\u062a\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062d\u0633\u0627\u0628! \u062a\u0641\u0642\u062f\u064a \u0628\u0631\u064a\u062f\u0643 \u0644\u062a\u0641\u0639\u064a\u0644 \u062d\u0633\u0627\u0628\u0643.", errIdent:"\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0623\u0648 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u063a\u064a\u0631 \u0635\u062d\u064a\u062d\u0629.", errDeja:"\u064a\u0648\u062c\u062f \u062d\u0633\u0627\u0628 \u0628\u0647\u0630\u0627 \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0628\u0627\u0644\u0641\u0639\u0644.", errCourt:"\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631: 6 \u0623\u062d\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644.", errEmail:"\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u063a\u064a\u0631 \u0635\u0627\u0644\u062d.", errConfirm:"\u0623\u0643\u062f\u064a \u0628\u0631\u064a\u062f\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0623\u0648\u0644\u0627 (\u062a\u0641\u0642\u062f\u064a \u0635\u0646\u062f\u0648\u0642 \u0628\u0631\u064a\u062f\u0643).", errGen:"\u062d\u062f\u062b\u062a \u0645\u0634\u0643\u0644\u0629. \u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629.", indispo:"\u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0628\u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u063a\u064a\u0631 \u0645\u062a\u0627\u062d.", champs:"\u0627\u0645\u0644\u0626\u064a \u0643\u0644 \u0627\u0644\u062d\u0642\u0648\u0644.", ecurie:"\u0627\u0644\u0625\u0633\u0637\u0628\u0644", ville:"\u0627\u0644\u0645\u062f\u064a\u0646\u0629", connecteA:"\u0645\u062a\u0635\u0644\u0629 \u0628\u0640 Hype Universe", patiente:"\u0644\u062d\u0638\u0629\u2026" }, zh: {titre:"我的账户", label:"骑手账户", titreIns:"加入 HYPE", titreCon:"欢迎回来", phraseIns:"你的个人主页会陪你走遍整个 Hype 世界。", phraseCon:"很高兴再次见到在马背上的你。", pseudo:"昵称", email:"邮箱", mdp:"密码", creer:"创建我的账户", connecter:"登录", dejaCompte:"已有账户？", pasCompte:"还没有账户？", lienCon:"登录", lienIns:"注册", deconnexion:"退出登录", mdpOublie:"忘记密码？", resetEnvoye:"重置邮件已发送！去邮箱里看看吧。", resetEmail:"请先在上方输入你的邮箱。", retourAccueil:"回到首页", confirme:"账户已创建！请查收邮件以激活账户。", errIdent:"邮箱或密码不正确。", errDeja:"这个邮箱已经有账户了。", errCourt:"密码：至少 6 个字符。", errEmail:"邮箱地址无效。", errConfirm:"请先确认你的邮箱（查看收件箱）。", errGen:"出了点问题，请再试一次。", indispo:"无法连接数据库。", champs:"请填写所有栏目。", ecurie:"马厩", ville:"城市", connecteA:"已连接 Hype Universe", patiente:"请稍等…"}, nl: {titre:"Mijn account", label:"RUITERACCOUNT", titreIns:"WORD LID VAN HYPE", titreCon:"WELKOM TERUG", phraseIns:"Je profiel volgt je overal in het Hype-universum.", phraseCon:"Fijn om je weer in het zadel te zien.", pseudo:"Gebruikersnaam", email:"E-mail", mdp:"Wachtwoord", creer:"Mijn account aanmaken", connecter:"Inloggen", dejaCompte:"Heb je al een account?", pasCompte:"Nog geen account?", lienCon:"Inloggen", lienIns:"Registreren", deconnexion:"Uitloggen", mdpOublie:"Wachtwoord vergeten?", resetEnvoye:"E-mail om je wachtwoord opnieuw in te stellen verstuurd! Kijk in je mailbox.", resetEmail:"Vul eerst hierboven je e-mailadres in.", retourAccueil:"Terug naar home", confirme:"Account aangemaakt! Controleer je e-mail om je account te activeren.", errIdent:"E-mailadres of wachtwoord is onjuist.", errDeja:"Er bestaat al een account met dit e-mailadres.", errCourt:"Wachtwoord: minimaal 6 tekens.", errEmail:"Ongeldig e-mailadres.", errConfirm:"Bevestig eerst je e-mail (kijk in je inbox).", errGen:"Er is iets misgegaan. Probeer het opnieuw.", indispo:"Databaseverbinding niet beschikbaar.", champs:"Vul alle velden in.", ecurie:"Stal", ville:"Stad", connecteA:"Verbonden met Hype Universe", patiente:"Een momentje…"}, pt: {titre:"Minha conta", label:"CONTA DE CAVALEIRO", titreIns:"ENTRE NO HYPE", titreCon:"BOAS-VINDAS DE VOLTA", phraseIns:"Seu perfil acompanha você por todo o universo Hype.", phraseCon:"Que bom te ver de volta na sela.", pseudo:"Apelido", email:"E-mail", mdp:"Senha", creer:"Criar minha conta", connecter:"Entrar", dejaCompte:"Já tem uma conta?", pasCompte:"Ainda não tem conta?", lienCon:"Entrar", lienIns:"Cadastrar-se", deconnexion:"Sair", mdpOublie:"Esqueceu a senha?", resetEnvoye:"E-mail de redefinição enviado! Olhe a sua caixa de entrada.", resetEmail:"Digite primeiro o seu e-mail acima.", retourAccueil:"Voltar ao início", confirme:"Conta criada! Confira seu e-mail para ativá-la.", errIdent:"E-mail ou senha incorretos.", errDeja:"Já existe uma conta com este e-mail.", errCourt:"Senha: mínimo de 6 caracteres.", errEmail:"Endereço de e-mail inválido.", errConfirm:"Confirme primeiro seu e-mail (olhe sua caixa de entrada).", errGen:"Algo deu errado. Tente de novo.", indispo:"Conexão com o banco de dados indisponível.", champs:"Preencha todos os campos.", ecurie:"Cocheira", ville:"Cidade", connecteA:"Conectado ao Hype Universe", patiente:"Só um instante…"}, sv: {titre:"Mitt konto", label:"RYTTARKONTO", titreIns:"GÅ MED I HYPE", titreCon:"VÄLKOMMEN TILLBAKA", phraseIns:"Din profil följer med dig i hela Hype-universum.", phraseCon:"Kul att se dig tillbaka i sadeln.", pseudo:"Användarnamn", email:"E-post", mdp:"Lösenord", creer:"Skapa mitt konto", connecter:"Logga in", dejaCompte:"Har du redan ett konto?", pasCompte:"Inget konto ännu?", lienCon:"Logga in", lienIns:"Registrera dig", deconnexion:"Logga ut", mdpOublie:"Glömt lösenordet?", resetEnvoye:"E-post för återställning skickad! Kolla din inkorg.", resetEmail:"Ange först din e-postadress ovan.", retourAccueil:"Tillbaka till startsidan", confirme:"Kontot är skapat! Kolla din e-post för att aktivera kontot.", errIdent:"Fel e-postadress eller lösenord.", errDeja:"Det finns redan ett konto med den här e-postadressen.", errCourt:"Lösenord: minst 6 tecken.", errEmail:"Ogiltig e-postadress.", errConfirm:"Bekräfta först din e-postadress (kolla din inkorg).", errGen:"Något gick fel. Försök igen.", indispo:"Anslutningen till databasen är inte tillgänglig.", champs:"Fyll i alla fält.", ecurie:"Stall", ville:"Ort", connecteA:"Ansluten till Hype Universe", patiente:"Ett ögonblick…"}, ru: {titre:"Мой аккаунт", label:"АККАУНТ ВСАДНИКА", titreIns:"ПРИСОЕДИНЯЙСЯ К HYPE", titreCon:"С ВОЗВРАЩЕНИЕМ", phraseIns:"Твой профиль следует за тобой по всей вселенной Hype.", phraseCon:"Рады снова видеть тебя в седле.", pseudo:"Ник", email:"Email", mdp:"Пароль", creer:"Создать аккаунт", connecter:"Войти", dejaCompte:"Уже есть аккаунт?", pasCompte:"Ещё нет аккаунта?", lienCon:"Войти", lienIns:"Зарегистрироваться", deconnexion:"Выйти", mdpOublie:"Забыла пароль?", resetEnvoye:"Письмо для сброса отправлено! Загляни в почту.", resetEmail:"Сначала введи свой email выше.", retourAccueil:"Вернуться на главную", confirme:"Аккаунт создан! Проверь почту, чтобы активировать его.", errIdent:"Неверный email или пароль.", errDeja:"Аккаунт с таким email уже существует.", errCourt:"Пароль: минимум 6 символов.", errEmail:"Недействительный адрес email.", errConfirm:"Сначала подтверди email (загляни в почту).", errGen:"Что-то пошло не так. Попробуй ещё раз.", indispo:"Соединение с базой недоступно.", champs:"Заполни все поля.", ecurie:"Конюшня", ville:"Город", connecteA:"Подключено к Hype Universe", patiente:"Минутку…"}, pl: {titre:"Moje konto", label:"KONTO JEŹDŹCA", titreIns:"DOŁĄCZ DO HYPE", titreCon:"WITAJ Z POWROTEM", phraseIns:"Twój profil podąża za tobą po całym uniwersum Hype.", phraseCon:"Miło znów widzieć cię w siodle.", pseudo:"Pseudonim", email:"E-mail", mdp:"Hasło", creer:"Załóż konto", connecter:"Zaloguj się", dejaCompte:"Masz już konto?", pasCompte:"Nie masz jeszcze konta?", lienCon:"Zaloguj się", lienIns:"Zarejestruj się", deconnexion:"Wyloguj się", mdpOublie:"Zapomniałaś hasła?", resetEnvoye:"E-mail do zresetowania hasła wysłany! Zajrzyj do skrzynki pocztowej.", resetEmail:"Najpierw wpisz swój e-mail powyżej.", retourAccueil:"Wróć do strony głównej", confirme:"Konto utworzone! Sprawdź swoją pocztę, aby je aktywować.", errIdent:"Nieprawidłowy e-mail lub hasło.", errDeja:"Konto z tym adresem e-mail już istnieje.", errCourt:"Hasło: minimum 6 znaków.", errEmail:"Nieprawidłowy adres e-mail.", errConfirm:"Najpierw potwierdź swój adres e-mail (zajrzyj do skrzynki).", errGen:"Coś poszło nie tak. Spróbuj ponownie.", indispo:"Połączenie z bazą jest niedostępne.", champs:"Wypełnij wszystkie pola.", ecurie:"Stajnia", ville:"Miasto", connecteA:"Połączono z Hype Universe", patiente:"Chwileczkę…"}, ko: {titre:"내 계정", label:"기수 계정", titreIns:"Hype 가입하기", titreCon:"다시 만나서 반가워요", phraseIns:"내 프로필은 Hype 세상 어디서나 함께해요.", phraseCon:"안장 위에서 다시 만나서 반가워요.", pseudo:"닉네임", email:"이메일", mdp:"비밀번호", creer:"계정 만들기", connecter:"로그인", dejaCompte:"이미 계정이 있나요?", pasCompte:"아직 계정이 없나요?", lienCon:"로그인", lienIns:"가입하기", deconnexion:"로그아웃", mdpOublie:"비밀번호를 잊으셨나요?", resetEnvoye:"재설정 이메일을 보냈어요! 메일함을 확인해 보세요.", resetEmail:"먼저 위에 이메일을 입력해 주세요.", retourAccueil:"홈으로 돌아가기", confirme:"계정이 만들어졌어요! 이메일을 확인하고 계정을 활성화하세요.", errIdent:"이메일 또는 비밀번호가 올바르지 않아요.", errDeja:"이 이메일로 만든 계정이 이미 있어요.", errCourt:"비밀번호는 6자 이상이어야 해요.", errEmail:"이메일 주소가 올바르지 않아요.", errConfirm:"먼저 이메일을 확인해 주세요 (메일함을 살펴보세요).", errGen:"문제가 생겼어요. 다시 시도해 주세요.", indispo:"데이터베이스에 연결할 수 없어요.", champs:"모든 항목을 입력하세요.", ecurie:"마구간", ville:"도시", connecteA:"Hype Universe에 연결됨", patiente:"잠시만요…"}
  };
  var T = DICT[langue] || DICT.fr;

  var dispo = (typeof utilisateurActuel === "function" && typeof supa !== "undefined");

  var stU = useState(undefined); var user = stU[0], setUser = stU[1];           /* undefined = chargement */
  var stP = useState(null);      var profil = stP[0], setProfil = stP[1];
  var stMo = useState("inscription"); var mode = stMo[0], setMode = stMo[1];
  var stE = useState("");  var email = stE[0], setEmail = stE[1];
  var stM = useState("");  var mdp = stM[0], setMdp = stM[1];
  var stPs = useState(""); var pseudo = stPs[0], setPseudo = stPs[1];
  var stMsg = useState(null); var msg = stMsg[0], setMsg = stMsg[1];            /* { t:"err"|"ok", x:"…" } */
  var stB = useState(false); var busy = stB[0], setBusy = stB[1];
  var stV = useState(false); var voirMdp = stV[0], setVoirMdp = stV[1];
  /* 18/08 — L IDENTIFIANT SE CHANGE ICI ET NULLE PART AILLEURS.
     Decision de Blandine : « l'identifiant c'est plutot sur le compte qu'on
     le change ». La page Cavalier reste une vitrine, Mon compte est l atelier.
     `hEtape` : "" (ferme) | "saisie" | "confirme". L ecran de confirmation
     montre l avant et l apres en toutes lettres — une fois valide, le
     changement gratuit est consomme, meme si on regrette la seconde d apres. */
  var stH  = useState("");    var hEtape = stH[0], setHEtape = stH[1];
  var stHv = useState("");    var hSaisie = stHv[0], setHSaisie = stHv[1];
  var stHm = useState(null);  var hMsg = stHm[0], setHMsg = stHm[1];
  var stHb = useState(false); var hOccupe = stHb[0], setHOccupe = stHb[1];

  /* 22/08 — LES CHEVAUX QUI ATTENDENT A LA PORTE.
     Supprimer un cheval ne l efface plus : il patiente en base. Cette carte
     est le SEUL endroit de l app ou il reste visible, et le seul moyen de le
     faire rentrer. Elle n existe que s il y a quelqu un a la porte. */
  var stCS = useState([]);    var chSuppr = stCS[0], setChSuppr = stCS[1];
  var stCSb = useState(null); var chOccupe = stCSb[0], setChOccupe = stCSb[1];  /* id en cours */
  var stCSr = useState(null); var chRentre = stCSr[0], setChRentre = stCSr[1];  /* {id,nom} */
  var stCSe = useState(null); var chErr = stCSe[0], setChErr = stCSe[1];
  var stCSp = useState(false); var chPlein = stCSp[0], setChPlein = stCSp[1];  /* 22/08 : la place du plan gratuit est prise */

  useEffect(function () {
    if (!dispo) { setUser(null); return; }
    var actif = true;
    utilisateurActuel().then(function (u) { if (actif) setUser(u); }).catch(function () { if (actif) setUser(null); });
    var abo = null;
    try { abo = surChangementConnexion(function (u) { if (actif) setUser(u); }); } catch (e) {}
    return function () {
      actif = false;
      try { if (abo && abo.data && abo.data.subscription) abo.data.subscription.unsubscribe(); } catch (e) {}
    };
  }, []);

  useEffect(function () {
    if (!user || !dispo || typeof mesChevauxSupprimes !== "function") { setChSuppr([]); return; }
    var actif = true;
    mesChevauxSupprimes().then(function (r) {
      if (actif && r && r.data) setChSuppr(r.data);
    }).catch(function () { });
    return function () { actif = false; };
  }, [user]);

  useEffect(function () {
    if (!user || !dispo) { setProfil(null); return; }
    var actif = true;
    monProfil().then(function (r) { if (actif && r && r.data) setProfil(r.data); }).catch(function () {});
    return function () { actif = false; };
  }, [user && user.id]);

  function traduireErreur(err) {
    var m = String((err && err.message) || err || "").toLowerCase();
    if (m.indexOf("invalid login") >= 0) return T.errIdent;
    if (m.indexOf("already registered") >= 0 || m.indexOf("already exists") >= 0) return T.errDeja;
    if (m.indexOf("at least 6") >= 0 || m.indexOf("password should") >= 0) return T.errCourt;
    if (m.indexOf("valid email") >= 0 || m.indexOf("invalid format") >= 0 || m.indexOf("unable to validate email") >= 0) return T.errEmail;
    if (m.indexOf("not confirmed") >= 0) return T.errConfirm;
    return T.errGen;
  }

  function envoyerReset() {
    if (busy || !dispo) return;
    var em = email.trim();
    if (!em) { setMsg({ t: "err", x: T.resetEmail }); return; }
    setBusy(true); setMsg(null);
    var dest = (typeof LIEN_APP !== "undefined" && LIEN_APP) ? LIEN_APP : window.location.origin;
    supa.auth.resetPasswordForEmail(em, { redirectTo: dest })
      .then(function () { setBusy(false); setMsg({ t: "ok", x: T.resetEnvoye }); })
      .catch(function () { setBusy(false); setMsg({ t: "ok", x: T.resetEnvoye }); });
  }
  function envoyer() {
    if (busy || !dispo) return;
    var em = email.trim(), pw = mdp;
    if (!em || !pw || (mode === "inscription" && !pseudo.trim())) { setMsg({ t: "err", x: T.champs }); return; }
    setMsg(null); setBusy(true);
    var promesse = (mode === "inscription") ? inscription(em, pw, pseudo.trim()) : connexion(em, pw);
    promesse.then(function (res) {
      setBusy(false);
      if (res && res.error) { setMsg({ t: "err", x: traduireErreur(res.error) }); return; }
      if (mode === "inscription" && res && res.data && !res.data.session) {
        setMsg({ t: "ok", x: T.confirme }); setMode("connexion"); setMdp(""); return;
      }
      setMdp("");
    }).catch(function () { setBusy(false); setMsg({ t: "err", x: T.errGen }); });
  }

  function sortir() {
    /* 22/08 session 152 — LA DÉCONNEXION NE SE VOYAIT PAS.
       signOut() fermait bien la session cote Supabase, mais rien ici ne
       remettait l ecran a zero : le profil, le pseudo et l etat
       « connectee » restaient affiches. Une abonnee a cru pendant une
       journee entiere qu elle ne pouvait pas se deconnecter. Elle a alors
       saisi les identifiants de son AUTRE compte : l app a d abord refuse,
       puis l a « reconnectee » sur la session encore ouverte. Elle croyait
       avoir change de compte sans avoir jamais bouge.
       ⚠️ Le `!dispo` bloquait AUSSI le bouton en silence.
       On vide donc l etat local ET on renvoie sur l ecran d entree.    */
    if (busy) return;
    setBusy(true);
    setMsg(null);
    function finir() {
      try { setUser(null); } catch (e1) { }
      try { setProfil(null); } catch (e2) { }
      try { if (typeof setProfilApp === "function") setProfilApp(null); } catch (e3) { }
      try { if (typeof setChSuppr === "function") setChSuppr([]); } catch (e4) { }
      setBusy(false);
      try {
        /* 28/08 (demande Blandine) : « a chaque fois qu'on est deco on se retape
           tout le bordel » -- cette deconnexion forcait le mode "seuil" (choix
           neutre Se connecter / Creer un compte), d'ou le risque de retomber sur
           le formulaire d'inscription (qui redemande le prenom) au lieu du
           formulaire de connexion. Meme mode "connexion" que l'eviction
           multi-appareil (ligne ~21993). */
        if (typeof AUTH_MODE_SPECTRAL !== "undefined") AUTH_MODE_SPECTRAL = "connexion";
        setEcran("connexion");
      } catch (e5) { }
    }
    /* 22/08 : Mon compte passe desormais par la MEME porte que les deux autres. */
    if (!dispo) { finir(); return; }
    hypeSeDeconnecter([]).then(finir).catch(finir);
  }

  var stIn = { width: "100%", boxSizing: "border-box", background: "rgba(13,20,28,0.6)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "14px 16px", color: COLORS.blanc, fontSize: 16, outline: "none", fontFamily: "inherit" };
  var stBtn = { width: "100%", padding: "15px", borderRadius: 999, background: "rgba(201,166,107,0.222)", border: "1px solid rgba(201,166,107,0.82)", color: "#C9A66B", fontWeight: 700, fontSize: 15, letterSpacing: 0.4, cursor: "pointer", opacity: busy ? 0.55 : 1 };

  function champ(props) { return React.createElement("input", Object.assign({ style: stIn }, props)); }

  var corps;
  if (!dispo) {
    corps = React.createElement("div", { style: { textAlign: "center", padding: "60px 10px", color: COLORS.grisDoux, fontSize: 14 } }, T.indispo);
  } else if (user === undefined) {
    corps = React.createElement("div", { style: { textAlign: "center", padding: "60px 10px", color: COLORS.grisDoux, fontSize: 14 } }, T.patiente);
  } else if (user) {
    var nom = (profil && profil.pseudo) || (user.user_metadata && user.user_metadata.pseudo) || "";
    var initiale = (nom || user.email || "?").charAt(0).toUpperCase();
    corps = React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6, paddingTop: 26 } },
      React.createElement("div", { style: { width: 86, height: 86, borderRadius: "50%", background: "rgba(201,166,107,0.185)", border: "1px solid rgba(201,166,107,0.82)", boxShadow: "0 0 34px rgba(201,166,107,0.407)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cinzel', serif", fontSize: 34, color: "#C9A66B", marginBottom: 10 } }, initiale),
      nom ? React.createElement("div", { style: { fontFamily: "'Cinzel', serif", fontSize: 26, fontWeight: 600, letterSpacing: 1.5, color: COLORS.blanc, textAlign: "center" } }, nom) : null,
      React.createElement("div", { style: { fontSize: 13, color: COLORS.grisDoux } }, user.email || ""),
      /* 18/08 : l identifiant unique et son acces au changement. Ne s affiche
         que s il existe — un compte charge avant le passage du SQL n a pas la
         colonne, et il ne doit alors rien se passer plutot qu un « @undefined ». */
      (function () {
        var txtH = "";
        try { txtH = (typeof hypeHandleTexte === "function") ? hypeHandleTexte(profil || {}) : ""; } catch (eH) { }
        if (!txtH) return null;
        return React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 4 } },
          React.createElement("span", { style: { fontSize: 13.5, color: COLORS.blanc, fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.02em" } }, txtH),
          React.createElement("button", { onClick: function () { setHSaisie(String((profil && profil.handle) || "")); setHMsg(null); setHEtape("saisie"); }, style: { background: "none", border: "1px solid rgba(201,166,107,0.4)", borderRadius: 999, color: "#C9A66B", fontSize: 11, fontWeight: 700, padding: "4px 11px", cursor: "pointer", fontFamily: "'Montserrat', sans-serif" } },
            tr({ fr: "Modifier", en: "Change", es: "Cambiar", it: "Modifica", ja: "\u5909\u66f4", de: "\u00c4ndern", ar: "\u062a\u0639\u062f\u064a\u0644", zh: "修改", nl: "Bewerken", pt: "Editar", sv: "Redigera", ru: "Изменить", pl: "Edytuj", ko: "수정" })));
      })(),
      /* 18/08 — « le nombre d'ecrans avec le meme compte ». `ctx.appareils`
         est null tant que le signalement n a pas repondu : on n affiche RIEN
         plutot qu'un chiffre invente. */
      (function () {
        var ap = ctx && ctx.appareils;
        if (!ap) return null;
        var txt = ap.exempt
          ? tr({ fr: "Appareils illimités", en: "Unlimited devices", es: "Dispositivos ilimitados", it: "Dispositivi illimitati", ja: "\u30c7\u30d0\u30a4\u30c9\u5236\u9650\u306a\u3057", de: "Unbegrenzte Ger\u00e4te", ar: "\u0623\u062c\u0647\u0632\u0629 \u063a\u064a\u0631 \u0645\u062d\u062f\u0648\u062f\u0629", zh: "设备数量不限", nl: "Onbeperkt aantal apparaten", pt: "Dispositivos ilimitados", sv: "Obegränsat antal enheter", ru: "Неограниченное число устройств", pl: "Nieograniczona liczba urządzeń", ko: "기기 무제한" })
          : tr({ fr: "Connecté sur", en: "Connected on", es: "Conectado en", it: "Connesso su", ja: "\u63a5\u7d9a\u4e2d\uff1a", de: "Verbunden auf", ar: "\u0645\u062a\u0635\u0644 \u0639\u0644\u0649", zh: "已登录于", nl: "Verbonden op", pt: "Conectado em", sv: "Inloggad på", ru: "Вход выполнен на", pl: "Zalogowano na", ko: "연결된 기기 수: " }) + " " + ap.places + "/" + ap.limite + " " + tr({ fr: "appareils", en: "devices", es: "dispositivos", it: "dispositivi", ja: "\u30c7\u30d0\u30a4\u30c9", de: "Ger\u00e4te", ar: "\u0623\u062c\u0647\u0632\u0629", zh: "台设备", nl: "apparaten", pt: "dispositivos", sv: "enheter", ru: "устройствах", pl: "urządzeniach", ko: "대" });
        return React.createElement("div", { style: { textAlign: "center", fontSize: 11, color: "#7A838D", marginTop: 6, fontFamily: "'Montserrat', sans-serif" } }, txt);
      })(),
      (profil && profil.ecurie) ? React.createElement("div", { style: { fontSize: 13, color: COLORS.grisDoux, marginTop: 2 } }, T.ecurie + " · " + profil.ecurie) : null,
      (profil && profil.ville) ? React.createElement("div", { style: { fontSize: 13, color: COLORS.grisDoux } }, T.ville + " · " + profil.ville) : null,
      React.createElement("div", { style: { fontSize: 11.5, letterSpacing: 2, textTransform: "uppercase", color: "#C9A66B", marginTop: 16 } }, "\u2713 " + T.connecteA),
      (profilApp && profilApp.estPro) ? React.createElement("div", { style: { marginTop: 14, fontSize: 12, fontWeight: 700, color: "#F0D48A" } }, "\uD83C\uDF93 " + tr({ fr: "Statut professionnel vérifié", en: "Verified professional status", es: "Estado profesional verificado", it: "Stato professionale verificato", de: "Profi-Status verifiziert", ja: "プロ資格確認済み", ar: "\u062a\u0645 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u0635\u0641\u0629 \u0627\u0644\u0645\u0647\u0646\u064a\u0629", zh: "专业身份已验证", nl: "Geverifieerde professionele status", pt: "Status profissional verificado", sv: "Verifierad yrkesstatus", ru: "Профессиональный статус подтверждён", pl: "Status profesjonalisty zweryfikowany", ko: "프로 자격 확인됨" })) :
      (profilApp && profilApp.demandePro) ? React.createElement("div", { style: { marginTop: 14, fontSize: 12, color: COLORS.grisDoux } }, tr({ fr: "Demande professionnelle en attente de vérification", en: "Professional request awaiting verification", es: "Solicitud profesional pendiente de verificación", it: "Richiesta professionale in attesa di verifica", de: "Profi-Anfrage wird geprüft", ja: "プロ申請、確認待ち", ar: "\u0637\u0644\u0628 \u0645\u0647\u0646\u064a \u0628\u0627\u0646\u062a\u0638\u0627\u0631 \u0627\u0644\u062a\u062d\u0642\u0642", zh: "专业身份申请等待审核中", nl: "Professionele aanvraag wacht op verificatie", pt: "Solicitação profissional aguardando verificação", sv: "Yrkesansökan väntar på verifiering", ru: "Профессиональная заявка ожидает проверки", pl: "Wniosek o status profesjonalisty oczekuje na weryfikację", ko: "프로 신청 확인 대기 중" })) :
      React.createElement("button", { onClick: function () {
              var nomClub = window.prompt(tr({ fr: "Nom de ton école/club d'équitation :", en: "Name of your riding school/club:", es: "Nombre de tu escuela/club hípico:", it: "Nome della tua scuola/club ippico:", de: "Name deiner Reitschule/deines Vereins:", ja: "乗馬クラブ・学校名：", ar: "\u0627\u0633\u0645 \u0645\u062f\u0631\u0633\u062a\u0643 \u0623\u0648 \u0646\u0627\u062f\u064a\u0643 \u0644\u0644\u0641\u0631\u0648\u0633\u064a\u0629:", zh: "你的马术学校/俱乐部名称：", nl: "Naam van je rijschool/manege:", pt: "Nome da sua escola/clube de equitação:", sv: "Namnet på din ridskola/ridklubb:", ru: "Название твоей конноспортивной школы/клуба:", pl: "Nazwa twojej szkoły jazdy / klubu jeździeckiego:", ko: "다니는 승마 학교/클럽 이름:" }));
              if (!nomClub) return;
              try { setProfilApp(Object.assign({}, profilApp, { demandePro: true, estPro: HYPE_PRO_AUTODEBLOQUE, demandeProInfos: { nom: nomClub, date: new Date().toISOString() } })); } catch (e) {}
              try { window.hypeOuvrirLien("mailto:feinn@live.fr?subject=" + encodeURIComponent("Demande Hype Pro - " + nomClub) + "&body=" + encodeURIComponent("Structure : " + nomClub + "\nCavalier : " + nom)); } catch (e) {}
          }, style: { marginTop: 14, background: "none", border: "1px solid rgba(201,164,74,0.55)", color: "#F0D48A", fontSize: 12, fontWeight: 700, padding: "8px 16px", borderRadius: 999, cursor: "pointer" } }, "\uD83C\uDF93 " + tr({ fr: "Je suis professionnel ou enseignant", en: "I'm a professional or instructor", es: "Soy profesional o profesor", it: "Sono un professionista o istruttore", de: "Ich bin Profi oder Ausbilder", ja: "プロ・指導者です", ar: "\u0623\u0646\u0627 \u0645\u0647\u0646\u064a\u0629 \u0623\u0648 \u0645\u062f\u0631\u0628\u0629", zh: "我是专业人士或教师", nl: "Ik ben professional of instructeur", pt: "Sou profissional ou instrutor", sv: "Jag är yrkesperson eller ridlärare", ru: "Я профессионал или преподаватель", pl: "Jestem profesjonalistą lub instruktorem", ko: "저는 프로 또는 강사예요" })),
      React.createElement("button", { onClick: function () { setEcran("dashboard"); }, style: { marginTop: 28, padding: "13px 34px", borderRadius: 999, background: "linear-gradient(165deg, rgba(55,107,125,0.42) 0%, rgba(16,26,29,0.78) 55%, rgba(6,7,9,0.85) 100%)", border: "1px solid rgba(201,166,107,0.45)", boxShadow: "0 8px 18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(243,238,228,0.08)", color: "#F3EEE4", fontSize: 14.5, fontWeight: 700, cursor: "pointer" } }, T.retourAccueil),
      React.createElement("button", { onClick: sortir, style: { marginTop: 12, padding: "12px 30px", borderRadius: 999, background: "none", border: "1px solid rgba(255,255,255,0.18)", color: COLORS.grisDoux, fontSize: 13.5, fontWeight: 600, cursor: "pointer", opacity: busy ? 0.55 : 1 } }, T.deconnexion),

      /* ═══════════════════════════════════════════════════════════════════
         22/08 — LA PORTE DE L ECURIE.
         Supprimer un cheval ne l efface plus. Il attend ici, et nulle part
         ailleurs : c est le seul endroit de l app ou il reste visible.
         La carte n existe QUE s il y a quelqu un a la porte — sinon elle
         inquieterait pour rien. Rien n est jamais purge derriere : ni les
         resultats, ni les albums, ni les photos.
         Le mot sur la prochaine fois n arrive qu APRES le clic, au moment
         du soulagement — decision de Blandine du 22/08.
         ═══════════════════════════════════════════════════════════════════ */
      (chSuppr && chSuppr.length) ? React.createElement("div", { style: { width: "100%", maxWidth: 340, marginTop: 26, borderRadius: 22, padding: "22px 18px 18px", background: "linear-gradient(168deg, rgba(20,24,28,0.96), rgba(9,11,14,0.99))", border: "1px solid rgba(232,200,135,0.20)", boxShadow: "0 18px 46px rgba(0,0,0,0.6)" } },
        React.createElement("div", { style: { fontSize: 9, fontWeight: 700, letterSpacing: "0.34em", textTransform: "uppercase", color: "#E8C887", textAlign: "center", opacity: 0.9, fontFamily: "'Montserrat', sans-serif" } },
          tr({ fr: "\u00c0 la porte de l'\u00e9curie", en: "At the stable gate", es: "A la puerta de la cuadra", it: "Alla porta della scuderia", ja: "\u53a9\u820e\u306e\u9580\u306e\u305d\u3070\u3067", de: "Am Stalltor", ar: "\u0639\u0646\u062f \u0628\u0627\u0628 \u0627\u0644\u0625\u0633\u0637\u0628\u0644", zh: "在马厩门口", nl: "Bij de staldeur", pt: "No portão da cocheira", sv: "Vid stallporten", ru: "У ворот конюшни", pl: "Przed drzwiami stajni", ko: "마구간 문 앞에서" })),
        React.createElement("div", { style: { fontFamily: "'Cinzel', serif", fontSize: 19, fontWeight: 600, letterSpacing: 1.1, textAlign: "center", marginTop: 10, color: "#F7FAFC" } },
          (chSuppr.length > 1)
            ? tr({ fr: "Ils t'attendent", en: "They're waiting for you", es: "Te esperan", it: "Ti aspettano", ja: "\u5f85\u3063\u3066\u3044\u307e\u3059", de: "Sie warten auf dich", ar: "\u0625\u0646\u0647\u0645 \u064a\u0646\u062a\u0638\u0631\u0648\u0646\u0643", zh: "它们在等你", nl: "Ze wachten op je", pt: "Eles estão esperando por você", sv: "De väntar på dig", ru: "Они ждут тебя", pl: "Czekają na ciebie", ko: "아이들이 기다리고 있어요" })
            : tr({ fr: "Il t'attend", en: "He's waiting for you", es: "Te espera", it: "Ti aspetta", ja: "\u5f85\u3063\u3066\u3044\u307e\u3059", de: "Er wartet auf dich", ar: "\u0625\u0646\u0647 \u064a\u0646\u062a\u0638\u0631\u0643", zh: "它在等你", nl: "Hij wacht op je", pt: "Ele está esperando por você", sv: "Han väntar på dig", ru: "Он ждёт тебя", pl: "Czeka na ciebie", ko: "그 아이가 기다리고 있어요" })),

        chSuppr.map(function (ch, iCh) {
          var nomC = (ch && ch.nom) || "";
          var petit = String(nomC).trim().split(/\s+/)[0] || nomC;
          var rentre = chRentre && chRentre.id === ch.id;
          return React.createElement("div", { key: ch.id, style: { marginTop: iCh ? 22 : 22, paddingTop: iCh ? 20 : 0, borderTop: iCh ? "1px solid rgba(255,255,255,0.055)" : "none" } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 13 } },
              /* photo BRUTE : aucun filtre, aucun voile — regle absolue */
              React.createElement("div", { style: { width: 48, height: 48, borderRadius: "50%", flex: "none", overflow: "hidden", background: "#181C20", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" } },
                ch.photo_url
                  ? React.createElement("img", { src: ch.photo_url, alt: nomC, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
                  : React.createElement("span", { style: { fontFamily: "'Cinzel', serif", fontSize: 18, color: "#5A646E" } }, (nomC.charAt(0) || "?").toUpperCase())),
              React.createElement("div", { style: { fontFamily: "'Cinzel', serif", fontSize: 16.5, fontWeight: 600, letterSpacing: 0.6, color: "#EEF4F7", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, nomC)),

            rentre
              ? React.createElement("div", { style: { marginTop: 16, padding: "16px 16px 15px", borderRadius: 16, background: "rgba(201,166,107,0.05)", border: "1px solid rgba(201,166,107,0.26)" } },
                  React.createElement("div", { style: { fontFamily: "'Cinzel', serif", fontSize: 15, letterSpacing: 0.7, color: "#EAF7FA" } },
                    tr({ fr: petit + " est rentr\u00e9. Il va bien.", en: petit + " is home. All is well.", es: petit + " ha vuelto. Est\u00e1 bien.", it: petit + " \u00e8 rientrato. Sta bene.", ja: petit + " \u304c\u5e30\u3063\u3066\u304d\u307e\u3057\u305f\u3002\u5143\u6c17\u3067\u3059\u3002", de: petit + " ist zur\u00fcck. Alles gut.", ar: petit + " \u0639\u0627\u062f. \u0625\u0646\u0647 \u0628\u062e\u064a\u0631.", zh: (petit + " 回到马厩了，它很好。"), nl: (petit + " is weer thuis. Het gaat goed."), pt: (petit + " voltou para casa. Está tudo bem."), sv: (petit + " är hemma. Allt är bra."), ru: (petit + " вернулся домой. Всё хорошо."), pl: (petit + " wrócił do stajni. Wszystko w porządku."), ko: (petit + " 들어왔어요. 잘 지내고 있어요.") })),
                  React.createElement("div", { style: { fontSize: 11.5, lineHeight: 1.6, color: "#7E8A93", marginTop: 8, fontFamily: "'Montserrat', sans-serif" } },
                    tr({ fr: "Garde-le au chaud \u2014 une prochaine fois, la porte ne resterait pas ouverte aussi longtemps.", en: "Keep him close \u2014 next time, the gate would not stay open as long.", es: "Cu\u00eddalo \u2014 la pr\u00f3xima vez, la puerta no quedar\u00eda abierta tanto tiempo.", it: "Tienilo al caldo \u2014 la prossima volta, la porta non resterebbe aperta cos\u00ec a lungo.", ja: "\u5927\u5207\u306b\u3057\u3066\u3042\u3052\u3066\u304f\u3060\u3055\u3044\u3002\u6b21\u306f\u3001\u9580\u306f\u3053\u308c\u307b\u3069\u9577\u304f\u306f\u958b\u3044\u3066\u3044\u307e\u305b\u3093\u3002", de: "Pass gut auf ihn auf \u2014 beim n\u00e4chsten Mal bliebe das Tor nicht so lange offen.", ar: "\u0627\u0639\u062a\u0646\u064a \u0628\u0647 \u062c\u064a\u062f\u0627 \u2014 \u0641\u064a \u0627\u0644\u0645\u0631\u0629 \u0627\u0644\u0642\u0627\u062f\u0645\u0629 \u0644\u0646 \u064a\u0628\u0642\u0649 \u0627\u0644\u0628\u0627\u0628 \u0645\u0641\u062a\u0648\u062d\u0627 \u0637\u0648\u064a\u0644\u0627.", zh: "让它暖和地待着吧——下次，门可不会开这么久。", nl: "Hou hem dicht bij je — de volgende keer blijft de deur niet zo lang open.", pt: "Mantenha-o por perto — da próxima vez, o portão não ficaria aberto por tanto tempo.", sv: "Håll honom nära — nästa gång skulle porten inte stå öppen lika länge.", ru: "Береги его — в следующий раз ворота не будут открыты так долго.", pl: "Zadbaj o niego — następnym razem drzwi nie zostaną otwarte tak długo.", ko: "따뜻하게 지켜 주세요. 다음에는 문이 이렇게 오래 열려 있지 않을 거예요." })))
              : React.createElement(React.Fragment, null,
                  React.createElement("div", { style: { fontSize: 12.5, lineHeight: 1.65, color: "#828C96", margin: "14px 2px 0", fontFamily: "'Montserrat', sans-serif" } },
                    tr({ fr: petit + " t'attendra 30 jours \u00e0 la porte de l'\u00e9curie, si tu changes d'avis.", en: petit + " will wait 30 days at the stable gate, if you change your mind.", es: petit + " te esperar\u00e1 30 d\u00edas a la puerta de la cuadra, por si cambias de opini\u00f3n.", it: petit + " ti aspetter\u00e0 30 giorni alla porta della scuderia, se cambi idea.", ja: petit + " \u306f\u53a9\u820e\u306e\u9580\u306e\u305d\u3070\u3067 30 \u65e5\u9593\u5f85\u3063\u3066\u3044\u307e\u3059\u3002\u6c17\u304c\u5909\u308f\u3063\u305f\u3089\u3001\u3044\u3064\u3067\u3082\u3002", de: petit + " wartet 30 Tage am Stalltor, falls du es dir anders \u00fcberlegst.", ar: petit + " \u0633\u064a\u0646\u062a\u0638\u0631\u0643 30 \u064a\u0648\u0645\u0627 \u0639\u0646\u062f \u0628\u0627\u0628 \u0627\u0644\u0625\u0633\u0637\u0628\u0644\u060c \u0625\u0646 \u063a\u064a\u0631\u062a \u0631\u0623\u064a\u0643.", zh: (petit + " 会在马厩门口等你 30 天，如果你改变主意的话。"), nl: (petit + " wacht 30 dagen bij de staldeur op je, voor het geval je je bedenkt."), pt: (petit + " vai esperar por você 30 dias no portão da cocheira, se você mudar de ideia."), sv: (petit + " väntar på dig i 30 dagar vid stallporten, om du ändrar dig."), ru: (petit + " будет ждать тебя 30 дней у ворот конюшни, если ты передумаешь."), pl: (petit + " będzie czekać na ciebie 30 dni przed drzwiami stajni, jeśli zmienisz zdanie."), ko: (petit + " 마음이 바뀌면 30일 동안 마구간 문 앞에서 기다릴 거예요.") })),
                  React.createElement("button", { disabled: chOccupe === ch.id, onClick: function () {
                      if (chOccupe) return;
                      setChOccupe(ch.id); setChErr(null); setChPlein(false);
                      (async function () {
                        /* 22/08 — LA PLACE DU PLAN GRATUIT.
                           Un compte gratuit n a droit qu a UN cheval. Si la place a ete
                           reprise pendant l absence, on ne fait rentrer personne en douce :
                           on le dit, et on laisse les deux sorties ouvertes (retirer l autre,
                           ou passer en Premium). Decision de Blandine du 22/08. */
                        /* 18/10 (soir) — BUILD C : meme limite que la creation et que le serveur (gratuit 2, Premium 9,
                           exceptions comprises). Avant : 1 cheval en gratuit (ancienne regle) et aucun controle en Premium. */
                        if (typeof mesChevaux === "function") {
                          var rPl = null;
                          try { rPl = await mesChevaux(); } catch (ePl) { rPl = null; }
                          var uPl = null; try { uPl = await utilisateurActuel(); } catch (eUp) { }
                          var nPl = (rPl && rPl.data) ? rPl.data.length : 0;
                          if (!premium && rPl && rPl.data && nPl >= quotaGratuit(uPl && uPl.id)) { setChOccupe(null); setChPlein(true); return; }
                          if (premium && rPl && rPl.data && nPl >= quotaPremiumChevaux(uPl)) { setChOccupe(null); alerteQuotaPremiumChevaux(); return; }
                        }
                        var r = null;
                        try { r = await retrouverCheval(ch.id); } catch (eR) { r = { error: String(eR) }; }
                        setChOccupe(null);
                        if (r && r.error) {
                          setChErr(tr({ fr: "Il n'a pas pu rentrer. R\u00e9essaie dans un moment.", en: "He could not come back. Try again in a moment.", es: "No ha podido volver. Int\u00e9ntalo en un momento.", it: "Non \u00e8 riuscito a rientrare. Riprova tra poco.", ja: "\u623b\u308b\u3053\u3068\u304c\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002\u3057\u3070\u3089\u304f\u3057\u3066\u304b\u3089\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002", de: "Er konnte nicht zur\u00fcck. Versuche es sp\u00e4ter noch einmal.", ar: "\u0644\u0645 \u064a\u062a\u0645\u0643\u0646 \u0645\u0646 \u0627\u0644\u062f\u062e\u0648\u0644. \u0623\u0639\u064a\u062f\u064a \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0628\u0639\u062f \u0642\u0644\u064a\u0644.", zh: "它没能进去。请稍后再试。", nl: "Hij kon niet naar binnen. Probeer het zo nog eens.", pt: "Ele não conseguiu voltar. Tente de novo daqui a pouco.", sv: "Han kunde inte komma tillbaka. Försök igen om en stund.", ru: "Он не смог вернуться. Попробуй ещё раз чуть позже.", pl: "Nie udało mu się wejść. Spróbuj za chwilę.", ko: "들어오지 못했어요. 잠시 후 다시 시도해 주세요." }));
                          return;
                        }
                        setChRentre({ id: ch.id, nom: nomC });
                      })();
                    }, style: { display: "block", width: "100%", marginTop: 16, fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", padding: "13px 16px", borderRadius: 999, cursor: chOccupe === ch.id ? "default" : "pointer", background: "rgba(201,166,107,0.07)", border: "1px solid rgba(201,166,107,0.5)", color: "#D2B07A", opacity: chOccupe === ch.id ? 0.55 : 1 } },
                    (chOccupe === ch.id)
                      ? "\u2026"
                      : tr({ fr: "Retrouver " + petit, en: "Bring " + petit + " back", es: "Recuperar a " + petit, it: "Ritrovare " + petit, ja: petit + " \u3092\u8fce\u3048\u306b\u884c\u304f", de: petit + " zur\u00fcckholen", ar: "\u0627\u0633\u062a\u0639\u0627\u062f\u0629 " + petit, zh: ("找回 " + petit), nl: ("Haal " + petit + " terug"), pt: ("Trazer " + petit + " de volta"), sv: ("Hämta tillbaka " + petit), ru: ("Вернуть " + petit), pl: ("Odzyskaj: " + petit), ko: ("다시 만나기: " + petit) }))));
        }),

        chErr ? React.createElement("div", { style: { marginTop: 14, fontSize: 11.5, color: "#F0A0A0", textAlign: "center", lineHeight: 1.5, fontFamily: "'Montserrat', sans-serif" } }, chErr) : null,

        chPlein ? React.createElement("div", { style: { marginTop: 16, padding: "16px 15px 14px", borderRadius: 16, border: "1px solid rgba(232,200,135,0.34)", background: "rgba(232,200,135,0.05)" } },
          /* la mascotte n apparait QUE la : il n y a pas de cheval a montrer.
             Sur la carte, la photo du cheval reste le seul sujet. */
          React.createElement("img", { src: "mascotte-abo.webp", alt: "", onError: function (eIm) { try { eIm.target.style.display = "none"; } catch (eI2) { } }, style: { display: "block", width: 84, height: "auto", margin: "0 auto 10px", filter: "drop-shadow(0 6px 20px rgba(232,200,135,0.22))" } }),
          React.createElement("div", { style: { fontSize: 12.5, lineHeight: 1.65, color: "#D8CFBB", textAlign: "center", fontWeight: 600, fontFamily: "'Montserrat', sans-serif", marginBottom: 6 } },
            tr({ fr: "Attention, la place dans l'\u00e9curie semble avoir \u00e9t\u00e9 prise !", en: "Careful \u2014 the stall seems to have been taken!", es: "\u00a1Cuidado, la plaza en la cuadra parece ocupada!", it: "Attenzione, il posto in scuderia sembra essere stato preso!", ja: "\u6ce8\u610f\uff01\u53a9\u820e\u306e\u5834\u6240\u304c\u57cb\u307e\u3063\u3066\u3044\u308b\u3088\u3046\u3067\u3059\u3002", de: "Achtung \u2014 der Platz im Stall scheint belegt zu sein!", ar: "\u0627\u0646\u062a\u0628\u0647\u064a\u060c \u064a\u0628\u062f\u0648 \u0623\u0646 \u0627\u0644\u0645\u0643\u0627\u0646 \u0641\u064a \u0627\u0644\u0625\u0633\u0637\u0628\u0644 \u0642\u062f \u0623\u062e\u0630!", zh: "注意，马厩里的位置好像已经被占了！", nl: "Let op, de plek in de stal lijkt bezet te zijn!", pt: "Atenção, a baia na cocheira parece ter sido ocupada!", sv: "Se upp, platsen i stallet verkar ha tagits!", ru: "Осторожно, место в конюшне, похоже, занято!", pl: "Uwaga, miejsce w stajni wygląda na zajęte!", ko: "주의, 마구간 자리가 이미 찬 것 같아요!" })),
          React.createElement("div", { style: { fontSize: 12, lineHeight: 1.65, color: "#C6BEA9", textAlign: "center", fontFamily: "'Montserrat', sans-serif" } },
            tr({ fr: "Retire le cheval qui s'y trouve, ou agrandis ton \u00e9curie pour pouvoir en accueillir plusieurs.", en: "Take out the horse inside, or make your stable bigger to welcome several at once.", es: "Retira el caballo que est\u00e1 dentro, o agranda tu cuadra para poder acoger a varios.", it: "Togli il cavallo che c'\u00e8, oppure ingrandisci la scuderia per accoglierne pi\u00f9 di uno.", ja: "\u4eca\u3044\u308b\u99ac\u3092\u5916\u3059\u304b\u3001\u53a9\u820e\u3092\u5e83\u3052\u3066\u4f55\u982d\u3067\u3082\u8fce\u3048\u3089\u308c\u308b\u3088\u3046\u306b\u3057\u307e\u3057\u3087\u3046\u3002", de: "Nimm das Pferd heraus, das drin steht, oder vergr\u00f6\u00dfere deinen Stall, um mehrere aufzunehmen.", ar: "\u0623\u0632\u064a\u0644\u064a \u0627\u0644\u062d\u0635\u0627\u0646 \u0627\u0644\u0645\u0648\u062c\u0648\u062f \u0641\u064a\u0647\u060c \u0623\u0648 \u0648\u0633\u0639\u064a \u0625\u0633\u0637\u0628\u0644\u0643 \u0644\u0627\u0633\u062a\u0642\u0628\u0627\u0644 \u0639\u062f\u0629 \u062e\u064a\u0648\u0644.", zh: "请把占着位置的马移走，或者扩大你的马厩，这样就能容纳更多马。", nl: "Haal het paard weg dat er nu staat, of maak je stal groter zodat er meerdere paarden in kunnen.", pt: "Tire o cavalo que está lá ou aumente sua cocheira para poder receber vários.", sv: "Ta bort hästen som står där, eller gör ditt stall större så att flera får plats.", ru: "Убери из него лошадь или расширь свою конюшню, чтобы в ней помещалось несколько.", pl: "Usuń konia, który tam stoi, lub powiększ swoją stajnię, aby pomieścić ich więcej.", ko: "그 자리에 있는 말을 빼거나, 마구간을 넓혀서 여러 마리를 들이세요." })),
          React.createElement("button", { onClick: function () { setEcran("premium"); }, style: { display: "block", width: "100%", maxWidth: 260, margin: "13px auto 0", padding: "11px 16px", borderRadius: 999, border: "1px solid rgba(232,200,135,0.6)", background: "none", color: "#F0D48A", fontFamily: "'Montserrat', sans-serif", fontSize: 12.5, fontWeight: 700, cursor: "pointer" } },
            tr({ fr: "Agrandir mon \u00e9curie", en: "Make my stable bigger", es: "Agrandar mi cuadra", it: "Ingrandire la mia scuderia", ja: "\u53a9\u820e\u3092\u5e83\u3052\u308b", de: "Meinen Stall vergr\u00f6\u00dfern", ar: "\u062a\u0648\u0633\u064a\u0639 \u0625\u0633\u0637\u0628\u0644\u064a", zh: "扩大我的马厩", nl: "Mijn stal vergroten", pt: "Aumentar minha cocheira", sv: "Gör mitt stall större", ru: "Расширить мою конюшню", pl: "Powiększ moją stajnię", ko: "내 마구간 넓히기" }))) : null

      ) : null,

      /* (548) raccourci vers l ANCIENNE page Ecurie (ou retour a la nouvelle) - son compte seulement */
      ((user && typeof estCompteFeinnHype === "function" && estCompteFeinnHype(user)) ? (function () {
        var anc = false; try { anc = !!window.__ecurieAncienne; } catch (eA) { }
        return React.createElement("button", { onClick: function () { try { window.__ecurieAncienne = !anc; } catch (eB) { } setEcran("guilde"); }, style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, width: "100%", maxWidth: 420, textAlign: "left", margin: "18px auto 0", padding: "14px 16px", borderRadius: 20, border: "1px solid rgba(201,166,107,0.42)", background: "linear-gradient(120deg, rgba(201,166,107,0.10), rgba(10,14,18,0.75))", cursor: "pointer", color: "#EDF2F5" } },
          React.createElement("span", { style: { fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 600 } }, anc
            ? tr({ fr: "Revenir \u00e0 la nouvelle page \u00c9curie", en: "Back to the new Stable page", es: "Volver a la nueva p\u00e1gina de la cuadra", it: "Torna alla nuova pagina Scuderia", ja: "\u65b0\u3057\u3044\u53a9\u820e\u30da\u30fc\u30b8\u306b\u623b\u308b", de: "Zur\u00fcck zur neuen Stallseite", ar: "\u0627\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u0635\u0641\u062d\u0629 \u0627\u0644\u0625\u0633\u0637\u0628\u0644 \u0627\u0644\u062c\u062f\u064a\u062f\u0629", zh: "回到新的马厩页面", nl: "Terug naar de nieuwe Stal-pagina", pt: "Voltar para a nova página Cocheira", sv: "Tillbaka till den nya stallsidan", ru: "Вернуться к новой странице «Конюшня»", pl: "Wróć do nowej strony Stajnia", ko: "새 마구간 페이지로 돌아가기" })
            : tr({ fr: "Voir l\u2019ancienne page \u00c9curie", en: "See the old Stable page", es: "Ver la antigua p\u00e1gina de la cuadra", it: "Vedi la vecchia pagina Scuderia", ja: "\u4ee5\u524d\u306e\u53a9\u820e\u30da\u30fc\u30b8\u3092\u898b\u308b", de: "Alte Stallseite ansehen", ar: "\u0639\u0631\u0636 \u0635\u0641\u062d\u0629 \u0627\u0644\u0625\u0633\u0637\u0628\u0644 \u0627\u0644\u0642\u062f\u064a\u0645\u0629", zh: "查看旧的马厩页面", nl: "De oude Stal-pagina bekijken", pt: "Ver a página Cocheira antiga", sv: "Se den gamla stallsidan", ru: "Посмотреть старую страницу «Конюшня»", pl: "Zobacz starą stronę Stajnia", ko: "이전 마구간 페이지 보기" })),
          React.createElement("span", { "aria-hidden": "true", style: { color: "#C9A66B", fontSize: 18 } }, "\u203a"));
      })() : null),
      /* 28/09 (495) : « Mes quetes », venue de la page Cavalier (Blandine : « je voulais dire de la basculer sur la
         page Mon compte », visible seulement de son compte). */
      ((user && typeof estCompteFeinnHype === "function" && estCompteFeinnHype(user)) ? React.createElement("button", { onClick: function () { setEcran("quetes"); }, style: { display: "block", width: "100%", maxWidth: 420, textAlign: "left", margin: "18px auto 0", padding: "15px 16px", borderRadius: 20, border: "1px solid rgba(201,166,107,0.42)", background: "linear-gradient(120deg, rgba(201,166,107,0.10), rgba(10,14,18,0.75))", cursor: "pointer" } },
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 13 } },
        React.createElement("img", { src: hypeBadgeNiveau(Math.floor((ctx.xp || 0) / 200) + 1), alt: "", style: { height: 44, width: "auto", flex: "0 0 auto", filter: "drop-shadow(0 0 6px rgba(201,166,107,.55))" } }),
        React.createElement("div", { style: { minWidth: 0 } },
          React.createElement("div", { style: { fontFamily: "'Cinzel', serif", fontSize: 15.5, fontWeight: 600, color: "#EDF2F5" } }, tr({ fr: "Mes qu\u00eates", en: "My quests", es: "Mis misiones", it: "Le mie missioni", ja: "\u30de\u30a4\u30af\u30a8\u30b9\u30c8", de: "Meine Quests", ar: "\u0645\u0647\u0627\u0645\u064a", zh: "我的任务", nl: "Mijn quests", pt: "Minhas missões", sv: "Mina uppdrag", ru: "Мои квесты", pl: "Moje zadania", ko: "내 퀘스트" })),
          React.createElement("div", { style: { height: 5, borderRadius: 99, background: "rgba(255,255,255,0.08)", overflow: "hidden", marginTop: 7 } },
            React.createElement("div", { style: { height: "100%", width: (((ctx.xp || 0) % 200) / 200 * 100) + "%", borderRadius: 99, background: "linear-gradient(90deg,#B8955A,#C9A66B)" } })),
          React.createElement("div", { style: { fontSize: 10, color: "#8A99A1", marginTop: 5, fontFamily: "'Montserrat', sans-serif" } }, ((ctx.xp || 0) % 200) + " / 200 XP")),
        React.createElement("span", { style: { color: "#D2B07A", fontSize: 20, flex: "0 0 auto" } }, "\u203a"))) : null),
      React.createElement("button", { onClick: function () { setVoirSuppr(true); }, style: { marginTop: 18, background: "none", border: "none", color: COLORS.grisTresDoux, fontSize: 12.5, fontFamily: "'Montserrat', sans-serif", textDecoration: "underline", cursor: "pointer", padding: 8 } }, (SUPPR_I18N[langue] || SUPPR_I18N.fr).lien),
      React.createElement(LienQuoiDeNeuf, { compte: true }),
      /* ═══════════════════════════════════════════════════════════════════
         18/08 — L ECRAN DE CHANGEMENT D IDENTIFIANT.
         Deux temps VOLONTAIRES. Le second n est pas une politesse : valider
         consomme le changement gratuit, et rien ne le rend. On montre donc
         l avant et l apres en toutes lettres avant d ecrire.
         Le libelle dit « rarement modifiable », JAMAIS « definitif » —
         decision explicite de Blandine : promettre le definitif serait faux,
         puisqu un changement reste possible tous les 30 jours.
         ═══════════════════════════════════════════════════════════════════ */
      hEtape ? React.createElement("div", { onClick: function () { if (!hOccupe) { setHEtape(""); setHMsg(null); } }, style: { position: "fixed", inset: 0, zIndex: 8700, background: "rgba(4,6,9,0.82)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "calc(env(safe-area-inset-top) + 74px) 0 0" } },
        React.createElement("div", { onClick: function (e) { e.stopPropagation(); }, style: { width: "88%", maxWidth: 370, borderRadius: 20, border: "1px solid rgba(201,166,107,0.34)", background: "linear-gradient(180deg, rgba(14,22,30,0.98), rgba(8,11,15,0.99))", padding: "20px 18px", boxSizing: "border-box" } },
          React.createElement("div", { style: { fontFamily: "'Cinzel', serif", fontSize: 15, letterSpacing: 1.6, color: COLORS.blanc, textAlign: "center", textTransform: "uppercase", marginBottom: 6 } },
            tr({ fr: "Mon identifiant", en: "My handle", es: "Mi identificador", it: "Il mio identificativo", ja: "\u79c1\u306e ID", de: "Meine Kennung", ar: "\u0645\u0639\u0631\u0641\u064a", zh: "我的 ID", nl: "Mijn handle", pt: "Meu identificador", sv: "Mitt ID", ru: "Мой идентификатор", pl: "Mój identyfikator", ko: "내 아이디" })),

          (hEtape === "saisie") ? React.createElement(React.Fragment, null,
            React.createElement("p", { style: { color: "#8A929C", fontSize: 12, textAlign: "center", margin: "0 0 8px", lineHeight: 1.5 } },
              tr({ fr: "C'est ton adresse dans Hype. Elle n'existe qu'une fois, et se modifie rarement.", en: "It's your address inside Hype. It exists only once, and rarely changes.", es: "Es tu direcci\u00f3n en Hype. Existe una sola vez y se cambia pocas veces.", it: "\u00c8 il tuo indirizzo in Hype. Esiste una sola volta e cambia raramente.", ja: "Hype \u3067\u306e\u3042\u306a\u305f\u306e\u4f4f\u6240\u3067\u3059\u3002\u4e00\u3064\u3060\u3051\u3067\u3001\u307e\u308c\u306b\u3057\u304b\u5909\u66f4\u3067\u304d\u307e\u305b\u3093\u3002", de: "Das ist deine Adresse in Hype. Sie existiert nur einmal und \u00e4ndert sich selten.", ar: "\u0647\u0630\u0627 \u0639\u0646\u0648\u0627\u0646\u0643 \u0641\u064a Hype. \u0647\u0648 \u0641\u0631\u064a\u062f\u060c \u0648\u0646\u0627\u062f\u0631\u0627 \u0645\u0627 \u064a\u062a\u063a\u064a\u0631.", zh: "这是你在 Hype 里的地址。它是唯一的，也很少需要修改。", nl: "Dit is jouw adres in Hype. Het bestaat maar één keer en verandert zelden.", pt: "É o seu endereço dentro do Hype. Ele existe uma única vez e raramente muda.", sv: "Det är din adress i Hype. Den finns bara en gång och ändras sällan.", ru: "Это твой адрес в Hype. Он существует в единственном экземпляре и меняется редко.", pl: "To twój adres w Hype. Istnieje tylko raz i rzadko się go zmienia.", ko: "Hype에서 쓰는 내 주소예요. 하나뿐이고 자주 바꾸지 않아요." })),
            React.createElement("p", { style: { color: "#C9A44A", fontSize: 11.5, textAlign: "center", margin: "0 0 14px", lineHeight: 1.5 } },
              tr({ fr: "Un seul changement est offert. Ensuite, 30 jours entre deux changements.", en: "One change is free. After that, 30 days between changes.", es: "Un cambio es gratuito. Despu\u00e9s, 30 d\u00edas entre cambios.", it: "Un cambio \u00e8 offerto. Poi, 30 giorni tra due cambi.", ja: "\u5909\u66f4\u306f1\u56de\u7121\u6599\u3067\u3059\u3002\u305d\u306e\u5f8c\u306f30\u65e5\u9593\u306e\u9593\u9694\u304c\u5fc5\u8981\u3067\u3059\u3002", de: "Eine \u00c4nderung ist gratis. Danach 30 Tage zwischen \u00c4nderungen.", ar: "\u064a\u0633\u0645\u062d \u0628\u062a\u063a\u064a\u064a\u0631 \u0648\u0627\u062d\u062f \u0645\u062c\u0627\u0646\u0627. \u0628\u0639\u062f \u0630\u0644\u0643 30 \u064a\u0648\u0645\u0627 \u0628\u064a\u0646 \u0643\u0644 \u062a\u063a\u064a\u064a\u0631.", zh: "可以免费修改一次。之后，两次修改之间需间隔 30 天。", nl: "Eén wijziging is gratis. Daarna zitten er 30 dagen tussen twee wijzigingen.", pt: "Uma troca é grátis. Depois, 30 dias entre cada troca.", sv: "En ändring är gratis. Därefter går det 30 dagar mellan ändringarna.", ru: "Одно изменение бесплатно. Потом между изменениями должно пройти 30 дней.", pl: "Jedna zmiana jest gratis. Potem między zmianami musi minąć 30 dni.", ko: "한 번은 무료로 바꿀 수 있어요. 그 뒤로는 변경 사이에 30일을 두어야 해요." })),
            React.createElement("input", { value: hSaisie, onChange: function (eI) { setHSaisie(eI.target.value); setHMsg(null); }, maxLength: 24, autoCapitalize: "none", autoCorrect: "off", spellCheck: false, placeholder: "@\u2026", style: { width: "100%", boxSizing: "border-box", padding: "13px 14px", borderRadius: 13, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.05)", color: COLORS.blanc, fontSize: 15, fontFamily: "'Montserrat', sans-serif", outline: "none" } }),
            /* Apercu : ce que la BASE en fera. Simple prediction — la verite
               reste celle du serveur, et le message d erreur le dira. */
            (function () {
              var apercu = "";
              try { apercu = (typeof hypeHandleNormalise === "function") ? hypeHandleNormalise(hSaisie) : ""; } catch (eN) { }
              if (!apercu) return null;
              return React.createElement("p", { style: { color: "#C9A66B", fontSize: 12.5, textAlign: "center", margin: "10px 0 0", fontFamily: "'Montserrat', sans-serif" } }, "@" + apercu);
            })(),
            hMsg ? React.createElement("p", { style: { color: "#F0A0A0", fontSize: 12, textAlign: "center", margin: "10px 0 0", lineHeight: 1.45 } }, hMsg) : null,
            React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 16 } },
              React.createElement("button", { onClick: function () { setHEtape(""); setHMsg(null); }, style: { flex: 1, padding: "12px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.22)", background: "transparent", color: "#C9D3D8", fontSize: 13, fontWeight: 700, cursor: "pointer" } },
                tr({ fr: "Annuler", en: "Cancel", es: "Cancelar", it: "Annulla", ja: "\u30ad\u30e3\u30f3\u30bb\u30eb", de: "Abbrechen", ar: "\u0625\u0644\u063a\u0627\u0621", zh: "取消", nl: "Annuleren", pt: "Cancelar", sv: "Avbryt", ru: "Отмена", pl: "Anuluj", ko: "취소" })),
              React.createElement("button", { onClick: function () {
                  var a = "";
                  try { a = (typeof hypeHandleNormalise === "function") ? hypeHandleNormalise(hSaisie) : ""; } catch (eN2) { }
                  if (!a) { setHMsg((typeof hypeMessageChangement === "function") ? hypeMessageChangement("format", langue) : ""); return; }
                  setHMsg(null); setHEtape("confirme");
                }, style: { flex: 1, padding: "12px 0", borderRadius: 999, border: "1px solid rgba(201,166,107,0.45)", background: "linear-gradient(165deg, rgba(55,107,125,0.42) 0%, rgba(16,26,29,0.78) 55%, rgba(6,7,9,0.85) 100%)", boxShadow: "0 8px 18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(243,238,228,0.08)", color: "#F3EEE4", fontSize: 13, fontWeight: 700, cursor: "pointer" } },
                tr({ fr: "Continuer", en: "Continue", es: "Continuar", it: "Continua", ja: "\u7d9a\u3051\u308b", de: "Weiter", ar: "\u0645\u062a\u0627\u0628\u0639\u0629", zh: "继续", nl: "Doorgaan", pt: "Continuar", sv: "Fortsätt", ru: "Продолжить", pl: "Dalej", ko: "계속" })))
          ) : React.createElement(React.Fragment, null,
            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "16px 0 6px" } },
              React.createElement("span", { style: { fontSize: 14.5, color: "#7A838D", textDecoration: "line-through", fontFamily: "'Montserrat', sans-serif" } }, (typeof hypeHandleTexte === "function") ? hypeHandleTexte(profil || {}) : ""),
              React.createElement("span", { style: { color: "#C9A66B", fontSize: 16 } }, "\u2192"),
              React.createElement("span", { style: { fontSize: 16, color: "#C9A66B", fontWeight: 700, fontFamily: "'Montserrat', sans-serif" } }, "@" + ((typeof hypeHandleNormalise === "function") ? hypeHandleNormalise(hSaisie) : ""))),
            React.createElement("p", { style: { color: "#8A929C", fontSize: 12, textAlign: "center", margin: "12px 0 0", lineHeight: 1.5 } },
              tr({ fr: "Ton ancien identifiant restera r\u00e9serv\u00e9 six mois : personne ne pourra le prendre.", en: "Your former handle stays reserved for six months: nobody can take it.", es: "Tu identificador anterior queda reservado seis meses: nadie podr\u00e1 tomarlo.", it: "Il tuo vecchio identificativo resta riservato sei mesi: nessuno potr\u00e0 prenderlo.", ja: "\u4ee5\u524d\u306e ID \u306f6\u30f6\u6708\u4e88\u7d04\u3055\u308c\u3001\u8ab0\u3082\u4f7f\u3048\u307e\u305b\u3093\u3002", de: "Deine alte Kennung bleibt sechs Monate reserviert: niemand kann sie nehmen.", ar: "\u0633\u064a\u0628\u0642\u0649 \u0645\u0639\u0631\u0641\u0643 \u0627\u0644\u0642\u062f\u064a\u0645 \u0645\u062d\u062c\u0648\u0632\u0627 \u0633\u062a\u0629 \u0623\u0634\u0647\u0631: \u0644\u0646 \u064a\u062a\u0645\u0643\u0646 \u0623\u062d\u062f \u0645\u0646 \u0623\u062e\u0630\u0647.", zh: "你的旧 ID 会保留六个月：没有人能占用。", nl: "Je oude handle blijft zes maanden gereserveerd: niemand kan hem nemen.", pt: "Seu identificador antigo ficará reservado por seis meses: ninguém poderá pegá-lo.", sv: "Ditt gamla ID förblir reserverat i sex månader: ingen kan ta det.", ru: "Твой прежний идентификатор останется зарезервирован на шесть месяцев: никто не сможет его занять.", pl: "Twój stary identyfikator pozostanie zarezerwowany przez sześć miesięcy: nikt nie będzie mógł go zająć.", ko: "이전 아이디는 6개월 동안 예약되어 아무도 쓸 수 없어요." })),
            React.createElement("p", { style: { color: "#C9A44A", fontSize: 11.5, textAlign: "center", margin: "8px 0 0", lineHeight: 1.5 } },
              tr({ fr: "Tu pourras le changer \u00e0 nouveau dans 30 jours.", en: "You'll be able to change it again in 30 days.", es: "Podr\u00e1s cambiarlo de nuevo en 30 d\u00edas.", it: "Potrai cambiarlo di nuovo tra 30 giorni.", ja: "\u6b21\u306e\u5909\u66f4\u306f30\u65e5\u5f8c\u304b\u3089\u3067\u3059\u3002", de: "Du kannst sie in 30 Tagen erneut \u00e4ndern.", ar: "\u064a\u0645\u0643\u0646\u0643 \u062a\u063a\u064a\u064a\u0631\u0647 \u0645\u062c\u062f\u062f\u0627 \u0628\u0639\u062f 30 \u064a\u0648\u0645\u0627.", zh: "30 天后你可以再次修改。", nl: "Je kunt hem over 30 dagen weer wijzigen.", pt: "Você poderá trocar de novo daqui a 30 dias.", sv: "Du kan ändra det igen om 30 dagar.", ru: "Ты сможешь изменить его снова через 30 дней.", pl: "Za 30 dni możesz zmienić go ponownie.", ko: "30일 뒤에 다시 바꿀 수 있어요." })),
            hMsg ? React.createElement("p", { style: { color: "#F0A0A0", fontSize: 12, textAlign: "center", margin: "12px 0 0", lineHeight: 1.45 } }, hMsg) : null,
            React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 18 } },
              React.createElement("button", { onClick: function () { if (!hOccupe) { setHEtape("saisie"); setHMsg(null); } }, style: { flex: 1, padding: "12px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.22)", background: "transparent", color: "#C9D3D8", fontSize: 13, fontWeight: 700, cursor: "pointer" } },
                tr({ fr: "Retour", en: "Back", es: "Atr\u00e1s", it: "Indietro", ja: "\u623b\u308b", de: "Zur\u00fcck", ar: "\u0631\u062c\u0648\u0639", zh: "返回", nl: "Terug", pt: "Voltar", sv: "Tillbaka", ru: "Назад", pl: "Wróć", ko: "뒤로" })),
              React.createElement("button", { onClick: function () {
                  if (hOccupe) return;
                  setHOccupe(true); setHMsg(null);
                  (async function () {
                    var r = { ok: false, code: "reseau" };
                    try { if (typeof hypeAppelChangement === "function") r = await hypeAppelChangement("hype_changer_handle", hSaisie); } catch (eC) { }
                    setHOccupe(false);
                    if (r && r.ok) {
                      var v = r.handle || "";
                      setProfil(function (pp) { return Object.assign({}, pp || {}, { handle: v, handle_a_valider: false }); });
                      try { if (typeof setProfilApp === "function") setProfilApp(function (pp) { return Object.assign({}, pp || {}, { handle: v, handle_a_valider: false }); }); } catch (eS) { }
                      setHEtape(""); setHSaisie(""); setHMsg(null);
                      return;
                    }
                    setHMsg((typeof hypeMessageChangement === "function") ? hypeMessageChangement(r && r.code, langue, r && r.prochain_le) : "");
                    if (r && (r.code === "pris" || r.code === "reserve" || r.code === "interdit" || r.code === "format")) setHEtape("saisie");
                  })();
                }, disabled: hOccupe, style: { flex: 1, padding: "12px 0", borderRadius: 999, border: "1px solid rgba(201,166,107,0.45)", background: "linear-gradient(165deg, rgba(55,107,125,0.42) 0%, rgba(16,26,29,0.78) 55%, rgba(6,7,9,0.85) 100%)", boxShadow: "0 8px 18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(243,238,228,0.08)", color: "#F3EEE4", fontSize: 13, fontWeight: 700, cursor: hOccupe ? "default" : "pointer", opacity: hOccupe ? 0.55 : 1 } },
                tr({ fr: "Confirmer", en: "Confirm", es: "Confirmar", it: "Conferma", ja: "\u78ba\u5b9a", de: "Best\u00e4tigen", ar: "\u062a\u0623\u0643\u064a\u062f", zh: "确认", nl: "Bevestigen", pt: "Confirmar", sv: "Bekräfta", ru: "Подтвердить", pl: "Potwierdź", ko: "확인" })))
          ))) : null);
  } else {
    var ins = (mode === "inscription");
    corps = React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 0, paddingTop: 12 } },
      React.createElement("div", { style: { fontSize: 11, letterSpacing: 3, color: "#C9A66B", textTransform: "uppercase", textAlign: "center" } }, T.label),
      React.createElement("div", { style: { fontFamily: "'Cinzel', serif", fontSize: 30, fontWeight: 600, letterSpacing: 2, color: COLORS.blanc, textAlign: "center", marginTop: 10 } }, ins ? T.titreIns : T.titreCon),
      React.createElement("div", { style: { fontSize: 13.5, color: COLORS.grisDoux, textAlign: "center", marginTop: 8, marginBottom: 26 } }, ins ? T.phraseIns : T.phraseCon),
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12, background: "rgba(13,20,28,0.45)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 22, padding: "18px 16px", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" } },
        ins ? champ({ value: pseudo, onChange: function (e) { setPseudo(e.target.value); }, placeholder: T.pseudo, autoCapitalize: "none", autoCorrect: "off" }) : null,
        champ({ value: email, onChange: function (e) { setEmail(e.target.value); }, placeholder: T.email, type: "email", inputMode: "email", autoCapitalize: "none", autoCorrect: "off" }),
        React.createElement("div", { style: { position: "relative" } },
          champ({ value: mdp, onChange: function (e) { setMdp(e.target.value); }, placeholder: T.mdp, type: voirMdp ? "text" : "password", onKeyDown: function (e) { if (e.key === "Enter") envoyer(); }, style: Object.assign({}, stIn, { paddingRight: 46 }) }),
          React.createElement("button", { onClick: function () { setVoirMdp(!voirMdp); }, "aria-label": hypeT7("Afficher le mot de passe", "Show password", "Mostrar la contrase\u00f1a", "Mostra la password", "\u30d1\u30b9\u30ef\u30fc\u30c9\u3092\u8868\u793a", "Passwort anzeigen", "\u0625\u0638\u0647\u0627\u0631 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631", "显示密码", "Wachtwoord tonen", "Mostrar a senha", "Visa lösenordet", "Показать пароль", "Pokaż hasło", "비밀번호 표시"), style: { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", fontSize: 17, cursor: "pointer", opacity: voirMdp ? 1 : 0.5, padding: 4 } }, "\ud83d\udc41")),
        msg ? React.createElement("div", { style: { fontSize: 13, lineHeight: 1.45, textAlign: "center", color: msg.t === "err" ? "#FF8A8A" : "#C9A66B" } }, msg.x) : null,
        React.createElement("button", { onClick: envoyer, style: stBtn }, busy ? "\u2026" : (ins ? T.creer : T.connecter)),
        ins ? null : React.createElement("button", { onClick: envoyerReset, style: { background: "none", border: "none", color: COLORS.grisDoux, fontSize: 12.5, textDecoration: "underline", cursor: "pointer", paddingTop: 4 } }, T.mdpOublie)),
      React.createElement("div", { style: { textAlign: "center", marginTop: 20, fontSize: 13.5, color: COLORS.grisDoux } },
        (ins ? T.dejaCompte : T.pasCompte) + " ",
        React.createElement("button", { onClick: function () { setMode(ins ? "connexion" : "inscription"); setMsg(null); }, style: { background: "none", border: "none", color: "#C9A66B", fontSize: 13.5, fontWeight: 700, cursor: "pointer", padding: 0 } }, ins ? T.lienCon : T.lienIns)));
  }

  if (voirSuppr) {
    return React.createElement(EcranSupprimerCompte, { email: (user && user.email) || (profilApp && profilApp.email) || "", onAnnuler: function () { setVoirSuppr(false); } });
  }
  return React.createElement("div", { style: { position: "relative", background: COLORS.nuit, display: "flex", flexDirection: "column", overflowX: "hidden", overflowY: "auto" } },
    React.createElement("div", { style: { position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 380, height: 300, background: "radial-gradient(ellipse at top, " + "#C9A66B" + "1F 0%, transparent 68%)", pointerEvents: "none" } }),
    React.createElement("div", { style: { position: "relative", display: "flex", alignItems: "center", gap: 6, padding: "calc(14px + env(safe-area-inset-top)) 14px 2px", flexShrink: 0 } },
      React.createElement("button", { onClick: function () { setEcran("dashboard"); }, "aria-label": tr({ fr: "Retour", en: "Back", es: "Volver", it: "Indietro", ja: "\u623b\u308b", de: "Zur\u00fcck", ar: "\u0631\u062c\u0648\u0639", zh: "返回", nl: "Terug", pt: "Voltar", sv: "Tillbaka", ru: "Назад", pl: "Wróć", ko: "뒤로" }), style: { width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.grisDoux, fontSize: 27, lineHeight: 1, background: "none" } }, "\u2039"),
      React.createElement("span", { style: { fontFamily: "'Cinzel', serif", fontSize: 14, fontWeight: 600, letterSpacing: 3, color: COLORS.blanc, textTransform: "uppercase" } }, T.titre)),
    React.createElement("div", { style: { position: "relative", width: "100%", maxWidth: 420, margin: "0 auto", padding: "10px 22px 12px", boxSizing: "border-box" } }, corps,
      /* 30/08 (demande Blandine) : le partage de l'appli avec le code de parrainage,
         jusqu'ici reserve a la page Mes quetes, est repris ici en bas de Mon compte.
         Meme composant, pas une copie : il n'y a qu'une seule source a maintenir. */
      React.createElement(BlocParrainage, null)));
}
window.HypeMonCompte = { MonCompte: EcranMonCompte };
})();
