import React, { Component } from 'react';
import {Link} from 'react-router-dom'

const Footer = () => {
    return(
        <div className="footer">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-4 offset-1 col-sm-2">
                        <h6>Links</h6>
                        <ul className="list-unstyled">
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/recipe">Recipe</Link></li>
                            <li><Link to="/aboutus">About Us</Link ></li>
                            <li><Link to="/contactus">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="col-5 col-sm-4">
                        <h6>Our Address</h6>
                        <address>
                            5134 South Harper Avenue <br/>
                            Chicago, IL, 60615<br/>
                            <i className="fa fa-phone fa-lg"></i>: +919 667 6877<br />
                            <i className="fa fa-fax fa-lg"></i>: +919 667 6876<br />
                            <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:srecipe@food.net">
                                srecipe@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-4 align-self-center">
                        <div className="text-center">
                            <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                            <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                            <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                        </div>
                   </div>
                   <div className="col-auto">
                    <p>© Copyright 2019 Sam's Recipe</p>
                </div>

                </div>
            
            </div>
        
        </div>
    );
}
export default Footer;