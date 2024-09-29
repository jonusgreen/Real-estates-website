import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Popularproperties from './components/popularproperties/popularproperties';
import Properties from './components/Properties/Properties';
import propertyDetail from './components/propertyDetail/PropertyDetail';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import Navbar from './components/Navbar/Navbar'; // Assuming you have a Navbar component
import Hero from './components/hero/Hero'; // Assuming you have a Hero component
import Featuredproperties from './components/featuredproperties/Featuredproperties'; // Assuming you have a Featuredproperties component
import Newsletter from './components/newsletter/newsletter'; // Assuming you have a Newsletter component

function App() {
  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Navbar />
              <Hero />
              <Popularproperties />
              <Featuredproperties />
              <Newsletter />
              <Footer />
            </>
          }
        />

        <Route
          path='/Properties'
          element={
            <>
              <Navbar />
              <Properties />
              <Footer />
            </>
          }
        />

        <Route
          path='/propertyDetail/:id'
          element={
            <>
              <Navbar />
              <propertyDetail />
              <Footer />
            </>
          }
        />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
