import React from 'react'
import {useRoutes} from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import {BrowserRouter} from 'react-router-dom'
import { Navbar } from './components/Navbar'
import './App.css';
import Footer from './components/Footer';
import { Loader } from './components/Loader'


const App = () => {
  const {token, login, logout, userId, ready, adminT} = useAuth()
  
  const isAuth = !!token
  const isAdmin = adminT
  const routes = useRoutes(isAuth, adminT)

  console.log(`Auth: ${adminT}`)

  if(!ready) {
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{token, login, logout, userId, isAuth, isAdmin}}>
      <BrowserRouter>
        {isAuth && <Navbar />}
        <div>
          {routes}
        </div>
        {isAuth && <Footer/>}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
