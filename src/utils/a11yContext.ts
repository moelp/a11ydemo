'use client';

import createCtx from './createCtx';

/** @deprecated Use A11yType which is an object */
type A11yTypeMode = boolean;
/** @deprecated Use defaultA11y */

const defaultA11yMode: A11yTypeMode = false; // eslint-disable-line

type TypeColorMode = 'default' | 'light' | 'dark' | 'contrasthigh';
type TypeReadingDirection = 'ltr' | 'rtl';

enum EnumFontSizeBase {
  xxSmall = 60,
  xSmall = 75,
  small = 89,
  default = 100,
  large = 120,
  xLarge = 150,
  xxLarge = 200,
}

type TypeBaseFontSize = EnumFontSizeBase;

type TypeA11y = {
  isSemantic: boolean;
  hasStyles: boolean;
  baseFontSize: TypeBaseFontSize;
  colorModes: TypeColorMode;
  linkAsButton: boolean;
  readingDirection: TypeReadingDirection;
};
const defaultA11y: TypeA11y = {
  isSemantic: false,
  hasStyles: true,
  baseFontSize: 100,
  colorModes: 'default',
  linkAsButton: false,
  readingDirection: 'ltr',
};

const [A11yProvider, useA11yContext] = createCtx(defaultA11y);

export type { TypeA11y, TypeColorMode, TypeBaseFontSize, TypeReadingDirection };
export { A11yProvider, useA11yContext, EnumFontSizeBase };
