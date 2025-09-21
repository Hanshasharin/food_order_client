// import React from 'react'
// import Header from '../components/Header'
// import { Outlet } from 'react-router-dom'
// import Footer from '../components/Footer'

// const UserLayout = () => {
//   return (
//     <div>
//         <Header/>
//         <Outlet/>
//         <Footer/>
//     </div>
//   )
// }

// export default UserLayout

import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;
