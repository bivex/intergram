import { IRealtimeNotifierPort } from '../../../domain/ports/IRealtimeNotifierPort';

/**
 * Secondary Adapter: Socket.io Realtime Adapter
 */
export class SocketIoRealtimeAdapter extends IRealtimeNotifierPort {
  constructor(io) {
    super();
    this.io = io;
  }

  notifyUser(userId, channelName, payload) {
    if (this.io) {
      this.io.to(userId).emit(channelName, payload);
    }
  }

  broadcast(channelName, payload) {
    if (this.io) {
      this.io.emit(channelName, payload);
    }
  }
}
