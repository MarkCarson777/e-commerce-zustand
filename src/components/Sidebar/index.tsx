import clsx from "clsx";

// Next
import Link from "next/link";
// Routing
import { useRouter } from "next/navigation";
// Store
import { useAuthStore } from "@/stores/AuthStore";
// Components
import { Icon } from "@/components/Icon";
import { signOut } from "@/firebase/auth";

type SidebarProps = {
  className?: string;
};

type TabProps = {
  name: string;
  path: string;
};

export function Sidebar(props: SidebarProps) {
  const { className } = props;
  const currentUser = useAuthStore((state) => state.currentUser);
  const router = useRouter();

  const tabs: TabProps[] = [
    { name: "STORE MANAGEMENT", path: "/dashboard" },
    { name: "ORDER MANAGEMENT", path: "/dashboard/orders" },
    { name: "SETTINGS", path: "/dashboard/settings" },
  ];

  return (
    <aside
      className={clsx(
        "flex flex-col h-screen w-3/12 bg-gray-800 text-white p-4 gap-4",
        className
      )}
    >
      <Link href="/" className="w-fit">
        <div className="flex gap-2">
          <Icon icon="Home" height={24} width={24} color="#fff" />
          <span>APOLA SHOWROOM</span>
        </div>
      </Link>
      <nav className="flex flex-col gap-2">
        {tabs.map((tab, index) => {
          return (
            <Link key={index} href={tab.path}>
              <div className="p-4 border-2 border-gray-400 rounded-md hover:bg-gray-600">
                {tab.name}
              </div>
            </Link>
          );
        })}
      </nav>
      {currentUser !== null && (
        <button
          className="p-4 border-2 border-gray-400 rounded-md hover:bg-gray-600 flex items-center gap-3"
          type="button"
          onClick={() => {
            signOut();
            router.push("/");
          }}
        >
          <Icon icon="Signout" height={24} width={24} color="#FFF" />
          <span className="uppercase">Sign out</span>
        </button>
      )}
    </aside>
  );
}
