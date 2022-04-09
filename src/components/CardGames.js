import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useHistory } from 'react-router';


const CardGames = ( {id, name, genre, release, img, platform} ) => {

    const history = useHistory();

    const goToDetail = (idGame) => {
        history.push(`/games/${idGame}`)
    }

    return ( 
        <Card className="card-component" sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => goToDetail(id)}>
                <CardMedia
                component="img"
                height="140"
                image={img}
                alt={name}
                />
                <CardContent>
                <div className='card-row-1'>
                    <Typography gutterBottom variant="h6" className="title" component="div" style={{ marginRight: '1rem'}}>
                    {name}
                    </Typography>
                    <Typography variant="h6" style={{ fontSize: '0.9rem'}} component="div">
                        {release}
                    </Typography>
                </div>
                <Typography variant="h6" gutterBottom style={{ fontSize: '0.8rem'}} component="div">
                    {genre}
                </Typography>
                <Typography className='movie-description' variant="body2" color="text.secondary">
                    {platform}
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
 
export default CardGames;

