import { TelegramHttpAdapter } from '../adapters/telegram/TelegramHttpAdapter';
import { SocketIoRealtimeAdapter } from '../adapters/realtime/SocketIoRealtimeAdapter';
import { SendVisitorMessageUseCase } from '../../application/use-cases/SendVisitorMessageUseCase';
import { ProcessAdminReplyUseCase } from '../../application/use-cases/ProcessAdminReplyUseCase';

/**
 * Hexagonal Dependency Injection Container
 */
export function createContainer(io) {
  const telegramAdapter = new TelegramHttpAdapter();
  const realtimeAdapter = new SocketIoRealtimeAdapter(io);

  const sendVisitorMessageUseCase = new SendVisitorMessageUseCase({ telegramAdapter, realtimeAdapter });
  const processAdminReplyUseCase = new ProcessAdminReplyUseCase({ telegramAdapter, realtimeAdapter });

  return {
    telegramAdapter,
    realtimeAdapter,
    sendVisitorMessageUseCase,
    processAdminReplyUseCase
  };
}
