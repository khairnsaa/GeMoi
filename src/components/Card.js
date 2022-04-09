import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useHistory } from 'react-router';

export default function ActionAreaCard( {id,title, genre, duration, rating, img, desc} ) {

    const history = useHistory();

    const goToDetail = (idMovie) => {
        history.push(`/movies/${idMovie}`)
        console.log(idMovie);
    }
    return (
        <Card className="card-component" sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={() => goToDetail(id)}>
            <CardMedia
            component="img"
            height="140"
            image={img}
            alt= {title}
            />
            <CardContent>
            <div className='card-row-1'>
                <Typography gutterBottom variant="h6" className="title" component="div" style={{ marginRight: '0.5rem'}}>
                {title}
                </Typography>
                <Typography variant="h6" className="rating" component="div">
                <StarIcon fontSize='small' style={{ marginRight: '0.3rem'}} />
                {rating}
                </Typography>
            </div>
            <Typography variant="h6" gutterBottom style={{ fontSize: '0.9rem'}} component="div">
                {genre}
            </Typography>
            <Typography className='movie-description' variant="body2" color="text.secondary">
                {desc}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    );
}
