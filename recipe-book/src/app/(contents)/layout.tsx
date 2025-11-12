import Header from '@/components/features/common/header/components/Header';
import CenteredContainer from '@/components/layout/CenteredContainer';
import { getUserFromAuthToken } from '@/lib/server/token';
import { Box } from '@mui/material';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

// メタデータ
export const metadata: Metadata = {
    title: 'RECIPE BOOK',
    description: 'わたしのレシピ本',
};

// コンテンツ画面レイアウト
export default async function ContentsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getUserFromAuthToken();

    // ログイン情報が無効のとき
    if (!user) {
        redirect('/login');
    }

    return (
        <Box sx={{ display: 'flex', height: '100%' }}>
            <Header user={user} />
            <Box component={'main'}
                sx={{ width: '100%', height: '100%', pt: 8 }}>
                <CenteredContainer sx={{ py: 2, px: 4, overflow: 'auto' }}>
                    {children}
                </CenteredContainer>
            </Box>
        </Box>
    );
}
