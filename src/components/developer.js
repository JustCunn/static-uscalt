import React from "react";
import "./developer.css";

class Developer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        const devStyle = {
            marginBottom: this.props.margin,
            animation: `0.6s ease-in-out ${this.props.delay}s 1 slideUp`,
            animationFillMode: 'both'
        }

        return(
            <div className="developer-container" style={devStyle}>
                <div className="dev-photo-container">
                    <img src={this.props.image} alt="developer"/>
                </div>
                <div className="dev-info">
                    <div className="dev-name">
                        {this.props.name}
                    </div>
                    <div className="dev-desc">
                        {this.props.desc}
                    </div>
                    <div className="dev-social">
                        <a href={this.props.twitter} className="fa fa-twitter" id="dev-social-icon"></a>
                        <a href={this.props.linkedin} className="fa fa-linkedin" id="dev-social-icon"></a>
                        <a href={this.props.email} className="fa fa-envelope-square" id="dev-social-icon"></a>
                    </div>
                </div>
            </div>
        )
    }

}

export default Developer