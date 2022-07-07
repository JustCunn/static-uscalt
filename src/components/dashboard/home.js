// Homepage

import React from "react";
import "./home.css";
import fernet from 'fernet';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            home: "",
            selectedFile: null,
            text: null,
            data: null,
            token: null
        }
    }

    onFileChange = event => {
    
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
      
      };

    onTextChange = event => {
    
        // Update the state
        this.setState({ text: event.target.value });
      
    };

    submit = (event) => {
        // Update the state
        const reader = new FileReader();
        reader.readAsText(this.state.selectedFile);
        reader.addEventListener('load', (e) => {
            console.log(e.target.result)
            this.setState({ data: e.target.result }, () => {var secret = new fernet.Secret(this.state.text);
                           var token = new fernet.Token({
                                secret: secret,
                                token: this.state.data,
                                ttl: 0
                                })
                            this.setState({token: token.decode()})});
            console.log(this.state.token)
        });
    
    }
      
      // On file upload (click the upload button)
      onFileUpload = () => {
      
        // Create an object of formData
        const formData = new FormData();
      
        // Update the formData object
        formData.append(
          "myFile",
          this.state.selectedFile,
          this.state.selectedFile.name
        );
      };

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

                <div style={dmTextWhite} className="home-banner-container">
                    <div className="home-total-container">
                        <div className="home-total-wrapper">
                            <div className="home-total">
                                <input type="file" onChange={this.onFileChange} />
                                <input type="text" onChange={this.onTextChange} />
                            </div>
                            <div className="home-total" onClick={this.submit}>
                                Submit
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