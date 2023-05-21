import { i18n } from "src/boot/i18n";

const t = i18n.global.t;

export const rules = {
  Required: (val: any) => {
    const errorMessage = t("validationError.require");
    return (val !== null && val !== "") || errorMessage;
  },
  MinLength: (val: any) => {
    const errorMessage = t("validationError.minLength");
    return val.length >= 8 || errorMessage;
  },
  email: (val: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const errorMessage = t("validationError.email");
    return emailRegex.test(val) || !val || errorMessage;
  },
};
