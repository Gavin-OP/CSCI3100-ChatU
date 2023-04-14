import { NavigationBar } from './NavBar';
import { TweetCard } from './TweetCard'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare, faHeartBroken, faComment, faStar, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './TweetPage.css';
import { Loading } from './Loading'

export class TweetPage extends React.Component{
    constructor(props){
        super(props);
        this.state={loaded:0, file:{}};
    }
    componentDidMount(){
        let params = (new URL(document.location)).searchParams;
        let tid = params.get("tweetId");
        let uid = getCookieValue("userId");
        fetch('/tweet/getTweet/'+tid)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            fetch('/user/getUser/'+data.tweet.user)
            .then(res=>res.json())
            .then(user=>{
                let new_file={
                    username: user.username,
                    userId: user.user_id,
                    avatar: user.avatar_url,
                    time: data.tweet.time,
                    tweetId: data.tweet.tweet_id,
                    content: data.tweet.content,
                    likes: data.tweet.like.length-data.tweet.dislike.length,
                    comments: [],
                    likeStatus: 0,
                    favorStatus: 0,
                    followStatus: 'Follow', 
                    image: data.image,
                    original: data.tweet.original,
                    tag: ''
                }
                console.log(data.tweet.like)
                if (data.tweet.tag!=='None'){
                    new_file.tag = '#' + data.tweet.tag;
                }
                if (data.tweet.like.includes(Number(uid))){
                    new_file.likeStatus = 1;
                }
                if (data.tweet.dislike.includes(Number(uid))){
                    new_file.likeStatus = -1;
                }
                if (data.favorite!== undefined && data.favorite.includes(Number(uid))){
                    new_file.favorStatus = 1;
                }
                if (user.follow_status===1){
                    new_file.followStatus = 'Following';
                }
                else if (user.follow_status===2){
                    new_file.followStatus = 'Self';
                }
                fetch('/comment/commentList/'+tid)
                    .then(res=>res.json())
                    .then(res=>{
                        console.log(res);
                        new_file.comments = res;
                    })
                    .then(()=>{
                        this.setState({loaded: 1, file: new_file})
                    })
                .catch(err=>console.log(err))
            })
            
        })
    }
    render(){
        return(
            <>
            {this.state.loaded===0? <Loading/>: <Page file={this.state.file}/>}
            </>
        )
    }
}



