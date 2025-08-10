import ItemSeparator from '@/components/receipt/ItemSeparator';

interface HeaderProps {
  title: string;
  orderId: string;
}

export default function ReceiptHeader({ title, orderId }: HeaderProps) {
  return (
    <>
      <div className="flex flex-row justify-between mb-[12px]">
        <span>{title}</span>
        <span>{orderId}</span>
      </div>
      <ItemSeparator bold />
    </>
  );
}
