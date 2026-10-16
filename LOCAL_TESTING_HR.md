# Lokalno pokretanje i testiranje Kanea

Ovaj dokument opisuje kako pokrenuti Kaneo u lokalnom okruženju i provjeriti frontend, API, bazu i end-to-end funkcionalnosti.

## Preduvjeti

- Node.js **24.11+ iz 24.x grane** ili Node.js 26+
- pnpm **10.32.1**
- Docker Engine i Docker Compose v2 za preporučeni način rada
- Git

Verzije Node.js i pnpm provjerite naredbama:

```bash
node --version
pnpm --version
```

## Preporučeni način: Docker Compose

Ovaj način pokreće PostgreSQL, API i frontend zajedno te izbjegava problem s nedostupnom bazom.

### 1. Instalirajte ovisnosti

```bash
pnpm install
```

### 2. Pripremite lokalne varijable

```bash
cp .env.sample .env.local
```

U `.env.local` postavite barem lozinku za lokalni PostgreSQL i razvojnu tajnu:

```env
POSTGRES_DB=kaneo
POSTGRES_USER=kaneo
POSTGRES_PASSWORD=kaneo-local-password
AUTH_SECRET=zamijenite-ovim-novom-vrijednoscu
KANEO_CLIENT_URL=http://localhost:5173
KANEO_API_URL=http://localhost:1337
```

Tajnu možete generirati ovako:

```bash
openssl rand -hex 32
```

Ne koristite produkcijske lozinke ili produkcijsku bazu za lokalno testiranje.

### 3. Pokrenite servise

```bash
docker compose -f compose.local.yml up --build
```

Aplikacija je dostupna na:

- Frontend: <http://localhost:5173>
- API: <http://localhost:1337>
- API health: <http://localhost:1337/api/health>

Provjera spremnosti API-ja:

```bash
curl --fail http://localhost:1337/api/health
```

Prvi korisnički račun završava početno postavljanje instance. Koristite sintetičke lokalne podatke.

Za zaustavljanje i brisanje lokalnih podataka:

```bash
docker compose -f compose.local.yml down --volumes
```

## Host-native razvoj

Ako želite pokretati API i frontend izravno preko Node.js-a, PostgreSQL i dalje mora biti dostupan na `localhost:5432`.

### 1. Pokrenite samo PostgreSQL u Dockeru

```bash
cp .env.sample .env.local
# U .env.local postavite POSTGRES_PASSWORD i AUTH_SECRET
docker compose -f compose.local.yml up -d postgres
```

Za host-native API koristite `localhost`, a ne hostname `postgres` iz Docker mreže. U korijenski `.env` postavite:

```env
KANEO_CLIENT_URL=http://localhost:5173
KANEO_API_URL=http://localhost:1337
DATABASE_URL=postgresql://kaneo:kaneo-local-password@localhost:5432/kaneo
AUTH_SECRET=vrijednost-generirana-s-openssl-rand-hex-32
```

U `apps/web/.env.local` postavite javnu adresu API-ja:

```env
VITE_API_URL=http://localhost:1337
```

Nakon izmjene `VITE_*` varijabli ponovno pokrenite Vite.

### 2. Pokrenite razvojne procese

Iz korijena repozitorija:

```bash
pnpm dev
```

Otvorite <http://localhost:5173> i provjerite API:

```bash
curl --fail http://localhost:1337/api/health
```

Ako pokrećete samo frontend, može se koristiti:

```bash
pnpm --filter @kaneo/web dev -- --host 0.0.0.0 --port 3000
```

U tom slučaju frontend će se učitati, ali stranice koje zahtijevaju podatke prikazat će grešku ako API nije pokrenut.

## Automatske provjere

### Frontend testovi

```bash
pnpm --filter @kaneo/web test -- --run
```

### Lint i formatiranje frontenda

```bash
pnpm --filter @kaneo/web lint
```

### TypeScript provjera

```bash
pnpm --filter @kaneo/web typecheck
```

### Provjere hrvatskog localea

```bash
node ./scripts/i18n/check.mjs hr-HR
node ./scripts/i18n/report.mjs
```

### Testovi zajedničkih paketa

```bash
pnpm --filter @kaneo/permissions test -- --run
pnpm --filter @kaneo/libs test -- --run
pnpm --filter @kaneo/importers test -- --run
```

### Sve testne skripte repozitorija

```bash
pnpm test
```

### Produkcijski frontend build

```bash
pnpm --filter @kaneo/web build
```

## Browser smoke i end-to-end testovi

Playwright testovi koriste zaseban, privremeni Docker Compose stack s vlastitom PostgreSQL bazom. Ne koriste postojeći root `.env` i ne povezuju se na produkciju.

```bash
pnpm --dir tests/e2e install --frozen-lockfile --ignore-scripts
pnpm --dir tests/e2e exec playwright install chromium
docker compose -f tests/e2e/compose.yml up --build --wait --wait-timeout 180
pnpm test:e2e
docker compose -f tests/e2e/compose.yml down --volumes
```

Testna instanca koristi <http://localhost:18173>. Stack uvijek zaustavite nakon testiranja, uključujući slučaj pada testa. Rezultati, snimke i trace datoteke spremaju se u `.cache/e2e/`.

## Ručna provjera u pregledniku

Nakon pokretanja aplikacije provjerite:

1. Otvara li se početna stranica i prijavna ruta.
2. Prikazuje li se korisničko sučelje na hrvatskom jeziku.
3. Može li se izraditi lokalni korisnički račun.
4. Može li se izraditi radni prostor i projekt.
5. Rade li prikazi ploče, popisa, kalendara i Gantta.
6. Mogu li se izraditi, urediti, dodijeliti i obrisati zadaci.
7. Ostaju li promjene spremljene nakon osvježavanja stranice.
8. Rade li oznake, prioriteti, rokovi, komentari, podzadaci i privitci ako su konfigurirane potrebne usluge.
9. Rade li prijava, odjava i zaštita ruta.
10. Radi li prikaz na desktop i mobilnoj širini.

## Najčešći problemi

| Simptom | Rješenje |
| --- | --- |
| `localhost:5173` se ne otvara | Provjerite radi li frontend proces i je li port zauzet. |
| `Failed to fetch` u sučelju | Pokrenite API i provjerite `VITE_API_URL` u `apps/web/.env.local`. |
| API ne može pronaći `postgres` | Za host-native API koristite `localhost` u `DATABASE_URL`. Hostname `postgres` radi unutar Compose mreže. |
| API ne može pristupiti bazi | Provjerite lozinku, naziv baze, korisnika i je li PostgreSQL spreman. |
| CORS ili WebSocket greška | `KANEO_CLIENT_URL` mora točno odgovarati adresi frontenda. |
| Prijava prestaje raditi nakon restarta | Nemojte mijenjati `AUTH_SECRET` između pokretanja. |
| Browser testovi ne rade | Provjerite Docker Compose v2, instaliran Chromium i da port 18173 nije zauzet. |

Za dodatne opcionalne servise, SMTP, OAuth, S3 storage i Redis pogledajte [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md).
