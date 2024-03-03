import { Loader2 } from "lucide-react";

export default function SpinningLoader() {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <Loader2 size={32} className="animate-spin" />
    </div>
  );
}
