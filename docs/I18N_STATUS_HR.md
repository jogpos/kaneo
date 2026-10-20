# Status hrvatske i18n lokalizacije

**Datum:** 2026-10-18  
**Referentni locale:** `en-US`  
**Ciljni locale:** `hr-HR`

## Sažetak

Hrvatski locale je sinkroniziran s engleskim referentnim localeom. Ključni frontend tekstovi visokog prioriteta koriste i18n ključeve umjesto hardkodiranih engleskih vrijednosti. Prevedene su preostale prevodive vrijednosti; tehnički nazivi, brendovi, URL-ovi, placeholderi i nazivi programskih jezika ostavljeni su nepromijenjeni kada su već ispravni.

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

Početni report označio je 242 ključa kao neiskorištena. Nakon provjere uklonjeno je 229 ključeva. Preostalih 13 ključeva pripada API e-mail predlošku i zato su zaštićeni; završni report prikazuje nula neiskorištenih ključeva.

Iznimka su `invitations:email.*` ključevi. Njih koristi API renderer e-maila kroz direktan pristup locale bundleu, a ne React `t()` poziv. Vraćeni su u sve locale datoteke i zaštićeni u report skripti kako ih buduće čišćenje ne bi ponovno uklonilo.

## Politika održavanja

- Produkcijski report ignorira samo testne fixturee, ne stvarne frontend komponente.
- `hr-HR` mora zadržati isti skup ključeva kao `en-US`, uz dodatne CLDR pluralne oblike gdje su potrebni.
- API-izravno korištene locale blokove treba zaštititi u report skripti ili uključiti u skeniranje izvora.
- Nakon svake lokalizacijske izmjene treba pokrenuti sinkronizaciju localea, report, typecheck i web testove.
