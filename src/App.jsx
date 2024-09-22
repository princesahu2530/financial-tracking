import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header.jsx';

function App() {
  return (
    <>
      <ToastContainer /> {/* Place the ToastContainer separately */}
      
      <Header/>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
