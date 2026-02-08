import {ScanResult} from "../index";

export function scoreFindings(findings: ScanResult["findings"]): ScanResult["findings"] {
    return findings.map(finding => {
        if (finding.filePath.endsWith("index.ts")) {
            return {
                ...finding,
                confidence: 50,
                reasons: [...finding.reasons, "Export is in an index.ts file (likely public API)"]
            }
        }
        return finding;
    })
}