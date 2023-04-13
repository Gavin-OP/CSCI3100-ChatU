import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './UserRecommendBox.css';
import { useEffect, useState } from 'react';



export function UserRecomBox() {
    //Setstate if touch the fresh button
    const [fresh, setFresh] = useState(false);
    const [userInfo1, setUserInfo1] = useState([
        { avatar: './avatar.png', username: "", description: "", userID: "" },
    ]);
    const [userInfo2, setUserInfo2] = useState([
        { avatar: './avatar.png', username: "", description: "", userID: "" },
    ]);
    //Change visibility of the Container-for-two
    function ChangeVisibility() {


        // handle the visibility of the Container-for-two and the URB-container
        let Container = document.getElementsByClassName('Container-for-two')[0];
        Container.style.display = "block";
        let firstBox = document.getElementsByClassName('URB-container')[0];
        let secondBox = document.getElementsByClassName('URB-container')[1];
        firstBox.style.display = "block";
        secondBox.style.display = "block";

    }
    //Button function for change color and text in follow button
    function ChangeButton(index) {
        let Button = document.getElementsByClassName('follow-btn')[index];
        if (Button.innerHTML === "Follow") {
            Button.innerHTML = "Following";
            Button.style.backgroundColor = "#b5b5b5";
        }
        else if (Button.innerHTML === "Following") {
            Button.innerHTML = "Follow";
            Button.style.backgroundColor = "#ff4444";
        }
    }
    function handleFollow(index, userId) {
        let Button = document.getElementsByClassName('follow-btn')[index];
        if (Button.innerHTML === "Follow") {
            fetch('/follow/delete/' + userId)
                .then(res => res.json())
                .then(data => console.log(data.message))
                .catch(err => console.log(err))
        }
        else if (Button.innerHTML === "Following") {
            fetch('/follow/add/' + userId)
                .then(res => res.json())
                .then(data => console.log(data.message))
                .catch(err => console.log(err))
        }
    }
    useEffect(() => {
        //fetch data from backend, sorry to write it here,I don't want to write it in a new function
        fetch('/home/userRecommendation')
            .then(res => res.json())
            .then(data => { return data; })
            .then(data => {
                setUserInfo1(prevState => ({ ...prevState, avatar: './avatar.png', userID: data.randomUser[0].user_id, username: data.randomUser[0].username, description: data.randomUser[0].description }));
                setUserInfo2(prevState => ({ ...prevState, avatar: './avatar.png', userID: data.randomUser[1].user_id, username: data.randomUser[1].username, description: data.randomUser[1].description }))
            })
            .catch(err => console.log(err));
    }, [fresh])



    //Fake data!!!!!!!!!!!
    // let UsersRow = 
    //     [
    //     { avatarUrl: './avatar.png', username:"User1", Signature:"?????123123123123123123123123?what is the project????"},
    //     { avatarUrl: './avatar.png', username:"User2",Signature:"Oh, how I hate to build a website!!!"},
    //     ];


    //Change visibility of the URB-container
    function ChangeVisibilityURB(index) {
        let Container = document.getElementsByClassName('URB-container')[index];
        Container.style.display = "none";
    }


    //User prossessor for the map function
    let Users =
        [
            { index: 0, ...userInfo1 },
            { index: 1, ...userInfo2 },
        ]

    return (
        <div className='user-recommend-body'>
            <div className="Fresh-button">
                <button className="Fresh-btn" onClick={() => { setFresh(!fresh); ChangeVisibility(); }}>Fresh</button>
            </div>
            <div className='Container-for-two' style={{ display: 'none' }}>
                {Users.map((item) => (
                    <div className='URB-container' style={{ display: 'block' }}>
                        <button className='delete-btn' onClick={() => ChangeVisibilityURB(item.index)}><FontAwesomeIcon icon={faXmark} /></button>
                        <div className="UserRecContainer">
                            <div className="user-recom-card">
                                <div className='Round-icon'>
                                    <div className='icon'>
                                        <img src={item.avatar} alt="Icon" />
                                        <p style={{ display: 'none' }}>1</p>
                                    </div>
                                </div>
                                <div className='User-name'>
                                    {item.username}
                                </div>
                                <div className='User-signature-container'>
                                    <p className='sign-title'>Signature</p>
                                    <p className='User-signature'>{item.description}</p>
                                </div>
                                <div className='follow'>
                                    <button className="follow-btn" onClick={() => { ChangeButton(item.index); handleFollow(item.index, item.userID) }}>Follow</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}