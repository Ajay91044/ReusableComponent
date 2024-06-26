import React from 'react';
import './Footer.css';
import Logo from './RITS_Logo.png';

function Footer() {
    return (
        <div>
            <footer className="footer">
                <div className="footer-text">
                    <h2>Rits Consulting and Technologies</h2>
                </div>
                <div className="footer-logo">
                    <img src={Logo} alt="RITS Logo" />
                </div>

            </footer>
        </div>
    );
}

export default Footer;
