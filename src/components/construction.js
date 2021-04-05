import React from 'react';
import './construction.css';
import UC from './media/under_construction.png';

class Construction extends React.Component {
    render() {
        return (
            <div className="construction-container">
                <div className="construction-img-container">
                    <img src={UC} alt=""/>
                </div>
                <div className="construction-text-container">
                    <div className="construction-title">
                        Under Construction
                    </div>
                    <div className="construction-desc">
                        Uscalt is still in development and we appreciate your patience as we work on it. We'll keep you up to date on our development, any upcoming beta tests and other news
                        here on our website and on our social media pages.
                    </div>
                </div>
            </div>
        )
    }
}

export default Construction