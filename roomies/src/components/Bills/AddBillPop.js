import React, { useContext, useState } from "react";
import useInputState from "../../hooks/useInputState";
import "../auth/auth.scss";
import "../GenericComponents/forms.scss";
import PopUpCard from "../GenericComponents/PopUpCard";
import { BillsContext } from "./BillsContext";
import { BILL_TYPES } from "../../utils/AppParams";
import CircleLoader from "../GenericComponents/Loader/CircleLoader";

function AddBillPop() {
  const { toggleAddBill, addBill, requestStatus } = useContext(BillsContext);
  const [error, setError] = useState();

  const [
    invNum,
    handleInvNumChange,
    validateInvNum,
    invNumError
  ] = useInputState("", "INV_NUM");
  const [
    billType,
    handleBillTypeChange,
    validateBillType,
    billTypeError
  ] = useInputState("select", "BILL_TYPE");
  const [
    dueDate,
    handleDueDateChange,
    validateDueDate,
    dueDateError
  ] = useInputState("", "DATE");

  const [
    strDate,
    handleStrDateChange,
    validateStrDate,
    strDateError
  ] = useInputState("", "DATE");

  const [
    endDate,
    handleEndDateChange,
    validateEndDate,
    endDateError
  ] = useInputState("", "DATE");

  const [
    totalSum,
    handleTotalSumChange,
    validateTotalSum,
    totalSumError
  ] = useInputState("", "BILL_SUM");

  const [billComment, handleBillCommentChange] = useInputState("", "COMMENT");

  // const [billImages, setBillImages] = useState();

  const handleAddBill = () => {
    console.log("saving bill");

    const bill = {
      invoice_num: invNum,
      bill_type: billType,
      start_date: strDate,
      end_date: endDate,
      total_amount: totalSum,
      due_date: dueDate,
      comment: billComment
      // bill_images: billImages
    };

    // TODO: add loader

    addBill(bill);
  };

  //   Validate name exist and not empty
  function validate() {
    let validated = false;

    if (
      validateBillType() &&
      validateInvNum() &&
      validateStrDate() &&
      validateEndDate() &&
      validateDueDate() &&
      validateTotalSum()
    ) {
      validated = true;
      if (endDate < strDate) {
        validated = false;
        // setError("Invalid billing period");
      }
    }

    return validated;
  }

  const handleSubmit = event => {
    event.preventDefault();

    // TODO: validate end date after start date
    if (validate()) {
      handleAddBill();
      // toggleAddBill();
    } else {
      // setError("Invalid data.\n");
    }
  };

  const billTypeOptions = BILL_TYPES.map(option => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  return (
    <PopUpCard togglePop={toggleAddBill}>
      <div>
        <h4 className="section-title">Add Bill</h4>

        {requestStatus.isError && error && (
          <div className="alert alert-danger">{error}</div>
        )}

        <div className="flex-container flex-between form-group userDataItem">
          <select
            className="form-control"
            id="billType"
            onChange={handleBillTypeChange}
            value={billType}
          >
            <option value="select" disabled>
              Select Bill Type...
            </option>
            {billTypeOptions}
          </select>
          <small className="form-alert">{billTypeError}</small>
        </div>

        <form className="userDataItem houseForm">
          <div className="flex-container flex-between form-group">
            <label htmlFor="inv_num">Invoice Number</label>
            <input
              id="inv_num"
              type="text"
              maxLength="12"
              name="inv_num"
              placeholder="Example: 123456"
              className="form-control"
              value={invNum}
              onChange={handleInvNumChange}
            />
            <small className="form-alert">{invNumError}</small>
          </div>

          <div className="flex-container flex-between">
            <label htmlFor="billingPeriod">Billing Period</label>
            <div className="flex-container flex-between">
              <div
                id="billingPeriod"
                className="flex-container flex-between form-group"
                style={{ maxWidth: "48%" }}
              >
                <input
                  id="strDate"
                  type="date"
                  name="strDate"
                  placeholder="01/01/2020"
                  className="form-control"
                  value={strDate}
                  onChange={handleStrDateChange}
                />
                <small className="form-alert">{strDateError}</small>
              </div>
              <span style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }}>
                -
              </span>
              <div
                className="flex-container flex-between form-group"
                style={{ maxWidth: "48%" }}
              >
                <input
                  id="endDate"
                  type="date"
                  name="endDate"
                  placeholder="01/01/2020"
                  className="form-control"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
                <small className="form-alert">{endDateError}</small>
              </div>
            </div>
          </div>

          <div className="flex-container flex-around">
            <div className="flex-container flex-between form-group doubleColumn">
              <label htmlFor="totalSum">Total to pay</label>
              <div className="flex-container">
                <span style={{ marginTop: "0.75rem" }}>$</span>
                <input
                  id="totalSum"
                  type="number"
                  name="totalSum"
                  placeholder="Example: 50.00"
                  className="form-control"
                  value={totalSum}
                  onChange={handleTotalSumChange}
                />
              </div>
              <small className="form-alert">{totalSumError}</small>
            </div>

            <div className="flex-container flex-between form-group doubleColumn">
              <label htmlFor="totalSum">Pay before</label>
              <div className="flex-container">
                <input
                  id="dueDate"
                  type="date"
                  name="dueDate"
                  placeholder="01/01/2020"
                  className="form-control"
                  value={dueDate}
                  onChange={handleDueDateChange}
                />
              </div>
              <small className="form-alert">{dueDateError}</small>
            </div>
          </div>

          <div className="flex-container flex-between form-group">
            <label htmlFor="billComment">Comment</label>
            <input
              id="billComment"
              type="text"
              rows="3"
              name="billComment"
              placeholder="Comment..."
              className="form-control"
              value={billComment}
              onChange={handleBillCommentChange}
            />
          </div>

          {/* <div className="flex-container flex-between form-group">
            <label htmlFor="billComment" className="disabled">
              Bill Invoice
            </label>
            Upload bill images...
            <small className="form-text text-muted">(comming soon)</small>
            <div className="invalid-feedback">{totalSumError}</div>
          </div> */}

          <div className="form-group">
            {requestStatus.isLoading ? (
              <CircleLoader />
            ) : (
              <button
                type="submit"
                className="btn btn-grad-pressed"
                onClick={e => handleSubmit(e)}
              >
                Add Bill
              </button>
            )}
          </div>
        </form>
      </div>
    </PopUpCard>
  );
}

export default AddBillPop;
