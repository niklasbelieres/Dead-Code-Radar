import { SourceFile } from "ts-morph";
import {SymbolKind, SymbolNode} from "./types";
import { Node } from "ts-morph";

export function collectExports(files: SourceFile[]): SymbolNode[] {
    const nodes: SymbolNode[] = [];
    files.forEach(file => {
        file.getExportedDeclarations().forEach((declerations, name) => {
            declerations.forEach(declaration => {
                nodes.push({
                    name,
                    filePath: file.getFilePath(),
                    line: declaration.getStartLineNumber(),
                    kind: getKind(declaration),
                })
            })
        })
    })
    nodes.sort((a, b) => a.filePath.localeCompare(b.filePath) || a.name.localeCompare(b.name));
    return nodes;
}

function getKind(node: Node): SymbolKind {
    if (Node.isFunctionDeclaration(node)) return "function";
    if (Node.isClassDeclaration(node)) return "class";
    if (Node.isVariableDeclaration(node)) return "variable";
    if (Node.isTypeAliasDeclaration(node)) return "type";
    if (Node.isInterfaceDeclaration(node)) return "interface";
    if (Node.isEnumDeclaration(node)) return "enum";
    return "unknown";
}