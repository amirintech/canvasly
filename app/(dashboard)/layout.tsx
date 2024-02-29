import Sidebar from "./_components/sidebar";
import OrgSidebar from "./_components/org-sidebar";
import Navbar from "./_components/navbar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="w-screen h-screen">
      <Sidebar />
      <div className="pl-16 h-full">
        <div className="flex gap-x-3 h-full">
          <OrgSidebar />
          <main className="flex-1 h-full">
            <Navbar />
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
