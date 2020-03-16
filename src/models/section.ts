import { IArguments } from "./arguments";

export interface ISection {
	start: number;
	end: number;
	args: IArguments;
	name: string;
}
