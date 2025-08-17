import { CssBaseline, ThemeProvider } from '@mui/material';
import type { Preview } from '@storybook/nextjs';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import theme from '../src/styles/theme';
import { mockRouter } from '../stories/__mocks__/router';

const preview: Preview = {
  decorators: [
    (Story) => (
      <AppRouterContext.Provider value={mockRouter}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      </AppRouterContext.Provider>
    )
  ],
  parameters: {
    layout: 'centered',
    backgrounds: {
      options: {
        dark: { name: 'dark', value: '#333' },
        light: { name: 'light', value: '#f7f9f2' }
      }
    },
    initialGlobals: {
      backgrounds: { value: 'light' }
    },
    docs: {
      autodocs: true,
      source: {
        type: 'code'
      },
      codePanel: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextRouter: {
      Provider: RouterContext.Provider,
      value: mockRouter,
    },
  },
  tags: ['autodocs']
};

export default preview;