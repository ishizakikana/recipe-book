import { ArgTypes } from '@storybook/nextjs';

export function disableAllArgTypes<Args>(
    argTypes: Partial<ArgTypes<Args>>
): Partial<ArgTypes<Args>> {
    const disabled: Partial<ArgTypes<Args>> = {};

    for (const key in argTypes) {
        disabled[key] = {
            ...argTypes[key],
            table: {
                ...(argTypes[key]?.table || {}),
                disable: true,
            },
        };
    }

    return disabled;
}
