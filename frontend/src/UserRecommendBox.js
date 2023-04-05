import { layer } from '@fortawesome/fontawesome-svg-core';
import './UserRecommendBox.css';



export function UserRecomBox(){

    //Change visibility of the Container-for-two
    function ChangeVisibility(){


        //fetch data from backend, sorry to write it here,I don't want to write it in a new function
        fetch('/user/recommendbox')
        .then(res => res.json())
        .then(data => {UsersRow = data;})
        .catch(err => console.log(err));

        // handle the visibility of the Container-for-two and the URB-container
        let Container = document.getElementsByClassName('Container-for-two')[0];
        Container.style.display = "block";
        let firstBox = document.getElementsByClassName('URB-container')[0];
        let secondBox = document.getElementsByClassName('URB-container')[1];
        firstBox.style.display = "block";
        secondBox.style.display = "block";

    }

    //Button function for change color and text in follow button
    function ChangeButton(index){
        let Button = document.getElementsByClassName('follow-btn')[index];
        if (Button.innerHTML === "Follow"){
            Button.innerHTML = "Following";
            Button.style.backgroundColor = "#b5b5b5";
        }
        else if (Button.innerHTML === "Following"){
            Button.innerHTML = "Follow";
            Button.style.backgroundColor = "#ff4444";
        }
    }


    //Fake data!!!!!!!!!!!
    let UsersRow = 
        [
        { avatarUrl: './avatar.png', username:"User1", Signature:"?????123123123123123123123123?what is the project????"},
        { avatarUrl: './avatar.png', username:"User2",Signature:"Oh, how I hate to build a website!!!"},
        ];


    //Change visibility of the URB-container
    function ChangeVisibilityURB(index){
        let Container = document.getElementsByClassName('URB-container')[index];
        Container.style.display = "none";
    }


    //User prossessor for the map function
    let Users =
    [
        {index:0,...UsersRow[0]},
        {index:1,...UsersRow[1]},
    ]

    return(
        <div className='user-recommend-body'>
            <div className="Fresh-button">
                <button className="Fresh-btn" onClick={()=>ChangeVisibility()}>Fresh</button>
            </div>
            <div className='Container-for-two' style={{ display: 'none' }}> 
                {Users.map((item) => (
                <div className='URB-container' style={{display: 'block'}}>
                <button className='delete-btn' onClick={()=>ChangeVisibilityURB(item.index)}></button>
                <div className= "UserRecContainer">
                    <div className="user-recom-card">
                        <div className='Round-icon'>
                            <div className='icon'>
                                <img src={item.avatarUrl} alt="Icon"/>
                            </div>
                        </div>
                        <div className='User-name'>
                            <p>{item.username}</p>
                        </div>
                        <p className='sign-title'>Signature</p>
                        <div className='User-signature-container'>
                            <p className='User-signature'>{item.Signature}</p>
                        </div>
                        <div className='follow'>
                            <button className="follow-btn" onClick={()=>ChangeButton(item.index)}>Follow</button>
                        </div>       
                    </div>  
                </div>
                </div>
                ))}            
            </div>
        </div>
    )
}