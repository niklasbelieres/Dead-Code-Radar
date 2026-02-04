import * as fs from "fs";
import * as path from "path";
import { Project } from "ts-morph";

export type DiscoveredProject = {
  rootDir: string;
  tsconfigPath: string;
  project: Project;
};

export function discoverProject(startDir: string): DiscoveredProject {
  const tsconfigPath = findNearestTsconfig(startDir);

  const project = new Project({
    tsConfigFilePath: tsconfigPath
  })

  return {
    rootDir: path.dirname(tsconfigPath),
    tsconfigPath,
    project
  }
}

function findNearestTsconfig(startDir: string): string {
  let current = path.resolve(startDir);

  while (true) {
    const candidate = path.join(current, "tsconfig.json");
    if (fs.existsSync(candidate)) {
      return candidate;
    }

    const parent = path.dirname(current);
    if (parent === current) {
      break;
    }

    current = parent;
  }

  throw new Error("tsconfig.json not found in current or parent directories.");
}
