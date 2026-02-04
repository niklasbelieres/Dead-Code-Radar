import { scan } from "@deadcode-radar/core";

type CliArgs = {
    command: string;
    path: string;
    format: "pretty" | "json";
    minConfidence: number | null;
};

function parseArgs(argv: string[]): CliArgs {
    const [, , command, ...rest] = argv;

    let path = ".";
    let format : "pretty" | "json" = "json";
    let minConfidence: number | null = null;

    for (let i= 0; i < rest.length; i++) {
      const arg = rest[i];

      if (arg == "--format") {
        const value = rest[i + 1];
        if (value === "json") format = "json";
        i++;
      }

      if (arg == "--min-confidence") {
        const value = rest[i + 1];
        if (value) minConfidence = Number(value);
        i++;
      }

      if (!arg.startsWith("-")) {
        path = arg;
      }
    }

    return {command: command ?? null, path, format, minConfidence};
}

function printUsage(){
  console.log("Usage: deadcode-radar scan [path] [--format json] [--min-confidence N]");
}

const args = parseArgs(process.argv);

if (args.command != "scan"){
  printUsage();
  process.exit(1);
}

const result = scan(args.path);

if (args.format === "json"){
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(`Scanning: ${result.path}`)
  console.log(`Findings: ${result.findings.length}`)
}