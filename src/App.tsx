import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Navbar from './Navbar';
import Mainpage from './mainpage';
import Setting from './setting';
import Nrandom from './nrandom';
import Srandom from './selectrandom';
import Profile from './liff';

function App() {
  const [username, setUsername] = useState("");

  return (
    <>
      <div className="App">
        <Navbar setUsername={setUsername} />
        <Routes>
          <Route path="/" element={<Mainpage username={username} />} />
          <Route path="setting" element={<Setting />} />
          <Route path="nrandom" element={<Nrandom />} />
          <Route path="srandom" element={<Srandom />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
