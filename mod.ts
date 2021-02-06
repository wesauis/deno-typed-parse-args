import {
  ArgParsingOptions,
  Args,
  parse,
} from "https://deno.land/std@0.85.0/flags/mod.ts";

type StaticRecord<K extends ReadonlyArray<string>, V> = {
  [key in K[number]]: V;
};

type Arguments<
  B extends ReadonlyArray<string>,
  S extends ReadonlyArray<string>,
  D extends Record<string, string | boolean | number>,
> =
  & Pick<Args, "_">
  & StaticRecord<B, boolean>
  & StaticRecord<S, string | undefined>
  & Record<keyof D, string | boolean | number>;

export function parseArgs<
  B extends ReadonlyArray<string> = readonly [],
  S extends ReadonlyArray<string> = readonly [],
  // deno-lint-ignore ban-types
  D extends Readonly<Record<string, string | boolean | number>> = {},
>(
  args: string[],
  options?: Partial<
    Omit<ArgParsingOptions, "boolean" | "string" | "default" | "alias"> & {
      boolean: ArgParsingOptions["boolean"] | B;
      string: ArgParsingOptions["string"] | S;
      default: ArgParsingOptions["default"] | D;
      alias:
        | ArgParsingOptions["alias"]
        | (
          & Record<keyof D, string | string[]>
          & { [key in B[number]]: string | string[] }
          & { [key in S[number]]: string | string[] }
        );
    }
  >,
): Arguments<B, S, D> {
  return parse(args, options as ArgParsingOptions) as Arguments<B, S, D>;
}
