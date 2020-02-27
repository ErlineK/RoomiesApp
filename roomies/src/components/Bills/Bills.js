import React, { Component } from "react";
// import GenericButton from '../../GenericButton';
import "./Bills.css";
import SideButton from "../SideBar/sidebuttons";

class Bills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBill: {},
      bills: [
        {
          id: "1",
          people: [
            { name: "Devin", owed: 250, paid: 300 },
            { name: "Mike", owed: 250, paid: 200 },
            { name: "Nicole", owed: 250, paid: 0 },
            { name: "Erline", owed: 250, paid: 0 }
          ],
          name: "bill1",
          desc: "this is bill1's desc",
          value: 1000
        },
        {
          id: "2",
          people: [
            { name: "Devin", owed: 250, paid: 200 },
            { name: "Mike", owed: 250, paid: 250 },
            { name: "Nicole", owed: 250, paid: 250 },
            { name: "Erline", owed: 250, paid: 200 }
          ],
          name: "bill2",
          desc: "this is bill2's desc",
          value: 2000
        },
        {
          id: "3",
          people: [
            { name: "Devin", owed: 250, paid: 200 },
            { name: "Mike", owed: 250, paid: 250 },
            { name: "Nicole", owed: 250, paid: 250 },
            { name: "Erline", owed: 250, paid: 200 }
          ],
          name: "bill3",
          desc: "this is bill3's desc",
          value: 3000
        }
      ],
      people: [
        { name: "Devin", owed: 250, paid: 200 },
        { name: "Mike", owed: 250, paid: 250 },
        { name: "Nicole", owed: 250, paid: 250 },
        { name: "Erline", owed: 250, paid: 200 }
      ],
      value: "",
      billValue: "0"
    };
    this.changeBill = this.changeBill.bind(this);
    this.payBill = this.payBill.bind(this);
    this.getChart = this.getChart.bind(this);
  }

  // allow users to change which bill is currently selected from the dropdown
  changeBill = e => {
    const selectedBill = this.state.bills.find(
      bill => bill.id === e.target.value
    );
    this.setState({
      billValue: e.target.value,
      selectedBill
    });
  };

  //allow users to update how much they've paid towards the selected bill
  payBill = e => {
    if (e.key === "Enter") {
      const paid = parseInt(this.state.value);
      if (
        paid &&
        typeof paid === "number" &&
        paid > 0 &&
        paid <= this.state.selectedBill.value
      ) {
        //make changes to database instead of doing this whenever we have access to it
        const newValue = this.state.selectedBill.value - paid;
        const newBill = { ...this.state.selectedBill, value: newValue };
        const newBills = this.state.bills.map(bill =>
          bill.name === newBill.name ? { ...bill, value: newBill.value } : bill
        );

        this.setState({
          value: "",
          selectedBill: newBill,
          bills: newBills
        });
      }
    }
  };

  getChart = () => {
    const colors = ["red", "blue", "yellow", "pink", "yellow"];
    let storedPercent = 0;
    const gradients = this.state.selectedBill.people.map((person, index) => {
      const percent = (person.paid / this.state.selectedBill.value) * 100;
      storedPercent += percent;
      return `${colors[index]} ${storedPercent - percent}%, ${
        colors[index]
      } ${storedPercent}%`;
    });
    return `linear-gradient(to top, ${gradients.toString()}, white ${storedPercent}%)`;
  };

  render() {
    return (
      <div className="Bills">
        <div className="Bills-topNav">
          {/* <div className="Bills-nav">
                        <GenericButton buttonClass="button red" name="button1" />
                        <GenericButton buttonClass="button red" name="button1" />
                    </div> */}
        </div>

        <SideButton />
        <div className="Bills-mainContent">
          <h1>Bills</h1>
          <div className="Bills-columns">
            <label htmlFor="billsDropDown">Select a bill</label>
            <br />
            <select
              id="billsDropDown"
              value={this.state.billValue}
              onChange={this.changeBill}
            >
              <option disabled value="0">
                Select Bill
              </option>
              {this.state.bills.map((bill, index) => (
                <option key={index} value={bill.id}>
                  {bill.name}
                </option>
              ))}
            </select>
            {this.state.selectedBill.value >= 0 && (
              <>
                <p>Bill Total is: {this.state.selectedBill.value} </p>
                <p>Your remaining total is:{this.state.people[0].owed}</p>
                <p>
                  {this.state.people[1].name} remaining total is:
                  {this.state.people[1].owed}
                </p>
                <p>
                  {this.state.people[2].name} remaining total is:
                  {this.state.people[2].owed}
                </p>
                <p>
                  {this.state.people[3].name} remaining total is:
                  {this.state.people[3].owed}
                </p>
                <p>
                  Remaining to be paid: $ADD ALL THE REMAINNG OWED TOTALS
                  TOGETHER
                </p>
                <p>FILEUPLOAD UNSURE</p>
              </>
            )}
          </div>
          <div className="Bills-columns">
            {this.state.selectedBill.name && (
              <>
                <h2>{this.state.selectedBill.name}</h2>
                <p>chart</p>
                <div
                  style={{
                    border: "1px solid green",
                    height: "200px",
                    width: "200px",
                    background: this.getChart()
                  }}
                />
                <label htmlFor="billsPaid">Enter amount you paid:</label>
                <input
                  type="text"
                  rows="1"
                  cols="30"
                  id="amountPaid"
                  onKeyPress={this.payBill}
                  onChange={event =>
                    this.setState({ value: event.target.value })
                  }
                  value={this.state.value}
                />
              </>
            )}
          </div>
          <div className="Bills-columns">
            {this.state.selectedBill.name && this.state.selectedBill.desc && (
              <>
                <h2>Description of {this.state.selectedBill.name}</h2>
                <p>{this.state.selectedBill.desc}</p>
                <h2>House grand total</h2>
                <p>Your total remaining:$money</p>
                <p>House total remaining:$money</p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Bills;
