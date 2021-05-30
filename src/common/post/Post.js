import './Post.css';
import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from '@material-ui/core/styles';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import FormControl from '@material-ui/core/FormControl';
import FavoriteIconFill from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import profileImage from "../../assets/upgrad.svg"

const styles =  theme => ({
    card: {
      maxWidth: 1100,
    },
    avatar: {
      margin: 10,
    },
    media: {
      height:0,
      paddingTop: '56.25%',
    },
    formControl: {
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'baseline',
    },
    comment:{
      display:'flex',
      alignItems:'center',
    },
    hr:{
      marginTop:'10px',
      borderTop:'2px solid #f2f2f2'
    },
    gridList:{
      width: 1100,
      height: 'auto',
      overflowY: 'auto',
    },
    grid:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginTop:90
    }
  });
  


class Post extends Component{
    constructor(){
      super();
      this.state = {
        isLiked : false,
        comment:'',
      }
    }
  
    render(){
      const {classes, item, comments} = this.props;
  //timestamp conversion
      let createdTime = new Date(item.timestamp);
      let yyyy = createdTime.getFullYear();
      let mm = createdTime.getMonth() + 1 ;
      mm = mm>=10?mm:'0'+mm;
      let dd = createdTime.getDate() >=10 ?createdTime.getDate() : '0'+ createdTime.getDate() ;
      let HH = createdTime.getHours() >=10 ?createdTime.getHours() : '0'+createdTime.getHours() ;
      let MM = createdTime.getMinutes()>=10?createdTime.getMinutes() : '0'+createdTime.getMinutes();
      let ss = createdTime.getSeconds()>=10?createdTime.getSeconds() : '0'+createdTime.getSeconds();
      let time = dd+"/"+mm+"/"+yyyy+" "+HH+":"+MM+":"+ss;
  
  
      return(
        <div className="post-main-container">
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar alt="User Profile Pic" src={profileImage} className={classes.avatar}/>
              }
              title={item.username}
              subheader={time}
            />
            <CardContent>
              <CardMedia
                className={classes.media}
                image={item.media_url}
                title={item.caption}
              />
              <div  className={classes.hr}>
                <Typography component="p">
                  {item.caption}
                </Typography>
                <Typography style={{color:'#4dabf5'}} component="p" >
                  {item.hashtags}
                </Typography>
              </div>
            </CardContent>
  
              <CardActions>
                <IconButton aria-label="Add to favorites" onClick={this.onLikeClicked.bind(this,item.id)}>
                  {this.state.isLiked && <FavoriteIconFill style={{color:'#F44336'}}/>}
                  {!this.state.isLiked && <FavoriteIconBorder/>}
                </IconButton>
                <Typography component="p">
                  {item.likes_count} Likes
                </Typography>
              </CardActions>
  
              <CardContent>
              {comments.hasOwnProperty(item.id) && comments[item.id].map((comment, index)=>{
                return(
                  <div key={index} className="row">
                    <Typography component="p" style={{fontWeight:'bold' }} >
                      {sessionStorage.getItem('username')}:
                    </Typography>
                    <Typography component="p" style={{marginLeft:'4px' }} >
                      {comment}
                    </Typography>
                  </div>
                )
              })}
              <div className={classes.formControl}>
                <FormControl style={{flexGrow:1}}>
                  <InputLabel htmlFor="comment">Add Comment</InputLabel>
                  <Input id="comment" value={this.state.comment} onChange={this.commentChangeHandler}/>
                </FormControl>
                <FormControl>
                  <Button style={{marginLeft:'1rem' }} onClick={this.onAddCommentClicked.bind(this,item.id)}
                     variant="contained" color="primary">
                    ADD
                  </Button>
                </FormControl>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  
    onLikeClicked = (id) => {
      if (this.state.isLiked) {
        this.setState({
          isLiked:false
        });
      }else {
        this.setState({
          isLiked:true
        });
      }
      this.props.onLikedClicked(id)
    }
  
    commentChangeHandler = (e) => {
      this.setState({
        comment:e.target.value,
      });
      this.props.commentChangeHandler(e);
    }
  
    onAddCommentClicked = (id) => {
      if (this.state.comment === "" || typeof this.state.comment === undefined) {
        return;
      }
      this.setState({
        comment:""
      });
      this.props.onAddCommentClicked(id);
    }
  }

export default withStyles(styles)(Post);

