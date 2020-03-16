import { uncomment } from "../utilities/uncomment";

test("basic functionality", () => {
	const input = `{
		// @foo bar=5
		// "key": true
	}`;

	expect(uncomment(input)).toMatchSnapshot();
});

test("multiple pragmas", () => {
	const input = `{
		// @foo bar=5
		// "key": true,

		// @baz bar=10
		// "key": true
	}`;

	expect(uncomment(input)).toMatchSnapshot();
});

test("selectors", () => {
	const input = `{
		// @foo bar=5
		// "key": true,

		// @baz bar=10
		// "key": true
	}`;

	expect(uncomment(input, s => Number(s.args.bar) > 5)).toMatchSnapshot();
});

test("objects", () => {
	const input = `{
		// @foo bar=5
		// "key": {
		// 	"key": true
		// }
	}`;

	expect(uncomment(input)).toMatchSnapshot();
});

test("arrays", () => {
	const input = `{
		// @foo bar=5
		// "key": [
		// 	{ "key": true }
		// ]
	}`;

	expect(uncomment(input)).toMatchSnapshot();
});

test("nested objects", () => {
	const input = `{
		// @foo bar=5
		// "key": {
		// 	"key": {
		// 		"key": true
		// 	}
		// }
	}`;

	expect(uncomment(input)).toMatchSnapshot();
});

test("nested arrays", () => {
	const input = `{
		// @foo bar=5
		// "key": [
		// 	[
		// 		{ "key": true }
		// 	]
		// ]
	}`;

	expect(uncomment(input)).toMatchSnapshot();
});

test("object in array", () => {
	const input = `{
		"key": [
			// @foo bar=5
			// {
			// 	"key": true
			// },
			{
				"key": true
			}
		]
	}`;

	expect(uncomment(input)).toMatchSnapshot();
});

test("partially uncommented", () => {
	const input = `{
		// @foo bar=5
		// "key": true,

		// @foo bar=6
		"key2": false
	}`;

	expect(uncomment(input)).toMatchSnapshot();
});

test("4-space indentation", () => {
	const input = `{
			// @foo bar=5
			// "key": true,

			// @foo bar=6
			// "key2": [
			// 	{ "key": true }
			// ]
	}`;

	expect(uncomment(input)).toMatchSnapshot();
});

test("mixed indentation", () => {
	const input = `{
		// @foo bar=5
		// "key": true,

			// @foo bar=6
			// "key2": [
			//   { "key": true }
			// ]
	}`;

	expect(uncomment(input)).toMatchSnapshot();
});

test("no indentation", () => {
	const input = `{
// @foo bar=5
// "key": true,

// @foo bar=6
// "key2": [
// { "key": true }
// ]
}`;

	expect(uncomment(input)).toMatchSnapshot();
});
