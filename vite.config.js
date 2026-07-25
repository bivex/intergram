import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [
    {
      name: 'dev-rewrite-compiled-js',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url.startsWith('/js/chat.js')) {
            req.url = '/src/chat/chat-index.jsx';
          } else if (req.url.startsWith('/js/widget.js')) {
            req.url = '/src/widget/widget-index.jsx';
          }
          next();
        });
      }
    },
    preact()
  ],
  server: {
    port: 5173,
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true
      },
      '/hook': 'http://localhost:3000',
      '/usage-start': 'http://localhost:3000',
      '/usage-end': 'http://localhost:3000'
    }
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    }
  }
});
