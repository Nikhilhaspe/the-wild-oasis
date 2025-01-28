import { useQuery } from "@tanstack/react-query";

// api services
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return {
    isLoading,
    error,
    settings,
  };
}
