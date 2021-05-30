import React, {Component} from 'react';
import Login from '../screens/login/Login';
import Home from '../screens/home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';


class Controller extends Component {

    accessToken="IGQVJYa05ldzFOWHZAwbmthYUpRdnpyVklxbnl3alJRUkI3dEdTRkpDVmZAlT1ZAjOEhNQU5iZAmUtUXRMcTN3SmMxMExnOG5FVXhQRW9KVEVMbE9GUWZAZAd2hDN0pFdDAyaEdTNnF0eDRndFo0SE5EOVh5NXV3ZAVd2RjJOWlNj";

    render(){
        return(
            <Router>
                <div className="main-container">
                <Route exact path='/' render={(props) => <Login {...props} accessToken={this.accessToken} />} />
                <Route path='/home/' render={(props) => <Home {...props} accessToken={this.accessToken} />} />
                </div>
            </Router>
        )
    }

}

export default Controller;