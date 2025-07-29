import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ImageBox({
    value,
    defaultImage,
    onChange
}: {
    value?: string
    defaultImage?: string
    onChange?: (value: string) => void
}) {
    const [preview, setPreview] = useState<string | null>(value ?? defaultImage ?? null);

    useEffect(() => {
        if (value !== undefined) setPreview(value);
    }, [value]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
                onChange?.(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [onChange])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    });

    return (
        <Box
            {...getRootProps()}
            sx={{
                border: '2px dashed #ccc',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                bgcolor: isDragActive ? '#f0f0f0' : 'transparent',
                transition: 'background-color 0.2s',
            }}
        >
            <input {...getInputProps()} />
            <Stack spacing={2} alignItems="center">
                {preview ? (
                    <Image src={preview} alt="Preview" width={200} height={200} style={{ objectFit: 'contain' }} />
                ) : (
                    <>
                        <Typography>ここに画像をドラッグ＆ドロップ、またはクリックして選択</Typography>
                    </>
                )}
            </Stack>
        </Box>
    )
}