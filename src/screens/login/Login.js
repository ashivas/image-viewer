import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import './Login.css'

class Login extends Component{
    constructor(){
        super();
        this.state= {
            username:'',
            password:'',
            isUsernameRequired:'dispNone',
            isPasswordRequired:'dispNone'
        };
    }


    usernameChangeHandler=(evt)=>{
        this.setState({
            username:evt.target.value
        })
    }

    passwordChangeHandler=(evt)=>{
        this.setState({
            password:evt.target.value
        })
    }
    loginClickHandler = () => {
        this.state.username===''? this.setState({isUsernameRequired:'dispBlock'}):this.setState({isUsernameRequired:'dispNone'});
        this.state.password===''? this.setState({isPasswordRequired:'dispBlock'}):this.setState({isPasswordRequired:'dispNone'});

        // Do login logic here
        if(this.state.username!=='' &&  this.state.password!=='') {

        }
    }

    render() {

        return(
            <Card className="cardStyle">
                <CardContent>
                    <Typography variant="h4"> 
                        LOGIN
                    </Typography> <br/> 

                    <FormControl required className="formControl">
                        <InputLabel htmlFor="username"> Username</InputLabel>
                        <Input type="text" id="username" value={this.state.username} onChange={this.usernameChangeHandler}>
                        </Input>
                        <FormHelperText className={this.state.isUsernameRequired}>
                                    <span className="red">Required</span>
                        </FormHelperText>
                    </FormControl>
                    <br/> <br/>
                    <FormControl required className="formControl">
                        <InputLabel htmlFor="password"> Password</InputLabel>
                        <Input type="password" id="password" value={this.state.password} onChange={this.passwordChangeHandler}>
                        </Input>
                        <FormHelperText className={this.state.isPasswordRequired}>
                                    <span className="red">Required</span>
                        </FormHelperText>
                    </FormControl>

                    <br/>
                    <br/>

                    <Button variant="contained" onClick={this.loginClickHandler} color="primary">
                                Login
                    </Button>

                </CardContent>

            </Card>
        )

    }
}

export default Login;