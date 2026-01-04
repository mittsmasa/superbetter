import { serwist } from '@serwist/next/config';

export default await serwist({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
});
