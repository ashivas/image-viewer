import React, {Component} from 'react';
import Header from '../../common/header/Header';
import Login from '../login/Login'
import Post from '../../common/post/Post'

class Home extends Component {

    getAllPostIdsEndPath = "https://graph.instagram.com/me/media?fields=id,caption,profile_picture&access_token=";
    getSinglePostUrl ="https://graph.instagram.com/17874012710423643?fields=id,media_type,media_url,username,timestamp&access_token=";

    constructor(){
        super();
        this.state = {
            posts: []
        }
    }

    async componentDidMount() {

        let token = this.props.accessToken;
        
        /* 
        1. Lets get id's of all posts
        2. Get details of each and every post
        */

        await this.getAllPosts();

        console.log(this.state);

        /* let xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onload = (e)=>{
            if(xmlHttpRequest.readyState ===4) {
                if(xmlHttpRequest.status === 200) {
                debugger;
                let json_obj = JSON.parse(xmlHttpRequest.responseText);
                (json_obj.data).forEach(element => {
                    let innerXhr = new XMLHttpRequest();
                    innerXhr.open("GET", this.getAllPostIdsEndPath+token, true);
                    
                });
                console.log(json_obj);
                } else {
                    console.error(xmlHttpRequest.statusText);
                }
            }
        }
        xmlHttpRequest.open("GET", this.getAllPostIdsEndPath+token, true);
        xmlHttpRequest.onerror = function (e) {
            console.error(xmlHttpRequest.statusText);
        };
        xmlHttpRequest.send(null); */


    }

    render() {
        return(
            <div>
               <Header/>
               <div>
                    <Post/>
               </div>
               
            </div>
           
       
        )
    }

    getAllPostIdsEndPath = "https://graph.instagram.com/me/media?fields=id,caption,profile_picture&access_token=";
    getSinglePostUrl ="https://graph.instagram.com/17874012710423643?fields=id,media_type,media_url,username,timestamp&access_token=";
    getAllPosts = async () => {
        let token = this.props.accessToken;
        const allIdsForPosts = await fetch(this.getAllPostIdsEndPath+token).then(response =>response.json());
        const allPosts = [];
        for(const element of allIdsForPosts.data) {
            const url ="https://graph.instagram.com/"+ element.id + "?fields=id,media_type,media_url,username,timestamp&access_token=" + token;
            const currentPost = await fetch(url).then(response =>response.json());
            allPosts.push(currentPost);
        }
        this.setState({
            posts: this.allPosts
        })
    }


}

export default Home;