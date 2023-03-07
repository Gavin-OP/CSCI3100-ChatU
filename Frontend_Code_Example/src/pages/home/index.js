import React from 'react';

let test_file={username: 'David',
        time: '2023-3-7 0:04',
        tweetId: 9978,
        content: "A test twitter: aobtaobtjasboaib abaobyay pana aioybaiyb aba ntayba ibaiyb abyaaotbaotbao btap tnap tpiabt pabtapit bata tat ",
        favos: 2,
        likes: 9,
        comments: 3
        }



export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {logined: 0}
    }
    render(){
        return(
            <>
            <div className="container-fluid sticky d-flex m-0 p-0 row">
                <div className="d-flex col-2">
                    <div className="d-block container" style={{backgroundColor:'beige',alignItems:'center'}}>
                        <h3>Trend</h3>
                        <ol>
                            <li>CSCI</li>
                            <li>3100</li>
                            <li>Assignment</li>
                        </ol>
                    </div>
                </div>
                <div className="d-flex col-8 center">
                    <br></br>
                    <Twitter file={test_file} />
                </div>
            </div>
            </>
        )
    }
}


class Twitter extends React.Component{
    constructor(props){
        super(props);
        this.file=this.props.file;
    }
    handleLike(){

    }
    handleFavorite(){

    }
    handleComment(){}
    render(){
        return(
            <>
            <div className="container-fluid m-1" style={{backgroundColor:'white'}}>
                <div className='d-flex container-fluid m-1 row p-2' style={{height:'50px'}}>
                    <div className='d-flex flex-row col-10'>
                        <div className="thumb d-inline"><svg height="40" width="40">
                            <circle cx="20" cy="20" r="20" fill="green">
                            </circle></svg>
                        </div>
                        <h4 className='m-2' style={{fontSize:'large',textAlign:'center'}}>{this.file.username}</h4>
                        <div className='container d-flex mx-5 py-2' style={{positon:'right'}}>NO.{this.file.tweetId}</div>
                        
                    </div>
                    <div className='d-flex col-2 p-0 mx-0 my-1'>
                        <button className="btn btn-primary" style={{height:'40px'}}>follow</button>
                    </div>
                    <div style={{height:'0px',width:'100%'}}></div>
                </div>
                <div className='container-fluid p-2'>{this.file.content}</div>
                <div className='container-fluid p-2'>
                    <div className="d-flex flex-row-reverse">
                        <div className='p-2'><i class="bi bi-star"></i> {this.file.favos}</div>
                        <div className='p-2'><i class="bi bi-chat-dots"></i> {this.file.comments}</div>
                        <div className='p-2'><i class="bi bi-heart"></i> {this.file.likes}</div>
                        <div className='p-2'><i class="bi bi-box-arrow-up-right"></i></div>
                        <div className="p-2">{this.file.time}</div>
                    </div>
                </div>
                <div className='container-fluid d-none'></div>
            </div>
            </>
        )
    }
}