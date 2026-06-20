import { jurisdictions, type JurisdictionInfo } from "@/lib/policy/jurisdictions";

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 border-blue-200 text-blue-800",
  indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
  red: "bg-red-50 border-red-200 text-red-800",
  green: "bg-green-50 border-green-200 text-green-800",
  yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
  orange: "bg-orange-50 border-orange-200 text-orange-800",
  black: "bg-gray-100 border-gray-300 text-gray-800",
  gray: "bg-gray-50 border-gray-200 text-gray-600",
};

export function JurisdictionCard({ j }: { j: JurisdictionInfo }) {
  const c = colorMap[j.color] || colorMap.gray;
  return (
    <div className={`border rounded-lg p-4 ${c}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{j.flag}</span>
        <h4 className="font-semibold text-sm">{j.country}</h4>
      </div>
      <p className="text-xs opacity-80 mb-2">{j.law}</p>
      <p className="text-xs mb-2">
        <span className="font-medium">Breach notice:</span> {j.breachNotify}
      </p>
      {j.dataLocalization && (
        <span className="inline-block text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded">
          🇺🇸 Data localization required
        </span>
      )}
    </div>
  );
}

export function JurisdictionGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {jurisdictions.map(j => (
        <JurisdictionCard key={j.country} j={j} />
      ))}
    </div>
  );
}

export function RightToKnowTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Country</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Governing Law</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Consent Age</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Breach Notice</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Data Localization</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {jurisdictions.map((j, i) => (
            <tr key={j.country} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="mr-1">{j.flag}</span> {j.country}
              </td>
              <td className="px-4 py-3 text-xs">{j.law}</td>
              <td className="px-4 py-3 whitespace-nowrap">{j.consentAge}+</td>
              <td className="px-4 py-3 text-xs">{j.breachNotify}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                {j.dataLocalization ? (
                  <span className="text-red-600 font-medium">Required</span>
                ) : (
                  <span className="text-gray-500">Not required</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
