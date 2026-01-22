import { pascalCase } from "change-case-all";
import { Icon } from "../types";
import { parseIcon } from "./icon-processor";
import { sanitize } from "string-sanitizer";

export type ComponentNameOptions = {
    prefix?: ((icon: Icon) => string | undefined) | string;
    suffix?: ((icon: Icon) => string | undefined) | string;
    componentName?: (icon: Icon) => string | undefined;
}

/**
 * Strip leading digits from a string
 * @param input - The input string
 * @returns The string with leading digits removed
 */
export const stripLeadingDigits = (input: string) => {
    return input.replace(/^\d+/, "");
}

/**
 * Generate a component name from an icon name
 * @param name - The name of the icon
 * @returns The component name
 */
export const generateComponentName = (name: string) => {
    return sanitize(pascalCase(stripLeadingDigits(name)));
}

/**
 * Get a component name from an icon
 * @param icon - The icon
 * @param options - The options
 * @returns The component name
 */
export const getComponentName = (icon: Icon, options: ComponentNameOptions) => {
    const parsedIcon = parseIcon(icon.name);
    const componentName = generateComponentName(parsedIcon.name);

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
