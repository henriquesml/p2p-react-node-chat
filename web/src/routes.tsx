import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import { Join, Chat } from './pages'

const Routes = () => {
  return(
    <BrowserRouter>
      <Route path='/' exact component={Join}/>
      <Route path="/chat" component={Chat} />
    </BrowserRouter>
  )
}

export default Routes
