import React, {Component} from 'react';
import Header from '../../common/header/Header';
import Post from '../../common/post/Post';
import profileImage from "../../assets/upgrad.svg"
import {withStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Config from '../../common/config';


const homeStyles =  theme => ({
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
  

class Home extends Component {

    getAllPostIdsEndPath = "https://graph.instagram.com/me/media?fields=id,caption,profile_picture&access_token=";
    getSinglePostUrl ="https://graph.instagram.com/17874012710423643?fields=id,media_type,media_url,username,timestamp&access_token=";

    constructor(props){
        super(props);
        if (sessionStorage.getItem('access-token') == null) {
            props.history.replace('/');
          }
        this.state = {
            posts: [],
            filteredPosts:[],
            userData:{},
            likeSet:new Set(),
            comments:{},
            currrentComment:""
        }
    }

    async componentDidMount() {
        await this.getAllPosts();
        console.log(this.state);
    }

    render() {
        const{classes} = this.props;
        return(
            <div>
            <Header
              userProfileUrl={profileImage}
              screen={"Home"}
              searchHandler={this.onSearchEntered}
              handleLogout={this.logout}
              handleAccount={this.navigateToAccount}/>
            <div className={classes.grid}>
              <GridList className={classes.gridList} cellHeight={'auto'}>
                {this.state.filteredPosts.map(item => (
                  <GridListTile key={item.id}>
                    <Post
                      classes={classes}
                      item={item}
                      onLikedClicked={this.likeClickHandler}
                      onAddCommentClicked={this.addCommentClickHandler}
                      commentChangeHandler={this.commentChangeHandler}
                      comments={this.state.comments}/>
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </div>
           
       
        )
    }

    getAllPosts = async () => {
        let token = Config.auth['access-token'];
        const allIdsForPosts = await fetch(this.getAllPostIdsEndPath+token).then(response =>response.json());
        let allPosts = [];
        for(const element of allIdsForPosts.data) {
            const url ="https://graph.instagram.com/"+ element.id + "?fields=id,media_type,media_url,username,timestamp&access_token=" + token;
            const currentPost = await fetch(url).then(response =>response.json());
            allPosts.push(currentPost);
        }

        allPosts.forEach(post=>{
            let currentPost = allIdsForPosts.data.find(m=>m.id === post.id);
            post['likes_count'] = 5;
            let regex = /#(\w+)/g;
            post['hashtags'] =  currentPost.caption.match(regex);
            post['hashtags'] =   currentPost['hashtags']?currentPost['hashtags'].join(' ') : ''
            post.caption  = currentPost.caption.replace(/#([^\s]*)/gm, '');
        })


        this.setState({
            posts: allPosts,
            filteredPosts: allPosts
        })
    }

     logout = () => {
        sessionStorage.clear();
        this.props.history.replace('/');
      }
    
      navigateToAccount = () =>{
        this.props.history.push('/profile');
      }

    onSearchEntered = (value) =>{
        console.log('search value', value);
        let filteredData = this.state.posts;
        filteredData = filteredData.filter((data) =>{
          let string = data.caption.toLowerCase();
          let subString = value.toLowerCase();
          return string.includes(subString);
        })
        this.setState({
          filteredPosts: filteredData
        })
      }
    
      likeClickHandler = (id) =>{
        var foundItem = this.state.posts.find((item) => {
          return item.id === id;
        })
        if (typeof foundItem !== undefined) {
          if (!this.state.likeSet.has(id)) {
            foundItem.likes_count++;
            this.setState(({likeSet}) => ({
              likeSet:new Set(likeSet.add(id))
            }))
    
          }else {
            foundItem.likes_count--;
            this.setState(({likeSet}) =>{
              const newLike = new Set(likeSet);
              newLike.delete(id);
    
              return {
                likeSet:newLike
              };
            });
          }
        }
      }
    
      addCommentClickHandler = (id)=>{
        if (this.state.currentComment === "" || typeof this.state.currentComment === undefined) {
          return;
        }
    
        let commentList = this.state.comments.hasOwnProperty(id)?
          this.state.comments[id].concat(this.state.currentComment): [].concat(this.state.currentComment);
    
        this.setState({
          comments:{
            ...this.state.comments,
            [id]:commentList
          },
          currentComment:''
        })
        sessionStorage.setItem(id+'comment',JSON.stringify([...commentList]));
      }
    
    
      commentChangeHandler = (e) => {
        this.setState({
          currentComment:e.target.value
        });
      }


}
export default withStyles(homeStyles)(Home);