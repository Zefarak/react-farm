import React from 'react';
import Navbar from './Navbar';
import NavbarInside from './NavbarInside';
import Homepage from './Homepage';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';

class Index extends React.Component {

    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.display_form = this.display_form.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {
            displayed_form: '',
            logged_in: true,
            username: ''
        }
    }

    componentDidMount() {
        if (this.state.logged_in) {
          this.loadUser()
      }
    }

    loadUser(){
        const {logged_in} = this.state;
        const endpoint ='/api/current-user/';
        const lookupOptions = {
            method: 'GET',
            headers: {
                Authorization: `JWT${localStorage.getItem('token')}`
            }
        }
        if(logged_in){
            fetch(endpoint, lookupOptions)
            .then(response=>response.json())
            .then(responseData=>{
                this.setState({
                    username: responseData.username
                })
            })
        }
    }
    
    handleLoginApi(data){
        event.preventDefault();
        const thisComp = this;
        const endpoint = '/api/user/login/';
        const csrfToken = cookie.load('csrftoken');
        console.log('login_api', data, csrfToken)
        let lookupOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data)
        }

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            
            thisComp.setState({
                logged_in: true,
                displayed_form:'',
                
            })
        }).catch(function(error){
            console.log('error malaka', error)
        })  
    }

    handleLogin(event, data){
        event.preventDefault();
        this.handleLoginApi(data)
        {/*
        const thisComp = this;
        const endpoint = '/token-auth/';
        let lookupOptions ={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            localStorage.setItem('token', responseData.token);
            thisComp.setState({
                logged_in: true,
                displayed_form:'',
                username: responseData.user.username
            })
        }).catch(function(error){
            console.log('error malaka', error)
        })  
    */}
    }

    handleSignUp(event){
        let data = this.state;
        const endpoint = '/api/users/';
        const thisComp = this;
        let lookupOptions ={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        
        fetch(endpoint, lookupOptions)
        .then(response=>response.json)
        .then(responseData=>{
            
            thisComp.setState({
                logged_in: true,
                displayed_form:'',
                username: responseData.username
            })
        })
    }

    handleLogout(){
        localStorage.removeItem('token'); 
        this.setState({
            logged_in: false,
            username: ''
        })
    }

    display_form(form){
        this.setState({
            displayed_form: form
        })
    }

    
    componentDidMount(){

    }


    render() {
        const {logged_in} = this.state;
        const {displayed_form} = this.state;
        let form;
        switch (displayed_form){
            case 'login':
                form = <LoginForm handle_login={this.handleLogin} />;
                break;
            case 'signup':
                form = <SignupForm handle_signup={this.handleSignUp} />;
                break
            default:
                form= null;

        }
        console.log(logged_in)
        return(
            <div>
               <Navbar />
                <div className="ui inverted vertical masthead center aligned segment">
                    <div className="ui container">
                        <NavbarInside />
                    </div>
                    <div className="ui text container">
                        <h1 className="ui inverted header">
                            Imagine-a-Company
                        </h1>
                        <h2>Do whatever you want when you want to.</h2>
                        <div className="ui huge primary button">Get Started <i class="right arrow icon"/></div>
                    </div>
                </div>
            </div>     
        )
    }
}

export default Index