import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
