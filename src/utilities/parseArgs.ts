import { IArguments } from "../models/arguments";

export function parseArgs(match: string | null): IArguments {
	if (!match) return {};

	const entries = [
		...new (typeof URLSearchParams === "undefined"
			? require("url").URLSearchParams
			: URLSearchParams)(match.replace(/\s(\w*?=)/, "&$1"))
	];

	return entries.reduce(
		(acc, [k, v]) => ({
			...acc,
			[k]: v
		}),
		{}
	);
}
