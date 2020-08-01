import { comment } from "../src/utilities/comment";

test("basic functionality", () => {
	const input = `{
		// @foo bar=5
		"key": true
	}`;

	expect(comment(input)).toMatchSnapshot();
});

test("multiple pragmas", () => {
	const input = `{
		// @foo bar=5
		"key": true,

		// @baz bar=10
		"key": true
	}`;

	expect(comment(input)).toMatchSnapshot();
});

test("selectors", () => {
	const input = `{
		// @foo bar=5
		"key": true,

		// @foo bar=10
		"key": true
	}`;

	expect(
		comment(input, section => Number(section.args.bar) > 5)
	).toMatchSnapshot();
});

test("objects", () => {
	const input = `{
		// @foo bar=5
		"key": {
			"key": true
		}
	}`;

	expect(comment(input)).toMatchSnapshot();
});

test("arrays", () => {
	const input = `{
		// @foo bar=5
		"key": [
			{ "key": true }
		]
	}`;

	expect(comment(input)).toMatchSnapshot();
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

		expect(comment(input)).toMatchSnapshot();
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

		expect(comment(input)).toMatchSnapshot();
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

		expect(comment(input)).toMatchSnapshot();
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

		expect(comment(input)).toMatchSnapshot();
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

	expect(comment(input)).toMatchSnapshot();
});

test("partially commented", () => {
	const input = `{
		// @foo bar=5
		// "key": true,

		// @foo bar=6
		"key2": false
	}`;

	expect(comment(input)).toMatchSnapshot();
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

	expect(comment(input)).toMatchSnapshot();
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

	expect(comment(input)).toMatchSnapshot();
});
