export type SymbolNode = {
    name: string;
    filePath: string;
    kind: SymbolKind;
    line: number;
}

export type SymbolReference = {
    filePath: string;
    line: number;
}

export type ProjectGraph = {
    nodes: SymbolNode[];
    references: Map<SymbolNode, SymbolReference[]>;
}

export type SymbolKind = "function" | "class" | "variable" | "type" | "interface" | "enum" | "unknown";