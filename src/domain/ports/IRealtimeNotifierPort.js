/**
 * Outbound Port: Realtime Notifier (WebSockets) Interface
 */
export class IRealtimeNotifierPort {
  notifyUser(userId, eventName, payload) {
    throw new Error('Method notifyUser() must be implemented');
  }

  broadcast(channelName, payload) {
    throw new Error('Method broadcast() must be implemented');
  }
}
