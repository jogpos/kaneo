# Status hrvatske i18n lokalizacije

**Datum:** 2026-10-18  
**Referentni locale:** `en-US`  
**Ciljni locale:** `hr-HR`

## Sažetak

Hrvatski locale je sinkroniziran s engleskim referentnim localeom. Ključni frontend tekstovi visokog prioriteta koriste i18n ključeve umjesto hardkodiranih engleskih vrijednosti.

Provjereni blokovi uključuju administraciju uloga i dozvola, izradu radnog prostora, tablični editor zadatka, tablicu članova, izradu projekta i fallback poruke korisničkih grešaka.

## Rezultati provjera

| Provjera | Rezultat |
|---|---|
| `node ./scripts/i18n/check.mjs hr-HR` | Prošlo — locale je sinkroniziran |
| `pnpm --filter @kaneo/web typecheck` | Prošlo |
| Web unit testovi | 304 test datoteke / 1563 testa prošla |
| Ciljani ključevi u `en-US` i `hr-HR` | Svi postoje |
| `git diff --check` | Prošlo |

## Tri prethodno prijavljena nedostajuća ključa

`auth:testAuth` i `common:testCommon` pojavljuju se samo u testnim fixtureima u `apps/web/src/lib/i18n/index.test.ts`, dok je `ns:key` dokumentacijski primjer u komentaru i18n loadera. Nisu korisnički tekstovi i ne trebaju biti u produkcijskim locale datotekama.

I18n report je ažuriran tako da testne datoteke (`*.test.ts` i `*.test.tsx`) ne tretira kao produkcijske izvore ključeva. Time se uklanjaju lažne prijave bez dodavanja testnih vrijednosti u locale datoteke.

## Neiskorišteni ključevi

Report i dalje prikazuje neiskorištene ključeve, ali oni nisu automatski obrisani jer pripadaju različitim legitimnim kategorijama:

- landing stranica i SEO sadržaj,
- press/media sadržaj,
- e-mail predlošci i pozivnice,
- integracije i buduće postavke,
- pluralni oblici i dinamički ključevi koje statički analizator ne može uvijek povezati.

Masovno brisanje tih ključeva moglo bi ukloniti prijevode za rute, e-mail predloške ili funkcionalnosti koje nisu obuhvaćene analizom `apps/web/src`. Za sigurno čišćenje potrebno je zasebno potvrditi vlasništvo i lifecycle svake kategorije.

## Politika održavanja

- Produkcijski report ignorira samo testne fixturee, ne stvarne frontend komponente.
- `hr-HR` mora zadržati isti skup ključeva kao `en-US`, uz dodatne CLDR pluralne oblike gdje su potrebni.
- Neiskorištene ključeve treba uklanjati po namespaceu i funkcionalnom području, a ne jednim globalnim `--fix` pozivom.
- Nakon svake lokalizacijske izmjene treba pokrenuti sinkronizaciju localea, report, typecheck i web testove.
