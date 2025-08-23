import { Outlet } from 'react-router-dom';
import { Footer, Header } from './components/index.js';
import { useState } from 'react';

const App = () => {
  const [reloadKey, setReloadKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleReload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setReloadKey(prev => prev + 1);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onReload={handleReload} isLoading={isLoading} />
      <main className="flex-1">
        <div key={reloadKey}>
          <Outlet />
        </div>
      </main>
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