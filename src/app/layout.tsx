import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider, Toaster } from '@/components/toast';
import { pixelMPlus } from '@/fonts';
import { css } from '@/styled-system/css';

const APP_NAME = 'Super Better';
const APP_DEFAULT_TITLE = 'Super Better';
const APP_TITLE_TEMPLATE = '%s - PWA App';
const APP_DESCRIPTION =
  'これは「スーパーベターになろう！」の書籍を実践しやすくするために丹精込めて作られたアプリケーションです';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={pixelMPlus.className}>
      <body className={css({ height: '[100dvh]' })}>
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}
