import { Metadata } from 'next';
import { ReactNode } from 'react';

// メタデータ
export const metadata: Metadata = {
    title: 'ログイン'
};

/**
 * ログイン画面レイアウト
 */
export default function LoginLayout({
    children
}: {
    children: ReactNode
}) {

    return (
        <>{children}</>
    )
}