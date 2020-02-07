import React, { Component } from 'react';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getName: '',
            getCity: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const city = target.city;
        this.setState({ 
            [name]: name,
            [city]: city
         });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.getCity);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label name="name">Name: <input id="name" type="text" value={this.state.value} onChange={this.handleChange} /></label>
                <br /><br />
                <label name="city">City: <input id="city" type="text" value={this.state.value} onChange={this.handleChange} /></label>
                <br /><br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default Profile;