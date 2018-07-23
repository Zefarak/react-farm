import React from 'react';
import { Link } from 'react-router-dom';
import {getData, getDataResults} from './MyComponent';

class NavbarInside extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            user: '',
            doneLoading: false
        }

        
    }

    componentDidMount(){
        this.loadUser()
    }


    loadUser(){
        const endpoint = '/api/current-user/';
        const thisComp = this;
        getData(endpoint, thisComp, 'user')
    }
    
    render() {
        const {user} = this.state;
        
        return (
            <div className="ui large secondary inverted pointing menu">
                <a className="toc item">
                <i className="sidebar icon"/>
                </a>
                <Link to={{
                    pathname: '/'
                }}><a className="item">Homei</a></Link>
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
                {user.username !== undefined && user.username.length >1 ?
                    <div>
                    <a href='/login/' className="ui inverted button">{user.username}</a>
                    <a href='/logout/' className="ui inverted button">Logout</a>
                    </div>
                :
                <div>
                <a href='/login/' className="ui inverted button">Log in</a>
                <a className="ui inverted button">Sign Up</a>
                </div>
                }
                
                </div>
            </div>
     
        )
    }
}

export default NavbarInside;