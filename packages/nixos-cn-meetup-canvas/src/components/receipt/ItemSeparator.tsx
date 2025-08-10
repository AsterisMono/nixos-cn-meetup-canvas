interface ItemSeparatorProps {
  bold?: boolean;
  withAsterisk?: boolean;
}
export default function ItemSeparator({ bold, withAsterisk }: ItemSeparatorProps) {
  return (
    <div className="h-[10px] pt-[5px] relative">
      {withAsterisk && (
        <div className="absolute top-[-2px] left-[-14px]">*</div>
      )}
      <div className={`${bold ? 'dashed-line-bold' : 'dashed-line'}`}></div>
    </div>
  );
}
