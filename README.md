# Typed Arguent Parser

Deno standard argument parser is amazing, and I'm not trying to replace him!

This little module just add dynamic types to the parser

# Usage / Example

```ts
import { parseArgs } from "https://github.com/wesauis/deno-typed-parse-args/raw/0.1.0/mod.ts";

const args = parseArgs(Deno.args, {
  boolean: ['help'] as const, // **1
  string: ['greet'] as const, // **1
  default: {
    name: 'World', // **2, you can set defaults to the booleans or strings too
  },
  alias: {
    help: 'h' // yey! `help`, `greet` and `name` are been suggested as keys!
  }
})

// **1: `as const` tells to typescript that this values are fixed, and it will trigger the automatic type definitions
// **2: this key value pairs trigger the type definitions too :)

args. /* your editor should be able to autocomplete to the following properties:
  help: boolean
  greet: string | undefined
  name: string | number | undefined
*/
```
