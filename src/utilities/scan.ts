import matchBracket from "match-bracket";
import { URLSearchParams } from "url";
import { IArguments, ISection } from "~/models";

function getArgs(str: string | null): IArguments {
  if (!str) return {};

  return [...new URLSearchParams(str.replace(/\s(\w*?=)/, "&$1"))].reduce<any>(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value
    }),
    {}
  );
}

function isRegular(line: string) {
  if (/[{\[]$/.test(line.trim())) return false;

  return true;
}

/**
 * @param contents The contents of your JSON file
 */
export function scan(contents: string | Buffer): ISection[] {
  const pragmaRegex = /\s*\/\/\s@(?<name>\w+)(\s(?<args>.*))?$/;

  const lines = contents.toString().split("\n");

  const linesWithPragmas = lines.filter(line => pragmaRegex.test(line));

  return linesWithPragmas.map<ISection>(line => {
    const startingLineNumber = lines.indexOf(line) + 1;
    const startingLine = lines[startingLineNumber];

    const groups = line.match(pragmaRegex)?.groups ?? { args: null, name: "" };

    if (isRegular(startingLine)) {
      return {
        start: startingLineNumber,
        end: startingLineNumber,
        args: getArgs(groups.args),
        name: groups.name
      };
    }

    const startingBracketPos = {
      line: startingLineNumber + 1,
      cursor: startingLine.trimEnd().length
    };

    const endingLineNumber =
      matchBracket(contents.toString(), startingBracketPos).line - 1;

    return {
      start: startingLineNumber,
      end: endingLineNumber,
      args: getArgs(groups.args),
      name: groups.name
    };
  });
}
