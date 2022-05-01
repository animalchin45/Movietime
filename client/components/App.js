import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { hot } from 'react-hot-loader/root'

import Layout from './Layout'
import ScrollToTop from './ScrollToTop'
import Home from './Home'
import SearchResults from './SearchResults'
import ShowDetails from './ShowDetails/ShowDetails'

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
                        </Routes>
                    </Layout>
                </ScrollToTop>
            </BrowserRouter>
            <ToastContainer />
        </>
    )
}

export default hot(App)