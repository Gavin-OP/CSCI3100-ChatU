import { NavigationBar } from './Navbar';
import { TweetCard } from './TweetCard'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare, faHeartBroken, faComment, faStar, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './Tweetpage.css';

let test_file = {
    username: 'David',
    avatar: "./avatar2.png",
    time: '2023-3-7 0:04',
    tweetId: 9978,
    content: "A test twitter: aobtb abyaaotbaotbao btap tnap tpiabt pabtapit bata tat ",
    favos: 2,
    likes: 9,
    comments: [{user:'user1', avatar:"./avatar.png", content:'Comment 1', time:'2023-3-21 19:00'},
    {user:'uagoab', avatar:"./avatar2.png", content:'anoaotiba', time:'2023-3-22 11:40'},
    {user:'CSCI3100', avatar:"./avatar.png", content:'Good job', time:'2023-3-22 14:38'}],
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
        starCount: 32,
        commentCount: 4,
        followStatus: 'Following',
        // imageSrc: '/tweet_card_pic_1.jpg',
        tweetText: 'dfasdfanibh massa blandit orci, eget ultricies turpis lorem ut nulla.',
    }
}

export class Tweetpage extends React.Component {
    constructor(props) {
        super(props);
        this.file = test_file;
        this.state = { logined: 0, like: test_file.likeStatus, favor:test_file.favorStatus, type:0};
    }
    componentDidMount(){
        if (this.file.imageSrc!==undefined && this.file.imageSrc.length>0){
            addPic(this.file);
        }
        if (this.file.tweet_data!==undefined && this.file.tweet_data!==""){
            this.setState({type:1});
        }
    }
    handleLike=()=>{
        if (this.state.like===1){
            this.setState({like: 0 });
            this.file.likes -= 1;
        }
        else if (this.state.like===-1){
            this.setState({like: 1});
            this.file.likes += 2;
        }
        else {
            this.setState({like: 1});
            this.file.likes += 1;
        }
    }
    handleDislike=()=>{
        if (this.state.like===-1){
            this.setState({like: 0});
            this.file.likes += 1;
        }
        else if (this.state.like===1){
            this.setState({like: -1});
            this.file.likes -= 2;
        }
        else {
            this.setState({like: -1});
            this.file.likes -= 1;
        }
    }
    handleFavor=()=>{
        if (this.state.favor===1){
            this.setState({favor: 0});
            this.file.favos -= 1;
        }
        else {
            this.setState({favor: 1});
            this.file.favos += 1;
        }
    }
    sendComment=()=>{
        var time=new Date();
        time.toLocalDateString();
        console.log(time);
    }
    render() {
        return (
            <>  
                <div className='container-fluid' id="top" style={{minWidth:'768px'}}>
                    <NavigationBar page='user'/>
                    <div className="topbutton"><a href='#top'><i className="bi bi-arrow-up-square"></i></a></div>
                    <div className="container-fluid m-0 py-3 row">
                        <div className="container d-block col-8 offset-2" style={{backgroundColor:'#F7F7F7', minHeight:'90vh'}}>
                            <br></br>
                            <div className='container'>
                                <button className='btn btn-outline-primary' onClick={()=>{window.history.back()}}><i className="bi bi-arrow-left"></i> Back to Homepage</button>
                                <br></br>
                                
                            </div>
                            <div className="container-fluid d-block my-5">
                                <div className="container row">
                                    <div className="col-1">
                                        <img src={this.file.avatar} alt="Avatar" style={{width: '48px',height:'48px',borderRadius: '50%', marginRight: '10px'}}/>
                                    </div>
                                    <div className="col-5 container offset-0 d-inline-block">
                                        <div className="container row" style={{fontSize:'24px'}}>
                                            <div className="col-6">{this.file.username}</div>
                                            <div className='col-5'>
                                                <button className="btn btn-primary">{this.file.followStatus}</button>
                                            </div>
                                            <div className='col-1 container d-block'><div style={{width:'1.5px',height:'100%',backgroundColor:'gray'}}></div></div>
                                        </div>
                                    </div>
                                    <div className="col-6 container">
                                        <div className="container-fluid row">
                                            <div className="col-4"></div>
                                            <div className="col-8" style={{fontSize:'22px'}}>NO.{this.file.tweetId}</div>
                                            
                                        </div>
                                    </div>    
                                </div>
                                <div className="container m-4" style={{fontSize:'22px',width:'92%'}}>{this.file.content}</div>
                                <div className="container m-4 d-flex" id="imgbox" style={{width:'92%'}}>
                                    {this.state.type===1?<TweetCard {...this.file.tweet_data} />:<div></div>}
                                </div>

                                <div className="container m-4" style={{fontSize:'16px',width:'95%'}}>
                                    <div className="container-fluid row">
                                        <div className="col-6 p-2" >{this.file.time}</div>
                                        <div className="col-6 py-0 flex-right text-right">
                                            <button className="p-2 likebuttons" alt="Like" onClick={this.handleLike} style={this.state.like==1?{color: "#d92534"}:{color:'#657786'}} ><FontAwesomeIcon icon={faHeart} /> {this.file.likes}</button>
                                            <button className="p-3 likebuttons" alt="Dislike" onClick={this.handleDislike}style={this.state.like==-1?{color: "#39aaf9"}:{color:'#657786'}}><FontAwesomeIcon icon={faHeartBroken} /></button>
                                            <button className="p-2 likebuttons" alt="Favorite"onClick={this.handleFavor} style={this.state.favor==1?{color: "goldenrod"}:{color:'#657786'}} ><FontAwesomeIcon icon={faStar} /> {this.file.favos}</button>                     
                                            <button className="p-3 likebuttons" alt="Comment" style={{ color: "#657786" }} ><FontAwesomeIcon icon={faComment} /> {this.file.comments.length}</button>
                                            <button className="p-2 likebuttons" alt="Retweet"><FontAwesomeIcon icon={faShare} /></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="container m-4" style={{fontSize:'22px',width:'92%'}}>
                                    <div className="container-fluid comment-input" id="inputcomment">
                                        <input type="text" id="input" placeholder="Comment..." />
                                        <button type='submit' onClick={this.sendComment} className='btn pull-right'><FontAwesomeIcon icon={faPaperPlane} /></button>                                  
                                    </div>
                                </div>
                                <div className="container m-4" id="comments" style={{fontSize:'22px',width:'92%'}}>
                                    {this.file.comments.map((c,i)=><CommentCard key={i} comment={c}/>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

function addPic(file){
    var count= file.imageSrc.length;
    var code="";
    var filename;
    let div=document.getElementById("imgbox");
    for (filename of file.imageSrc){
        code += "<image src='"+filename+"' style='max-width:"+(100/count)+"%'/>";
    }
    div.innerHTML=code;
}


class CommentCard extends React.Component{
    constructor(props) {
        super(props);
        this.comment = this.props.comment;
        this.state={isload:0};
    }
    componentDidMount(){
        this.setState({isload:1});
    }
    addCom(){
        window.location.hash = "#inputcomment";
        if (this.state.isload){
            var div;
            div=document.getElementById("input");
            // if (div !== undefined){
            div.value="@"+this.comment.user+": ";
            // }
            // div.setAttribute("placeholder")
        }
    }
    render(){
        return(
            <>
                <div className="container-fluid commentcard">
                    <div className="container row p-2">
                        <div className="col-1">
                            <img src={this.comment.avatar} alt="Avatar" style={{width: '32px',height:'32px',borderRadius: '50%', marginRight: '10px'}}/>
                        </div>
                        <div className="col-5 container offset-0 d-inline-block">
                            <div className="container row" style={{fontSize:'14px'}}>
                                <div className="col-6 p-2">{this.comment.user}</div>
                                <div className="col-5"></div>
                                <div className='col-1 container d-block'><div style={{width:'1px',height:'100%',backgroundColor:'gray'}}></div></div>
                            </div>
                        </div>
                        <div className="col-6 container">
                            <div className="container-fluid row">
                                <div className="col-4"></div>
                                <div className="col-8 p-2" style={{fontSize:'14px'}}>{this.comment.time}</div>            
                             </div>
                        </div>    
                    </div>
                    <div className="container m-4" style={{fontSize:'18px'}}>{this.comment.content}</div>
                    <div className="col-2 offset-10"><button className="p-2 likebuttons" alt="Reply to ..." onClick={()=>this.addCom()} style={{ color: "#657786" }} ><FontAwesomeIcon icon={faComment} /></button></div>
                </div>
            </>
        )
    }
}

