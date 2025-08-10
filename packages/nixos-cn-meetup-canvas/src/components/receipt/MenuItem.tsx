interface MenuItemProps {
  quantity: number;
  name: string;
  comment?: string;
}

export default function MenuItem({ quantity, name, comment }: MenuItemProps) {
  return (
    <div className="px-[22px] my-[10px]">
      <div className="flex flex-row gap-[10px]">
        <span>{quantity}</span>
        <div className="flex flex-col">
          <span>{name}</span>
          {comment && <div className="mt-[8px] ml-[16px]">{comment}</div>}
        </div>
      </div>
    </div>
  );
}
