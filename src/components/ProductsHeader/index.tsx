type ProductsHeaderProps = {
  label: string;
};

export function ProductsHeader(props: ProductsHeaderProps) {
  const { label } = props;
  return <span className="capitalize">{label}</span>;
}
