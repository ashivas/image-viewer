import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import './Login.css';
import Header from '../../common/header/Header'
import Config from '../../common/config';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            isUsernameRequired: 'dispNone',
            isPasswordRequired: 'dispNone',
            isInvalidUserNameOrPassword: 'dispNone',
            loggedIn: sessionStorage.getItem('access-token') == null ? false : true
        };
    }


    usernameChangeHandler = (evt) => {
        this.setState({
            username: evt.target.value
        })
    }

    passwordChangeHandler = (evt) => {
        this.setState({
            password: evt.target.value
        })
    }
    loginClickHandler = () => {
        this.state.username === '' ? this.setState({ isUsernameRequired: 'dispBlock' }) : this.setState({ isUsernameRequired: 'dispNone' });
        this.state.password === '' ? this.setState({ isPasswordRequired: 'dispBlock' }) : this.setState({ isPasswordRequired: 'dispNone' });

        // Do login logic here
        if (this.state.username !== '' && this.state.password !== '') {
            if (this.state.username === Config.login.username && this.state.password === Config.login.password) {
                this.setState({ isInvalidUserNameOrPassword: 'dispNone' });
                sessionStorage.setItem('username', Config.login.username );
                sessionStorage.setItem('access-token', Config.auth["access-token"]);
                this.setState({ loggedIn: true });
                this.props.history.push('/home');
                //Redirect to Home
            } else {
                this.setState({ isInvalidUserNameOrPassword: 'dispBlock' })
            }
        }
    }

    render() {

        return (
            <div>
                <Header screen={"Login"}/>

                <Card className="cardStyle">
                    <CardContent>
                        <Typography variant="h4">
                            LOGIN
                        </Typography> <br />

                        <FormControl required className="formControl">
                            <InputLabel htmlFor="username"> Username</InputLabel>
                            <Input type="text" id="username" value={this.state.username} onChange={this.usernameChangeHandler}>
                            </Input>
                            <FormHelperText className={this.state.isUsernameRequired}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /> <br />
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="password"> Password</InputLabel>
                            <Input type="password" id="password" value={this.state.password} onChange={this.passwordChangeHandler}>
                            </Input>
                            <FormHelperText className={this.state.isPasswordRequired}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>

                        <br />
                        <br />

                        <FormHelperText className={this.state.isInvalidUserNameOrPassword}>
                            <span className="red">Incorrect username and/or password</span>
                        </FormHelperText>

                        <Button variant="contained" onClick={this.loginClickHandler} color="primary">
                            LOGIN
                        </Button>

                    </CardContent>

                </Card>
            </div>
        )

    }
}

export default Login;