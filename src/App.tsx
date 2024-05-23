import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Mainpage from './mainpage';
// import ProductCreate from './ProductCreate';
// import UserUpdate from './ProductUpdate';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Mainpage />} />
          {/* <Route path="create" element={<ProductCreate />} /> */}
          {/* <Route path="update/:_id" element={<UserUpdate />} /> */}
        </Routes>
      </div>
    </>
  )
}

export default App
