import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from './components/product/Product';

function App() {
  return (
     <Router>
      <div className=' col-md-12 col-lg-12 app  d-flex justify-content-center  row'>
        
        <Routes>
          <Route path='/products/*' element={<Product></Product>}>
            
          </Route>
        

        </Routes>
      </div>
    </Router>
  );
}

export default App;
