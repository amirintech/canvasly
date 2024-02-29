"use client";

import { UserButton, useOrganization } from "@clerk/clerk-react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import qs from "query-string";

import { Input } from "@/components/ui/input";
import OrgSwitcher from "./sidebar/org-switcher";
import InviteButton from "./invite-button";

export default function Navbar() {
  const { organization } = useOrganization();
  const router = useRouter();
  const [value, setValue] = useDebounceValue("", 300);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: { search: value },
      },
      { skipEmptyString: true, skipNull: true }
    );
    console.log(url);
    router.push(url);
  }, [value, router]);

  return (
    <nav className="w-full flex p-4 items-center gap-x-4">
      <div className="hidden lg:block w-full relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          onChange={handleChange}
          placeholder="Search boards"
          className="pl-9 w-full max-w-lg"
        />
      </div>

      <div className="lg:hidden basis-full max-w-xs mr-auto ">
        <OrgSwitcher />
      </div>

      {organization && <InviteButton />}

      <UserButton />
    </nav>
  );
}
