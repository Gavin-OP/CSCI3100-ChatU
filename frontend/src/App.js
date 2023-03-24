import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';
import { Login } from './Login';
import { Test } from './Test'
import { Signup } from './Signup';
import { Adminpage } from './Adminpage';
import { Homepage } from './Homepage';
import { UnderDevelopment } from './UnderDevelopment';
import { Post } from './Post'
import { Retweet } from './Retweet'
import { Tweetpage } from './Tweetpage'
function App() {
  return (
    <div>
      {/* Frontend Router */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adminpage/tweet" element={<Adminpage page="tweet" />} />
          <Route path="/adminpage/user" element={<Adminpage page="user" />} />
          <Route path="/adminpage/comment" element={<Adminpage page="comment" />} />
          <Route path="/homepage" element={<Homepage page="homepage"/>} />
          <Route path='/test' element={<Test />} />
          <Route path='/post' element={<Post />} />
          <Route path='/retweet' element={<Retweet />} />
          <Route path='/tweetpage' element={<Tweetpage />} />
          <Route path='/*' element={<UnderDevelopment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
