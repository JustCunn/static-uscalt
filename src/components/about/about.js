import React from 'react';
import Simple from './simple.js';
import Panel from './panel.js';
import Privacy from './privacy.js';
import Construction from '../construction.js';
import Header from "../head.js";
import Footer from "../footer.js";

class About extends React.Component {

    render() {

        return (
            <>
                <Header/>
                <Panel/>
                <Simple/>
                <Privacy/>
                <Construction/>
                <Footer/>
            </>
        )
    }

}

export default About