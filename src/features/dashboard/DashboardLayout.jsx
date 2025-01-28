import styled from "styled-components";

// components
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

// custom hooks
import { useCabins } from "../cabins/useCabins";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

// components
// styled CC
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { cabins, isLoading: isLoading2 } = useCabins();
  const { isLoading, bookings } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading1, numDays } = useRecentStays();

  if (isLoading || isLoading1 || isLoading2) return <Spinner />;

  return (
    <div>
      <StyledDashboardLayout>
        <Stats
          cabinCount={cabins.length}
          numDays={numDays}
          bookings={bookings}
          confirmedStays={confirmedStays}
        />

        <TodayActivity />

        <DurationChart confirmedStays={confirmedStays} />

        <SalesChart numDays={numDays} bookings={bookings} />
      </StyledDashboardLayout>
    </div>
  );
}

export default DashboardLayout;
