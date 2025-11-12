import EmotionCacheProvider from '@/components/providers/EmotionCacheProvider';
import ThemeProvider from '@/components/providers/ThemeProvider';
import '@/styles/globals.css';
import { Box } from '@mui/material';
import type { Metadata } from 'next';
import { Geist, Noto_Sans_JP } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Noto_Sans_JP({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// メタデータ
export const metadata: Metadata = {
  title: 'RECIPE BOOK',
  description: 'わたしのレシピ本',
};

/**
 * ルートレイアウト
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <EmotionCacheProvider>
          <ThemeProvider>
            <Box sx={{ height: '100vh', width: '100%' }}>
              {children}
            </Box>
          </ThemeProvider>
        </EmotionCacheProvider>
      </body>
    </html >
  );
}
