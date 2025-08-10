import ItemSeparator from '@/components/receipt/ItemSeparator';

interface FooterProps {
  signature: string;
  date?: Date;
}

export default function ReceiptFooter({ signature, date }: FooterProps) {
  const _date = date ?? new Date();
  return (
    <>
      <ItemSeparator bold withAsterisk />
      <div className="flex flex-row justify-between mt-[10px]">
        <span>{signature}</span>
        <div className="flex flex-row gap-[8px]">
          <span>{_date.toLocaleDateString('zh-CN', { timeZone: 'Asia/Shanghai' })}</span>
          <span>{_date.toLocaleTimeString('zh-CN', { timeZone: 'Asia/Shanghai' })}</span>
        </div>
      </div>
    </>
  );
}
