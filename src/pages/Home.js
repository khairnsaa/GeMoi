import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import CardGames from '../components/CardGames'
import { GamesContext } from '../context/GamesContext'
import { MovieContext } from '../context/MovieContext'

const Home = () => {

    const { movieList, fetchData } = useContext(MovieContext)
    const { gameList, fetchGameData } = useContext(GamesContext)

    useEffect(() => {
        fetchData();
        fetchGameData();
    }, [])
    return ( 
        <div className='container-home'>
            
            <div className="trending-movies">
                <div className="title-see-all">
                    <h1 className="title-home">Trending Movies</h1>
                    <Link className='see-all' to='/movies'>See All</Link>
                </div>
                <div className="movie-list">
                    {movieList.slice(0,3).map(movie => (
                        <Card id={movie.id} title={movie.title} genre={movie.genre} duration={movie.duration} rating={movie.rating} img={movie.img} desc={movie.description} />
                    ))}
                </div>
            </div>
            <div className="trending-games">
                <div className="title-see-all">
                    <h1 className="title-home">Trending Games</h1>
                    <Link className='see-all' to='/games'>See All</Link>
                </div>
                <div className="movie-list">
                    {gameList.slice(0,4).map(game => (
                        <CardGames id={game.id} name={game.name} genre={game.genre} release={game.release} img={game.img} platform={game.platform} />
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default Home;