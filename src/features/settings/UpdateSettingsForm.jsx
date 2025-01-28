// components
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

// custom  hooks
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { isUpdating, updateSetting } = useUpdateSetting();
  const { isLoading, settings = {} } = useSettings();
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  if (isLoading) return <Spinner />;

  // event handlers
  function handleUpdate(event) {
    const { value, name } = event.target;

    if (!value) return;

    updateSetting({ [name]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          name="minBookingLength"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(event) => handleUpdate(event)}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          name="maxBookingLength"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(event) => handleUpdate(event)}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          name="maxGuestsPerBooking"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          onBlur={(event) => handleUpdate(event)}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          name="breakfastPrice"
          defaultValue={breakfastPrice}
          onBlur={(event) => handleUpdate(event)}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
