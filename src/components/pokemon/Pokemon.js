import { LinearProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

function Pokemon(){    
    const { t, i18n } = useTranslation(['translate']);
    const location = window.location.pathname.split('/');
    const [pokemonInfo, setPokemonInfo] = useState([]);
    
    useEffect(() => {            
        axios.get(`https://pokeapi.co/api/v2/pokemon/${location[2]}`).then(data => {
            setPokemonInfo(data.data);         
            console.log(data.data);   
        });        
    }, []);    

    return(
        <div>
            <div className="pokemons">
                <img className="foto-perfil" src={pokemonInfo.sprites && pokemonInfo.sprites.front_default} width={130} height={130} />
                <div className="center-a" style={{margin: '15px'}}>                    
                    <LinearProgress style={{width: '50%', marginLeft: '15px'}} variant="determinate" value={pokemonInfo && pokemonInfo.base_experience}/>
                </div>
                <h1>{pokemonInfo && pokemonInfo.name}</h1>
                {
                    pokemonInfo.types && (
                        <div style={{color: 'white', height: '150px', overflowY: 'auto'}} className={pokemonInfo.types[0].type.name === "steel" ? "steel" : pokemonInfo.types[0].type.name === "water" ? "water" : pokemonInfo.types[0].type.name === "bug" ? "bug" : pokemonInfo.types[0].type.name === "dragon" ? "dragon" : pokemonInfo.types[0].type.name === "electric" ? "electric" : pokemonInfo.types[0].type.name === "ghost" ? "ghost" : pokemonInfo.types[0].type.name === "fire" ? "fire" : pokemonInfo.types[0].type.name === "fairy" ? "fairy" : pokemonInfo.types[0].type.name === "ice" ? "ice" : pokemonInfo.types[0].type.name === "fighting" ? "fighting" : pokemonInfo.types[0].type.name === "regular" ? "regular" : pokemonInfo.types[0].type.name === "plant" ? "plant" : pokemonInfo.types[0].type.name === "psychic" ? "psychic" : pokemonInfo.types[0].type.name === "rock" ? "rock" : pokemonInfo.types[0].type.name === "sinister" ? "sinister" : pokemonInfo.types[0].type.name === "ground" ? "ground" : pokemonInfo.types[0].type.name === "poison" ? "poison" : pokemonInfo.types[0].type.name === "flying" ? "flying" : ""}>
                            <h4 style={{margin: '0px', padding: '15px 0px 15px 0px'}}>{t("movimientos")}:</h4>
                            <div style={{padding: '0px 15px 15px 15px'}}>
                                {pokemonInfo.moves && pokemonInfo.moves.map((p, i) => (
                                    <li key={i}>{p.move.name}</li>
                                ))}
                            </div>
                        </div>
                    )
                }
                <div className="abilities">
                    <h4 style={{margin: '0px', padding: '15px 0px 15px 0px'}}>{t("habilidades")}:</h4>
                    <div style={{padding: '0px 15px 15px 15px'}}>
                        {pokemonInfo.abilities && pokemonInfo.abilities.map((p, i) => (
                            <li key={i}>{p.ability.name}</li>
                        ))}
                    </div>
                </div>
            </div>
        </div>      
    )
}

export default Pokemon;