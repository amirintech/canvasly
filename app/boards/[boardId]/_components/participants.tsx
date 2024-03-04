"use client";

import { useOthers, useSelf } from "@/liveblocks.config";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Tooltip from "@/components/shared/tooltip";
import { mapConnectionIdToColor } from "@/lib/utils";

const MAX_PARTICIPANTS_SHOWN = 3;

export default function Participants() {
  const self = useSelf();
  const others = useOthers();
  const participants = getUniqueParticipants([self, ...others] as {
    id: string;
  }[]);

  return (
    <div className="absolute top-2 p-2 flex items-center justify-center py-1 right-2 rounded-md bg-white shadow-md">
      <ul className="flex items-center gap-1">
        {participants.slice(0, MAX_PARTICIPANTS_SHOWN).map((p) => (
          <li
            key={p.id}
            className="border-2 rounded-full"
            style={{ borderColor: mapConnectionIdToColor(p.connectionId) }}
          >
            <Tooltip label={p.info.name} side="bottom" sideOffset={8}>
              <Avatar className="w-9 h-9">
                <AvatarImage src={p.info?.avatar} />
                <AvatarFallback>
                  {p.info?.name?.substring(0, 2).toLocaleUpperCase() ?? "AN"}
                </AvatarFallback>
              </Avatar>
            </Tooltip>
          </li>
        ))}
      </ul>

      {participants.length > MAX_PARTICIPANTS_SHOWN && (
        <div className="border-2 text-sm border-neutral-400 font-medium text-neutral-400 rounded-full w-10 h-10 flex items-center justify-center ml-1 ">
          +{participants.length - MAX_PARTICIPANTS_SHOWN}
        </div>
      )}
    </div>
  );
}

export function getUniqueParticipants(participants: { id: string }[]) {
  return participants.reduce((prev: any[], curr) => {
    if (prev.findIndex((val) => val.id == curr.id) === -1) prev.push(curr);
    return prev;
  }, []);
}
