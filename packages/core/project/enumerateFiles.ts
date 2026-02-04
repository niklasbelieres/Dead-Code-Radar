import { Project, SourceFile } from "ts-morph";

export type EnumeratedFiles = {
  sourceFiles: SourceFile[];
};

export function enumerateFiles(project: Project): EnumeratedFiles {
  const sourceFiles = project.getSourceFiles();
  return { sourceFiles };
}
