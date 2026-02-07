import { discoverProject } from "./project/discoverProject";
import { enumerateFiles } from "./project/enumerateFiles";
import {buildGraph} from "./graph/buildGraph";

export type ScanResult = {
  path: string;
  findings: Array<{
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

  return {
    path,
    findings: [],
    stats: {
      totalFiles: files.sourceFiles.length,
      tsconfigPath: discovered.tsconfigPath
    }
  }
}
