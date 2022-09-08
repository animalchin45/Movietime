import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { hot } from 'react-hot-loader/root'

import Layout from './Layout'
import ScrollToTop from './ScrollToTop'
import Home from './Home'
import SearchResults from './SearchResults'
import ShowDetails from './ShowDetails/ShowDetails'
import PeopleDetails from './People/PeopleDetails'
import UserSignIn from './User/UserSignIn'
import UserRegister from './User/UserRegister'
import Dashboard from './Dashboard/Dashboard'
import PageNotFound from './PageNotFound'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Layout>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search' element={<SearchResults />} />
              <Route path='/details' element={<ShowDetails />} />
              <Route path='/people' element={<PeopleDetails />} />
              <Route path='/login' element={<UserSignIn />} />
              <Route path='/register' element={<UserRegister />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Layout>
        </ScrollToTop>
      </BrowserRouter>

      <ToastContainer pauseOnFocusLoss={false} autoClose={1500} />
    </>
  )
}

export default hot(App)
