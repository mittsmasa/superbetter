import localFont from 'next/font/local';

export const pixelMPlus = localFont({
  display: 'swap',
  src: [
    {
      path: '../../public/fonts/PixelMplus12-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
});
