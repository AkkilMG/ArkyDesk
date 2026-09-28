import { jurisdictions, type JurisdictionInfo } from "@/lib/policy/jurisdictions";

/**
 * Neutral, token-based jurisdiction displays for the /policy pages.
 * Replaces the earlier per-country colour coding — policy documents in this
 * codebase are monochrome by house rule, with status colour reserved for
 * real status (e.g. the data-localization marker).
 */
export function JurisdictionCard({ j }: { j: JurisdictionInfo }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xl" aria-hidden>
          {j.flag}
        </span>
        <h4 className="text-sm font-semibold text-foreground">{j.country}</h4>
      </div>
      <p className="mb-2 text-xs leading-relaxed text-muted-foreground">{j.law}</p>
      <p className="mb-2 text-xs text-foreground/80">
        <span className="font-medium">Breach notice:</span> {j.breachNotify}
      </p>
      {j.dataLocalization && (
        <span className="badge-destructive">
          {j.flag} Data localization required
        </span>
      )}
    </div>
  );
}

export function JurisdictionGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {jurisdictions.map((j) => (
        <JurisdictionCard key={j.country} j={j} />
      ))}
    </div>
  );
}

export function RightToKnowTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-border text-sm">
        <thead className="bg-muted">
          <tr>
            <th scope="col" className="px-4 py-3 text-left font-semibold text-foreground">Country</th>
            <th scope="col" className="px-4 py-3 text-left font-semibold text-foreground">Governing Law</th>
            <th scope="col" className="px-4 py-3 text-left font-semibold text-foreground">Consent Age</th>
            <th scope="col" className="px-4 py-3 text-left font-semibold text-foreground">Breach Notice</th>
            <th scope="col" className="px-4 py-3 text-left font-semibold text-foreground">Data Localization</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-card">
          {jurisdictions.map((j) => (
            <tr key={j.country} className="transition-colors hover:bg-muted/50">
              <td className="whitespace-nowrap px-4 py-3">
                <span className="mr-1" aria-hidden>
                  {j.flag}
                </span>{" "}
                {j.country}
              </td>
              <td className="px-4 py-3 text-xs text-foreground/80">{j.law}</td>
              <td className="whitespace-nowrap px-4 py-3 text-foreground/80">{j.consentAge}+</td>
              <td className="px-4 py-3 text-xs text-foreground/80">{j.breachNotify}</td>
              <td className="whitespace-nowrap px-4 py-3">
                {j.dataLocalization ? (
                  <span className="font-medium text-destructive">Required</span>
                ) : (
                  <span className="text-muted-foreground">Not required</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
