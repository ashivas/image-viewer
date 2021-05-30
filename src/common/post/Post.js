import './Post.css';
import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import logo from '../static/user-logo.jpg'


class Post extends Component {


    render(){
        return(
            <Card className="cardStyle"> 
                <CardHeader
                    avatar={ <Avatar alt="Profile Logo" src={logo}></Avatar>}
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                />

                <CardMedia className="media"
                image={logo}
                title="Paella dish"
                />
                
            </Card>
        )
    }
}

export default Post;

