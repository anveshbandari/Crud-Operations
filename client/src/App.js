import React from 'react';
import {BrowserRouter, Routes , Route} from 'react-router-dom'

import Login from './components/loginPage/index';
import Register from './components/RegisterPage/index';
import Update from './components/updatePage/index';
import Home from './components/HomePage/index';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element= {<Login />} />
      <Route path='/Home' element= {<Home />} />
      <Route path='/Register' element= {<Register />} />
      <Route path='/Update/:id' element= {<Update />} />
    </Routes>
  </BrowserRouter>
)

export default App 