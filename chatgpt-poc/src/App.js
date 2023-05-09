import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './component/Chat/index.js'
import DeIdentify from './component/DeIdentification/index.js'

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/"exact element={<Chat />}/>
      <Route path="/deidentify" element={<DeIdentify />} />
      {/* More routes go here */}
    </Routes>
  </Router>
  );
}

export default App;
