import axios from 'axios';
import { useState, useEffect } from 'react';
import Logout from './Logout';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PokemonInfo = () => {

    const [pokemon, setPokemon] = useState({});

    const { id } = useParams();

    const navigate = useNavigate();

    const pokemonName = pokemon.name?.slice(1)

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(res => setPokemon(res.data))
            .catch(error => alert("We didn't find that Pokemon"))
    }, [])

    console.log(pokemon)

    document.body.style = `
    background: black;
    background-image: url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cad4b52e-f6b1-432f-9035-a5f4853bcf15/d84o6a9-28125268-b60b-4752-a665-acf6b32fbe37.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NhZDRiNTJlLWY2YjEtNDMyZi05MDM1LWE1ZjQ4NTNiY2YxNVwvZDg0bzZhOS0yODEyNTI2OC1iNjBiLTQ3NTItYTY2NS1hY2Y2YjMyZmJlMzcuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.E8Cz0zggZe_qb5KHtrjPAJJTDCl3YQ7K7GUvLtOBrbg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 50px;

    `

    return (
        <div >
            <header style={{ display: "flex", justifyContent: "space-between" }}>
                <div onClick={() => navigate("/pokedex/")}>
                    <img style={{ width: "250px" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2000px-International_Pok%C3%A9mon_logo.svg.png" alt="" />
                </div>
                <Logout />
            </header>

            <div style={{ display: "grid", gridTemplateColumns: "6fr 1fr" }}>
                <div style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
                    <div>
                        <div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <img style={{ width: "300px", position: "absolute", zIndex: "-1", right: "20%" }} src="https://freepngimg.com/thumb/pokemon/37548-4-pokeball-clipart.png" alt="" />
                                <img style={{ width: "400px" }} src={pokemon.sprites?.other.dream_world.front_default} alt="" />
                                <h1 style={{ color: "white", textShadow: "5px 5px 10px black" }}>{pokemon.name?.charAt(0).toUpperCase() + pokemonName}</h1>
                            </div>
                            <div className='info-pokemon' style={{ display: "flex", justifyContent: "space-around", background: "white" }}>
                                <h3>Weight: {pokemon.weight}</h3>

                                <h3>Height: {pokemon.height}</h3>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: "center" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "200px", marginTop: "25px" }}>
                            <div className='types' style={{ padding: "20px", width: "200px", background: "white" }}>
                                <h3 style={{ display: 'flex', justifyContent: "center" }}>Type</h3>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50%" }}>
                                    {
                                        pokemon.types?.map(poke => (
                                            <div key={poke.type.url}>{poke.type.name}</div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='abilities' style={{ padding: "20px", width: "200px", background: "white" }}>
                                <h3 style={{ display: 'flex', justifyContent: "center" }}>Abilities</h3>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 0.5fr" }}>
                                    {
                                        pokemon.abilities?.map(poke => (
                                            <div key={poke.ability.url}>{poke.ability.name}</div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div >
                    <h2 style={{ color: "white", textShadow: "5px 5px 10px black" }}>Movements</h2>
                    <div style={{ background: "white", padding: "20px" }}>
                        {
                            pokemon.moves?.map(poke => (
                                <h3 key={poke.move.url}>{poke.move.name}</h3>
                            ))
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PokemonInfo;