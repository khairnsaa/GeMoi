import axios from "axios"
import React, { createContext, useState } from "react"
import { useHistory } from "react-router"
import Cookies from "js-cookie"

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const history = useHistory();
    const [ movieList, setMovieList ] = useState([])
    const [input, setInput] = useState({
        title: '',
        year: 0,
        genre: '',
        rating: 0,
        img: '',
        duration: 0,
        review: '',
        description: ''
    })

    const [fetchStatus, setFetchStatus] = useState(true)
    const [currentId, setCurrentId] = useState(null)
    const [search, setSearch] = useState('')
    const [filterMovie, setFilterMovie] = useState('')
    const [ inputFilterRating, setInputFilterRating ] = useState(0)
    const [ inputFilterDuration, setInputFilterDuration ] = useState(0)
    const [ inputFilterYear, setInputFilterYear ] = useState(0)
    const [ dataMovie, setDataMovie ] = useState(null)
  
    const fetchData = async () => {
        const result = await axios.get('https://backendexample.sanbersy.com/api/data-movie')
        let data = result.data;
        // console.log(data);
        setMovieList(data.map(movie => {
            return{
                id: movie.id,
                title: movie.title,
                rating: movie.rating,
                year: movie.year,
                review: movie.review,
                genre: movie.genre,
                duration: movie.duration,
                img: movie.image_url,
                description: movie.description
            }
        }))
    }

    const handleMovieChange = (e) => {
        let value = e.target.value
        let name = e.target.name

        setInput({ ...input, [name]: value })
    }

    const addMovie = () => {
        const token = Cookies.get('token')
        axios.post(`https://backendexample.sanbersy.com/api/data-movie`, {
            title: input.title,
            rating: input.rating,
            year: input.year,
            review: input.review,
            genre: input.genre,
            duration: input.duration,
            image_url: input.img,
            description: input.description
        }, {headers: {"Authorization" : "Bearer "+ token}})
        .then(res => {
            console.log(res);
            setFetchStatus(true);
        })

        history.push('/')
    }

    const deleteMovie = (idMovie) => {
        const token = Cookies.get('token')
        axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${idMovie}`, {headers: {"Authorization" : "Bearer "+ token}})
        .then(() => setFetchStatus(true));
    }

    const editMovie = (idMovie) => {
        const token = Cookies.get('token')
        axios.get(`https://backendexample.sanbersy.com/api/data-movie/${idMovie}`, {headers: {"Authorization" : "Bearer "+ token}})
        .then(res => {
            const data = res.data
            console.log(data)
            setInput({
                title: data.title,
                rating: data.rating,
                year: data.year,
                review: data.review,
                genre: data.genre,
                duration: data.duration,
                img: data.image_url,
                description: data.description
            })

            setCurrentId(data.id)
        })
    }

    const getMovieDetail = (idMovie) => {
        axios.get(`https://backendexample.sanbersy.com/api/data-movie/${idMovie}`)
        .then(res => {
            const data = res.data
            console.log(data);
            setDataMovie(data)
            setCurrentId(data.id)
        })
    }

    const updateMovie = () => {
        const token = Cookies.get('token')
        axios.put(`https://backendexample.sanbersy.com/api/data-movie/${currentId}`,{
            title: input.title,
            rating: input.rating,
            year: input.year,
            review: input.review,
            genre: input.genre,
            duration: input.duration,
            image_url: input.img,
            description: input.description
        }, {headers: {"Authorization" : "Bearer "+ token}})
        .then(() => {
            setFetchStatus(true)
            history.push('/manage-movies')
        }).catch(() => alert('wait a second! server is busy'))
    }

    const filterMovieList = movieList.filter(movie => {
        let returnThis;
        if(search !== '') {
            returnThis = movie.title.toLowerCase().includes( search.toLowerCase())
        } else if (inputFilterRating !== 0 ) {
            returnThis = movie.rating >= inputFilterRating;
        } else if (inputFilterYear !== 0) {
            returnThis = movie.year >= inputFilterYear
        } else if (inputFilterRating === 0) {
            returnThis = movie.duration >= inputFilterDuration
        } else {
            returnThis = movie
        }

        return returnThis;
    })

    

    return (
        <MovieContext.Provider value={{
                movieList, 
                setMovieList, 
                fetchData,
                fetchStatus,
                setFetchStatus,
                currentId, 
                setCurrentId,
                handleMovieChange,
                input,
                addMovie,
                deleteMovie,
                editMovie,
                updateMovie,
                filterMovieList,
                filterMovie, 
                setFilterMovie,
                search,
                setSearch,
                setInputFilterRating,
                setInputFilterDuration,
                setInputFilterYear,
                getMovieDetail,
                dataMovie,
                inputFilterRating,
                inputFilterDuration,
                inputFilterYear,
            }}>
            {children}
        </MovieContext.Provider>
    )
}