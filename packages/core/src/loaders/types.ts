import * as _ from "radashi";

export type LoaderResult = Record<string, string>;

export type Loader<T = any> = (
  input: T
) => () => Promise<LoaderResult> | LoaderResult;

export type Content = {
  name: string;
  content: string;
};
