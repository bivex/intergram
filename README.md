# Live Chat Widget (Linked to Telegram) 🚀

A modern, lightweight, high-performance Live Chat widget linked to your Telegram messenger. Built with **Preact 10**, **Bun**, **Vite 8**, and **DDD Hexagonal Architecture**.

---

## ⚡ Features & Modernizations

- **🏗️ DDD Hexagonal Architecture**: Strict separation of concerns (Domain, Application Use Cases, Infrastructure Adapters, Presentation).
- **⚡ Fast Runtime & Tooling**: Runs on **Bun** & Express 4, bundled with **Webpack 5** for production and **Vite 8** for instant HMR dev server.
- **🎨 Pixel-Perfect Modern UI**: Redesigned chat bubbles, Inter typography, sleek gradients, glassmorphic floating action button, and smooth entrance animations.
- **🌍 Built-in i18n (Multi-Language)**: Native support for `uk` (Ukrainian), `en` (English), `es` (Spanish), `de` (German), and `ru`.
- **🐳 Docker & Docker Compose Ready**: Multi-stage Bun Alpine Dockerfile with dynamic port binding support (`PORT`, `RANDOM_PORT`).
- **📊 100/100 Lighthouse Performance**: 100 SEO, 100 Best Practices, 0ms Total Blocking Time, 0 Cumulative Layout Shift.

---

## 🏛️ Architecture Overview (DDD Hexagonal)

```
src/
├── domain/                               <-- Pure Domain (Entities & Ports)
│   ├── models/                           (ChatMessage, ChatSession)
│   └── ports/                            (ITelegramServicePort, IRealtimeNotifierPort, IMessageRepositoryPort)
├── application/                          <-- Use Cases (Application Logic)
│   └── use-cases/                        (SendVisitorMessageUseCase, ProcessAdminReplyUseCase)
├── infrastructure/                       <-- Secondary Adapters
│   ├── adapters/                         (TelegramHttpAdapter, SocketIoRealtimeAdapter, LocalStoreAdapter)
│   └── config/                           (Dependency Injection Container)
└── presentation/                         <-- Primary Adapters
    ├── server.js                         (Express HTTP & Socket.io Server)
    └── components/                       (Preact UI Components)
```

---

## 🚀 Quick Start

### 1. Development Mode (Vite + HMR)

```bash
# Install dependencies with Bun
bun install

# Start Vite dev server with instant Hot Reload on http://localhost:5173
bun run dev
```

### 2. Production Build & Server

```bash
# Build production bundle with Webpack 5
bun run build

# Start server on http://localhost:3000
PORT=3000 TELEGRAM_TOKEN="YOUR_BOT_TOKEN" bun server.js
```

### 3. Docker Compose Deployment

```bash
# Launch containerized service
TELEGRAM_TOKEN="YOUR_BOT_TOKEN" PORT=3000 docker-compose up -d --build
```

---

## 💻 Embed Code Snippet

Paste this code snippet right before the closing `</body>` tag on your website:

```html
<script>
    window.intergramId = "YOUR_TELEGRAM_CHAT_ID";
    window.intergramServer = "https://your-domain.com"; // Your server URL
    window.intergramCustomizations = {
        lang: 'uk', // Supported: 'uk', 'en', 'es', 'de', 'ru'
        closedStyle: 'button', // 'button' or 'chat'
        mainColor: '#1f8ceb'
    };
</script>
<script type="module" src="https://your-domain.com/js/widget.js?v=2"></script>
```

---

## 🌐 Customization & i18n Options

| Option | Description | Default |
| :--- | :--- | :--- |
| `lang` | Language pack (`uk`, `en`, `es`, `de`, `ru`) | `'en'` |
| `closedStyle` | Floating trigger style (`'button'` or `'chat'`) | `'chat'` |
| `introMessage` | Initial welcome message | Auto-translated per `lang` |
| `placeholderText` | Textarea placeholder string | Auto-translated per `lang` |
| `mainColor` | Primary brand color (hex, rgb, etc.) | `'#1f8ceb'` |
