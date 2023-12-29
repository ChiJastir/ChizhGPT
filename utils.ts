export const textNormalize = (str: string) => {
    return str.split(/\n\s*|\r\s*/g).join('')
}