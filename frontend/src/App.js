import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
// Remember to name the file correctly
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
          <Route path="/adminpage-tweet" element={<AdminPage page="tweet" />} />
          <Route path="/adminpage-user" element={<AdminPage page="user" />} />
          <Route path="/adminpage-comment" element={<AdminPage page="comment" />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/personalpage" element={<PersonalPage />} />
          <Route path='/test' element={<Test />} />
          <Route path='/post' element={<Post />} />
          <Route path='/retweet' element={<Retweet />} />
          <Route path='/tweetpage' element={<TweetPage />} />
          <Route path='/*' element={<UnderDevelopment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
