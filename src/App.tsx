import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Mainpage from './mainpage';
import Setting from './setting';
import Nrandom from './nrandom';
import Srandom from './selectrandom';

function App() {
  // const [count, setCount] = useState(0)
  const username = "";

  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Mainpage username={username}/>} />
          <Route path="setting" element={<Setting />} />
          <Route path="nrandom" element={<Nrandom />} />
          <Route path="srandom" element={<Srandom />} />
        </Routes>
      </div>
    </>
  )
}

export default App
