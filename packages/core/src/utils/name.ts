import { pascalCase } from "change-case-all";
import { Icon } from "../types";
import { parseIcon } from "./icon-processor";

export type ComponentNameOptions = {
    prefix?: ((icon: Icon) => string | undefined) | string;
    suffix?: ((icon: Icon) => string | undefined) | string;
    componentName?: (icon: Icon) => string | undefined;
}

export const getComponentName = (icon: Icon, options: ComponentNameOptions) => {
    const parsedIcon = parseIcon(icon.name);
    const componentName = pascalCase(parsedIcon.name);

    const prefix =
        typeof options?.prefix === "function"
            ? options.prefix(icon)
            : (options?.prefix ?? "");

    const suffix =
        typeof options?.suffix === "function"
            ? options.suffix(icon)
            : (options?.suffix ?? "");

    return `${prefix}${componentName}${suffix}`;
};
