import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home'; 
import ChatContainer from '../components/ChatContainer';


function MainRouter() {
  return (
    <div>
        <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/chatcontainer' element={<ChatContainer />} />
        </Routes>
    </div>
  )
}

export default MainRouter