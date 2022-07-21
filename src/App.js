import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { CircularProgress, Tooltip } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import {
  ThemeProvider,
  createTheme
} from '@mui/material/styles';
import './App.css';
import { BuscadorProvider, BuscadorConsumer, Result } from './context/buscador-context';

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
            color: "black",
            backgroundColor: "white",            
            fontFamily: 'Poppins',
            borderRadius: '5px',
            border: 'solid #0097DC 5px',            
        }
      }
    }
  }
});

export default () => <div className='center-b'>
  <BuscadorProvider>  
    <BuscadorConsumer/>
    <App/>
  </BuscadorProvider>
</div>

function App(props) {
  const info = Result();
  const [pokemon, setPokemon] = useState([]);   
  const [pokemonInfo, setPokemonInfo] = useState([]);   
  const [array, setArray] = useState([]);
  const [numberOne, setNumberOne] = useState(0);
  const [numberTwo, setNumberTwo] = useState(10); 
  const [shiny, setShiny] = useState(false);
  const [side, setSide] = useState(false);
  const message = useRef(null);

  useEffect(() => {    
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1126`).then(data => {      
      setPokemonInfo(data.data.results);                             
    });        
  }, []);

  useEffect(() => {
    if(pokemonInfo.length > 0){
      pokemonInfo.slice(numberOne, numberTwo).filter((elemento) => {
        if(elemento.name.toString().toLowerCase().includes(info.search)){
          setArray([]);
          const url = elemento.url.split('/');
          axios.get(`https://pokeapi.co/api/v2/pokemon/${url[6]}`).then(data => {
            setArray((current) => [...current, {data: data.data}]);            
          });
        }
      });    
    }
  }, [info]);

  useEffect(() => {
    pokeChange();
  }, [pokemonInfo]);

  const pokeChange = () => {
    if(pokemonInfo.length === 1126){
      var position = pokemonInfo.slice(numberOne, numberTwo);
      position.map(m => {
        const url = m.url.split('/');
        axios.get(`https://pokeapi.co/api/v2/pokemon/${url[6]}`).then(poke => {   
          setArray((current) => [...current, {data: poke.data}]);          
        }).catch(function (e) {
          console.log(e.message);
        });
      });
    }
  }

  useEffect(() => {
    if(array.length === 10){
      setPokemon(array);
    }    
  }, [array]);

  useEffect(() => {    
    if(numberOne > 1115){
      setNumberOne(0);
      setNumberTwo(10);
    }
    if(numberOne < 0){
      setNumberOne(1115);
      setNumberTwo(1125);
    }
  }, [numberOne]);

  useEffect(() => {   
    setArray([]);     
    pokemonInfo.slice(numberOne, numberTwo).map(info => {
      const url = info.url.split('/');      
      axios.get(`https://pokeapi.co/api/v2/pokemon/${url[6]}`).then(poke => {      
        setArray((current) => [...current, {data: poke.data}]);       
      }).catch(function (e) {
        console.log(e.message);
      });
      setPokemon(array);     
    });            
  }, [numberOne]);

  const handleChange = () => {
    window.alert(message.current.className);
  }


  return(
    <div>
        {
          array.length > 0 && (
            <div className='container-one center-a'>
              <div>
                <div className='center-a-poke'>
                  <TransitionGroup component="ul">
                    {
                      array.slice(0, 10).map((info, index) => (
                        <ThemeProvider key={index} theme={theme}>
                          <Tooltip title={info.data.name} placement="top">
                            <img onClick={(e) => {window.location.href = `/pokemons/${info.data.id}`}} className='img-pokemon' src={side === true ? info.data.sprites.back_default ? shiny === true ? info.data.sprites.back_shiny : info.data.sprites.back_default : 'https://i.pinimg.com/originals/ef/72/4f/ef724f2c2cf02a434b8464f17fe40ca1.gif' : info.data.sprites.front_default ? shiny === true ? info.data.sprites.front_shiny : info.data.sprites.front_default : 'https://i.pinimg.com/originals/ef/72/4f/ef724f2c2cf02a434b8464f17fe40ca1.gif'} alt="Not found" width={100} height={100}></img>                            
                          </Tooltip>
                        </ThemeProvider>
                      ))
                    }
                  </TransitionGroup>
                </div>
                <div className='center-a'>
                  <button className='btn-left' onClick={(e) => { setNumberOne(numberOne - 10); setNumberTwo(numberTwo - 10); }}></button>
                  <button className='btn-right' onClick={(e) => { setNumberOne(numberOne + 10); setNumberTwo(numberTwo + 10); }}></button>
                </div>
                <div className='center-a'>
                  <button className='golden' onClick={(e) => { setShiny(!shiny) }}></button>
                  <button className='change' onClick={(e) => { setSide(!side) }}></button>
                </div>
                <div className='center-a'>
                  <button className='btn-info' ref={message} onClick={handleChange}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-info-square" viewBox="0 0 16 16">
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>      
          )
        }             
    </div>    
  )
}