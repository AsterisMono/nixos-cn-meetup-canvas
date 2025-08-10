import { getCloudflareContext } from '@opennextjs/cloudflare';

export function getOrderIdStub() {
  const ctx = getCloudflareContext();
  const id = ctx.env.ORDER_ID.idFromName('NIX_OS_CN_MEETUP');
  return ctx.env.ORDER_ID.get(id);
}
