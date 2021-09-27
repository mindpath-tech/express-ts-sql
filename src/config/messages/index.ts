export function getMessage(code: string, locale = 'en', substitutes?: Array<string>): string {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const file = require(`./${locale.toLocaleLowerCase()}`);
  if (substitutes) {
    return file[code](...substitutes);
  }
  return file[code]();
}
