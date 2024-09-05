// Components
import { Icon } from "@/components/Icon";

type ProductsHeaderProps = {
  label: string;
};

export function ProductsHeader(props: ProductsHeaderProps) {
  const { label } = props;
  return (
    <div className="flex justify-between items-center h-28 bg-gray-100 px-16">
      <div className="flex items-center gap-2">
        <Icon icon="Filter" height={16} width={16} />
        <span className="font-montserrat uppercase text-base">Filter</span>
      </div>
      <span className="capitalize font-tangerine text-6xl">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-montserrat uppercase text-base">Most recent</span>
        <Icon icon="ChevronDown" height={16} width={16} />
      </div>
    </div>
  );
}
