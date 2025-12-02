export function isEmpty(value: string | null | undefined) {
    return !value;
}

export function hasMinLength(value: string, minLength: number) {
    return value.length >= minLength;
}

export function hasMaxLength(value: string, maxLength: number) {
    return value.length < maxLength;
}

export function isEqualToOtherValue(a: any, b: any) {
    return a === b;
}