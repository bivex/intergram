import axios from 'axios';
import { ITelegramServicePort } from '../../../domain/ports/ITelegramServicePort';

/**
 * Secondary Adapter: Telegram HTTP API Adapter
 */
export class TelegramHttpAdapter extends ITelegramServicePort {
  constructor(botToken = process.env.TELEGRAM_TOKEN) {
    super();
    this.botToken = botToken;
  }

  async sendMessage(chatId, text, parseMode) {
    if (!this.botToken) {
      console.error("[TelegramHttpAdapter] TELEGRAM_TOKEN is not set");
      return;
    }
    try {
      await axios.post(`https://api.telegram.org/bot${this.botToken}/sendMessage`, {
        chat_id: chatId,
        text: text,
        parse_mode: parseMode
      });
    } catch (err) {
      console.error("[TelegramHttpAdapter] Send error:", err.response ? err.response.data : err.message);
    }
  }
}
