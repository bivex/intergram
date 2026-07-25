import { ChatMessage } from './ChatMessage';

/**
 * ChatSession Aggregate Root (Domain Layer)
 */
export class ChatSession {
  constructor({ sessionId, chatId, userId, host, messages = [] }) {
    this.sessionId = sessionId || `${chatId}-${userId}`;
    this.chatId = chatId;
    this.userId = userId;
    this.host = host || 'unknown-host';
    this.messages = messages.map(m => m instanceof ChatMessage ? m : new ChatMessage(m));
  }

  addMessage(messageData) {
    const message = messageData instanceof ChatMessage ? messageData : new ChatMessage(messageData);
    this.messages.push(message);
    return message;
  }

  getLatestMessage() {
    return this.messages[this.messages.length - 1] || null;
  }
}
