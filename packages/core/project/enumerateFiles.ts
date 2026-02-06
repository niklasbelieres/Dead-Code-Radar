import { Project, SourceFile } from "ts-morph";

const IGNORED_SUFFIXES = [
    ".test.",
    ".spec.",
    ".stories.",
];

const IGNORED_EXTENSIONS = [
    ".d.ts",
    ".d.tsx",
];

export type EnumeratedFiles = {
  sourceFiles: SourceFile[];
};

function isIgnored(filePath: string): boolean{
    return IGNORED_SUFFIXES.some(s => filePath.includes(s))
        || IGNORED_EXTENSIONS.some(ext => filePath.endsWith(ext));
}

export function enumerateFiles(project: Project): EnumeratedFiles {
  const sourceFiles = project.getSourceFiles()
      .filter(file => !isIgnored(file.getFilePath()))
      .sort((a,b) => a.getFilePath().localeCompare(b.getFilePath()));
  return { sourceFiles };
}
