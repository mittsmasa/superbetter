import type { Metadata, Viewport } from 'next';
import './globals.css';
import { GlassScreenProvider, Toaster, ToastProvider } from '@superbetter/ui';
import { SerwistProvider } from '@/components/register-sw';
import { ViewportHeight } from '@/components/viewport-height';
import { pixelMPlus } from '@/fonts';
import { css } from '@/styled-system/css';
import { SortableProvider } from './_components/sortable/provider';

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={pixelMPlus.className}>
      <body className={css({ height: '[var(--app-height, 100dvh)]' })}>
        <ViewportHeight />
        <SerwistProvider swUrl="/sw.js">
          <GlassScreenProvider>
            <ToastProvider>
              <SortableProvider>{children}</SortableProvider>
              <Toaster />
            </ToastProvider>
          </GlassScreenProvider>
        </SerwistProvider>
      </body>
    </html>
  );
}
