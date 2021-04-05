import React, { useEffect, useState } from 'react';
import './hamnav.css';
import { Link } from 'react-router-dom';

class Hamnav extends React.Component {

    constructor(props) {
        super(props);
    }

    handleChange = () => {
        var open = !this.props.open;
        console.log(open)
        this.props.onOpenChange(open);
    }

    render() {

        const hamnavStyle = {
            transition: 'left 0.4s ease-in-out',
            left: this.props.open ? '0%' : '100%',
            position: 'fixed',
            top: '0',
            display: this.props.open ? 'flex' : 'flex',
            zIndex: '5',
            alignItems: 'center',
            justifyContent: 'center'
        }

        const navStyle = {
            display: 'flex',
            height: '50%',
            textDecoration: 'None',
            alignItems: 'center',
            justifyContent: 'center',
        }

        const ulStyle = {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            listStyle: 'none',
            paddingLeft: '0',
            justifyContent: 'space-between'
        }

        const liStyleH = {
            textAlign: 'center',
            color: 'white',
            zindex: '9',
            fontSize: '3em',
            transition: 'all 0.2s ease-in-out',
            MozTransition: 'all 0.2s ease-in-out',
            animation: this.props.open ? '0.4s ease-in-out 0s 1 slideRight' : '',
            MozAnimation: this.props.open ? '0.4s ease-in-out 0s 1 slideRight' : '',
            animationFillMode: 'both'
        }

        const liStyleD = {
            textAlign: 'center',
            color: 'white',
            zindex: '9',
            fontSize: '3em',
            transition: 'all 0.2s ease-in-out',
            MozTransition: 'all 0.2s ease-in-out',
            animation: this.props.open ? '0.4s ease-in-out 0.1s 1 slideRight' : '',
            MozAnimation: this.props.open ? '0.4s ease-in-out 0.1s 1 slideRight' : '',
            animationFillMode: 'both'
        }

        const liStyleA = {
            textAlign: 'center',
            color: 'white',
            zindex: '9',
            fontSize: '3em',
            transition: 'all 0.2s ease-in-out',
            MozTransition: 'all 0.2s ease-in-out',
            animation: this.props.open ? '0.4s ease-in-out 0.2s 1 slideRight' : '',
            MozAnimation: this.props.open ? '0.4s ease-in-out 0.2s 1 slideRight' : '',
            animationFillMode: 'both'
        }

        return(
            <div style={hamnavStyle} className="hamnav-container">
                <nav style={navStyle} className="hamnav">
                    <ul style={ulStyle} className="hamnav-links">
                        <Link style={{textDecoration:'none'}} to="/"><li onClick={this.handleChange} style={liStyleH} className="hamnav-link">Home</li></Link>
                        <Link style={{textDecoration:'none'}} to="/developers"><li onClick={this.handleChange} style={liStyleD} className="hamnav-link">Developers</li></Link>
                        <Link style={{textDecoration:'none'}} to="/about"><li onClick={this.handleChange} style={liStyleA} className="hamnav-link">About</li></Link>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Hamnav