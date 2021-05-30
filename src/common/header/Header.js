import './Header.css';
import React, {Component} from 'react';


class Header extends Component {
    constructor(){
        super();
        this.state = {};
    }


    render() {
        return(
            <div>
            <header className="app-header">
                <div className="header-title">Image Viewer</div>
                <div className="right">
                    Container for search box and Image
                </div>
            </header>
        </div>
        )
    }
}


export default Header;