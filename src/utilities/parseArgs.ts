import { IArguments } from "../models/arguments";

export function parseArgs(match: string | null): IArguments {
	if (!match) return {};

	return Object.fromEntries([
		...new (typeof URLSearchParams === "undefined"
			? require("url").URLSearchParams
			: URLSearchParams)(match.replace(/\s(\w*?=)/, "&$1"))
	]);
}
