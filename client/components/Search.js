import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { searchShows, setSearch, reset } from '../features/show/searchSlice'
import { setSearchDisplay } from '../features/show/searchDisplaySlice'

const Search = () => {
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

        dispatch(setSearchDisplay(search.term))
        dispatch(reset())
        dispatch(searchShows(search))
        
        navigate('/search')
    }

    const onTypeSelect = (e) => {
        dispatch(setSearch({type: e.target.name}))
    }

    return (
        <div className='search'>
            <form onSubmit={onSubmit}>
                <input 
                    type='text'
                    value={search.term}
                    placeholder='What are you watching today?'
                    onChange={onChange}
                />
                <button type='submit' className='btn'>Search</button>
            </form>
            <div className='search__options'>
                <button 
                    name='movie'
                    onClick={onTypeSelect}
                    className={active === 'movie' ? 'btn btn--active btn--search-options' : 'btn btn--search-options'}
                >
                    Movies
                </button>
                <button 
                    name='tv' 
                    onClick={onTypeSelect}
                    className={active === 'tv' ? 'btn btn--active btn--search-options' : 'btn btn--search-options'}
                >
                    TV
                </button>
                <button 
                    name='multi' 
                    onClick={onTypeSelect}
                    className={active === 'multi' ? 'btn btn--active btn--search-options' : 'btn btn--search-options'}
                >
                    All
                </button>
            </div>
        </div>
    )
}

export default Search