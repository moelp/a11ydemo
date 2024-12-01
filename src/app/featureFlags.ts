export type FeatureFlagName = keyof typeof FEATURE_FLAGS;

export const FEATURE_FLAGS = {
  IS_A11Y: false,
} as const;
