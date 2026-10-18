import {StyleSheet} from 'react-native';

import {Theme} from '../../utils/types';

// Plain object (not via StyleSheet.create) because react-syntax-highlighter's
// customStyle is merged with Object.assign — a numeric StyleSheet id won't
// flatten the upstream white PreTag fallback. See MarkdownView for the why.
export const codeHighlighterPreOverride = {
  backgroundColor: 'transparent',
} as const;

export const createTagsStyles = (theme: Theme) => ({
  body: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
    padding: 0,
    paddingTop: 0,
    margin: 0,
    backgroundColor: 'transparent',
  },
  a: {
    color: theme.colors.secondary,
    textDecorationLine: 'underline' as const,
  },
  code: {
    fontFamily: 'JetBrainsMono-Regular',
    backgroundColor: '#1E1E22',
    padding: 4,
    borderRadius: 4,
    color: '#F4F4F6',
    fontSize: 13,
    whiteSpace: 'pre' as const,
  },
  pre: {
    backgroundColor: '#141416',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    padding: 10,
    borderRadius: 6,
    marginVertical: 8,
    color: '#F4F4F6',
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 13,
    whiteSpace: 'pre' as const,
  },
  // Styles for thinking tags
  thinking: {
    color: theme.colors.thinkingBubbleText,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Inter-Regular',
  },
  think: {
    color: theme.colors.thinkingBubbleText,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Inter-Regular',
  },
  thought: {
    color: theme.colors.thinkingBubbleText,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Inter-Regular',
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    markdownContainer: {
      // Dynamic maxWidth will be applied via style prop
    },
    codeHighlighterText: {
      fontFamily: 'Courier',
    },
    codeHighlighterScrollContent: {
      backgroundColor: theme.colors.surface,
      padding: 8,
      borderRadius: 6,
      marginTop: 4,
    },
  });
