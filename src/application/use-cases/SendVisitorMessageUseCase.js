import { ChatMessage } from '../../domain/models/ChatMessage';

/**
 * Application Use Case: SendVisitorMessage
 */
export class SendVisitorMessageUseCase {
  constructor({ telegramAdapter, realtimeAdapter }) {
    this.telegramAdapter = telegramAdapter;
    this.realtimeAdapter = realtimeAdapter;
  }

  async execute({ chatId, userId, text, visitorName }) {
    const message = new ChatMessage({ text, from: 'visitor', visitorName });

    // 1. Broadcast to visitor realtime channel
    if (this.realtimeAdapter) {
      this.realtimeAdapter.notifyUser(userId, `${chatId}-${userId}`, message.toJSON());
    }

    // 2. Forward message to Telegram bot
    if (this.telegramAdapter) {
      const namePrefix = visitorName ? `[${visitorName}]: ` : '';
      const telegramText = `${userId}:${namePrefix} ${text}`;
      await this.telegramAdapter.sendMessage(chatId, telegramText);
    }

    return message;
  }
}
