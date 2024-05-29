import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Mainpage from './mainpage';
import CreateCard from './CreateCard';
import EditCard from './EditCard';

function App() {
  // const [count, setCount] = useState(0)
  const username = "";

  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Mainpage username={username}/>} />
          <Route path="create" element={<CreateCard />} />
          <Route path="edit/:_id" element={<EditCard />} />
        </Routes>
      </div>
    </>
  )
}

export default App
