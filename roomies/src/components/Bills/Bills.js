import React, { Component } from "react";
import "./Bills.css";

class Bills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBill: {},
      tenants: ["Devin", "Mike", "Nicole", "Erline"],
      newBillTenant: [],
      bills: [
        {
          id: "1",
          people: [
            { name: "Devin", owed: 250, paid: 0 },
            { name: "Mike", owed: 250, paid: 0 },
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
      billValue: "0",
      billTotalRemaining: 0
    };
    this.changeBill = this.changeBill.bind(this);
    this.payBill = this.payBill.bind(this);
    this.getChart = this.getChart.bind(this);
    this.startBill = this.startBill.bind(this);
    this.saveBill = this.saveBill.bind(this);
    this.cancelBill = this.cancelBill.bind(this);
    this.newBillAddTenant = this.newBillAddTenant.bind(this);
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

        this.setState(
          {
            value: "",
            selectedBill: newBill,
            bills: newBills
          },
          () => console.log(this.state.bills)
        );
      }
    }
  };

  getChart = () => {
    const colors = [
      "red",
      "blue",
      "yellow",
      "pink",
      "green",
      "orange",
      "purple"
    ];
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

  startBill = () => {
    let mainDoc = document.getElementsByClassName("Bills-mainContent")[0];
    let addBill = document.getElementsByClassName("Bills-add")[0];
    mainDoc.style.display = "none";
    addBill.style.display = "block";
  };

  saveBill = () => {
    if (typeof parseInt(document.getElementById("billValue")) === "number") {
      console.log("it's a number");
    } else {
      console.log("not a number");
    } //fix later, need it to only work if it's a number, if it's a number do everything below, else print a message saying
    //to enter a number. Also need to make sure at least 1 person is on the bill
    let mainDoc = document.getElementsByClassName("Bills-mainContent")[0];
    let addBill = document.getElementsByClassName("Bills-add")[0];
    mainDoc.style.display = "block";
    addBill.style.display = "none";
    const billValue = parseInt(document.getElementById("billValue").value);

    const owedInit = billValue / this.state.newBillTenant.length;
    const newBill = {
      id: String(this.state.bills.length + 1),
      people: [
        { name: "Devin", owed: owedInit, paid: 0 },
        { name: "Mike", owed: owedInit, paid: 0 },
        { name: "Nicole", owed: owedInit, paid: 0 },
        { name: "Erline", owed: owedInit, paid: 0 }
      ],
      name: document.getElementById("billName").value,
      desc: document.getElementById("billDesc").value,
      value: billValue
    };

    const newBills = [...this.state.bills];

    newBills.push(newBill);

    this.setState(
      {
        bills: newBills
      },
      () =>
        console.log(this.state.bills, document.getElementById("billName").value)
    );
  };

  cancelBill = () => {
    let mainDoc = document.getElementsByClassName("Bills-mainContent")[0];
    let addBill = document.getElementsByClassName("Bills-add")[0];
    mainDoc.style.display = "block";
    addBill.style.display = "none";
    const newNewBillTenant = [];
    this.setState({
      newBillTenant: newNewBillTenant
    });
  };

  newBillAddTenant = e => {
    if (e.target.checked === true) {
      const newNewBillTenant = [...this.state.newBillTenant];
      newNewBillTenant.push(e.target.value);
      this.setState({
        newBillTenant: newNewBillTenant
      });
    } else {
      const newNewBillTenant = [...this.state.newBillTenant];
      for (let i = 0; i < newNewBillTenant.length; i++) {
        if (newNewBillTenant[i] === e.target.value) {
          newNewBillTenant.splice(i, 1);
        }
      }
      this.setState({
        newBillTenant: newNewBillTenant
      });
    }
  };

  render() {
    return (
      <div className="Bills">
        <div className="Bills-mainContent">
          <h1 className="Bills-h1">Bills</h1>
          <div className="Bills-columns">
            <button onClick={this.startBill}>Add Bill</button>
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
                  Remaining to be paid: $ADD ALL THE PEOPLES OWED TOTALS
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
                    margin: "auto",
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
        <div className="Bills-add">
          <h2>Enter Billing Information</h2>
          <label htmlFor="billName">Enter bill name:</label>
          <input type="text" rows="1" cols="30" id="billName" />
          <br />
          <textarea
            id="billDesc"
            defaultValue="Enter a description of the bill"
            rows="4"
            cols="50"
          ></textarea>
          <br />
          <label htmlFor="billValue">Enter bill amount:</label>
          <input type="text" rows="1" cols="30" id="billValue" />
          <br />
          {this.state.tenants.map((tenant, index) => (
            <li>
              <input
                type="checkbox"
                id={tenant[index]}
                key={tenant[index]}
                onClick={this.newBillAddTenant}
                value={tenant}
              ></input>
              {tenant}
            </li>
          ))}

          <button onClick={this.saveBill}>Save</button>
          <button onClick={this.cancelBill}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default Bills;
