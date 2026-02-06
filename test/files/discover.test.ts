import { discoverProject } from "../../packages/core/project/discoverProject";
import * as path from "node:path";
import * as fs from "node:fs";
import * as os from "node:os";

    test("finds nearest tsconfig.json", () => {
        const fixtureRoot = path.resolve("test/fixtures/discovery-basic");
        const testDiscoverProject = discoverProject(path.join(fixtureRoot, "src"));
        expect(testDiscoverProject.tsconfigPath).toBe(path.join(fixtureRoot, "tsconfig.json"));
        expect(testDiscoverProject.rootDir).toBe(fixtureRoot);
    })

    test("throws error when no tsconfig.json is found", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "dcr-no-tsconfig-"));
        try {
             expect(() => discoverProject(tmp)).toThrow("tsconfig.json not found");
        } finally {
             fs.rmSync(tmp, { recursive: true, force: true });
    }
    })