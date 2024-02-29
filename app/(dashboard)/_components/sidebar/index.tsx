import NewOrgButton from "./new-org-button";
import MembershipList from "./membership-list";

export default function Sidebar() {
  return (
    <aside className="bg-blue-950 h-full text-white fixed top-0 left-0 z-10 w-16 flex p-3 flex-col gap-y-4">
      <MembershipList />
      <NewOrgButton />
    </aside>
  );
}
