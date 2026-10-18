/**
 * Radius tokens. Single scale. Key names mirror canonical Figma
 * `Radius/*` (None/XXS/XS/S/M/ML/L/XL/XXL) so a Figma spec saying
 * `Radius/L` maps directly to `radius.l`. There is no `sm` step —
 * Figma jumps S(8) → M(12). The legacy lowercase `radius/radius-xs`
 * (= 4) alias resolves to `xs` here.
 */
import {TokenRadius} from './types';

export const radius: TokenRadius = {
  none: 0,
  xxs: 2,
  xs: 3,
  s: 4,
  m: 4,
  ml: 6,
  l: 6,
  xl: 8,
  xxl: 10,
};
