import MovieList from "../components/MovieList";
import Search from "../components/Search";
import { useContext} from "react";
import { MovieContext } from "../context/MovieContext";

const Movies = () => {

    const { setSearch } = useContext(MovieContext)

    return ( 
        <div className="movie-container">
            <h1>Movies Dictionary</h1>
            <Search search={setSearch} />
            <MovieList />
        </div>
     );
}
 
export default Movies;