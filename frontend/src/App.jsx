import { Outlet } from 'react-router-dom';
import { Footer, Header } from './components/index.js';

const App = () => {
  
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