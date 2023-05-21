import { Error } from "src/composables/types/global";

export const parseError = (error: Error) => {
  type ConcatErrors = [string, string[]];
  let allErrors = Object.entries(error);
  let res = allErrors.reduce((prev: string[], curr: ConcatErrors) => {
    let res = curr[0] + " " + curr[1].join(" ");
    prev.push(res);
    return prev;
  }, []);
  return res;
};
