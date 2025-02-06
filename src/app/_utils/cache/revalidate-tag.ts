import { revalidateTag } from 'next/cache';
import type { Tag } from './type';

export const revalidate = (tag: Tag) => revalidateTag(tag);
