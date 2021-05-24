import React, {Component} from 'react';
import Header from '../../common/header/Header';
import Login from '../login/Login'

class Home extends Component {

    render() {
        return(
            <div>
                <Header/>
                <Login></Login>
            </div>
           
       
        )
    }
}

export default Home;