/**
 * Color tokens — light and dark bindings.
 *
 * Sources:
 *   - Light values: current `createBaseColors(AppTheme.Light)` +
 *     `createSemanticColors(_, false)` output from `src/utils/theme.ts`,
 *     preserved verbatim (no visual regression).
 *   - Dark values: extracted from canonical Figma `RZxDJea4t6jnBZrV4YBacF`,
 *     dark band `3011:*`. Where the canonical dark binding disagreed with
 *     the current dark Theme value at a key with visible consumers, the
 *     current dark value wins to avoid visual regression; the disagreement
 *     is tracked as a designer follow-up.
 *
 * `withOpacity` calls are deferred to a util (not inlined as literals) so
 * the output is byte-identical to today's runtime computation — this is
 * what guarantees no visual regression for the surfaceContainer* + border
 * + placeholder etc keys that currently derive via opacity math.
 *
 * NOTE on imports: this module imports from `../../utils/colorUtils` only,
 * which is a pure utility (no React, no Paper, no MobX). The purity
 * constraint for this module forbids React/Paper/MobX imports only.
 */
import {withOpacity, stateLayerOpacity} from '../../utils/colorUtils';

import {TokenColors} from './types';

// Light base colors (VOID Daylight Ivory Mecha Armor).
const LIGHT_PRIMARY = '#C89018'; // Amber Mustard
const LIGHT_SECONDARY = '#506A88'; // Steel Blue
const LIGHT_TERTIARY = '#1D8462'; // Mono-eye Sensor Green
const LIGHT_ERROR = '#B05868'; // Dusty Rose Crimson
const LIGHT_BACKGROUND = '#ECE8DF'; // Warm Ivory Armor
const LIGHT_ON_BACKGROUND = '#181714'; // Charcoal Ink
const LIGHT_SURFACE = '#F4F1EA'; // Off-white Mecha Plate
const LIGHT_ON_SURFACE = '#181714';
const LIGHT_INVERSE_ON_SURFACE = '#F4F1EA';

