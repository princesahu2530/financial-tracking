import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Navbar from './components/Navbar.jsx';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer /> {/* Place the ToastContainer separately */}
      <Navbar />
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
