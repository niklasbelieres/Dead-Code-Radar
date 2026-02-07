import { discoverProject } from "../../packages/core/project/discoverProject";
import { enumerateFiles } from "../../packages/core/project/enumerateFiles";
import { buildGraph } from "../../packages/core/graph/buildGraph";
import * as path from "node:path";


describe("buildGraph", () => {
    it("finds references for used exports and none for unused", () => {
        const fixture = path.resolve(__dirname, "../fixtures/graph-basic");
        const discovered = discoverProject(fixture);
        const files = enumerateFiles(discovered.project);
        const graph = buildGraph(files.sourceFiles);

        const addNode = graph.nodes.find(n => n.name === "add");
        const unusedNode = graph.nodes.find(n => n.name === "unused");

        expect(addNode).toBeDefined();
        expect(unusedNode).toBeDefined();

        expect(graph.references.get(addNode!)!.length).toBeGreaterThan(0);
        expect(graph.references.get(unusedNode!)!.length).toBe(0);
    });
});