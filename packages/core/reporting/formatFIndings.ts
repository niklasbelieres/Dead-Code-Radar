import {ScanResult} from "../index";

export function formatJSON(result: ScanResult): string {
    return JSON.stringify(result, null, 2);
}

export function formatPretty(result: ScanResult): string {
    const lines: string[] = [];
    lines.push(`Dead Code Radar - ${result.stats.totalFiles} files scanned`);
    lines.push(`${result.findings.length} issues found`);

    const sorted = [...result.findings].sort((a, b) => b.confidence - a.confidence);
    sorted.forEach(item => {
        lines.push(`  [${item.confidence}%] ${item.message}`);
        item.reasons.forEach(reason => {
            lines.push(`    → ${reason}`);
        })
    })
    return lines.join('\n');
}