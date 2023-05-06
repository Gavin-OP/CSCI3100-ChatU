import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import { Login } from './Login'; // Login page
import { Test } from './Test' // Test for developers.
import { SignUp } from './SignUp'; // Signup page
import { AdminPage } from './AdminPage'; // Admin page, with 3 subpages: tweet, user, comment
import { HomePage } from './HomePage'; // User Page, the main page with some tweets, post button, user recommendation
import { PersonalPage } from './PersonalPage'; // User homepage, showing user's information and tweet he/she posts/favorites
import { UnderDevelopment } from './UnderDevelopment';
import { Post } from './Post'  // Post page, a form allowing images.
import { Retweet } from './Retweet'  // Retweet page, a special post page, showing the tweet user want to retweet.
import { TweetPage } from './TweetPage' // Tweet detailed page, with tweet data, comments.
import { FollowPage } from './FollowPage'  // Following page, show one user's following/fans list
import { Setting } from "./Setting";  // Setting page, user can set their information and change avatar.
import { BlackList } from './BlackList' // Blacklist page, show user's blacklist.
// import { ChatPage } from "./ChatPage";
function App() {
  return (
    <div>
      {/* Frontend Router */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/tweet" element={<AdminPage page="tweet" />} />
          <Route path="/admin/user" element={<AdminPage page="user" />} />
          <Route path="/admin/comment" element={<AdminPage page="comment" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/personal/tweet" element={<PersonalPage page="tweet" />} />
          <Route path="/personal/fav" element={<PersonalPage page="favourite" />} />
          <Route path="/personal/following" element={<FollowPage page="following" />} />
          <Route path="/personal/fans" element={<FollowPage page="fans" />} />
          <Route path="/personal/blacklist" element={<BlackList />} />
          <Route path='/test' element={<Test />} />
          <Route path='/post' element={<Post />} />
          <Route path='/retweet' element={<Retweet />} />
          <Route path='/tweet' element={<TweetPage />} />
          <Route path="/setting" element={<Setting />} />

          <Route path='/*' element={<UnderDevelopment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
