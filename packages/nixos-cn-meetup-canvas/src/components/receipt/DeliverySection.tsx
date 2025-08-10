'use client';
import { ReactBarcode } from 'react-jsbarcode';
import ItemSeparator from '@/components/receipt/ItemSeparator';

interface DeliverySectionProps {
  method: string;
  orderId: string;
  barcodeContent?: string;
}

export default function DeliverySection({
  method,
  orderId,
  barcodeContent,
}: DeliverySectionProps) {
  return (
    <>
      <ItemSeparator bold />
      <div className="mt-[16px] mb-[4px] flex flex-col items-center gap-[8px]">
        <div className="text-[20px]">{method}</div>
        <div className="text-[96px]">{orderId}</div>
        <div className="text-[32px]">备注</div>
        <ReactBarcode
          value={barcodeContent ?? orderId}
          className="mt-[4px]"
          options={{
            displayValue: false,
            height: 95,
            width: 2,
          }}
        />
      </div>
    </>
  );
}
