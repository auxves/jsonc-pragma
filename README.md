<div align="center">
	<!-- <img width="200" src="assets/logo.png"> -->
	<h1>jsonc-pragma</h1>
	<p>A simple, yet powerful pragma analyzer and utility library for JSON with Comments</p>
	<p>
		<a href="https://github.com/arnohovhannisyan/jsonc-pragma/actions">
			<img src="https://img.shields.io/github/workflow/status/arnohovhannisyan/jsonc-pragma/CI" alt="CI">
		</a>
		<a href="https://npmjs.com/package/jsonc-pragma">
			<img src="https://img.shields.io/npm/v/jsonc-pragma" alt="Version">
		</a>
		<a href="https://github.com/arnohovhannisyan/jsonc-pragma/blob/master/LICENSE">
			<img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
		</a>
		<a href="https://codecov.io/gh/arnohovhannisyan/jsonc-pragma">
			<img src="https://img.shields.io/codecov/c/github/arnohovhannisyan/jsonc-pragma" alt="Coverage">
		</a>
	</p>
</div>

## Installation

```sh
$ yarn add jsonc-pragma
```

or

```sh
$ npm install jsonc-pragma
```

## Usage

### `scan()`

#### `@param` contents

Type: `string | Buffer`

This is the contents of the JSON document.

#### `@example`

```js
import { scan } from "jsonc-pragma";

const contents = `{
	// @foo bar=5
	"example": "...",

	// @baz foo=test bar=abc
	"object": {
		"example": "..."
	}
}`;

scan(contents);

/* Returns:

[
	{
		start: 2,
		end: 2,
		args: { bar: "5" },
		name: "foo"
	},
	{
		start: 5,
		end: 7,
		args: { foo: "test", bar: "abc" },
		name: "baz"
	}
] 

*/
```

#### `@returns`

```ts
Array<ISection>
```

### `comment()`

#### `@param` contents

Type: `string | Buffer`

This is the contents of the JSON document.

#### `@param` selector

**OPTIONAL**

Type: `(section: ISection) => boolean`

This is a function that receives a section and determines whether that section should be commented by returning true (comment) or false (don't comment).

If omitted, all sections will be commented.

#### `@example`

```js
import { comment } from "jsonc-pragma";

const contents = `{
	// @foo bar=5
	"example": "...",

	// @foo bar=7
	"object": {
		"example": "..."
	},

	// @baz bar=7
	"notCommented": "..."
}`;

comment(
	contents,
	section => section.name === "foo" && Number(section.args.bar) > 6
);

/* Returns:

`{
	// @foo bar=5
	"example": "...",

	// @foo bar=7
	// "object": {
	//   "example": "..."
	// },

	// @baz bar=7
	"notCommented": "..."
}`

*/
```

#### `@returns` string

### `uncomment()`

#### `@param` contents

Type: `string | Buffer`

This is the contents of the JSON document.

#### `@param` selector

**OPTIONAL**

Type: `(section: ISection) => boolean`

This is a function that receives a section and determines whether that section should be uncommented by returning true (uncomment) or false (don't uncomment).

If omitted, all sections will be uncommented.

#### `@example`

```js
import { uncomment } from "jsonc-pragma";

const contents = `{
	// @foo bar=5
	// "example": "...",

	// @foo bar=7
	// "object": {
	//   "example": "..."
	// }
}`;

uncomment(contents, section => Number(section.args.bar) > 6);

/* Returns:

`{
	// @foo bar=5
	// "example": "...",

	// @foo bar=7
	"object": {
		"example": "..."
	}
}`

*/
```

#### `@returns` string

### `@typedef`

```ts
interface ISection {
	start: number;
	end: number;
	args: { [key: string]: string | undefined };
	name: string;
}
```
