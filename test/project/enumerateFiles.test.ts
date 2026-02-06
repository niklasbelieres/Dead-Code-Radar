import { discoverProject } from "../../packages/core/project/discoverProject";
import { enumerateFiles } from "../../packages/core/project/enumerateFiles";
import * as path from "node:path";

const fixtureRoot = path.join(__dirname, "..", "fixtures", "enumeration-ignored");

describe("enumerateFiles", () => {
  test("returns only non-ignored source files", () => {
    const { project } = discoverProject(fixtureRoot);
    const result = enumerateFiles(project);
    const fileNames = result.sourceFiles.map(f => path.basename(f.getFilePath()));
    expect(fileNames).toEqual(["index.ts", "unused.ts", "used.ts"]);
  });

  test("returns files in stable, sorted order", () => {
    const { project } = discoverProject(fixtureRoot);
    const result = enumerateFiles(project);
    const fileNames = result.sourceFiles.map(f => path.basename(f.getFilePath()));
    const sorted = [...fileNames].sort();
    expect(fileNames).toEqual(sorted);
  });

  test("respects tsconfig include/exclude", () => {
    const { project } = discoverProject(fixtureRoot);
    const result = enumerateFiles(project);
    const filePaths = result.sourceFiles.map(f => f.getFilePath());
    filePaths.forEach(fp => {
      expect(fp).not.toMatch("/node_modules");
      expect(fp).not.toMatch("/dist/")
    })
  });
});
