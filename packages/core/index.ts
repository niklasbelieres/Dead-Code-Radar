import { discoverProject } from "./project/discoverProject";
import { enumerateFiles } from "./project/enumerateFiles";
import { buildGraph } from "./graph/buildGraph";
import { analyzeUnreferencedExports } from "./analyzers/unreferencedExports";
import { scoreFindings } from "./scoring/scoreFindings";
export { formatPretty, formatJSON } from "./reporting/formatFIndings";

export type ScanResult = {
  path: string;
  findings: Array<{
    filePath: string;
    name: string;
    kind: string;
    type: string;
    message: string;
    confidence: number;
    reasons: string[];
  }>
  stats: {
    totalFiles: number;
    tsconfigPath: string;
  }
}

export function scan(path: string): ScanResult {
  const discovered = discoverProject(path);
  const files = enumerateFiles(discovered.project);
  const graph = buildGraph(files.sourceFiles);
  const findings = analyzeUnreferencedExports(graph);
  const scored = scoreFindings(findings);

  return {
    path,
    findings: scored,
    stats: {
      totalFiles: files.sourceFiles.length,
      tsconfigPath: discovered.tsconfigPath
    }
  }
}
