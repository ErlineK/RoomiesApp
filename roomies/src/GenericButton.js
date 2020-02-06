import React, { Component } from 'react';

class GenericButton extends Component {
    render() {
        return ( <
            div >
            <
            button > { this.props.name } < /button> <
            /div>
        );
    }
}

export default GenericButton;