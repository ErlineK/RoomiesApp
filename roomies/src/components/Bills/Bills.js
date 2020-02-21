import React, { Component } from 'react';
// import GenericButton from '../../GenericButton';
import "./Bills.css";
import SideButton from '../SideBar/sidebuttons';

class Bills extends Component {
    render() {
        return (
            <div className="Bills">
                <div className="Bills-topNav">
                    {/* <div className="Bills-nav">
                        <GenericButton buttonClass="button red" name="button1" />
                        <GenericButton buttonClass="button red" name="button1" />
                    </div> */}
                </div>
                
                <div>
                    <SideButton />
                </div>  
                <div className="Bills-mainContent">
                    <h1>Bills</h1>
                    <div className="Bills-columns">
                        <label htmlFor="bills">Select a bill</label>
                        <br />
                        <select id="bills">
                            <option>option 1</option>
                            <option>option 2</option>
                        </select>

                        <p>Your remaining total is:</p>
                        <p>Person 2's remaining total is:</p>
                        <p>Person 3's remaining total is:</p>
                        <p>FILEUPLOAD UNSURE</p>
                    </div>
                    <div className="Bills-columns">
                        <h2>SELECTED BILL</h2>
                        <p>chart</p>
                        <label htmlFor="billsPaid">Enter amount you paid:</label>
                        <input type="text" rows="1" cols="30" id="amountPaid"></input>

                    </div>
                    <div className="Bills-columns">
                        <h2>Description of BILL X</h2>
                        <p>bill desc</p>
                        <h2>House grand total</h2>
                        <p>Your total remaining:$money</p>
                        <p>House total remaining:$money</p>
                    </div>
                </div>    
            </div>
        );
    }
}

export default Bills;