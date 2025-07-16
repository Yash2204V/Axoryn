import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
// import { func } from "./features/user/userSlice.js"
import { Header, Footer } from "./components/index.js"
import { Admin, Channel, Home, Player, PrivacyPolicy, TermAndCondition } from './pages/index.js';

const App = () => {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {

    // login or not?

    /*
      ....................
      .then((userData) => {

          if(userData) dispatch(fun({userData}))
          else dispatch(logout())

        })
      .finally(() => setLoading(false)) 
    */

  }, [])


  return loading ? (

    <>
      <TermAndCondition />
    </>

  ) : (null)
}

export default App