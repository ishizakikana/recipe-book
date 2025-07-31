import { CategorizedItem } from '@/components/features/contents/list/types'

export const listItemsSample = [
    {
        id: 2,
        name: 'test',
        volume: '200g',
        recipeName: null,
        categoryId: 2,
        isDone: false
    },
    {
        id: 7,
        name: 'テスト',
        volume: '3切れ',
        recipeName: null,
        categoryId: 3,
        isDone: false
    },
    {
        id: 5,
        name: 'テスト',
        volume: '200g',
        recipeName: null,
        categoryId: 4,
        isDone: false
    }
]

export const categorizedItemsSample: CategorizedItem[] = [
    {
        category: { id: 1, name: '野菜', icon: 'carrot', color: 'teal' },
        items: [
            { id: 4, name: '人参', volume: '2本', categoryId: 1, recipeName: null, isDone: false },
            { id: 6, name: 'キャベツ', volume: '1玉', categoryId: 1, recipeName: null, isDone: false }
        ]
    },
    {
        category: { id: 2, name: '肉', icon: 'bacon', color: 'red' },
        items: [
            { id: 1, name: '豚肉', volume: '200g', categoryId: 2, recipeName: null, isDone: false }
        ]
    },
    {
        category: { id: 3, name: '魚', icon: 'fish', color: 'blue' },
        items: [
            { id: 2, name: '鮭', volume: '３切れ', categoryId: 3, recipeName: null, isDone: false }
        ]
    },
    {
        category: { id: 4, name: '乳製品', icon: 'cheese', color: 'orange' },
        items: [
            { id: 3, name: '牛乳', volume: null, categoryId: 4, recipeName: null, isDone: false }
        ]
    },
    {
        category: { id: 5, name: '調味料', icon: 'seedling', color: 'brown' },
        items: [
            { id: 8, name: '醤油', volume: '500ml', categoryId: 5, recipeName: null, isDone: false }
        ]
    }
]