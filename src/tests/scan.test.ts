import { scan } from "../utilities/scan";

test("basic functionality", () => {
	const input = `{
		// @foo bar=5
		"key": true
	}`;

	const output = scan(input);

	expect(output.length).toMatchSnapshot();

	expect(output[0].args).toMatchSnapshot();
	expect(output[0].name).toMatchSnapshot();

	expect(output[0].start).toMatchSnapshot();
	expect(output[0].end).toMatchSnapshot();
});

test("empty pragma", () => {
	const input = `{
		// @ bar=5
		"key": true
	}`;

	const output = scan(input);

	expect(output.length).toMatchSnapshot();
});

test("non-alphanumeric pragma", () => {
	const input = `{
		// @? bar=5
		"key": true
	}`;

	const output = scan(input);

	expect(output.length).toMatchSnapshot();
});

test("numeric pragma", () => {
	const input = `{
		// @1 bar=5
		"key": true
	}`;

	const output = scan(input);

	expect(output.length).toMatchSnapshot();

	expect(output[0].args).toMatchSnapshot();
	expect(output[0].name).toMatchSnapshot();
});

test("multiple arguments", () => {
	const input = `{
		// @foo bar=5 baz=6
		"key": true
	}`;

	const output = scan(input);

	expect(output.length).toMatchSnapshot();

	expect(output[0].args).toMatchSnapshot();
	expect(output[0].name).toMatchSnapshot();

	expect(output[0].start).toMatchSnapshot();
	expect(output[0].end).toMatchSnapshot();
});

test("arguments with spaces", () => {
	const input = `{
		// @foo bar=arg with spaces! baz=6
		"key": true
	}`;

	const output = scan(input);

	expect(output.length).toMatchSnapshot();

	expect(output[0].args).toMatchSnapshot();
	expect(output[0].name).toMatchSnapshot();

	expect(output[0].start).toMatchSnapshot();
	expect(output[0].end).toMatchSnapshot();
});

test("no arguments", () => {
	const input = `{
		// @foo
		"key": true
	}`;

	const output = scan(input);

	expect(output.length).toMatchSnapshot();

	expect(output[0].args).toMatchSnapshot();
	expect(output[0].name).toMatchSnapshot();

	expect(output[0].start).toMatchSnapshot();
	expect(output[0].end).toMatchSnapshot();
});

test("multiple pragmas", () => {
	const input = `{
		// @foo bar=5
		"key": true,

		// @baz bar=10
		"key2": true
	}`;

	const output = scan(input);

	expect(output.length).toMatchSnapshot();

	expect(output[0].args).toMatchSnapshot();
	expect(output[0].name).toMatchSnapshot();

	expect(output[1].args).toMatchSnapshot();
	expect(output[1].name).toMatchSnapshot();

	expect(output[0].start).toMatchSnapshot();
	expect(output[0].end).toMatchSnapshot();

	expect(output[1].start).toMatchSnapshot();
	expect(output[1].end).toMatchSnapshot();
});

test("objects", () => {
	{
		const input = `{
			// @foo bar=5
			"key": {
				"key": true
			}
		}`;

		const output = scan(input);

		expect(output.length).toMatchSnapshot();

		expect(output[0].args).toMatchSnapshot();
		expect(output[0].name).toMatchSnapshot();

		expect(output[0].start).toMatchSnapshot();
		expect(output[0].end).toMatchSnapshot();
	}

	{
		const input = `{
			"key": {
				// @foo bar=5
				"key": true
			}
		}`;

		const output = scan(input);

		expect(output.length).toMatchSnapshot();

		expect(output[0].args).toMatchSnapshot();
		expect(output[0].name).toMatchSnapshot();

		expect(output[0].start).toMatchSnapshot();
		expect(output[0].end).toMatchSnapshot();
	}
});

test("arrays", () => {
	{
		const input = `{
			// @foo bar=5
			"key": [
				{ "key": true }
			]
		}`;

		const output = scan(input);

		expect(output.length).toMatchSnapshot();

		expect(output[0].args).toMatchSnapshot();
		expect(output[0].name).toMatchSnapshot();

		expect(output[0].start).toMatchSnapshot();
		expect(output[0].end).toMatchSnapshot();
	}

	{
		const input = `{
			"key": [
				// @foo bar=5
				{ "key": true }
			]
		}`;

		const output = scan(input);

		expect(output.length).toMatchSnapshot();

		expect(output[0].args).toMatchSnapshot();
		expect(output[0].name).toMatchSnapshot();

		expect(output[0].start).toMatchSnapshot();
		expect(output[0].end).toMatchSnapshot();
	}
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

		const output = scan(input);

		expect(output.length).toMatchSnapshot();

		expect(output[0].args).toMatchSnapshot();
		expect(output[0].name).toMatchSnapshot();

		expect(output[0].start).toMatchSnapshot();
		expect(output[0].end).toMatchSnapshot();
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

		const output = scan(input);

		expect(output.length).toMatchSnapshot();

		expect(output[0].args).toMatchSnapshot();
		expect(output[0].name).toMatchSnapshot();

		expect(output[0].start).toMatchSnapshot();
		expect(output[0].end).toMatchSnapshot();
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

		const output = scan(input);

		expect(output.length).toMatchSnapshot();

		expect(output[0].args).toMatchSnapshot();
		expect(output[0].name).toMatchSnapshot();

		expect(output[0].start).toMatchSnapshot();
		expect(output[0].end).toMatchSnapshot();
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

		const output = scan(input);

		expect(output.length).toMatchSnapshot();

		expect(output[0].args).toMatchSnapshot();
		expect(output[0].name).toMatchSnapshot();

		expect(output[0].start).toMatchSnapshot();
		expect(output[0].end).toMatchSnapshot();
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

	const output = scan(input);

	expect(output.length).toMatchSnapshot();

	expect(output[0].args).toMatchSnapshot();
	expect(output[0].name).toMatchSnapshot();

	expect(output[0].start).toMatchSnapshot();
	expect(output[0].end).toMatchSnapshot();
});
