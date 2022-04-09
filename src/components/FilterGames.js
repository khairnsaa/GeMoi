import { useContext, useState } from 'react';

import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { GamesContext } from '../context/GamesContext';

const FilterMovie = () => {
    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
      
      setInputFilterGenre('')
      setInputFilterRelease(0)
    };
    const { setInputFilterRelease, setInputFilterGenre } = useContext(GamesContext)

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
                name='genre'
                label='Genre'
                variant="standard"
                className='filter-input'
                onChange={(e) => setInputFilterGenre(e.target.value)} 
            />
            <TextField
                required
                id="rating"
                name='release'
                label='Release'
                variant="standard"
                className='filter-input'
                onChange={(e) => setInputFilterRelease(e.target.value)} 
            />
            <Button onClick={() => setAnchorEl(null)}><CloseIcon fontSize='small' style={{ color: '#1c1c1c'}} /></Button>
          </Menu>
        </div>
     );
}
 
export default FilterMovie;