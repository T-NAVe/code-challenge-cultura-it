import { Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import Albums from './pages/Albums/Albums'
import NotFound from './pages/NotFound/NotFound'
import Posts from './pages/Posts/Posts'
import User from './pages/User/User'

function App () {
  return (
    <div className='App'>
      <header>
        <NavLink
          className={({ isActive }) => {
            return isActive ? 'nav-active' : undefined
          }} to='/'
        >
          <h1>App 🐱‍👤</h1>
        </NavLink>
        <nav>
          <ul>
            <li>
              <NavLink
                // I may want to use active default class for something else, so i'm replacing it with custon nav-active class
                // this only works this way with NavLink (react router v6)
                className={({ isActive }) => {
                  return isActive ? 'nav-active' : undefined
                }} to='/'
              >Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? 'nav-active' : undefined
                }}
                to='/allAlbums'
              >Albums
              </NavLink>
            </li>

          </ul>
        </nav>
      </header>
      <Routes>
        <Route exact path='/user/:id/' element={<User />} />
        <Route exact path='/allAlbums' element={<Albums />} />
        <Route exact path='/' element={<Posts />} />
        <Route exact path='/posts/:id/' element={<Posts />} />
        <Route exact path='/albums/:id/' element={<Albums />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
