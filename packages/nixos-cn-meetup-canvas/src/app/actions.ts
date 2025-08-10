'use server';

import process from 'node:process';
import { getOrderIdStub } from '@/cloudflare/utils';

let devMemoryStorage: number = 25000;

export async function getAndIncrementOrderId(): Promise<number> {
  if (process.env.NODE_ENV === 'development') {
    devMemoryStorage++;
    return devMemoryStorage;
  }
  const stub = getOrderIdStub();
  return stub.getAndIncrementOrderId();
}

export async function getOrderId(): Promise<number> {
  if (process.env.NODE_ENV === 'development') {
    return devMemoryStorage;
  }
  const stub = getOrderIdStub();
  return stub.getOrderId();
}

export async function setOrderId(orderId: number): Promise<void> {
  if (process.env.NODE_ENV === 'development') {
    devMemoryStorage = orderId;
    return;
  }
  const stub = getOrderIdStub();
  await stub.setOrderId(orderId);
}
