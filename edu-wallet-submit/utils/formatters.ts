import {Mnemonic} from 'ethers';

export function sanitizeSeedPhrase(string: string): string {
  // trim extraneous whitespaces + remove new lines / line breaks
  return string
    .replace(/(\r\n|\n|\r)/gm, ' ')
    .trim()
    .split(' ')
    .filter((word: string) => !!word)
    .join(' ');
}

export const isValidSeedPhrase = (seedPhrase: any) => {
  const sanitizedSeedPhrase = sanitizeSeedPhrase(seedPhrase);
  return sanitizedSeedPhrase.split(' ').length >= 12 && Mnemonic.isValidMnemonic(sanitizedSeedPhrase);
};