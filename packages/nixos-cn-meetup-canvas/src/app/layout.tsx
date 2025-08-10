import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'Memobird Canvas',
  description: 'Memobird Canvas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head />
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
