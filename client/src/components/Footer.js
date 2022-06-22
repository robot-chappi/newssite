import React from 'react';
import { DONATION, NEWS, RUSSIA, WORLD} from "../utils/consts"
import {Link} from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer-gradient'>
            <div className='container'>
                <div className='row footer-shift'>
                    <div className='col-md-8 wrapper-footer'>
                        <ul className='footer-links-one'>
                            <div  className='footer-links-pages'>
                                <li className='footer-link-pg'><i className='fas fa-home link-icon'></i><Link to={NEWS} className="link-text-pg-footer">Home</Link></li>
                                <li className='footer-link-pg'><i className='fas fa-address-card link-icon'></i><Link to={DONATION} className="link-text-pg-footer">Donation</Link></li>
                            </div>
                        </ul>
                        <ul className='footer-links-one'>
                            <div  className='footer-links-pages'>
                                <li className='footer-link-pg'><i className='fas fa-flask link-icon'></i><Link to={WORLD} className="link-text-pg-footer">World</Link></li>
                                <li className='footer-link-pg'><i className='fas fa-briefcase link-icon'></i><Link to={RUSSIA} className="link-text-pg-footer">Russia</Link></li>
                            </div>
                        </ul>
                    </div>
                    <div className='col-md-4'>
                        <div className='footer-info'>
                            <h2>Follow us here :)</h2>
                            <ul className='footer-links-society'>
                                    <li className='footer-link-soc'><a href='https://www.facebook.com/daniel.fedoskov/' target={"_blank"}><i className='fa-brands fa-facebook link-icon-society'></i></a></li>
                                    <li className='footer-link-soc'><a href='https://www.instagram.com/chappic2020/' target={"_blank"}><i className='fa-brands fa-instagram link-icon-society'></i></a></li>
                                    <li className='footer-link-soc'><a href='https://t.me/RobotChappi2020' target={"_blank"}><i className='fa-brands fa-telegram link-icon-society'></i></a></li> 
                                    <li className='footer-link-soc'><a href='https://vk.com/chappic2021' target={"_blank"}><i className='fa-brands fa-vk link-icon-society'></i></a></li> 
                            </ul>
                        </div>
                    </div>
                    <hr/>
                    <div className='wrapper-footer-down'>
                        <div className='footer-info-tech'>
                                Web-site made with MERN
                        </div>
                        <div className='footer-info-text'>
                            <h4>News © 2022</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;