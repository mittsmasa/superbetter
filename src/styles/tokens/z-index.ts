/** biome-ignore-all assist/source/useSortedKeys: zIndex の値順で維持したい */
import { defineTokens } from '@pandacss/dev';

export const zIndexTokens = defineTokens.zIndex({
  overlay: { value: 1 },
  glassScreen: { value: 10 },
  toast: { value: 20 },
});
