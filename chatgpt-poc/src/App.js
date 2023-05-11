import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/login'
import Chat from './component/Chat/index.js'
import DeIdentify from './component/DeIdentification/index.js'
import Example from './component/sample/index'

function App() {
  return (
    <Router>
    <Routes>
      {/* <Route path="/"exact element={<Login />}/> */}
      <Route path="/"exact element={<Chat />}/>
      <Route path="/example" element={<Example/>} />
      <Route path="/deidentify" element={<DeIdentify />} />
      {/* More routes go here */}
    </Routes>
  </Router>
  );
}

export default App;
