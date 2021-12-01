import React from "react";
import "./home.css";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            home: ""
        }
    }

    async componentDidMount() {
        await fetch("http://127.0.0.1:8000/api/profile/", {
            method: 'GET',
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            },
        })
        .then(data => data.json())
        .then(data => {
            this.setState({home: data.username})
        console.log(data)})
    }

    render() {

        const dmTextWhite = {
            color: this.props.darkMode ? 'white' : 'black'
        }

        return(
            <div className="home-container">
                <div className="home-greeting">
                    Hello {this.state.home}!
                </div>
                <div style={dmTextWhite} className="home-banner-container">
                    <div className="home-total-container">
                        <div className="home-total-wrapper">
                            <div className="home-total-header">
                                Total Amount Earned from 01/01/21
                            </div>
                            <div className="home-total">
                                €103.76
                            </div>
                        </div>
                    </div>
                    <div className="home-recentb-container">
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Home