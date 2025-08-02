import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    '../**/*.mdx',
    '../**/*.stories.@(js|jsx|mjs|ts|tsx)',     // .stories.* のファイルを読み込む
  ],
  'addons': [
    // 基本セット
    '@storybook/addon-essentials', // テスト用の操作を追加
    '@storybook/addon-interactions', // コンポーネントの属性を操作し、リアルタイムに変化を確認する
    '@storybook/controls', // ドキュメントを自動生成
    '@storybook/addon-docs', // レスポンシブ対応
    '@storybook/test',
    '@storybook/viewport',
    '@storybook/addon-coverage'
  ],
  'framework': {
    'name': '@storybook/nextjs',
    'options': {}
  },
  'features': {
    buildStoriesJson: true  // テストランナー有効化
  },
  'staticDirs': [
    '../public'
  ],
  'core': {
    disableTelemetry: true  // 匿名データ送信を停止
  },
} as StorybookConfig;
export default config;