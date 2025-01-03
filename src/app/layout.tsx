import type { Metadata } from 'next';
import './globals.css';
import { pixelMPlus } from '@/fonts';
import { css } from '@/styled-system/css';

export const metadata: Metadata = {
  title: 'Super Better',
  description:
    'これは「スーパーベターになろう！」の書籍を実践しやすくするために丹精込めて作られたアプリケーションです',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={pixelMPlus.className}>
      <body className={css({ height: '[100dvh]' })}>{children}</body>
    </html>
  );
}
