/**
 * Outbound Port: Telegram Gateway Interface
 */
export class ITelegramServicePort {
  async sendMessage(chatId, text, parseMode) {
    throw new Error('Method sendMessage() must be implemented');
  }
}
