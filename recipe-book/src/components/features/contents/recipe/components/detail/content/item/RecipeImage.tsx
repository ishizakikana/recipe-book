import { Box } from '@mui/material';
import Image from 'next/image';

/**
 * レシピ画像
 */
export default function RecipeImage({
    imageUrl,
    recipeName
}: {
    imageUrl: string;
    recipeName: string;
}) {

    return (
        <Box sx={{
            position: 'relative', minHeight: 250,
            width: { xs: '100%', sm: '60%', md: '40%', lg: '30%' }
        }}>
            <Image src={imageUrl} alt={`${recipeName}の画像`} fill
                style={{ borderRadius: '5px', objectFit: 'cover' }} />
        </Box>
    )
}