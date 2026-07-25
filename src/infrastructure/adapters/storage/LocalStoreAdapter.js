import store from 'store';
import { IMessageRepositoryPort } from '../../../domain/ports/IMessageRepositoryPort';

/**
 * Secondary Adapter: Browser Local Storage Adapter
 */
export class LocalStoreAdapter extends IMessageRepositoryPort {
  async getMessages(key) {
    if (!store.enabled) return [];
    try {
      const messages = store.get(key);
      return Array.isArray(messages) ? messages : [];
    } catch (e) {
      console.error("[LocalStoreAdapter] Error loading key:", key, e);
      return [];
    }
  }

  async saveMessages(key, messages) {
    if (!store.enabled) return;
    try {
      store.set(key, messages);
    } catch (e) {
      console.error("[LocalStoreAdapter] Error saving key:", key, e);
    }
  }
}
