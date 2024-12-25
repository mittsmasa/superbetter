import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

export const metadata: Metadata = {
  title: 'Super Better',
  description:
    'これは「スーパーベターになろう！」の書籍を実践しやすくするために丹精込めて作られたアプリケーションです',
};

const pixelMPlus = localFont({
  src: [
    {
      path: '../fonts/PixelMplus12-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={pixelMPlus.className}>
      <body>{children}</body>
    </html>
  );
}
