type ProductsHeaderProps = {
  label: string;
};

export function ProductsHeader(props: ProductsHeaderProps) {
  const { label } = props;
  return (
    <div className="flex justify-center items-center h-28 bg-gray-100">
      <span className="capitalize font-tangerine text-6xl">{label}</span>
    </div>
  );
}
