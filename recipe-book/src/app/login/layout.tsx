import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'ログイン'
};

export default function LoginLayout({
    children
}: {
    children: ReactNode
}) {

    return (
        <>{children}</>
    )
}