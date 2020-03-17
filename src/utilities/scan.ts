import matchBracket from "match-bracket";
import { ISection } from "../models/section";
import { parseArgs } from "./parseArgs";

function isRegular(line: string) {
	if (/[{[]$/.test(line.trim())) return false;

	return true;
}

/**
 * @param contents The contents of your JSON file
 */
export function scan(contents: string): ISection[] {
	const pragmaRegex = /\s*\/\/\s@(?<name>[a-zA-Z\d]+)(\s(?<args>.*))?$/;

	const lines = contents.split("\n");

	const linesWithPragmas = lines.filter(line => pragmaRegex.test(line));

	return linesWithPragmas.map<ISection>(line => {
		const startingLineNumber = lines.indexOf(line) + 1;
		const startingLine = lines[startingLineNumber];

		const match = pragmaRegex.exec(line)!;

		const groups = match.groups ? match.groups : { args: null, name: "" };

		if (isRegular(startingLine)) {
			return {
				start: startingLineNumber,
				end: startingLineNumber,
				args: parseArgs(groups.args),
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
			args: parseArgs(groups.args),
			name: groups.name
		};
	});
}
