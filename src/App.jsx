import { Routes, Route } from 'react-router-dom'
import './App.css'
import User from './pages/User/User'

function App () {
  return (
    <div className='App'>
      <Routes>
        {/* <Route exact path='/' element={<Home />} /> */}
        <Route exact path='/User/:id/' element={<User />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
