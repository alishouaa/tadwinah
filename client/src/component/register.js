import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {

    constructor(props) {
        super(props);
        if (localStorage.getItem('token')) {
            this.props.history.push('/');
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            error: ''
        }

    }
    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
            error: ''
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
            error: ''
        });
    }

    onSubmit(e) {
        e.preventDefault();

        let data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        
        axios.post('/api/register', data)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('_id', res.data.id);
                axios.defaults.headers.common = { 'Authorization': res.data.token }
                this.props.history.push('/');
            })

            .catch(err => {
                this.setState({
                    error: err.response.data.message
                });
            })

    }

    renderError() {
        return this.state.error ? (<blockquote>{this.state.error}</blockquote>) : "";
    }

    render() {
        return (
            <div className="column column-50 column-offset-25">
             
                <h4>إنشاء حساب جديد</h4>
                <hr />
                {this.renderError}

                <form onSubmit={this.onSubmit}>
                    <label>الإسم</label>
                    <input type="text" value={this.state.name} onChange={this.onChangeName} />
                    <label>البريد الالكتروني</label>
                    <input type="email" value={this.state.email} onChange={this.onChangeEmail} />
                    <label>كلمة المرور</label>
                    <input type="password" value={this.state.password} onChange={this.onChangePassword} />
                    <input type="submit" className="button-primary" value="التسجيل" />
                </form>

            </div>
        );
    }
}
export default Register;