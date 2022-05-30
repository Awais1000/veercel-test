import './App.css';
import Header from './component/header/header';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import Bookdetail from './pages/bookdetail';
import BookDetail2 from './pages/bookdetail2';
import AdminPortal from './pages/adminPortal';
import Cart from './pages/cart';
import CreateBook from './pages/createbook';
import EditBook from './pages/editBook';
import AdminProtectedRoute from './pages/adminProtectedRoutes';
import UserProtectedRoute from './pages/userprotectedRoute';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  const showcart = useSelector((state) => state.cartDisplay.value);
  
  return (<>
        <BrowserRouter>
          <Header />
          {showcart === true &&
            <Cart />
          }
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<Home />} />
            <Route path='/bookdetail/:book_code' element={<Bookdetail />} />
            <Route path='/bookdetail2/:book_code' element={<BookDetail2 />} />

            <Route element={<AdminProtectedRoute />}>
              <Route path='/editbook/:book_code' element={<EditBook />} />
              <Route path='/createbook' element={<CreateBook />} />
              <Route path='/admin/books' element={<AdminPortal />} />
            </Route>

            <Route element={<UserProtectedRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>

          </Routes>
        </BrowserRouter>
  </>
  )
}

export default App;