export const lightColors: TokenColors = {
  // MD3 base palette (light)
  primary: LIGHT_PRIMARY,
  onPrimary: '#FFFFFF',
  primaryContainer: '#F7EDD5',
  onPrimaryContainer: '#593D04',
  secondary: LIGHT_SECONDARY,
  onSecondary: '#FFFFFF',
  secondaryContainer: '#DCE4ED',
  onSecondaryContainer: '#233446',
  tertiary: LIGHT_TERTIARY,
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#D5F0E6',
  onTertiaryContainer: '#083B2A',
  error: LIGHT_ERROR,
  onError: '#FFFFFF',
  errorContainer: '#F7DEE2',
  onErrorContainer: '#4E1A23',
  background: LIGHT_BACKGROUND,
  onBackground: LIGHT_ON_BACKGROUND,
  surface: LIGHT_SURFACE,
  onSurface: LIGHT_ON_SURFACE,
  surfaceVariant: '#E5E1D7',
  onSurfaceVariant: '#5D5950',
  outline: 'rgba(24, 23, 20, 0.16)',
  outlineVariant: 'rgba(24, 23, 20, 0.08)',
  mutedLight: '#DDD8CD',
  secondaryDefault: '#EBE7DE',
  // MD3 extras
  surfaceDisabled: withOpacity('#DDD8CD', 0.5),
  onSurfaceDisabled: withOpacity('#181714', 0.38),
  inverseSurface: '#24221E',
  inverseOnSurface: LIGHT_INVERSE_ON_SURFACE,
  inversePrimary: '#F7EDD5',
  inverseSecondary: '#DCE4ED',
  shadow: '#000000',
  scrim: 'rgba(0, 0, 0, 0.35)',
  backdrop: 'rgba(24, 23, 20, 0.55)',

  // Semantic surface variants
  surfaceContainerHighest: '#E6E1D6',
  surfaceContainerHigh: '#EBE7DD',
  surfaceContainer: '#F0ECE3',
  surfaceContainerLow: '#F6F3EC',
  surfaceContainerLowest: '#FFFFFF',
  surfaceDim: '#E5E0D5',
  surfaceBright: '#FAF8F4',

  // Text
  text: LIGHT_ON_BACKGROUND,
  textSecondary: '#666258',
  inverseText: '#FFFFFF',
  inverseTextSecondary: withOpacity('#FFFFFF', 0.7),

  // Border / placeholder
  border: 'rgba(24, 23, 20, 0.14)',
  placeholder: '#8E897E',

  // Interactive state opacities
  stateLayerOpacity: 0.12,
  hoverStateOpacity: stateLayerOpacity.hover,
  pressedStateOpacity: stateLayerOpacity.pressed,
  draggedStateOpacity: stateLayerOpacity.dragged,
  focusStateOpacity: stateLayerOpacity.focus,

  // Menu
  menuBackground: '#FAF7F0',
  menuBackgroundDimmed: withOpacity('#FAF7F0', 0.95),
  menuBackgroundActive: withOpacity(LIGHT_PRIMARY, 0.12),
  menuSeparator: 'rgba(24, 23, 20, 0.12)',
  menuGroupSeparator: 'rgba(24, 23, 20, 0.06)',
  menuText: LIGHT_ON_SURFACE,
  menuDangerText: LIGHT_ERROR,

  // Messages
  authorBubbleBackground: '#E4DFD4',
  receivedMessageDocumentIcon: LIGHT_PRIMARY,
  sentMessageDocumentIcon: LIGHT_ON_SURFACE,
  userAvatarImageBackground: 'transparent',
  userAvatarNameColors: [
    LIGHT_PRIMARY,
    LIGHT_SECONDARY,
    LIGHT_TERTIARY,
    LIGHT_ERROR,
  ],
  searchBarBackground: '#EAE6DC',

  // Thinking bubble
  thinkingBubbleBackground: '#E7EEF6',
  thinkingBubbleText: '#3B5777',
  thinkingBubbleBorder: 'rgba(80, 106, 136, 0.35)',
  thinkingBubbleShadow: '#3B5777',
  thinkingBubbleChevronBackground: 'rgba(80, 106, 136, 0.1)',
  thinkingBubbleChevronBorder: 'rgba(80, 106, 136, 0.25)',

  // Status bar
  bgStatusActive: '#1D8462',
  bgStatusIdle: '#8C887E',

  // Buttons
  btnPrimaryBg: '#FDF7EB',
  btnPrimaryBorder: '#FFFFFF',
  btnPrimaryText: '#9C6B08',
  btnReadyBg: '#E9F9F2',
  btnReadyBorder: '#76D5B4',
  btnReadyText: '#13674C',
  btnDownloadBg: '#E9F9F2',
  btnDownloadBorder: '#76D5B4',
  btnDownloadText: '#13674C',

  // Icons
  iconModelTypeText: '#506A88',
  iconModelTypeVision: '#C89018',
  iconModelTypeAudio: '#B05868',

  // Accent
  accent: {
    peach: '#F7DECD',
    greenStrong: '#1D8462',
  },
};

// Dark base values (VOID Neural Operator / Nothing OS Minimalist Mecha Skin)
const DARK_PRIMARY = '#FFFFFF'; // Clean Stark White (Replacing yellow across app)
const DARK_SECONDARY = '#A0A5AE'; // Technical Slate / Silver
const DARK_TERTIARY = '#36D6A8'; // Clean Mint / Sensor Green
const DARK_ERROR = '#FF2035'; // Signature Nothing OS Electric Crimson Red
const DARK_BACKGROUND = '#000000'; // Pure Deep Void Obsidian
const DARK_ON_BACKGROUND = '#F5F5F7'; // Crisp Stark Off-White
const DARK_SURFACE = '#121214'; // Clean Charcoal Graphite Plate
const DARK_ON_SURFACE = '#F5F5F7';
const DARK_INVERSE_ON_SURFACE = '#F5F5F7';

