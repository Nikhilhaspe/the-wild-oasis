import { useQuery, useQueryClient } from "@tanstack/react-query";

// constants
import { PAGE_SIZE } from "../../utils/constants";

// api services
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // 1. FILTER
  const filterValue = searchParams.get("status");
  const filter =
    filterValue === null
      ? null
      : filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };

  // 2. SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // 3. PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    // re-fetch when filter changes!
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      // re-fetch when filter changes!
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      // re-fetch when filter changes!
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { bookings, count, isLoading, error };
}

export default useBookings;
