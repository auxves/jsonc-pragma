import { uncomment } from "~/utilities/uncomment";

test("basic functionality", () => {
  const input = `{
    // @foo bar=5
    // "key": true
  }`;

  const expected = `{
    // @foo bar=5
    "key": true
  }`;

  const output = uncomment(input);

  expect(output).toBe(expected);
});

test("multiple pragmas", () => {
  const input = `{
    // @foo bar=5
    // "key": true,

    // @baz bar=10
    // "key": true
  }`;

  const expected = `{
    // @foo bar=5
    "key": true,

    // @baz bar=10
    "key": true
  }`;

  const output = uncomment(input);

  expect(output).toBe(expected);
});

test("selectors", () => {
  const input = `{
    // @foo bar=5
    // "key": true,

    // @baz bar=10
    // "key": true
  }`;

  const expected = `{
    // @foo bar=5
    // "key": true,

    // @baz bar=10
    "key": true
  }`;

  const output = uncomment(input, section => Number(section.args.bar) > 5);

  expect(output).toBe(expected);
});

test("objects", () => {
  const input = `{
    // @foo bar=5
    // "key": {
    //   "key": true
    // }
  }`;

  const expected = `{
    // @foo bar=5
    "key": {
      "key": true
    }
  }`;

  const output = uncomment(input);

  expect(output).toBe(expected);
});

test("arrays", () => {
  const input = `{
    // @foo bar=5
    // "key": [
    //   { "key": true }
    // ]
  }`;

  const expected = `{
    // @foo bar=5
    "key": [
      { "key": true }
    ]
  }`;

  const output = uncomment(input);

  expect(output).toBe(expected);
});

test("nested objects", () => {
  const input = `{
    // @foo bar=5
    // "key": {
    //   "key": {
    //     "key": true
    //   }
    // }
  }`;

  const expected = `{
    // @foo bar=5
    "key": {
      "key": {
        "key": true
      }
    }
  }`;

  const output = uncomment(input);

  expect(output).toBe(expected);
});

test("nested arrays", () => {
  const input = `{
    // @foo bar=5
    // "key": [
    //   [
    //     { "key": true }
    //   ]
    // ]
  }`;

  const expected = `{
    // @foo bar=5
    "key": [
      [
        { "key": true }
      ]
    ]
  }`;

  const output = uncomment(input);

  expect(output).toBe(expected);
});

test("object in array", () => {
  const input = `{
    "key": [
      // @foo bar=5
      // {
      //   "key": true
      // },
      {
        "key": true
      }
    ]
  }`;

  const expected = `{
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

  const output = uncomment(input);

  expect(output).toBe(expected);
});
