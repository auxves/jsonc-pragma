import { IArguments } from "../models/arguments";

export function parseArgs(match: string | null): IArguments {
	if (!match) return {};

	const entries = Array.from(
		new URLSearchParams(match.replace(/\s(\w*?=)/, "&$1"))
	);

	return entries.reduce(
		(acc, [key, value]) => ({
			...acc,
			[key]: value
		}),
		{}
	);
}
