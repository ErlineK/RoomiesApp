import React, { useContext, useState } from "react";
import useInputState from "../../../hooks/useInputState";
// import "../GenericComponents/ui/forms.scss";
import PopUpCard from "../../GenericComponents/PopUpCard";
import { BillsContext } from "../BillsContext";
import CircleLoader from "../../GenericComponents/Loader/CircleLoader";
import { formatInputDate } from "../../../utils/formatHelper";
import { HouseContext } from "../../UserSettings/House/HouseContext";
import CustomInput from "../../GenericComponents/CustomInput";

function AddPayment({ bill }) {
  const { toggleAddPayment, addBillPayment, requestStatus } = useContext(
    BillsContext
  );

  const [error, setError] = useState();

  const [
    paymentDate,
    handlePaymentDateChange,
    validatePaymentDate,
    paymentDateError,
  ] = useInputState(formatInputDate(new Date()), "DATE");

  const [
    paymentSum,
    handlePaymentSumChange,
    validatePaymentSum,
    paymentSumError,
  ] = useInputState("", "BILL_SUM");

  const [
    refNum,
    handleRefNumChange,
    validateRefNum,
    refNumError,
  ] = useInputState("", "INV_NUM");

  const [comment, handleCommentChange] = useInputState("", "COMMENT");

  // const houseTenants = getActiveTenants();

  // const tenantsList = houseTenants
  //   ? houseTenants.map((tenant) => tenant.name)
  //   : "";

  const handleAddPayment = () => {
    console.log("saving payment");

    const payment = {
      transaction_date: paymentDate,
      reference_num: refNum,
      // to_user: isRoomieTransfer ? paidTo : undefined,
      total_amount: paymentSum,
      comment: comment,
    };

    addBillPayment(payment, bill._id);
  };

  //   Validate name exist and not empty
  function validate() {
    let validated = false;
    setError(undefined);

    if (validatePaymentDate() && validatePaymentSum() && validateRefNum()) {
      validated = true;
    }

    return validated;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      handleAddPayment();
    } else {
      // setError("Invalid data.\n");
    }
  };

  const isRoomieTransfer = bill.billType === "Roomie Transfer";

  // const roomieOptions = houseTenants.map((roomie) => (
  //   <option key={roomie.name} value={roomie.name}>
  //     {roomie.name}
  //   </option>
  // ));

  const pageTitle = isRoomieTransfer
    ? "Add Roomie Transfer"
    : `Add payment for ${bill.bill_type} bill`;

  return (
    <PopUpCard togglePop={toggleAddPayment}>
      <div>
        <h4 className="section-title">{pageTitle}</h4>

        {requestStatus.isError ||
          (error && <div className="alert alert-danger">{error}</div>)}

        <form className="form-holder">
          <CustomInput
            key={"billing_date"}
            itemId={"billing_date"}
            value={paymentDate}
            label={"Payment Date"}
            type={"date"}
            handleOnChange={handlePaymentDateChange}
            errorMsg={paymentDateError}
          />

          <CustomInput
            itemId={"total_amount"}
            value={paymentSum}
            label={"Total paid"}
            type={"number"}
            handleOnChange={handlePaymentSumChange}
            errorMsg={paymentSumError}
            placeHolder={"Example: 20.00"}
            specialChar={"$"}
          />

          <CustomInput
            key={"reference_num"}
            itemId={"reference_num"}
            value={refNum}
            label={"Reference #"}
            type={"text"}
            handleOnChange={handleRefNumChange}
            errorMsg={refNumError}
            placeHolder={"Example: 123456"}
          />

          <CustomInput
            key={"comment"}
            itemId={"comment"}
            value={comment}
            label={"Comment"}
            type={"text"}
            handleOnChange={handleCommentChange}
            placeHolder={"Example: paid for..."}
          />

          <div className="form-group">
            {requestStatus.isLoading ? (
              <CircleLoader />
            ) : (
              <div className="buttonsHolder">
                <button
                  type="submit"
                  className="btn btn-grad-pressed buttonsHolder"
                  onClick={(e) => handleSubmit(e)}
                >
                  Add Payment
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </PopUpCard>
  );
}

export default AddPayment;
