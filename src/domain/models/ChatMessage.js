/**
 * ChatMessage Entity (Domain Layer)
 */
export class ChatMessage {
  constructor({ id, text, from, visitorName, timestamp = new Date() }) {
    this.id = id || Math.random().toString(36).substr(2, 9);
    this.text = text || '';
    this.from = from || 'visitor'; // 'visitor' | 'admin'
    this.visitorName = visitorName || '';
    this.timestamp = timestamp instanceof Date ? timestamp : new Date(timestamp);
  }

  isAdmin() {
    return this.from === 'admin';
  }

  isVisitor() {
    return this.from === 'visitor';
  }

  toJSON() {
    return {
      id: this.id,
      text: this.text,
      from: this.from,
      visitorName: this.visitorName,
      time: this.timestamp
    };
  }
}
