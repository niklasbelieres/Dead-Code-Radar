import { ProjectGraph } from "../graph/types";
import {ScanResult} from "../index";

export function analyzeUnreferencedExports(graph: ProjectGraph) {

    const findings: ScanResult["findings"] = [];

    graph.nodes.forEach(node => {
        const refs = graph.references.get(node);
        if(!refs || refs.length === 0) {
                findings.push({
                    type: "unreferenced-export",
                    message: `Export ${node.name} (${node.kind}) in ${node.filePath} is never referenced.`,
                    confidence: 100,
                    reasons: [`No references found to ${node.kind} ${node.name} declared at line ${node.line}`]
                })
        }
    })

    return findings;
}