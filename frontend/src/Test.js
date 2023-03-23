import { TweetCard } from './TweetCard'
// This is only a test page, it can be deleted. 

const tweet_data = {
    avatarUrl: './avatar.png',
    username: 'Gavin OP',
    like: 1,
    tweetId: '100056',
    followStatus: 'Following',
    imageSrc: '/tweet_card_pic_1.jpg',
    tweetText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ante at mi pharetra, quis blandit elit interdum. Cras vulputate, arcu eu sodales lucsdfasdf adfasdfasdfasdf dasdfasdfasdf sdfasdf asdfasdf asdfasdfasdfasdf sdfasdfasd asdfasdf asdftus, nibh massa blandit orci, eget ultricies turpis lorem ut nulla.',
};


export function Test() {
    return (
        <>
            <TweetCard {...tweet_data} />
        </>
    )
}