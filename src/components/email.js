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
        body: encode({ "form-name": "email-form", ...this.state })
      })
        .then(() => alert("Thanks for your interest in Uscalt! We hopt to be in touch soon."))
        .catch(error => alert(Error));

      e.preventDefault();
    };
    
    handleChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
      const { email } = this.state
        return (
          <form onSubmit={this.handleSubmit}>
              <input type="email" name="email" placeholder="Email address" value={email} id="email-input" onChange={this.handleChange}/>
              <button type="submit" id="email-submit">Submit</button>
          </form>
        )
    }
}

export default Email