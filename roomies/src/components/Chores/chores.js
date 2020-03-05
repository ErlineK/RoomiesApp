import React, { Component } from "react";
import SideButton from '../SideBar/sidebuttons';
import "./chores.css"

class Chores extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.shuffle = this.shuffle.bind(this);
    }

    shuffleChores(roommates) {
        let counter = roommates.length;
        let i;
        let x;

        while (counter) {
            i = Math.floor(Math.random() * counter--);
            x = roommates[counter];
            roommates[counter] = roommates[i];
            roommates[i] = x;
        }
        return roommates;
    }

    removeAll() {
        this.setState({
            designations: []
        });
    }

    shuffle = (arr) => {
        var i,
            j,
            temp;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;    
    };

     render() {
        let names = ["Devin", "Erline", "Mike", "Nicole"];
        let tasks = ["Sweeping", "Mopping", "Vaccumming", "Dusting"];
        let designations = [];
        let activity = [];
        let y = 0;
        let randomTasks = this.shuffle(tasks);

        for (let x = 0; x < names.length; x++) {
            if (tasks.length > y) {
                console.log("after");
                activity = { name: names[x], task: randomTasks[y] };
                designations.push(activity);
                y++;
            }
        };

        this.shuffleChores(designations);
        

        return (
            <div className="Chores">
                <SideButton />
                <div className="chore-columns">
                    <h2>Chores</h2>
                    <button onClick={this.shuffleChores(designations)}>Select Chores</button>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Task</th>
                                <th scope="col">Completed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                designations.map(activity => {
                                    return (
                                        <tr>
                                            <th scope="row">{activity.name}</th>
                                            <th>{activity.task}</th>
                                            <th><input type="checkbox" /></th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="2">&nbsp;</td>
                                <td className="text-right">
                                    <button onClick={(e) => this.removeAll()} type="button" className="btn btn-primary btn-sm">Clear All</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        );
    }
};


export default Chores;