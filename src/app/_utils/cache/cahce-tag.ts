import { unstable_cacheTag } from 'next/cache';
import type { Tag } from './type';

export const cacheTag = (...tags: Tag[]) => unstable_cacheTag(...tags);
