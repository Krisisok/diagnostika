# Friisberg organizacijos diagnostika

Adaptyvus ~10 min klausimynas vadovų komandoms. Viešas puslapis: https://krisisok.github.io/diagnostika/

- `index.html` – visas įrankis (klausimynas + konsultanto vaizdas per mygtuką „Metodika“ arba `#backend`).
- `apps-script.gs` – Google Apps Script, kuris priima atsakymus ir rašo į Google Sheet „Friisberg diagnostika – atsakymai“.

## Automatinis atsakymų surinkimas (vienkartinis įdiegimas, ~3 min)

1. Atidarykite https://script.google.com → **New project**.
2. Ištrinkite pavyzdinį kodą ir įklijuokite `apps-script.gs` turinį. Išsaugokite (Ctrl/Cmd+S), pavadinkite „Friisberg diagnostika“.
3. **Deploy → New deployment**. Tipas: **Web app**. *Execute as*: **Me**. *Who has access*: **Anyone**. Spauskite **Deploy** ir patvirtinkite prieigą (Google parodys „unverified app“ įspėjimą – Advanced → Go to … → Allow; tai Jūsų pačios skriptas).
4. Nukopijuokite **Web app URL** (`https://script.google.com/macros/s/…/exec`).
5. Įrašykite jį į `index.html` eilutę `const ENDPOINT = ''` (arba atsiųskite man – įrašysiu).

Nuo tada kiekvienas vadovas, baigęs klausimyną, atsakymus išsiunčia automatiškai; konsultanto vaizde „Komandos rezultatai“ spaudžiate **Atnaujinti iš Google Sheets**.

## Nuorodos vadovams

Kiekvienai organizacijai siųskite nuorodą su jos pavadinimu, kad atsakymai grupuotųsi:
`https://krisisok.github.io/diagnostika/?org=UAB%20Pavyzdys`

Be `org` parametro vadovas pavadinimą įveda pats.
