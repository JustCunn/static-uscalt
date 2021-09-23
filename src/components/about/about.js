import React from 'react';
import Simple from './simple.js';
import Panel from './panel.js';
import Privacy from './privacy.js';
import Construction from '../construction.js';

class About extends React.Component {

    render() {

        const aStyle = {
            color: '#004d81'
        }

        return (
            <>
                <Panel/>
                <Simple
                text="Uscalt will be easy to use, allowing data to be distributed 
                in just a few taps. There won't be any need for in-depth editing by the user." 
                title="Simplicity"
                />
                <Privacy/>
                <Simple
                text={["As part of our aim to achieve privacy, we will be implementing and encouraging the use of 'federated learning'. This allows the data to stay on your device keeping it safe.", 
                <br/>,<br/>,
                "For developers, these will be PyTorch models that can implement the state-of-the-art such as RNNs, CNNs and LSTMs, all while implementing little manual code in your software manually.",
                <br/>,<br/>,
                `We're also intensively researching how to combat the massive communication overhead and privacy concerns of federated learning, including novel techniques and through `,
                <a style={aStyle} href="https://arxiv.org/pdf/1901.08755.pdf">current promising methods.</a>,]}
                title="Federated Learning"
                />
                <Construction/>
            </>
        )
    }

}

export default About