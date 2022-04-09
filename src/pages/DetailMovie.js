import { useContext, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import { useParams } from "react-router"

import StarIcon from '@mui/icons-material/Star';

const DetailMovie = () => {
    let { Id } = useParams()
    const { getMovieDetail, dataMovie } = useContext(MovieContext)

    useEffect(() => {
        if(Id !== undefined) {
            getMovieDetail(Id)
        }
    },[])

    return ( 
        <div className="detail-movie-container">
            {console.log(dataMovie)}
            {dataMovie === null ? 
                <h1>Couln't Get the Data</h1> :
                <>
                    <div className='image-content'>
                        <img src={dataMovie.image_url} width='320' alt="" />
                    </div>
                    <div className="movie-content">
                        <h1>{dataMovie.title}</h1>
                        <p><span>Genre: </span>{dataMovie.genre}</p>
                        <p><span>Release Year: </span>{dataMovie.year}</p>
                        <p style={{display: 'flex', alignItems: 'center'}}><span>Rating</span> <StarIcon fontSize='medium' />{dataMovie.rating}</p>
                        <p><span>Duration: </span>{dataMovie.duration} menit</p>
                        <span>Description: </span>
                        <p>{dataMovie.description}</p>
                        <div className='review'>
                            <span>Review:</span>
                            <p>{dataMovie.review}</p>
                        </div>
                    </div>
                </>
            }
            
        </div>
     );
}
 
export default DetailMovie;