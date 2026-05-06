# Periodni sustav 3D

Interaktivna web aplikacija za istraživanje periodnog sustava elemenata u 3D prostoru, s Bohrovim modelom atoma i komorom za stvaranje kemijskih spojeva.

## Što sadrži

- **3D periodna tablica** — svih 118 elemenata kao kartice u trodimenzionalnom prostoru, kategorizirano po bojama (alkalijski metali, halogeni, plemeniti plinovi, lantanoidi, aktinoidi…).
- **Pogled atoma** — klikom na bilo koji element otvara se Bohrov model s rotirajućim elektronima u ljuskama, jezgrom i plutajućim informacijskim oznakama.
- **Komora za spojeve** — odabirete elemente iz tablice i dodajete ih u "komoru". Pritiskom na *Stvori spoj* aplikacija provjerava kombinaciju protiv baze od 60+ poznatih kemijskih spojeva (H₂O, CO₂, NaCl, NH₃, CH₄, C₆H₆, glukoza…) i prikazuje 3D model molekule s atomima, vezama (jednostruke / dvostruke / trostruke) i mini-elektronima.
- **Dinamičke informacije** — atomska masa, talište, vrelište, elektronska konfiguracija, raspored po ljuskama, otkriće, primjena. Za spojeve: vrsta veze, geometrija, opis, primjena.
- **Tražilica** — pretraga po simbolu, hrvatskom imenu ili atomskom broju.
- **Hrvatski jezik** — sva imena, kategorije i opisi.

## Tehnologija

- **Three.js r128** — 3D renderiranje (preko CDN-a, bez build koraka)
- **OrbitControls** — kontrole kamere (lijevi klik = okreni, desni = pomakni, kotač = zoom)
- **Vanilla JavaScript** — bez okvira, bez build alata
- Sve se izvodi u pregledniku, bez servera

## Pokretanje lokalno

Jer Three.js učitava resurse, **ne otvarajte `index.html` direktno duplim klikom** (bit će CORS pogrešaka kada `app.js` pokušava koristiti `CanvasTexture`). Pokrenite jednostavni lokalni server:

```bash
# Python 3 (najjednostavnije)
cd periodni-3d
python3 -m http.server 8000

# Pa otvorite http://localhost:8000 u pregledniku
```

ili:

```bash
# Node.js
npx http-server periodni-3d -p 8000
```

## Objavljivanje kao web stranica

### Netlify (najbrže — drag & drop)

1. Otvorite [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Povucite cijelu mapu `periodni-3d` u prozor
3. Dobit ćete URL stranice — gotovo

### GitHub Pages

1. Stvorite novi repozitorij na GitHubu (npr. `periodni-3d`)
2. Postavite sadržaj mape u korijen repozitorija:
   ```bash
   cd periodni-3d
   git init
   git add .
   git commit -m "Inicijalna verzija"
   git branch -M main
   git remote add origin https://github.com/KORISNIK/periodni-3d.git
   git push -u origin main
   ```
3. U postavkama repozitorija → *Pages* → *Source: Deploy from branch* → odaberite `main` granu, root folder.
4. Stranica je dostupna na `https://KORISNIK.github.io/periodni-3d/`.

### Vercel / Cloudflare Pages / drugo

Bilo koji statički hosting radi — samo treba poslužiti `index.html` iz korijena.

## Struktura projekta

```
periodni-3d/
├── index.html              ← ulazna točka
├── css/
│   └── style.css           ← tamna tema, responsive
├── js/
│   └── app.js              ← Three.js scena, animacije, UI
├── data/
│   ├── elements.js         ← 118 elemenata (hrvatski)
│   └── compounds.js        ← 60+ spojeva s 3D koordinatama
└── README.md
```

## Kako koristiti

1. **Pregled tablice** — povucite mišem za rotaciju, kotačem za zoom.
2. **Otvaranje atoma** — kliknite bilo koju karticu elementa.
3. **Stvaranje spoja:**
   - Kliknite element (npr. **H** vodik)
   - U panelu desno → *+ Dodaj u komoru*
   - Ponovite (npr. još jedan H, pa O)
   - Pritisnite *⚗ Stvori spoj* u komori ispod
   - Aplikacija prepoznaje H₂O i prikazuje vodu u 3D
4. **Povratak** — gumb *← Natrag na tablicu* u panelu.

## Poznata ograničenja

- Aplikacija prepoznaje samo spojeve iz baze — egzotične kombinacije neće dati rezultat (pokazat će poruku).
- Bohrov model je pojednostavljen (kapaciteti ljuski 2-8-18-32-32-18-8) i ne odražava točno kvantnomehaničku strukturu, ali vizualno predstavlja koncept.
- 3D koordinate atoma u spojevima su približne — geometrija je točna, ali precizne vrijednosti veza i kutova mogu odstupati od stvarnih.

## Licenca

Slobodno koristiti, mijenjati i dijeliti.
