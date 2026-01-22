import { pascalCase } from "change-case-all";
import { Icon } from "../types";

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
export const alphaNumericOnly = (input: string) => {
    return input.replace(/[^a-zA-Z0-9]/g, "");
}

/**
 * Generate a component name from an icon name
 * @param name - The name of the icon
 * @returns The component name
 */
export const generateComponentName = (iconName: string) => {
    return alphaNumericOnly(pascalCase(iconName))
}

/**
 * Get a component name from an icon
 * @param icon - The icon
 * @param options - The options
 * @returns The component name
 */
export const getComponentName = (icon: Icon, options: ComponentNameOptions) => {
    const componentName = generateComponentName(icon.name);

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
