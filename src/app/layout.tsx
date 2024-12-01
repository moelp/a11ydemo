import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.scss';
import { FEATURE_FLAGS } from '#/app/featureFlags';

import { A11yProvider } from '#/utils/a11yContext';
import NotificationProvider from '#/components/Notification/NotificationProvider';

const isA11y = FEATURE_FLAGS['IS_A11Y'];

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: isA11y ? 'A11y App' : null,
  description: isA11y ? 'Provide examples' : null,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* <div
          id="snackbars"
          className="fixed top-24 end-8 w-11/12 max-w-96 flex flex-col gap-2 z-40"
          aria-live="assertive"></div> */}
        <A11yProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </A11yProvider>
        <div id="modals"></div>
      </body>
    </html>
  );
}
