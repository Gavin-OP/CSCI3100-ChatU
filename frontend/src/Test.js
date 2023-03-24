import { TweetCard } from './TweetCard';
import { RetweetCard } from './RetweetCard';
import { NavigationBar } from './Navbar';
// This is only a test page, it can be deleted. 

const tweet_data = {
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
    imageSrc: '/tweet_card_pic_1.jpg',
    // imageSrc: '',
    // tweetText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ante at mi pharetra, quis blandit elit interdum. Cras vulputate, arcu eu sodales lucsdfasdf adfasdfasdfasdf dasdfasdfasdf sdfasdf asdfasdf asdfasdfasdfasdf sdfasdfasd asdfasdf asdftus, nibh massa blandit orci, eget ultricies turpis lorem ut nulla.',
    tweetText: 'dfasdfanibh massa blandit orci, eget ultricies turpis lorem ut nulla.',
};


export function Test() {
    return (
        <>
            <NavigationBar page={'admin'} />
            <RetweetCard {...tweet_data} />
            <TweetCard {...tweet_data} />
        </>
    );
}