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

      handleChange = e => this.setState({ [e.target.name]: e.target.value });

      render() {
          return (
            <form name="email-form" method="POST" data-netlify="true" >
                <input type="text" name="email" placeholder="Email address" id="email-input"/>
                <button id="email-submit">Submit</button>
            </form>
          )
      }
}

export default Email