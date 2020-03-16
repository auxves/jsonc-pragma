import matchBracket from "match-bracket";
import { URLSearchParams } from "url";
import { ISection } from "../models/section";
import { IArguments } from "../models/arguments";

function getArgs(match: string | null): IArguments {
	if (!match) return {};

	return [...new URLSearchParams(match.replace(/\s(\w*?=)/, "&$1"))].reduce(
		(acc, [key, value]) => ({
			...acc,
			[key]: value
		}),
		{}
	);
}

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
