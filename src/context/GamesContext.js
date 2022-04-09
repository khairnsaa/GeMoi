import axios from "axios"
import React, { createContext, useState } from "react"
import { useHistory } from "react-router"
import Cookies from "js-cookie"

export const GamesContext = createContext();

export const GameProvider = ({ children }) => {
    const history = useHistory();
    const [ gameList, setGameList ] = useState([])
    const [input, setInput] = useState({
        name: '',
        release: '',
        genre: '',
        platform: '',
        img: '',
    })
    const [checked, setChecked] = useState({
        singleplayer: 0,
        multiplayer: 0,
    });

    const [fetchStatus, setFetchStatus] = useState(true)
    const [currentId, setCurrentId] = useState(null)
    const [search, setSearch] = useState('')
    const [ inputFilterRelease, setInputFilterRelease ] = useState(0)
    const [ inputFilterGenre, setInputFilterGenre ] = useState('')
    const [ dataGame, setDataGame ] = useState(null)


    const totalPlayer = (single, multi) => {
        if (single === 1 && multi === 1 ) {
            return 'Singleplayer and MultiPlayer'
        } else if (single === 1 && multi === 0 ) {
            return 'Singleplayer Only'
        } else if (single === 0 && multi === 1 ) {
            return 'Multiplayer Only'
        } else {
            return '-'
        }
    }

    const fetchGameData = async () => {
        const result = await axios.get('https://backendexample.sanbersy.com/api/data-game')
        let data = result.data;
        console.log(data);
        setGameList(data.map(game => {
            return{
                id: game.id,
                name: game.name,
                release: game.release,
                genre: game.genre,
                platform: game.platform,
                img: game.image_url,
                player: totalPlayer(game.singlePlayer, game.multiplayer)
            }
        }))
    }

    
    const handleChecked = (event) => {
        setChecked({
          ...checked,
          [event.target.name]: event.target.checked,
        });
        console.log({
          ...checked,
          [event.target.name]: event.target.checked,
        });
    };

    const handleGameChange = (e) => {
        let value = e.target.value
        let name = e.target.name
        let player = ["singleplayer", "multiplayer"]

        if (player.indexOf(name) === -1) {
            setInput({ ...input, [name]: value })
        } else {
            setInput({ ...input, [name]: !input[name] })
        }

    }

    const addGame = () => {
        console.log(input)
        const token = Cookies.get('token')
        
        axios.post(`https://backendexample.sanbersy.com/api/data-game`, {
                name: input.name,
                release: input.release,
                genre: input.genre,
                platform: input.platform,
                image_url: input.img,
                singlePlayer: checked.singleplayer ? 1 : 0,
                multiplayer: checked.multiplayer ? 1 : 0,
            }, {headers: {"Authorization" : "Bearer "+ token}})
            .then((res) => {
               console.log(res);
               setFetchStatus(true)
            }).catch(err => alert(err.response.data.message))
        console.log(checked.multiplayer ? 1 : 0);

        setInput({
            name: '',
            release: '',
            genre: '',
            platform: '',
            img: '',
        }) 
        setChecked({
            singleplayer: 0,
            multiplayer: 0,
        }) 

        history.push('/')
    }

    const deleteGame = (idGame) => {
        const token = Cookies.get('token')
        console.log(idGame)
        axios.delete(`https://backendexample.sanbersy.com/api/data-game/${idGame}`, {headers: {"Authorization" : "Bearer "+ token}})
        .then(() => {
            setFetchStatus(true)
        })

    }

    const updateGame = () => {
        const token = Cookies.get('token')
        axios.put(`https://backendexample.sanbersy.com/api/data-game/${currentId}`, {
                name: input.name,
                release: input.release,
                genre: input.genre,
                platform: input.platform,
                img: input.image_url,
                singlePlayer: checked.singleplayer,
                multiplayer: checked.multiplayer
        }, {headers: {"Authorization" : "Bearer "+ token}})
        .then(() => {
            setFetchStatus(true);
            history.push('/manage-game')
        })
    }
    const editGame = (idGame) => {
        const token = Cookies.get('token')
        console.log(idGame)
        axios.get(`https://backendexample.sanbersy.com/api/data-game/${idGame}`, {headers: {"Authorization" : "Bearer "+ token}})
        .then((res) => {
            let data = res.data;
            setInput({
                name: data.name,
                release: data.release,
                genre: data.genre,
                platform: data.platform,
                img: data.image_url,
            })
            setChecked({
                singleplayer: data.singlePlayer,
                multiplayer: data.multiplayer
            })
            setCurrentId(data.id)
        })
    }

    const getGameDetail = (idGame) => {
        axios.get(`https://backendexample.sanbersy.com/api/data-game/${idGame}`)
        .then(res => {
            const data = res.data
            console.log(data);
            setDataGame(data)
            setCurrentId(data.id)
        })
    }

    const filterGameList = gameList.filter(game => {
        let returnThis;
        if(search !== '') {
            returnThis = game.name.toLowerCase().includes( search.toLowerCase())
            console.log(game)
        } else if (inputFilterRelease !== 0) {
            returnThis = game.release >= inputFilterRelease
        } else if (inputFilterGenre !== '') {
            returnThis = game.genre.toLowerCase().includes( inputFilterGenre.toLowerCase())
        } else {
            returnThis = game;
        }

        return returnThis;
    })


    return (
        <GamesContext.Provider value={{ 
            input,
            gameList, 
            setGameList, 
            fetchGameData, 
            handleGameChange, 
            addGame,
            checked, 
            setChecked,
            handleChecked,
            deleteGame,
            fetchStatus, 
            setFetchStatus,
            updateGame,
            editGame,
            currentId, 
            setCurrentId,
            setSearch,
            filterGameList,
            setInputFilterRelease,
            setInputFilterGenre,
            dataGame,
            getGameDetail,
            totalPlayer
        }}>
            {children}
        </GamesContext.Provider>
    )
}