import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import { Login } from './Login';
import { Test } from './Test'
import { SignUp } from './SignUp';
import { AdminPage } from './AdminPage';
import { HomePage } from './HomePage';
import { PersonalPage } from './PersonalPage';
import { UnderDevelopment } from './UnderDevelopment';
import { Post } from './Post'
import { Retweet } from './Retweet'
import { TweetPage } from './TweetPage'
import { Settings } from "./Settings";
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
          <Route path="/personal/following" element={<PersonalPage page="following" />} />
          <Route path="/personal/fans" element={<PersonalPage page="fans" />} />
          <Route path="/personal/blacklist" element={<PersonalPage page="blacklist" />} />
          <Route path='/test' element={<Test />} />
          <Route path='/post' element={<Post />} />
          <Route path='/retweet' element={<Retweet />} />
          <Route path='/tweet' element={<TweetPage />} />
          {/* <Route path="/settings" element={<Settings />} />
          <Route path="/chat" element={<ChatPage />} /> */}
          <Route path='/*' element={<UnderDevelopment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
