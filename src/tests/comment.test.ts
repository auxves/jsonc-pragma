import { comment } from "~/utilities/comment";

test("basic functionality", () => {
	const input = `{
		// @foo bar=5
		"key": true
	}`;

	const expected = `{
		// @foo bar=5
		// "key": true
	}`;

	expect(comment(input)).toBe(expected);
});

test("multiple pragmas", () => {
	const input = `{
		// @foo bar=5
		"key": true,

		// @baz bar=10
		"key": true
	}`;

	const expected = `{
		// @foo bar=5
		// "key": true,

		// @baz bar=10
		// "key": true
	}`;

	expect(comment(input)).toBe(expected);
});

test("selectors", () => {
	const input = `{
		// @foo bar=5
		"key": true,

		// @foo bar=10
		"key": true
	}`;

	const expected = `{
		// @foo bar=5
		"key": true,

		// @foo bar=10
		// "key": true
	}`;

	expect(comment(input, section => Number(section.args.bar) > 5)).toBe(
		expected
	);
});

test("objects", () => {
	const input = `{
		// @foo bar=5
		"key": {
			"key": true
		}
	}`;

	const expected = `{
		// @foo bar=5
		// "key": {
		// 	"key": true
		// }
	}`;

	expect(comment(input)).toBe(expected);
});

test("arrays", () => {
	const input = `{
		// @foo bar=5
		"key": [
			{ "key": true }
		]
	}`;

	const expected = `{
		// @foo bar=5
		// "key": [
		// 	{ "key": true }
		// ]
	}`;

	expect(comment(input)).toBe(expected);
});

test("nested objects", () => {
	{
		const input = `{
			// @foo bar=5
			"key": {
				"key": {
					"key": true
				}
			}
		}`;

		const expected = `{
			// @foo bar=5
			// "key": {
			// 	"key": {
			// 		"key": true
			// 	}
			// }
		}`;

		expect(comment(input)).toBe(expected);
	}

	{
		const input = `{
			"key": {
				// @foo bar=5
				"key": {
					"key": true
				}
			}
		}`;

		const expected = `{
			"key": {
				// @foo bar=5
				// "key": {
				// 	"key": true
				// }
			}
		}`;

		expect(comment(input)).toBe(expected);
	}
});

test("nested arrays", () => {
	{
		const input = `{
			// @foo bar=5
			"key": [
				[
					{ "key": true }
				]
			]
		}`;

		const expected = `{
			// @foo bar=5
			// "key": [
			// 	[
			// 		{ "key": true }
			// 	]
			// ]
		}`;

		expect(comment(input)).toBe(expected);
	}

	{
		const input = `{
			"key": [
				// @foo bar=5
				[
					{ "key": true }
				]
			]
		}`;

		const expected = `{
			"key": [
				// @foo bar=5
				// [
				// 	{ "key": true }
				// ]
			]
		}`;

		expect(comment(input)).toBe(expected);
	}
});

test("object in array", () => {
	const input = `{
		"key": [
			// @foo bar=5
			{
				"key": true
			},
			{
				"key": true
			}
		]
	}`;

	const expected = `{
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

	expect(comment(input)).toBe(expected);
});

test("partially commented", () => {
	const input = `{
		// @foo bar=5
		// "key": true,

		// @foo bar=6
		"key2": false
	}`;

	const expected = `{
		// @foo bar=5
		// "key": true,

		// @foo bar=6
		// "key2": false
	}`;

	expect(comment(input)).toBe(expected);
});

test("mixed indentation", () => {
	const input = `{
		// @foo bar=5
		"key": true,

			// @foo bar=6
			"key2": [
				{ "key": true }
			]
	}`;

	const expected = `{
		// @foo bar=5
		// "key": true,

			// @foo bar=6
			// "key2": [
			// 	{ "key": true }
			// ]
	}`;

	expect(comment(input)).toBe(expected);
});

test("no indentation", () => {
	const input = `{
// @foo bar=5
"key": true,

// @foo bar=6
"key2": [
{ "key": true }
]
}`;

	const expected = `{
// @foo bar=5
// "key": true,

// @foo bar=6
// "key2": [
// { "key": true }
// ]
}`;

	expect(comment(input)).toBe(expected);
});
