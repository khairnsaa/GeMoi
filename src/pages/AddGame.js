import { useContext } from 'react';
import { GamesContext } from '../context/GamesContext';
import { useParams } from "react-router"
import { useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

const AddGame = () => {
    let { Id } = useParams()
    const { 
        input, 
        handleGameChange, 
        addGame, 
        handleChecked, 
        checked, 
        editGame, 
        updateGame,
        currentId,
    } = useContext(GamesContext);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(currentId === null) {
            addGame()
        } else {
            updateGame(currentId)
        }
    }

    useEffect(() => {
        if(Id !== undefined) {
            editGame(Id)
        }
    }, [])



    return (
        <div className='add-game-container'>
            <h1>Game Form</h1>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} style={{ backgroundColor: 'white' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Game name"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            onChange={handleGameChange}
                            value={input.name}
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
                            onChange={handleGameChange}
                            value={input.genre}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="release"
                            label="Release Year"
                            type="number"
                            InputProps={{ inputProps: { min: 2000, max: 2021 } }}
                            min={2000}
                            max={2021}
                            style={{ backgroundColor: 'white'}}
                            placeholder= 'Release Year'
                            variant="standard"
                            fullWidth
                            onChange={handleGameChange}
                            value={input.release}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="platform"
                            name="platform"
                            label="Game Platform"
                            fullWidth
                            autoComplete="platform"
                            variant="standard"
                            onChange={handleGameChange}
                            value={input.platform}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel component="legend">Game Player</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                <Checkbox checked={checked.singleplayer} onChange={handleChecked}  name="singleplayer" />
                                }
                                label="Singleplayer"
                                style={{ color: 'black' }}
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={checked.multiplayer} onChange={handleChecked} name="multiplayer" />
                                }
                                label="Multiplayer"
                                style={{ color: 'black' }}
                            />
                        </FormGroup>
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
                            onChange={handleGameChange}
                            value={input.img}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 4, mb: 1 }}
                >
                    Add Game
                </Button>
            </Box>
        </div>
     );
}
 
export default AddGame;