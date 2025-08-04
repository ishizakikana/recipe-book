import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import ImageBox from '../../input/ImageBox';

const meta: Meta<typeof ImageBox> = {
    title: 'UI/Form/Input/ImageBox',
    component: ImageBox,
    parameters: {
        docs: {
            source: {
                code: '<ImageBox value={imageUrl} defaultImage={defaultImageUrl} onChange={handleImageChange} />'
            }
        }
    },
    argTypes: {
        value: {
            control: 'text',
            description: '現在の画像URL',
            table: {
                category: 'base',
                type: { summary: 'string' }
            }
        },
        defaultImage: {
            control: 'text',
            description: 'デフォルトの画像URL',
            table: {
                category: 'base',
                type: { summary: 'event' }
            }
        },
        onChange: {
            action: 'changed',
            table: {
                category: 'state',
                type: { summary: '(value: string) => void' }
            }
        }
    }
}

export default meta;
type Story = StoryObj<typeof ImageBox>;

export const Default: Story = {}

export const WithDefaultImage: Story = {
    args: {
        defaultImage: 'https://res.cloudinary.com/drf6p5cyv/image/upload/v1750930122/no_image.png'
    }
}

export const WithValue: Story = {
    args: {
        value: 'https://res.cloudinary.com/drf6p5cyv/image/upload/v1750932984/huftga6tcppne7md6q70.jpg'
    }
}

export const DropImage: Story = {
    args: {
        onChange: (val) => {
            console.log('onChange called with', val.slice(0, 30) + '...');
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // ファイルオブジェクトのモック（PNG形式）
        const file = new File(
            [new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10])], // PNG signature
            'test-image.png',
            { type: 'image/png' }
        );

        // input[type="file"] を直接取得
        const input = canvasElement.querySelector('input[type="file"]') as HTMLInputElement;
        await userEvent.upload(input, file);

        // 表示されるのを待って検証
        await waitFor(() => {
            const image = canvas.getByAltText('Preview') as HTMLImageElement;
            expect(image).toBeInTheDocument();
            expect(image.src).toContain('data:image/png;base64');
        });
    }
}