import { TextField } from "@mui/material";

const Search = ( { search }) => {
    const handleChange = (e) => {
        search(e)
        console.log(search);
    }
    return ( 
        <div className='search-content'>
            <TextField 
                id="standard-basic"  
                name="search" 
                placeholder='search here..'
                label="search" 
                variant="outlined" 
                className='search-box'
                onChange={(e) => handleChange(e.target.value)} 
                style={{ backgroundColor: '#fafafa', borderRadius: '0.3rem'}}
            />
        </div>
     );
}
 
export default Search;
