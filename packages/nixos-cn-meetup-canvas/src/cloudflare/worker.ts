import { DurableObject } from 'cloudflare:workers';
// eslint-disable-next-line ts/ban-ts-comment
// @ts-ignore `.open-next/worker.ts` is generated at build time
import handler from '../../.open-next/worker.js';

export class OrderId extends DurableObject {
  constructor(state: DurableObjectState, env: CloudflareEnv) {
    super(state, env);
  }

  async getAndIncrementOrderId(): Promise<number> {
    const currentOrderId = await this.ctx.storage.get<number>('ORDER_ID');
    if (!currentOrderId) {
      await this.ctx.storage.put('ORDER_ID', 25000);
      return 25000;
    }
    const nextOrderId = currentOrderId + 1;
    await this.ctx.storage.put('ORDER_ID', nextOrderId);
    return currentOrderId;
  }

  async getOrderId(): Promise<number> {
    const currentOrderId = await this.ctx.storage.get<number>('ORDER_ID');
    if (!currentOrderId) {
      throw new Error('Order ID not found');
    }
    return currentOrderId;
  }

  async setOrderId(orderId: number): Promise<void> {
    await this.ctx.storage.put('ORDER_ID', orderId);
  }
}

export default {
  fetch: handler.fetch,
} satisfies ExportedHandler<CloudflareEnv>;
