/** @type {import('@serwist/build').InjectManifestOptions} */
export default {
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  globDirectory: '.next/static',
  globPatterns: ['**/*.{js,css,woff,woff2}'],
  modifyURLPrefix: {
    '': '/_next/static/',
  },
  injectionPoint: 'self.__SW_MANIFEST',
};
