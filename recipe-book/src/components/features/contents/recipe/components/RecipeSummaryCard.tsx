'use client'
import Chip, { ChipColors } from "@/components/ui/display/chip/Chip";
import { useNavigation } from '@/hooks/useNavigation';
import { RecipeSummary } from "@/types/entity";
import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Stack, Typography } from "@mui/material";
import { useState } from "react";

/**
 * レシピ概要カード
 */
export default function RecipeSummaryCard({
    recipe
}: {
    recipe: RecipeSummary
}) {
    const { navigateTo } = useNavigation();

    // 選択状態管理
    const [selected, setSelected] = useState(false);

    // クリックイベント
    const onClick = () => {
        setSelected(!selected);
        navigateTo(`/recipe/${recipe.id}`);
    }

    return (
        <Card raised elevation={3} component={Stack} sx={{ width: '100%', height: '100%' }}>
            <CardActionArea
                data-active={selected}
                onClick={onClick}
                sx={{
                    height: '100%', display: 'flex', flexDirection: 'column',
                    alignItems: 'flex-start', justifyContent: 'flex-start', pb: 2
                }}>

                <CardHeader
                    title={recipe.name}
                    slotProps={{ title: { variant: 'body1' } }} />

                <CardMedia
                    component="img"
                    width={'100%'}
                    height={165}
                    alt={`${recipe.name}の画像`}
                    image={recipe.imageUrl}
                    sx={{ objectFit: 'cover' }}
                />

                <CardContent component={Stack} sx={{ gap: 1 }}>

                    <Chip label={recipe.category.name} color={recipe.category.color as ChipColors} />
                    <Stack direction="row" justifyContent="flex-start" gap={1}>

                        {recipe.shelfLife &&
                            <Typography variant="body2" color="text.secondary">
                                {recipe.shelfLife}
                            </Typography>
                        }
                        {recipe.shelfLife && recipe.calories &&
                            <Typography variant="body2" color="text.secondary">/</Typography>
                        }
                        {recipe.calories &&
                            <Typography variant="body2" color="text.secondary">
                                {recipe.calories}kcal
                            </Typography>
                        }
                    </Stack>
                </CardContent>

            </CardActionArea>
        </Card>
    )
}