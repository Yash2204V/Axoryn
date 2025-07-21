import { Outlet } from 'react-router-dom';
import { Footer, Header } from './components/index.js';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux"
import userService from './services/userService.js';
import { loginUser, logoutUser } from "./features/user/userSlice.js"


const App = () => {
  // const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   userService.getCurrentUser()
  //     .then((userData) => {
  //       if (userData) {
  //         dispatch(loginUser(userData));
  //       } else {
  //         dispatch(logoutUser());
  //       }
  //     })
  //     .finally(() => setLoading(false))
  // }, [])

  return (
    <div className=''>
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
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