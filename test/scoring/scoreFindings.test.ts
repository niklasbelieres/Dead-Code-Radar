import * as path from "node:path";
import { discoverProject } from "../../packages/core/project/discoverProject";
import { enumerateFiles } from "../../packages/core/project/enumerateFiles";
import { buildGraph } from "../../packages/core/graph/buildGraph";
import { analyzeUnreferencedExports } from "../../packages/core/analyzers/unreferencedExports";
import { scoreFindings } from "../../packages/core/scoring/scoreFindings";

describe("scoreFindings", () => {
    it("lowers confidence for exports in index.ts", () => {
        const fixture = path.resolve(__dirname, "../fixtures/scoring-basic");
        const discovered = discoverProject(fixture);
        const files = enumerateFiles(discovered.project);
        const graph = buildGraph(files.sourceFiles);
        const findings = analyzeUnreferencedExports(graph);
        const scored = scoreFindings(findings);

        const indexFinding = scored.find(f => f.filePath.endsWith("index.ts"));
        const utilsFinding = scored.find(f => f.filePath.endsWith("utils.ts"));

        expect(indexFinding).toBeDefined();
        expect(utilsFinding).toBeDefined();

        expect(indexFinding!.confidence).toBe(50);
        expect(utilsFinding!.confidence).toBe(100);
    });
});