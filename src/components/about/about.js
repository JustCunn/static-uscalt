import React from 'react';
import Simple from './simple.js';
import Panel from './panel.js';
import Privacy from './privacy.js';
import Construction from '../construction.js';

class About extends React.Component {

    render() {

        return (
            <>
                <Panel/>
                <Simple/>
                <Privacy/>
                <Construction/>
            </>
        )
    }

}

export default About