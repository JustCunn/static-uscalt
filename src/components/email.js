import React from "react";
import "./email.css";

const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  }

class Email extends React.Component {
    constructor(props) {
        super(props)
        this.state = {email: ""}
    }

    handleSubmit = e => {
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ "form-name": "email", ...this.state })
        })
          .then(() => alert("Thanks for taking an interest in Uscalt!"))
          .catch(error => alert(error));
  
        e.preventDefault();
      };

      handleChange = e => this.setState({ [e.target.name]: e.target.value });

      render() {
          return (
            <form onSubmit={this.handleSubmit} >
                <input type="text" name="email" placeholder="Email address" id="email-input"/>
                <button id="email-submit">Submit</button>
            </form>
          )
      }
}

export default Email