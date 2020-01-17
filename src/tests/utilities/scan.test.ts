import { scan } from "~/utilities/scan";

test("basic functionality", () => {
  const input = `{
    // @foo bar=5
    "key": true
  }`;

  const output = scan(input);

  expect(output.length).toBe(1);

  expect(output[0].args).toStrictEqual({ bar: "5" });
  expect(output[0].name).toBe("foo");

  expect(output[0].start).toBe(2);
  expect(output[0].end).toBe(2);
});

test("empty pragma", () => {
  const input = `{
    // @ bar=5
    "key": true
  }`;

  const output = scan(input);

  expect(output.length).toBe(0);
});

test("multiple arguments", () => {
  const input = `{
    // @foo bar=5 baz=6
    "key": true
  }`;

  const output = scan(input);

  expect(output.length).toBe(1);

  expect(output[0].args).toStrictEqual({ bar: "5", baz: "6" });
  expect(output[0].name).toBe("foo");

  expect(output[0].start).toBe(2);
  expect(output[0].end).toBe(2);
});

test("arguments with spaces", () => {
  const input = `{
    // @foo bar=arg with spaces! baz=6
    "key": true
  }`;

  const output = scan(input);

  expect(output.length).toBe(1);

  expect(output[0].args).toStrictEqual({ bar: "arg with spaces!", baz: "6" });
  expect(output[0].name).toBe("foo");

  expect(output[0].start).toBe(2);
  expect(output[0].end).toBe(2);
});

test("no arguments", () => {
  const input = `{
    // @foo
    "key": true
  }`;

  const output = scan(input);

  expect(output.length).toBe(1);

  expect(output[0].args).toStrictEqual({});
  expect(output[0].name).toBe("foo");

  expect(output[0].start).toBe(2);
  expect(output[0].end).toBe(2);
});

test("multiple pragmas", () => {
  const input = `{
    // @foo bar=5
    "key": true,

    // @baz bar=10
    "key2": true
  }`;

  const output = scan(input);

  expect(output.length).toBe(2);

  expect(output[0].args).toStrictEqual({ bar: "5" });
  expect(output[0].name).toBe("foo");

  expect(output[1].args).toStrictEqual({ bar: "10" });
  expect(output[1].name).toBe("baz");

  expect(output[0].start).toBe(2);
  expect(output[0].end).toBe(2);

  expect(output[1].start).toBe(5);
  expect(output[1].end).toBe(5);
});

test("objects", () => {
  const input = `{
    // @foo bar=5
    "key": {
      "key": true
    }
  }`;

  const output = scan(input);

  expect(output.length).toBe(1);

  expect(output[0].args).toStrictEqual({ bar: "5" });
  expect(output[0].name).toBe("foo");

  expect(output[0].start).toBe(2);
  expect(output[0].end).toBe(4);
});

test("arrays", () => {
  const input = `{
    // @foo bar=5
    "key": [
      { "key": true }
    ]
  }`;

  const output = scan(input);

  expect(output.length).toBe(1);

  expect(output[0].args).toStrictEqual({ bar: "5" });
  expect(output[0].name).toBe("foo");

  expect(output[0].start).toBe(2);
  expect(output[0].end).toBe(4);
});

test("nested objects", () => {
  const input = `{
    // @foo bar=5
    "key": {
      "key": {
        "key": true
      }
    }
  }`;

  const output = scan(input);

  expect(output.length).toBe(1);

  expect(output[0].args).toStrictEqual({ bar: "5" });
  expect(output[0].name).toBe("foo");

  expect(output[0].start).toBe(2);
  expect(output[0].end).toBe(6);
});

test("nested arrays", () => {
  const input = `{
    // @foo bar=5
    "key": [
      [
        { "key": true }
      ]
    ]
  }`;

  const output = scan(input);

  expect(output.length).toBe(1);

  expect(output[0].args).toStrictEqual({ bar: "5" });
  expect(output[0].name).toBe("foo");

  expect(output[0].start).toBe(2);
  expect(output[0].end).toBe(6);
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

  expect(output.length).toBe(1);

  expect(output[0].args).toStrictEqual({ bar: "5" });
  expect(output[0].name).toBe("foo");

  expect(output[0].start).toBe(3);
  expect(output[0].end).toBe(5);
});
