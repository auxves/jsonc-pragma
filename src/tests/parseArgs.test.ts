import { parseArgs } from "../utilities/parseArgs";

test("basic functionality", () => {
	expect(parseArgs("abc=5")).toMatchSnapshot();
	expect(parseArgs("abc=hello")).toMatchSnapshot();
	expect(parseArgs(null)).toMatchSnapshot();
});
