import * as path from "node:path";
import {discoverProject} from "../../packages/core/project/discoverProject";
import {enumerateFiles} from "../../packages/core/project/enumerateFiles";
import {buildGraph} from "../../packages/core/graph/buildGraph";
import {analyzeUnreferencedExports} from "../../packages/core/analyzers/unreferencedExports";

describe("UnreferencedExports", () => {
    it("should return unreferenced exports", () => {
        const fixture = path.resolve(__dirname, "../fixtures/graph-basic");
        const discovered = discoverProject(fixture);
        const files = enumerateFiles(discovered.project);
        const graph = buildGraph(files.sourceFiles);
        const findings = analyzeUnreferencedExports(graph);

        expect(findings).toHaveLength(1);
        expect(findings[0].type).toBe("unreferenced-export");
        expect(findings[0].message).toContain("unused");

        expect(findings.some(f => f.message.includes("add"))).toBe(false);

    })
})