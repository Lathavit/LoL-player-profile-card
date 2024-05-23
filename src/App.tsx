import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Mainpage from './mainpage'; // Ensure correct import path

function App() {
    const [username, setUsername] = useState<string>('');

    return (
        <div className="App">
            <Navbar setUsername={setUsername} />
            <Routes>
                <Route path="/" element={<Mainpage username={username} />} />
                {/* <Route path="create" element={<ProductCreate />} /> */}
                {/* <Route path="update/:_id" element={<UserUpdate />} /> */}
            </Routes>
        </div>
    );
}

export default App;
