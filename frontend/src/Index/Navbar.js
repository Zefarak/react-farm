import React from 'react';
import { Link } from 'react-router-dom';


class Navbar extends React.Component{

    constructor(props){
        super(props);
    }
    
    render() {
        const log_in = (<li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i className="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li><a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a>
                        </li>
                        <li><a href="#"><i className="fa fa-gear fa-fw"></i> Settings</a>
                        </li>
                        <li className="divider"></li>
                        <li><a href="login.html"><i className="fa fa-sign-out fa-fw"></i> Logout</a>
                        </li>
                    </ul>
                
                </li>)
        const log_out = (
            <li className="dropdown">
                  <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                      <i className="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-user">
                    {/*
                    <li onClick={() => props.display_form('login')}>login</li>
                    <li onClick={() => props.display_form('signup')}>signup</li>  
                    */}
                  </ul>
                 
              </li>
        )
        const {logged_in} = this.props;
        return (
                <div>
                    <div className="ui large top fixed hidden menu">
                        <div className="ui container">
                            <a className="active item">Home</a>
                            <a className="item">Work</a>
                            <a className="item">Company</a>
                            <a className="item">Careers</a>
                            <div className="right menu">
                            <div className="item">
                                <a className="ui button">Log in</a>
                            </div>
                            <div className="item">
                                <a className="ui primary button">Sign Up</a>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="ui vertical inverted sidebar menu">
                        <a className="active item">Home</a>
                        <a className="item">Work</a>
                        <a className="item">Company</a>
                        <a className="item">Careers</a>
                        <a className="item">Login</a>
                        <a className="item">Signup</a>
                    </div>
                </div>
     
        )
    }
}

export default Navbar