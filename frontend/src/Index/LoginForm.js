import React from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.state = {
            username: "",
            password: "",
            csrfmiddlewaretoken: cookie.load('csrftoken')
        }
    }

    handleChangeInput(event){
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.handle_login();
    }

    render() {
        const {username} = this.state;
        const {password} = this.state;
        const {csrfToken} = cookie.load('csrftoken');
        return(
            <form className='form'>
            <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
            <h4>Login</h4>
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
            <button onClick={e => this.props.handle_login(e, this.state)} className='btn btn-primary'>Save</button>
            </form>
        )
    }
}

export default LoginForm