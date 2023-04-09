import { NavigationBar } from './NavBar';
import { TweetCard } from './TweetCard'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare, faHeartBroken, faComment, faStar, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './TweetPage.css';
import { Loading } from './Loading'

let test_file = {
    username: 'David',
    avatar: "./avatar2.png",
    time: '2023-3-7 0:04',
    tweetId: 9978,
    content: "A test twitter: aobtb abyaaotbaotbao btap tnap tpiabt pabtapit bata tat ",
    favos: 2,
    likes: 9,
    comments: [{ user: 'user1', avatar: "./avatar.png", content: 'Comment 1', time: '2023-3-21 19:00' },
    { user: 'uagoab', avatar: "./avatar2.png", content: 'anoaotiba', time: '2023-3-22 11:40' },
    { user: 'CSCI3100', avatar: "./avatar.png", content: 'Good job', time: '2023-3-22 14:38' }],
    likeStatus: 0,
    favorStatus: 0,
    followStatus: 'Following',
    //imageSrc: ['/tweet_card_pic_1.jpg'],
    tweet_data: {
        avatarUrl: './avatar.png',
        username: 'Gavin OP',
        tweetId: '100056',
        likeStatus: 1,
        dislikeStatus: 0,
        starStatus: 1,
        likeCount: 49,
        //starCount: 32,
        commentCount: 4,
        followStatus: 'Following',
        // imageSrc: '/tweet_card_pic_1.jpg',
        tweetText: 'dfasdfanibh massa blandit orci, eget ultricies turpis lorem ut nulla.',
    }
}

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
                    avatar: "./avatar.png",
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
                if (data.user.favorite.includes(Number(uid))){
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
            follow: this.props.file.followStatus, type: 0 , updated: 0};
    }
    componentDidMount() {
        if (this.file.image !== undefined) {
            addPic(this.file);
            console.log("Has picture")
        }
        if (this.file.original > 0) {
            this.setState({ type: 1 });
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
    sendComment = () => {
        const time = new Date();
        var yr=time.getFullYear();
        var mon=time.getMonth()+1;
        var day=time.getDate();
        var hr=time.getHours();
        var min=time.getMinutes();
        var t = yr + '-' + mon + '-' + day + ' ' + hr + ':' + min;
        let con= document.getElementById("input").value;
        console.log(time);
        let new_comment={user: this.file.username, avatar: this.file.avatar, content: con, time: t};
        console.log(new_comment);
        this.file.comments.push(new_comment);
        this.setState({updated:1});
    }
    render() {
        return (
            <>
                <div className='container-fluid p-0' id="top" style={{ minWidth: '768px' }}>
                    <NavigationBar page='user' />
                    <div className="topbutton"><a href='#top'><i className="bi bi-arrow-up-square"></i></a></div>
                    <div className="container-fluid m-0 py-3 row">
                        <div className="container d-block col-8 offset-2" style={{ backgroundColor: '#F7F7F7', minHeight: '90vh' }}>
                            <br></br>
                            <div className='container'>
                                <button className='btn btn-outline-primary' onClick={() => { window.history.back() }}><i className="bi bi-arrow-left"></i> Back to Homepage</button>
                                <br></br>

                            </div>
                            <div className="container-fluid d-block my-5">
                                <div className="container-fluid row">
                                    <div className="col-1">
                                        <img src={this.file.avatar} alt="Avatar" style={{ width: '48px', height: '48px', borderRadius: '50%', marginRight: '10px' }} />
                                    </div>
                                    <div className="col-7 container offset-0 d-inline-block">
                                        <div className="container row" style={{ fontSize: '24px' }}>
                                            <div className="col-6">{this.file.username}</div>
                                            <div className='col-5'>
                                                <button className="btn btn-primary" onClick={this.handleFollow}>{this.state.follow}</button>
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
                                <div className="container m-2 d-flex justify-content-center" id="imgbox" style={{ width: '92%' }}>
                                    {this.state.type === 1 ? <TweetCard {...this.file.tweet_data} /> : <div></div>}
                                </div>

                                <div className="container m-4" style={{ fontSize: '16px', width: '95%' }}>
                                    <div className="container-fluid row">
                                        <div className="col-6 p-2" >{this.file.time}</div>
                                        <div className="col-6 py-0  d-flex flex-row-reverse">
                                            
                                            <button className="p-2 likebuttons" alt="Retweet" onClick={()=>{window.location.href='/retweet?tweetId='+this.file.tweetId}}><FontAwesomeIcon icon={faShare} /></button>
                                            <button className="p-3 likebuttons" alt="Comment" style={{ color: "#657786" }} ><FontAwesomeIcon icon={faComment} /> {this.file.comments.length}</button>
                                            <button className="p-2 likebuttons" alt="Favorite" onClick={this.handleFavor} style={this.state.favor == 1 ? { color: "goldenrod" } : { color: '#657786' }} ><FontAwesomeIcon icon={faStar} /></button>
                                            <button className="p-3 likebuttons" alt="Dislike" onClick={this.handleDislike} style={this.state.like == -1 ? { color: "#39aaf9" } : { color: '#657786' }}><FontAwesomeIcon icon={faHeartBroken} /></button>
                                            <button className="p-2 likebuttons" alt="Like" onClick={this.handleLike} style={this.state.like == 1 ? { color: "#d92534" } : { color: '#657786' }} ><FontAwesomeIcon icon={faHeart} /> {this.file.likes}</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="container m-4" style={{ fontSize: '22px', width: '92%' }}>
                                    <div className="container-fluid comment-input" id="inputcomment">
                                        <input type="text" id="input" placeholder="Comment..." />
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
        code += "<image className='p-1' src='data:" + type + ";base64, " + data + "' style='max-height:"+1000/file.image.length+"px;max-width:" + 98/file.image.length + "%'/> ";
    }
    //console.log(data)
    div.innerHTML = code;
}


class CommentCard extends React.Component {
    constructor(props) {
        super(props);
        this.comment = this.props.comment;
        this.state = { isload: 0 };
        this.avatar = './avatar.png';
    }
    componentDidMount() {
        this.setState({ isload: 1 });
    }
    addCom() {
        window.location.hash = "#inputcomment";
        if (this.state.isload) {
            var div;
            div = document.getElementById("input");
            // if (div !== undefined){
            div.value = "@" + this.comment.user + ": ";
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
                            <img src={this.avatar} alt="Avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '10px' }} />
                        </div>
                        <div className="col-5 container offset-0 d-inline-block">
                            <div className="container row" style={{ fontSize: '18px' }}>
                                <div className="col-6 p-2">{this.comment.user}</div>

                                
                            </div>
                        </div>
                        <div className="col-6 container">
                            <div className="container-fluid d-flex flex-row-reverse">
                                <div className="p-2" style={{ fontSize: '14px' }}>{this.comment.time}</div>
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
