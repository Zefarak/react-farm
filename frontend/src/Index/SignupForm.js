import React from 'react';
import PropTypes from 'prop-types';


class SignupForm extends React.Component{

    constructor(props){
        super(props);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChangeInput(event){
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [key]: value
        })
    }

    render(){
        const {username} = this.state;
        const {password} = this.state;
        return(
            <form className='form'>
            <h4>SingUp</h4>
            <div className="form-group">
                <label className='control-label' htmlFor="username">Username</label>
                <input
                    type='text'
                    name='username'
                    value={username}
                    onChange={this.handleChangeInput}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className='control-label' htmlFor="password">password</label>
                <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={this.handleChangeInput}
                    className="form-control"
                />
            </div>
            <button className='btn btn-primary'>Save</button>
            </form>
        )
    }
}

export default SignupForm

