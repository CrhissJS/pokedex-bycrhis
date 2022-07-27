import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PokemonItem = ({ pokemonUrl }) => {

    const [pokemon, setPokemon] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(pokemonUrl)
            .then(res => setPokemon(res.data));
    }, [])


    return (
        <div onClick={() => navigate(`/pokedex/${pokemon.id}`)} className="container">
            <div className="flip-card">
                <div className="inner">

                    <div className="front">
                        <div className="card" style={{ background: "white", margin: "10px", padding: "10px", display: 'flex', alignItems: "center", flexDirection: "column" }}>
                            <h3>{pokemon.name}</h3>
                            <img src={pokemon.sprites?.back_default} alt="" />
                        </div>
                    </div>

                    <div className="back">
                        <ul>
                        {
                            pokemon.stats?.map(stat => (
                                <div style={{color: 'white', textShadow: 'none'}} key={stat.stat.url}>{stat.stat.name}: {stat.base_stat}</div>
                            ))
                        }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonItem;