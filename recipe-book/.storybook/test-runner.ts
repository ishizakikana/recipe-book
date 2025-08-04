import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  tags: {
    exclude: ['no-tests']
  },
  setup() {
    jest.setTimeout(30000);
  },
  async preRender(page, context) {
    // Mobileストーリー以外はデスクトップサイズに強制設定
    if (context.name === 'Mobile') {
      await page.setViewportSize({ width: 375, height: 667 });
    } else {
      // デスクトップサイズに強制設定
      await page.setViewportSize({ width: 1200, height: 800 });
    }

    // viewport変更後の再レンダリングを待つ
    await page.waitForTimeout(1000);
  },
};

export default config;