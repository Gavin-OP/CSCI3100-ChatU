import { TweetCard } from './TweetCard'
import { NavigationBar } from './Navbar';
import { SearchBar } from './SearchBar';
// This is only a test page, it can be deleted. 

const tweet_data = {
    avatarUrl: './avatar.png',
    username: 'Gavin OP',
    tweetId: '100056',
    likeStatus: 0,
    dislikeStatus: 0,
    followStatus: 'Following',
    imageSrc: '/tweet_card_pic_1.jpg',
    // imageSrc: '',
    tweetText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ante at mi pharetra, quis blandit elit interdum. Cras vulputate, arcu eu sodales lucsdfasdf adfasdfasdfasdf dasdfasdfasdf sdfasdf asdfasdf asdfasdfasdfasdf sdfasdfasd asdfasdf asdftus, nibh massa blandit orci, eget ultricies turpis lorem ut nulla.',
};


export function Test() {
    return (
        <>
            <NavigationBar page={'admin'} />
            <TweetCard {...tweet_data} />
            <TweetCard {...tweet_data} />
            <TweetCard {...tweet_data} />
            <TweetCard {...tweet_data} />
            <TweetCard {...tweet_data} />
            <TweetCard {...tweet_data} />
            <TweetCard {...tweet_data} />
            <TweetCard {...tweet_data} />
            <TweetCard {...tweet_data} />
            <TweetCard {...tweet_data} />
            <TweetCard {...tweet_data} />
            <TweetCard {...tweet_data} />
            <TweetCard {...tweet_data} />
        </>
    )
}