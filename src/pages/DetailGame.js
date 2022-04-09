import { useContext, useEffect } from "react";
import { useParams } from "react-router"

import { GamesContext } from "../context/GamesContext";

const DetailGame = () => {
    let { Id } = useParams()
    const { getGameDetail, dataGame, totalPlayer } = useContext(GamesContext)

    useEffect(() => {
        if(Id !== undefined) {
            getGameDetail(Id)
        }
    },[])

    return ( 
        <div className="detail-movie-container">
            {console.log(dataGame)}
            {dataGame === null ? 
                <h1>Couldnt' Get Game Data</h1> :
                <>
                    <div className='image-content'>
                        <img src={dataGame.image_url} width='500' alt={dataGame.name} />
                    </div>
                    <div className="movie-content">
                        <h1>{dataGame.name}</h1>
                        <p><span>Genre: </span>{dataGame.genre}</p>
                        <p><span>Release Year: </span>{dataGame.release}</p>
                        <p><span>Platform: </span> {dataGame.platform}</p>
                        <p><span>Player: </span>{totalPlayer(dataGame.singlePlayer, dataGame.multiplayer)}</p>
                    </div>
                </>
            }
        </div>
     );
}
 
export default DetailGame;