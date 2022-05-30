import './header.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from '../../store/userSLice';
import { showCart } from '../../store/cartDisplay';
import { addToCart } from '../../store/cartSlice';

export default () => {
    const userLogin = useSelector((state) => state.user.value);
    const dispatch = useDispatch();

    return (
        <nav className="navbar colorChange navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand nav_item">Tutorial</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item colorchange">
                            <Link to='/' className="nav-link nav_item" onClick={()=>{
                                
                            }}>Home</Link>
                        </li>
                        {Object.entries(userLogin).length === 0 ?
                            <>
                                <li className="nav-item colorchange">
                                    <Link to='/signup' className="nav-link nav_item">Signup</Link>
                                </li>
                                <li className="nav-item colorchange">
                                    <Link to='/login' className="nav-link nav_item">Login</Link>
                                </li>
                            </>
                            : <>
                                <li className="nav-item colorchange">
                                    <Link to='/dashboard' className="nav-link nav_item">Dashboard</Link>
                                </li>
                                {/* if condition for checking if the loged in user admin and showing admin routes */}
                                {userLogin.user.user_type === 1 &&
                                    <>
                                        <li className="nav-item colorchange">
                                            <Link to='/admin/books' className="nav-link nav_item">Admin Books</Link>
                                        </li>
                                        <li className="nav-item colorchange">
                                            <Link to='/createbook' className="nav-link nav_item">Create Book</Link>
                                        </li>
                                    </>
                                }

                                <li className="nav-item colorchange">
                                    <Link to='/login' className="nav-link nav_item"
                                        onClick={() => {
                                            localStorage.clear();
                                            dispatch(logout({}));
                                            dispatch((addToCart([])))

                                        }}>Logout</Link>
                                </li>

                            </>
                        }
                    </ul>
                    {Object.entries(userLogin).length > 0 && <div >
                        <i onClick={() => {
                            dispatch((showCart(true)));
                        }} className="icon bi bi-cart4"></i>
                    </div>}
                </div>
            </div>
        </nav>
    )
}










