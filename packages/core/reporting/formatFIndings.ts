import {ScanResult} from "../index";
import * as path from "node:path";

export function formatJSON(result: ScanResult): string {
    return JSON.stringify(result, null, 2);
}

export function formatPretty(result: ScanResult): string {
    const lines: string[] = [];
    lines.push(`Dead Code Radar - ${result.stats.totalFiles} files scanned`);
    lines.push(`${result.findings.length} issues found`);

    const sorted = [...result.findings].sort((a, b) => b.confidence - a.confidence);
    sorted.forEach(item => {

        const relativePath = path.relative(result.path, item.filePath);
        if (item.type === "unreferenced-export") {
            lines.push(`  [${item.confidence}%] Export '${item.name}' (${item.kind}) in ${relativePath} is never referenced`);
        } else {
            lines.push(`  [${item.confidence}%] ${item.message}`);
        }
        item.reasons.forEach(reason => {
            lines.push(`    → ${reason}`);
        });

    })
    return lines.join('\n');
}