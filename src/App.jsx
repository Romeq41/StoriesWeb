import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Stories from './components/Stories/Stories';
import Header from './components/Header/Header';
import Welcome from './components/Welcome/Welcome';
import Footer from './components/Footer/Footer';
import Info from './components/Info/Info';
import NotFound from './components/NotFound/NotFound.jsx'; // Optional: A 404 page component
import AdminAuth from './components/Admin/AdminAuth.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Welcome />
            <Stories />
            <Info  />
            <Footer />
          </>
        } />
        <Route path="/admin" element={<AdminAuth />} />
        <Route path="*" element={<NotFound />} />
  
      </Routes>
    </Router>
  );
}

export default App;
