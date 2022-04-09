import { useContext } from "react";
import GameList from "../components/GameList";
import Search from "../components/Search";
import { GamesContext } from "../context/GamesContext";

const Games = () => {

    const { setSearch } = useContext(GamesContext)

    return (
        <div className="movie-container">
            <h1>Games Dictionary</h1>
                <Search search={setSearch} />
            <GameList />
        </div>
     );
}
 
export default Games;