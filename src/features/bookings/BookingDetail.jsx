import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// components
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { HiTrash } from "react-icons/hi2";

// custom hooks
import { useMoveBack } from "../../hooks/useMoveBack";
import useBookingDetails from "./useBookingDetails";
import useCheckout from "../check-in-out/useCheckout";
import useDeletebooking from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

// constants
const statusToTagName = {
  unconfirmed: "blue",
  "checked-in": "green",
  "checked-out": "silver",
};

function BookingDetail() {
  const navigate = useNavigate();
  const { booking, isLoading } = useBookingDetails();
  const { isCheckingOut, checkOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeletebooking();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resource="booking" />;

  // booking data destructuring
  const { status, id } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${id}`)}>Check In</Button>
        )}

        {status === "checked-in" && (
          <Button
            onClick={() => {
              checkOut(id);
            }}
            disabled={isCheckingOut}
          >
            Check Out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger" icon={<HiTrash />}>
              Delete Booking
            </Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() => {
                deleteBooking(id, {
                  onSettled: () => navigate(-1),
                });
              }}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
