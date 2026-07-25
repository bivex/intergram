/**
 * Outbound Port: Message Storage Interface
 */
export class IMessageRepositoryPort {
  async getMessages(key) {
    throw new Error('Method getMessages() must be implemented');
  }

  async saveMessages(key, messages) {
    throw new Error('Method saveMessages() must be implemented');
  }
}
