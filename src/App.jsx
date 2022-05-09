import { Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import Albums from './pages/Albums/Albums'
import Posts from './pages/Posts/Posts'
import User from './pages/User/User'

function App () {
  return (
    <div className='App'>
      <header>
        <h1>App 🐱‍👤</h1>
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
                to='/albums'
              >Albums
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route exact path='/user/:id/' element={<User />} />
        <Route exact path='/albums' element={<Albums />} />
        <Route exact path='/' element={<Posts />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
