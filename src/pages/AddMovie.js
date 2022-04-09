import { useContext } from 'react';
import { useParams } from "react-router"
import { useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { MovieContext } from '../context/MovieContext';

const AddMovie = () => {
    let { Id } = useParams()
    const { input, handleMovieChange, addMovie, editMovie, updateMovie, currentId } = useContext(MovieContext);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(currentId === null) {
            addMovie()
        } else {
            updateMovie(currentId)
        }
    }

    useEffect(() => {
        if(Id !== undefined) {
            editMovie(Id)
        }
    })



    return (
        <div className='add-game-container'>
            <h1>Movie Form</h1>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} style={{ backgroundColor: 'white' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="title"
                            name="title"
                            label="Movie Title"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            onChange={handleMovieChange}
                            value={input.title}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="genre"
                            name="genre"
                            label="Genre"
                            fullWidth
                            autoComplete="genre"
                            variant="standard"
                            onChange={handleMovieChange}
                            value={input.genre}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="year"
                            label="Release Year"
                            type="number"
                            InputProps={{ inputProps: { min: 2000, max: 2021 } }}
                            min={2000}
                            max={2021}
                            style={{ backgroundColor: 'white'}}
                            variant="standard"
                            fullWidth
                            onChange={handleMovieChange}
                            value={input.year}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="rating"
                            label="Rating"
                            type="number"
                            InputProps={{ inputProps: { min: 0, max: 10 } }}
                            min={0}
                            max={10}
                            style={{ backgroundColor: 'white'}}
                            variant="standard"
                            fullWidth
                            onChange={handleMovieChange}
                            value={input.rating}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="duration"
                            label="Duration (in Minutes)"
                            type="number"
                            style={{ backgroundColor: 'white'}}
                            variant="standard"
                            fullWidth
                            onChange={handleMovieChange}
                            value={input.duration}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="img"
                            name="img"
                            label="Image Url"
                            fullWidth
                            autoComplete="img"
                            variant="standard"
                            onChange={handleMovieChange}
                            value={input.img}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="review"
                            name="review"
                            label="Review"
                            fullWidth
                            autoComplete="review"
                            variant="standard"
                            onChange={handleMovieChange}
                            value={input.review}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize
                            required
                            id="description"
                            name="description"
                            label="Description"
                            placeholder="Write The Description here"
                            autoComplete="description"
                            fullWidth
                            style={{ width: '100%', padding: '1rem' }}
                            variant="standard"
                            onChange={handleMovieChange}
                            value={input.description}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 4, mb: 1 }}
                >
                    Add Movie
                </Button>
            </Box>
        </div>
     );
}
 
export default AddMovie;