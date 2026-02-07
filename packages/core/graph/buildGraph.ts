import { SourceFile, Node } from "ts-morph";
import {ProjectGraph, SymbolKind, SymbolNode, SymbolReference} from "./types";

export function buildGraph (files: SourceFile[]): ProjectGraph {
    const nodes: SymbolNode[] = [];
    const references = new Map<SymbolNode, SymbolReference[]>();

    files.forEach(file => {
        file.getExportedDeclarations().forEach((declarations, name) =>{
            declarations.forEach(declaration => {
                const node: SymbolNode = {
                    name: name,
                    filePath: file.getFilePath(),
                    line: declaration.getStartLineNumber(),
                    kind: getKind(declaration),
                }

                const refs: SymbolReference[] = [];

                if (Node.isReferenceFindable(declaration)) {
                    for (const refSymbol of declaration.findReferences()) {
                        for (const ref of refSymbol.getReferences()) {
                            if (!ref.isDefinition()) {
                                refs.push({
                                    filePath: ref.getSourceFile().getFilePath(),
                                    line: ref.getSourceFile().getLineAndColumnAtPos(ref.getTextSpan().getStart()).line,
                                });
                            }
                        }
                    }
                }
                nodes.push(node);
                references.set(node, refs);
            })
        })
    })

    nodes.sort((a, b) => a.filePath.localeCompare(b.filePath) || a.name.localeCompare(b.name));
    return {nodes, references};

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