import { TweetCard } from './TweetCard';
import { RetweetCard } from './RetweetCard';
import { NavigationBar } from './NavBar';
// This is only a test page, it can be deleted. 

// export const tweet_data = {
//     avatarUrl: './avatar.png',
//     username: 'Gavin OP',
//     tweetId: '100056',
//     likeStatus: 1,
//     dislikeStatus: 0,
//     starStatus: 1,
//     likeCount: 49,
//     starCount: 32,
//     commentCount: 4,
//     followStatus: 'Following',
//     imageSrc: '/tweet_card_pic_1.jpg',
//     // imageSrc: '',
//     tweetText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ante at mi pharetra, quis blandit elit interdum. Cras vulputate, arcu eu sodales lucsdfasdf adfasdfasdfasdf dasdfasdfasdf sdfasdf asdfasdf asdfasdfasdfasdf sdfasdfasd asdfasdf asdftus, nibh massa blandit orci, eget ultricies turpis lorem ut nulla.',
//     // tweetText: 'dfasdfanibh massa blandit orci, eget ultricies turpis lorem ut nulla.',
// };

export const retweet_data = {
    retweetAvatarUrl: './avatar2.png',
    retweetUsername: 'King Arthur',
    retweetFollowStatus: 'Follow',
    avatarUrl: './logo.svg',
    username: 'ChatU Official',
    tweetId: '1',
    likeStatus: 1,
    dislikeStatus: 0,
    starStatus: 1,
    likeCount: 234,
    starCount: 387,
    commentCount: 2344,
    followStatus: 'Follow',
    imageSrc: '/logo_colorful.svg',
    // imageSrc: '',
    tweetText: 'Welcome to ChatU. We are glad to announce that ChatU is officially release a brand new version!!',
    // tweetText: 'dfasdfanibh massa blandit orci, eget ultricies turpis lorem ut nulla.',
};


export function Test() {
    return (
        <>
            <NavigationBar page={'admin'} />
            {/* <RetweetCard {...retweet_data} /> */}

            <TweetCard tweet_id={30}/>
        </>
    );
}


