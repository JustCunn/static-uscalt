import React from 'react';
import './ham.css';

class Ham extends React.Component {

    handleChange = () => {
        var open = !this.props.open;
        console.log(open);
        this.props.onOpenChange(open);
    }

    render() {

        const hamStyle = {
            position: this.props.open ? 'fixed' : 'absolute',
            top: '2em',
            right: '0',
            zIndex: '15'
        }

        const lineStyle = {
            transform: `${this.props.open ? 'translateY(-0.93em)' : 'translateY(0)'} ${this.props.open ? 'rotate(45deg)' : 'rotate(0deg)'}`,
            backgroundColor: `${this.props.open ? 'white' : '#004d81'}`
        }

        const lineStyleNeg = {
            transform: `${this.props.open ? 'translateY(0.93em)' : 'translateY(0)'} ${this.props.open ? 'rotate(-45deg)' : 'rotate(0deg)'}`,
            backgroundColor: this.props.open ? 'white' : '#004d81'
        }

        const lineStyleGo = {
            opacity: this.props.open ? '0' : '1'
        }

        return(
            <div onClick={this.handleChange} style={hamStyle} className="ham-container">
                    <div style={lineStyleNeg} className="ham-line"/>
                    <div style={lineStyleGo} className="ham-line"/>
                    <div style={lineStyle} className="ham-line"/>
            </div>

        )
    }
}

export default Ham