import { useState } from "react";
import { useMutation } from "convex/react";
import { FunctionReference } from "convex/server";

export default function useApiMutation(func: FunctionReference<"mutation">) {
  const [isPending, setPending] = useState(false);
  const mutation = useMutation(func);

  const mutate = async (args: any) => {
    setPending(true);
    try {
      await mutation(args);
    } catch (e) {
      throw e;
    } finally {
      setPending(false);
    }
  };

  return { mutate, isPending };
}
