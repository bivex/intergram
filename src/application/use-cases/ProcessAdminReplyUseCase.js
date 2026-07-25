import { ChatMessage } from '../../domain/models/ChatMessage';

/**
 * Application Use Case: ProcessAdminReply (Telegram Webhook Handler)
 */
export class ProcessAdminReplyUseCase {
  constructor({ telegramAdapter, realtimeAdapter }) {
    this.telegramAdapter = telegramAdapter;
    this.realtimeAdapter = realtimeAdapter;
  }

  async execute({ telegramUpdate }) {
    const message = telegramUpdate.message || telegramUpdate.channel_post;
    if (!message || !message.chat) return;

    const chatId = message.chat.id;
    const name = message.chat.first_name || message.chat.title || "admin";
    const text = message.text || "";
    const reply = message.reply_to_message;

    if (text.startsWith("/start")) {
      const welcomeText = "*Welcome to Intergram*\n" +
        `Your unique chat id is \`${chatId}\`\n` +
        "Use it to link between the embedded chat and this telegram chat";
      await this.telegramAdapter.sendMessage(chatId, welcomeText, "Markdown");
      return;
    }

    if (reply) {
      const replyText = reply.text || "";
      const userId = replyText.split(':')[0];
      const chatMessage = new ChatMessage({ text, from: 'admin', visitorName: name });
      this.realtimeAdapter.notifyUser(userId, `${chatId}-${userId}`, chatMessage.toJSON());
    } else if (text) {
      const chatMessage = new ChatMessage({ text, from: 'admin', visitorName: name });
      this.realtimeAdapter.broadcast(String(chatId), chatMessage.toJSON());
    }
  }
}
