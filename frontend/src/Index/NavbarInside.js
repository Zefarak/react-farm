import React from 'react';
import { Link } from 'react-router-dom';


class NavbarInside extends React.Component{

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
            <div className="ui large secondary inverted pointing menu">
                <a className="toc item">
                <i className="sidebar icon"/>
                </a>
                <Link to={{
                    pathname: '/'
                }}><a className="item">Home</a></Link>
                <Link to={{
                    pathname: `/χωράφια/`
                }}><a className="item">Χωράφια</a></Link>
                <Link to={{
                    pathname: `/καλλιέργιες/`
                }}><a className="item">Καλλιέργιες</a></Link>
                <Link to={{
                    pathname: `/incomes/invoices/`
                }}><a className="item">Έσοδα</a></Link>
                <Link to={{
                    pathname: `/expenses/`
                }}><a className="item">Έξοδα</a></Link>
                <Link to={{
                    pathname: `/reports/`
                }}><a className="item">Reports</a></Link>
                <div className="right item">
                <a className="ui inverted button">Log in</a>
                <a className="ui inverted button">Sign Up</a>
                </div>
            </div>
     
        )
    }
}

export default NavbarInside;