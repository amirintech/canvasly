import { OrganizationSwitcher } from "@clerk/clerk-react";

export default function OrgSwitcher() {
  return (
    <OrganizationSwitcher
      hidePersonal
      appearance={{
        elements: {
          rootBox: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            border: "1px solid #E5E7EB",
            borderRadius: "0.5rem",
          },
          organizationSwitcherTrigger: {
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
            padding: "8px",
          },
        },
      }}
    />
  );
}
