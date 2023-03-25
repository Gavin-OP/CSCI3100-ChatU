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
function App() {
  return (
    <div>
      {/* Frontend Router */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin-tweet" element={<AdminPage page="tweet" />} />
          <Route path="/admin-user" element={<AdminPage page="user" />} />
          <Route path="/admin-comment" element={<AdminPage page="comment" />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/personalpage/tweet" element={<PersonalPage page="tweet" />} />
          <Route path="/personalpage/fav" element={<PersonalPage page="favourite" />} />
          <Route path="/personalpage/following" element={<PersonalPage page="following" />} />
          <Route path="/personalpage/fans" element={<PersonalPage page="fans" />} />
          <Route path="/personalpage/blacklist" element={<PersonalPage page="blacklist" />} />
          <Route path='/test' element={<Test />} />
          <Route path='/post' element={<Post />} />
          <Route path='/retweet' element={<Retweet />} />
          <Route path='/tweet' element={<TweetPage />} />
          <Route path='/*' element={<UnderDevelopment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
