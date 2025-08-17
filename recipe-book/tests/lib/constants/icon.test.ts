import { getIcon } from '@/lib/constants/icon';

import {
    faBacon,
    faBowlFood,
    faCarrot,
    faCartShopping,
    faCheese,
    faDrumstickBite,
    faFish,
    faMugSaucer,
    faSeedling
} from '@fortawesome/free-solid-svg-icons';

describe('icon', () => {

    describe('getIcon', () => {
        test('キーが登録されているとき、正しいアイコンを返す', () => {
            expect(getIcon('carrot')).toBe(faCarrot);
            expect(getIcon('bacon')).toBe(faBacon);
            expect(getIcon('fish')).toBe(faFish);
            expect(getIcon('cheese')).toBe(faCheese);
            expect(getIcon('seedling')).toBe(faSeedling);
            expect(getIcon('cart')).toBe(faCartShopping);
            expect(getIcon('rice')).toBe(faBowlFood);
            expect(getIcon('meat')).toBe(faDrumstickBite);
            expect(getIcon('soup')).toBe(faMugSaucer);
        })

        test('アイコンを返さない（登録されていないキー）', () => {
            expect(() => getIcon('unknown')).toThrow();
            expect(() => getIcon('')).toThrow();
        })
    })
})