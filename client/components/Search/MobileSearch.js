import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { searchButton } from '../../img/'
import { searchShows, setSearch, reset } from '../../features/show/searchSlice'
import { setSearchDisplay } from '../../features/show/searchDisplaySlice'

const MobileSearch = ({ setOpenSearch }) => {
    const { isError, message, search } = useSelector((state) => state.search)
    const active = search.type

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

    }, [isError, message, dispatch])

    const onChange = (e) => {
        dispatch(setSearch({term: e.target.value}))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
    
        if (search.term === '') {
            return navigate('/')
        }

        setOpenSearch(false)
        dispatch(setSearchDisplay(search.term))
        dispatch(reset())
        dispatch(searchShows(search))
        
        navigate('/search')
    }

    const onTypeSelect = (e) => {
        dispatch(setSearch({type: e.target.name}))
    }

    return (
        <div className='search--mobile'>
            <form onSubmit={onSubmit}>
                <input 
                    type='text'
                    value={search.term}
                    placeholder='What are you watching today?'
                    onChange={onChange}
                > 
                </input>
                <button type='submit' className='btn--mobile-search'>
                    <img src={searchButton} />
                </button>
            </form>
            <div className='search--mobile__options'>
                <button 
                    name='movie'
                    onClick={onTypeSelect}
                    className={active === 'movie' ? 'btn btn--active btn--medium' : 'btn btn--medium'}
                >
                    Movies
                </button>
                <button 
                    name='tv' 
                    onClick={onTypeSelect}
                    className={active === 'tv' ? 'btn btn--active btn--medium' : 'btn btn--medium'}
                >
                    TV
                </button>
                <button 
                    name='multi' 
                    onClick={onTypeSelect}
                    className={active === 'multi' ? 'btn btn--active btn--medium' : 'btn btn--medium'}
                >
                    All
                </button>
            </div>
        </div>
    )
}

export default MobileSearch