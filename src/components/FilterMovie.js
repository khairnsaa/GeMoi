import { useContext, useState } from 'react';

import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { MovieContext } from '../context/MovieContext';

const FilterMovie = () => {

    const { 
        setInputFilterRating, 
        setInputFilterDuration, 
        setInputFilterYear ,
        inputFilterYear,
        inputFilterRating,
        inputFilterDuration
    } = useContext(MovieContext)
    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        
        setInputFilterYear(0)
        setInputFilterDuration(0)
        setInputFilterRating(0)
    }

    return ( 
        <div>
          <Button
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <FilterListIcon fontSize='medium' style={{ color:'#1c1c1c'}} />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            class='filter-pop'
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <TextField
                required
                id="rating"
                name='rating'
                type="number"
                label='Rating'
                variant="standard"
                className='filter-input'
                value={inputFilterRating}
                onChange={(e) => setInputFilterRating(e.target.value)} 
            />
            <TextField
                required
                id="rating"
                name='year'
                type="number"
                label='Release Year'
                variant="standard"
                className='filter-input'
                value={inputFilterYear}
                onChange={(e) => setInputFilterYear(e.target.value)} 
            />
            <TextField
                required
                id="rating"
                name='duration'
                type="number"
                label='duration'
                variant="standard"
                className='filter-input'
                value={inputFilterDuration}
                onChange={(e) => setInputFilterDuration(e.target.value)} 
            />
            <Button onClick={() => setAnchorEl(null)}><CloseIcon fontSize='small' style={{ color: '#1c1c1c'}} /></Button>
          </Menu>
        </div>
     );
}
 
export default FilterMovie;