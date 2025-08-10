import DeliverySection from '@/components/receipt/DeliverySection';
import ItemSeparator from '@/components/receipt/ItemSeparator';
import MenuItem from '@/components/receipt/MenuItem';
import ReceiptFooter from '@/components/receipt/ReceiptFooter';
import ReceiptHeader from '@/components/receipt/ReceiptHeader';
import './dash.css';

type MenuItemProps = {
  type: 'item';
  quantity: number;
  name: string;
  comment?: string;
} | {
  type: 'separator';
};

interface ReceiptProps {
  header: {
    orderType: '堂食' | '外带';
    orderId: string;
  };
  menuItems: MenuItemProps[];
  deliveryOptions: {
    method: string;
    orderId: string;
    barcodeContent?: string;
  };
  footer: {
    signature: string;
    date?: Date;
  };
}

function Receipt({ ref, header, menuItems, deliveryOptions, footer }: ReceiptProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={ref}
      className="w-[384px] bg-white text-[18px] text-black leading-none select-none cursor-default"
      style={{
        fontFamily: '"bitmatrix a1", "Songti SC", serif',
      }}
    >
      <ReceiptHeader title={header.orderType} orderId={header.orderId} />
      {menuItems.map((item, index) => {
        if (item.type === 'item') {
          return <MenuItem key={index} quantity={item.quantity} name={item.name} comment={item.comment} />;
        }
        return <ItemSeparator key={index} />;
      })}
      <DeliverySection
        method={deliveryOptions.method}
        orderId={deliveryOptions.orderId}
        barcodeContent={deliveryOptions.barcodeContent}
      />
      <ReceiptFooter signature={footer.signature} date={footer.date} />
    </div>
  );
}

export default Receipt;
