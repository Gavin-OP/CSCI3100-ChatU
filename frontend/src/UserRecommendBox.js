import './UserRecommendBox.css';

//Fake data!!!!!!!!!!!
let Users = 
[
{ Icon: './avatar.png', Name:"User1", Signature:"?????123123123123123123123123?what is the project????"},
{ Icon: './avatar.png', Name:"User2",Signature:"Oh, how I hate to build a website!!!"},
];


export function UserRecomBox(){
    return(
        <div className='user-recommend-body'>
            <div className="Fresh-button">
                <button className="Fresh-btn" >Fresh</button>
            </div>
                {Users.map((item) => (
                <div className='URB-container'>
                <button className='delete-btn'></button>
                <div className= "UserRecContainer">
                    <div className="user-recom-card">
                        <div className='Round-icon'>
                            <div className='icon'>
                                <img src={item.Icon} alt="Icon"/>
                            </div>
                        </div>
                        <div className='User-name'>
                            <p>{item.Name}</p>
                        </div>
                        <p className='sign-title'>Signature</p>
                        <div className='User-signature-container'>
                            <p className='User-signature'>{item.Signature}</p>
                        </div>
                        <div className='follow'>
                            <button className="follow-btn">Follow</button>
                        </div>       
                    </div>  
                </div>
                </div>
                ))}
        </div>
    )
}