export const darkColors: TokenColors = {
  // MD3 base palette (dark) — VOID Nothing OS Mecha Scheme
  primary: DARK_PRIMARY,
  onPrimary: '#000000',
  primaryContainer: '#1E1E22',
  onPrimaryContainer: '#FFFFFF',
  secondary: DARK_SECONDARY,
  onSecondary: '#000000',
  secondaryContainer: '#16181C',
  onSecondaryContainer: '#E2E5EC',
  tertiary: DARK_TERTIARY,
  onTertiary: '#000000',
  tertiaryContainer: '#0C1E17',
  onTertiaryContainer: '#87F6D5',
  error: DARK_ERROR,
  onError: '#FFFFFF',
  errorContainer: '#2A0E13',
  onErrorContainer: '#FFA4AE',
  background: DARK_BACKGROUND,
  onBackground: DARK_ON_BACKGROUND,
  surface: DARK_SURFACE,
  onSurface: DARK_ON_SURFACE,
  surfaceVariant: '#1A1A1E',
  onSurfaceVariant: '#A0A5AE',
  outline: 'rgba(255, 255, 255, 0.16)',
  outlineVariant: 'rgba(255, 255, 255, 0.08)',
  mutedLight: '#1E1E22',
  secondaryDefault: '#18181B',
  // MD3 extras
  surfaceDisabled: withOpacity('#1A1A1E', 0.5),
  onSurfaceDisabled: withOpacity('#F5F5F7', 0.35),
  inverseSurface: '#F5F5F7',
  inverseOnSurface: DARK_INVERSE_ON_SURFACE,
  inversePrimary: '#1E1E22',
  inverseSecondary: '#16181C',
  shadow: '#000000',
  scrim: 'rgba(0, 0, 0, 0.75)',
  backdrop: 'rgba(0, 0, 0, 0.88)',

  // Semantic surface variants
  surfaceContainerHighest: '#242428',
  surfaceContainerHigh: '#1C1C20',
  surfaceContainer: '#161619',
  surfaceContainerLow: '#121214',
  surfaceContainerLowest: '#0A0A0C',
  surfaceDim: '#000000',
  surfaceBright: '#2C2C32',

  // Text
  text: DARK_ON_BACKGROUND,
  textSecondary: '#A0A5AE',
  inverseText: '#000000',
  inverseTextSecondary: '#5A5E66',

  // Border / placeholder
  border: 'rgba(255, 255, 255, 0.16)',
  placeholder: '#727680',

  // Interactive state opacities
  stateLayerOpacity: 0.12,
  hoverStateOpacity: stateLayerOpacity.hover,
  pressedStateOpacity: stateLayerOpacity.pressed,
  draggedStateOpacity: stateLayerOpacity.dragged,
  focusStateOpacity: stateLayerOpacity.focus,

  // Menu
  menuBackground: '#161619',
  menuBackgroundDimmed: withOpacity('#161619', 0.95),
  menuBackgroundActive: withOpacity(DARK_PRIMARY, 0.12),
  menuSeparator: 'rgba(255, 255, 255, 0.10)',
  menuGroupSeparator: 'rgba(255, 255, 255, 0.06)',
  menuText: DARK_ON_SURFACE,
  menuDangerText: DARK_ERROR,

  // Messages
  authorBubbleBackground: '#1E1E22',
  receivedMessageDocumentIcon: DARK_PRIMARY,
  sentMessageDocumentIcon: DARK_ON_SURFACE,
  userAvatarImageBackground: 'transparent',
  userAvatarNameColors: [
    DARK_PRIMARY,
    DARK_SECONDARY,
    DARK_TERTIARY,
    DARK_ERROR,
  ],
  searchBarBackground: '#161619',

  // Thinking bubble (Steel blue mecha matrix)
  thinkingBubbleBackground: '#11141B',
  thinkingBubbleText: '#98ABBF',
  thinkingBubbleBorder: 'rgba(152, 171, 191, 0.35)',
  thinkingBubbleShadow: '#98ABBF',
  thinkingBubbleChevronBackground: 'rgba(152, 171, 191, 0.12)',
  thinkingBubbleChevronBorder: 'rgba(152, 171, 191, 0.25)',

  // Status bar
  bgStatusActive: '#36D6A8',
  bgStatusIdle: '#5A5E66',

  // Buttons
  btnPrimaryBg: '#FFFFFF',
  btnPrimaryBorder: '#FFFFFF',
  btnPrimaryText: '#000000',
  btnReadyBg: '#0C2418',
  btnReadyBorder: '#1A6242',
  btnReadyText: '#36D6A8',
  btnDownloadBg: '#0C2418',
  btnDownloadBorder: '#1A6242',
  btnDownloadText: '#36D6A8',

  // Icons
  iconModelTypeText: '#A0A5AE',
  iconModelTypeVision: '#FFFFFF',
  iconModelTypeAudio: '#FF2035',

  // Accent
  accent: {
    peach: '#2A2A30',
    greenStrong: '#36D6A8',
  },
};
