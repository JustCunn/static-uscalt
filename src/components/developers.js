import React from 'react';
import "./developers.css";
import Developer from "./developer.js";
import Justin from "./media/justin.jpg";
import Fintan from "./media/flalor.jpg";

class Developers extends React.Component {

    render() {

        const jDesc = "Justin Cunningham is a 17 year old developer and co-founder of Uscalt. He is interested in creating a more equal interent, \
                       especially in relation to software development and making research in AI and Machine Learning as open as possible. He's taken \
                       part in various maths and science competitions like the BT Young Scientist, where he won his category for work in Braille and in NLP. \
                       He was chosen to take part in the BTYS Business Bootcamp in 2020"

        const fDesc = "Fintan is a 16 year old developer and co-founder of Uscalt. He's passionate about data sovereignty having previously worked on Aistrigh, an NMT toolkit for the English - Irish Language pair, which won 2 awards \
                        at BTYS 2021 therefore he also understands the importance of data. He is also involved in TCD’s Walton Club and was chosen to take part in the BTYS Business \
                        Bootcamp in 2021."

        const devDesc = "We are Uscalt. We're working towards data sovereignty and linking with applications to do so. We have won national awards for our work on in Machine Learning and Neural Machine Translation and know the importance \
                        of good, clean data in those fields. We encourage you to get in touch if you have questions about what we do or just want to give \
                        us your opinion."
        return (
            <div className="developers-cont">
                <div className="developers-intro-container">
                    <div className="developers-title">
                        The Development Team
                    </div>
                    <div className="developers-intro">
                        {devDesc}
                    </div>
                </div>
                <Developer id="justin-dev" delay={0.2} margin={"1em"} image={Justin} name={"Justin Cunningham"} desc={jDesc} twitter={"https://twitter.com/Justin_Cunn"} 
                linkedin={"https://www.linkedin.com/in/justinicunningham/"} email={"mailto:jcunningham@uscalt.com"}/>
                <Developer id="fintan-dev" delay={0.3} margin={"1em"} image={Fintan} name={"Fintan Lalor"} desc={fDesc} twitter={"https://twitter.com/GREENLEADER12"}
                linkedin={"https://www.linkedin.com/in/fintan-lalor-8722a0209/"} email={"mailto:flalor@uscalt.com"}/>
            </div>
        )
    }

}

export default Developers