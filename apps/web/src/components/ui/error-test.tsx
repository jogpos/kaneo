import { ErrorDisplay } from "./error-display";
import { useTranslation } from "react-i18next";

export function ErrorTest() {
  const { t } = useTranslation();
  const testError = new Error(
    "Neuspjelo povezivanje s API serverom na https://api.andrej.com. To može biti zbog CORS postavki ili zato što server ne radi. Provjerite varijable okruženja i status servera.",
  );

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        {t("common:errorTest.title")}
      </h2>
      <ErrorDisplay
        error={testError}
        title={t("common:errorTest.testErrorTitle")}
        className="min-h-[300px]"
      />
    </div>
  );
}
