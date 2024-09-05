type ProductsHeaderProps = {
  label: string;
};

export function ProductsHeader(props: ProductsHeaderProps) {
  const { label } = props;
  return <div>{label}</div>;
}
