import { Outlet } from 'react-router-dom';
import { Footer, Header } from './components/index.js';
import { useEffect } from 'react';
import { useDispatch } from "react-redux"
import { checkAuthStatus } from "./features/user/userSlice.js"


const App = () => {
  const dispatch = useDispatch();

  // Check if user is authenticated on app load
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch])

  return (
    <div className=''>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );

  // return !loading ? (
  //     <div className=''>
  //       {/* <Header /> */}
  //       <Outlet />
  //       {/* <Footer /> */}
  //     </div>
  // ) : null
};

export default App;