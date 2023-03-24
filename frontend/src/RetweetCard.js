import { TweetCard } from './TweetCard';
import './RetweetCard.css';

export function RetweetCard(props) {
    return (
        <>
            <div className='retweet-card-container'>
                <div className="retweet-card">
                    <div className="retweet-header">
                        <span className="retweeted-by">OP retweeted</span>
                    </div>
                    <div className="retweet-body">
                        <TweetCard {...props} />
                    </div>
                </div>
            </div>
        </>
    );
}