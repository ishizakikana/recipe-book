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
        <Image src={imageUrl} alt={`${recipeName}の画像`} fill
            style={{ borderRadius: '5px', objectFit: 'cover' }} />
    )
}