class Page extends React.Component {
    constructor(props) {
        super(props);
        this.file = this.props.file;
        this.state = {logined: 0, like: this.props.file.likeStatus, favor: this.props.file.favorStatus, 
            follow: this.props.file.followStatus, type: 0 , updated: 0, image_done: 0, image_index:0};
    }
    componentDidMount() {
        if (this.file.image !== undefined) {
            this.addPic();
            console.log("Has picture")
        }
        if (this.file.original > 0) {
            this.setState({ type: 1 });
            document.getElementById('retweetbtn').display = 'none';
        }
        if (this.state.follow === 'Self'){
            document.getElementById('followbtn').style.background='#c9c9c9';
        }
        else if (this.state.follow === 'Following'){
            document.getElementById('followbtn').style.background='#c9c9c9';
        }
        else {
            document.getElementById('followbtn').style.background='#ff4444';
        }
    }
    componentDidUpdate(){
        if (this.state.follow === 'Self'){
             document.getElementById('followbtn').style.background='#c9c9c9';
        }
        else if (this.state.follow === 'Following'){
             document.getElementById('followbtn').style.background='#c9c9c9';
        }
        else {
             document.getElementById('followbtn').style.background='#ff4444';
        }
   }
    handleLike = () => {
        if (this.state.like === 1) {
            this.setState({ like: 0 });
            this.file.likes -= 1;
            fetch('/tweet/unlike/'+this.file.tweetId)
            .then(res=>console.log(res))
        }
        else if (this.state.like === -1) {
            this.setState({ like: 1 });
            this.file.likes += 2;
            fetch('/tweet/like/'+this.file.tweetId)
            .then(res=>console.log(res))
        }
        else {
            this.setState({ like: 1 });
            this.file.likes += 1;
            fetch('/tweet/like/'+this.file.tweetId)
            .then(res=>console.log(res))
        }
    }
    handleDislike = () => {
        if (this.state.like === -1) {
            this.setState({ like: 0 });
            this.file.likes += 1;
            fetch('/tweet/undislike/'+this.file.tweetId)
            .then(res=>console.log(res))
        }
        else if (this.state.like === 1) {
            this.setState({ like: -1 });
            this.file.likes -= 2;
            fetch('/tweet/dislike/'+this.file.tweetId)
            .then(res=>console.log(res))
        }
        else {
            this.setState({ like: -1 });
            this.file.likes -= 1;
            fetch('/tweet/dislike/'+this.file.tweetId)
            .then(res=>console.log(res))
        }
    }
    handleFavor = () => {
        if (this.state.favor === 1) {
            this.setState({ favor: 0 });
            fetch('/favorite/delete/'+this.file.tweetId)
            .then(res=>console.log(res))
        }
        else {
            this.setState({ favor: 1 });
            fetch('/favorite/add/'+this.file.tweetId)
            .then(res=>console.log(res))
        }
    }
    handleFollow = () => {
        if (this.state.follow === 'Following') {
            this.setState({ follow: 'Follow' });
            fetch('/follow/delete/'+this.file.userId)
            .then(res=>console.log(res))
        }
        else if (this.state.follow === 'Follow'){
            this.setState({ follow: 'Following' });
            fetch('/follow/add/'+this.file.userId)
            .then(res=>console.log(res))
        }
    }
    addPic = ()=>{
        if (this.file.image.length>1){
            document.getElementById('carousel-inner').innerHTML='';
            for (let i = 0; i < this.file.image.length; i++){
                var type = this.file.image[i].contentType;
                var data = this.file.image[i].data;
                let img_div = document.createElement('div');
                img_div.classList.add("carousel-item");
                img_div.classList.add("justify-content-center");
                img_div.style.margin = 'auto';
                img_div.style.float = 'auto';
                if ( i === this.state.image_index ){
                    img_div.classList.add("active");
                }
                img_div.id = "carousel-" + i;
                document.getElementById('carousel-inner').appendChild(img_div);
                let img_img = document.createElement('img');
                //img_img.classList.add('d-block');
                //img_img.style.maxHeight = '700px';
                img_img.style.width = '98%';
                img_img.src="data:" + type + ";base64, " +data;
                document.getElementById('carousel-'+ i).appendChild(img_img);
                
            }
            document.getElementById("carouselExampleControls").style.display = 'flex';
        }
        else {
            console.log(this.file.image.length)
            var type = this.file.image[0].contentType;
            var data = this.file.image[0].data;
            let code = "<div class='container-fluid d-flex justify-content-center'><image class='p-1' src='data:" + type + ";base64, " + data + "' style='max-height:500px; max-width:98%'/></div> ";
            document.getElementById('imgbox').innerHTML = code;
        }
    }
    handlePrev = () => {
        if (this.state.image_index===0){
            this.setState({image_index: this.file.image.length - 1 });
        }
        else {
            this.setState({image_index: this.state.image_index - 1 });
        }
        this.addPic();
    }
    handleNext = () => {
        if (this.state.image_index===(this.file.image.length - 1)){
            this.setState({image_index: 0 });
        }
        else {
            this.setState({image_index: this.state.image_index + 1 });
        }
        this.addPic();
    }
    sendComment = () => {
        const time = new Date();
        var yr=time.getFullYear();
        var mon=time.getMonth()+1;
        var day=time.getDate();
        var hr=time.getHours();
        var min=time.getMinutes();
        var sec=time.getSeconds();
        var t = yr + '-' + mon + '-' + day + ' ' + hr + ':' + min;
        var t2 = yr + '-' + mon + '-' + day + ' T' + hr + ':' + min + ':' + sec;
        let con= document.getElementById("input").value;
        let uid = getCookieValue("userId");
        fetch('/comment/create',
        { method:'POST',
         body: JSON.stringify({ user_id: Number(uid), tweet_id: this.file.tweetId, content: con, time: t}),
         headers: {'content-type': 'application/json'}})
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
        let new_comment={user_id: Number(uid), avatar: this.file.avatar, content: con, time: t2};
        console.log(new_comment);
        this.file.comments.push(new_comment);
        this.setState({updated:1});
        document.getElementById("input").value='';
    }
    render() {
        return (
            <>
                <div className='container-fluid p-0' id="top" style={{ minWidth: '768px' }}>
                    <NavigationBar page='user' />
                    <div className="container-fluid m-0 py-3 row">
                        <div className="container d-block col-8 offset-2" style={{ backgroundColor: '#F7F7F7', minHeight: '90vh' }}>
                            <br></br>
                            <div className='container'>
                                <button className='btn btn-outline-danger' onClick={() => { window.history.back() }}><i className="bi bi-arrow-left"></i> Back to Homepage</button>
                                <br></br>

                            </div>
                            <div className="container-fluid d-block my-5">
                                <div className="container-fluid row">
                                    <div className="col-1">
                                        <img src={this.file.avatar} alt="Avatar" onClick={()=>{window.location.href='/personal/tweet?userId='+this.file.userId}}
                                        style={{ width: '48px', height: '48px', borderRadius: '50%', marginRight: '10px' }} />
                                    </div>
                                    <div className="col-7 container offset-0 d-inline-block">
                                        <div className="container row" style={{ fontSize: '24px' }}>
                                            <div className="col-6" onClick={()=>{window.location.href='/personal/tweet?userId='+this.file.userId}}>{this.file.username}</div>
                                            <div className='col-5'>
                                                <button id="followbtn" className="btn" onClick={this.handleFollow} style={{color:'white'}}>{this.state.follow}</button>
                                            </div>
                                            <div className='col-1 container d-block'><div style={{ width: '1.5px', height: '100%', backgroundColor: 'gray' }}></div></div>
                                        </div>
                                    </div>
                                    <div className="col-4 container">
                                        <div className="container-fluid d-flex flex-row-reverse">
                                            <div style={{ fontSize: '22px' }}>NO.{this.file.tweetId}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container m-4" style={{ fontSize: '22px', width: '92%' }}>{this.file.tag}</div>
                                <div className="container m-4" style={{ fontSize: '22px', width: '92%' }}>{this.file.content}</div>
                                <div className="container m-2 d-flex justify-content-center" id="imgbox" style={{ width: '92%' }}></div> 

                                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" style={{display: 'none'}}>
                                    <div id="carousel-inner" class="carousel-inner">
                                    </div>
                                    <button class="carousel-control-prev" type="button" onClick={this.handlePrev}>
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" onClick={this.handleNext}>
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Next</span>
                                    </button>
            
                                </div>
                                <div className="container m-2 d-flex justify-content-center" style={{ width: '92%' }}>
                                    {this.state.type === 1 ? <TweetCard tweet_id={this.file.original} /> : <div></div>}
                                </div>

                                <div className="container m-4" style={{ fontSize: '16px', width: '95%' }}>
                                    <div className="container-fluid row">
                                        <div className="col-6 p-2" >{this.file.time.substring(0, 10) + '  ' + this.file.time.substring(11, 19)}</div>
                                        <div className="col-6 py-0  d-flex flex-row-reverse">
                                            
                                            <button className="p-2 likebuttons" id="retweetbtn" alt="Retweet" onClick={()=>{window.location.href='/retweet?tweetId='+this.file.tweetId}}><FontAwesomeIcon icon={faShare} /></button>
                                            <button className="p-3 likebuttons" alt="Comment" style={{ color: "#657786" }} ><FontAwesomeIcon icon={faComment} /> {this.file.comments.length}</button>
                                            <button className="p-2 likebuttons" alt="Favorite" onClick={this.handleFavor} style={this.state.favor == 1 ? { color: "goldenrod" } : { color: '#657786' }} ><FontAwesomeIcon icon={faStar} /></button>
                                            <button className="p-3 likebuttons" alt="Dislike" onClick={this.handleDislike} style={this.state.like == -1 ? { color: "#39aaf9" } : { color: '#657786' }}><FontAwesomeIcon icon={faHeartBroken} /></button>
                                            <button className="p-2 likebuttons" alt="Like" onClick={this.handleLike} style={this.state.like == 1 ? { color: "#d92534" } : { color: '#657786' }} ><FontAwesomeIcon icon={faHeart} /> {this.file.likes}</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="container m-4" style={{ fontSize: '22px', width: '92%' }}>
                                    <div className="container-fluid comment-input" id="inputcomment">
                                        <input type="text" id="input" placeholder="Comment..." required/>
                                        <button type='submit' onClick={this.sendComment} className='btn pull-right'><FontAwesomeIcon icon={faPaperPlane} /></button>
                                    </div>
                                </div>
                                <div className="container m-4" id="comments" style={{ fontSize: '22px', width: '92%' }}>
                                    {this.file.comments.map((c, i) => <CommentCard key={i} comment={c} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

function addPic(file) {

    var code='';

    let div = document.getElementById("imgbox");
    for (let i = 0; i < file.image.length; i++){
        var type = file.image[i].contentType;
        var data = file.image[i].data;
        code += "<div class='container-fluid'><image class='p-1' src='data:" + type + ";base64, " + data + "' style='max-height:500px;max-width:98%'/></div> ";
    }
    //console.log(data)
    div.innerHTML = code;
    
}

class CommentCard extends React.Component {
    constructor(props) {
        super(props);
        this.comment = this.props.comment;
        this.state = { isload: 0, username: 'Loading', avatar: '../avatar.png' };

    }
    componentDidMount() {
        fetch('/user/getUser/'+this.comment.user_id)
        .then(res=>res.json())
        .then(data=>{
            this.setState({username: data.username, avatar: data.avatar_url})
        })
        this.setState({ isload: 1 });
    }
    addCom() {
        window.location.hash = "#inputcomment";
        if (this.state.isload) {
            var div;
            div = document.getElementById("input");
            // if (div !== undefined){
            div.value = "@" + this.state.username + ": ";
            // }
            // div.setAttribute("placeholder")
        }
    }
    render() {
        return (
            <>
                <div className="container-fluid commentcard">
                    <div className="container row p-2">
                        <div className="col-1">
                            <img src={this.state.avatar} alt="Avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '10px' }} />
                        </div>
                        <div className="col-5 container offset-0 d-inline-block">
                            <div className="container row" style={{ fontSize: '18px' }}>
                                <div className="col-6 p-2">{this.state.username}</div>
 
                            </div>
                        </div>
                        <div className="col-6 container">
                            <div className="container-fluid d-flex flex-row-reverse">
                                <div className="p-2" style={{ fontSize: '14px' }}>{this.comment.time.substring(0, 10) + '  ' + this.comment.time.substring(11, 19)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="container m-4" style={{ fontSize: '18px' }}>{this.comment.content}</div>
                    <div className="container-fluid d-flex flex-row-reverse">
                        <div className="p-2"><button className="p-2 likebuttons" alt="Reply to ..." onClick={() => this.addCom()} style={{ color: "#657786" }} ><FontAwesomeIcon icon={faComment} /></button></div>
                    </div>
                    
                </div>
            </>
        )
    }
}

function getCookieValue(name) {
    let result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)")
    return result ? result.pop() : ""
}
