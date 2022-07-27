import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import Logout from './Logout';
import axios from 'axios';
import PokemonItem from './PokemonItem';
import { useNavigate } from 'react-router-dom';

const Pokedex = () => {

    const [pokemons, setPokemons] = useState([])
    const [pokemonSearch, setPokemonSearch] = useState("");

    const [types, setTypes] = useState([])

    const user = useSelector(state => state.user)

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154")
            .then(res => setPokemons(res.data.results));

        axios.get("https://pokeapi.co/api/v2/type/")
            .then(res => setTypes(res.data.results));
    }, [])

    console.log(types)

    console.log(pokemons)

    const [page, setPage] = useState(1);
    const lastIndex = page * 20;
    const firstIndex = lastIndex - 20;
    const pokemonsPaginated = pokemons.slice(firstIndex, lastIndex)

    const lastPage = Math.ceil(pokemons.length / 20)

    const numbers = [];

    for (let i = 1; i <= lastPage; i++) {
        numbers.push(i)
    }


    const search = e => {
        e.preventDefault();
        navigate(`/pokedex/${pokemonSearch}`)
    }

    const filterPokemon = e => {
        e.preventDefault();
        axios.get(e.target.value)
            .then(res => setPokemons(res.data.pokemon))
    }

    console.log(pokemons)

    document.body.style = `
    background: lightcoral;
    background-image: url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cad4b52e-f6b1-432f-9035-a5f4853bcf15/d84o6a9-28125268-b60b-4752-a665-acf6b32fbe37.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NhZDRiNTJlLWY2YjEtNDMyZi05MDM1LWE1ZjQ4NTNiY2YxNVwvZDg0bzZhOS0yODEyNTI2OC1iNjBiLTQ3NTItYTY2NS1hY2Y2YjMyZmJlMzcuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.E8Cz0zggZe_qb5KHtrjPAJJTDCl3YQ7K7GUvLtOBrbg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 300px;
    `

    return (
        <div>
            <header style={{ display: "flex", justifyContent: "space-between" }}>
                <div onClick={() => navigate("/pokedex/")}>
                    <img style={{ width: "250px" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2000px-International_Pok%C3%A9mon_logo.svg.png" alt="" />
                </div>
                <Logout />
            </header>

            <div style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
                <h1 style={{ textAlign: "center", fontSize: "25px" }}>Welcome {user}, enjoy your adventure in this Pokedex!</h1>
                <img style={{ width: "100px" }} src="https://i.pinimg.com/originals/28/ec/d6/28ecd67d058708db6a65de3e88f2c9f6.png" alt="" />
            </div>

            <form style={{ display: "flex", justifyContent: "center" }} onSubmit={search}>
                <select onChange={filterPokemon}>
                    <option value="">Select a type</option>
                    {
                        types.map(type => (
                            <option value={type.url} key={type.url}>{type.name}</option>
                        ))
                    }

                </select>
                <input style={{ width: "180px", marginLeft: "20px" }} type="text" value={pokemonSearch} onChange={e => setPokemonSearch(e.target.value)} placeholder="Put a name, id or filter by type" />
                <button>
                    <img style={{ width: "20px" }} src="http://www.purarteadesivos.com.br/wp-content/uploads/2017/04/Pok%C3%A9mon-go.png" alt="" />
                </button>

            </form >



            <div className='container-pokemons' style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}>
                    {
                        pokemonsPaginated.map(pokemon => (
                            <PokemonItem
                                pokemonUrl={pokemon.url ? pokemon.url : pokemon.pokemon.url}
                                key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
                            />
                        ))
                    }
                </ul>
            </div>

            <footer style={{position: 'static', bottom: "0", width: "100%", textAlign: "center", paddingTop: "40px"}}>
                <div>
                    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev Page</button>
                        <h3 style={{color: "white", textShadow: "5px 5px 10px black"}}>Page {page} of {lastPage}</h3>
                        <button onClick={() => setPage(page + 1)} disabled={page === lastPage}>Next Page</button>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr", marginBottom: "20px", width: "30%", position: 'relative', left: "35%" }}>
                        {
                            numbers.map(number => (
                                <button key={number} onClick={() => setPage(number)}>{number}</button>
                            ))
                        }
                    </div>


                </div>
            </footer>
        </div>
    );
};

export default Pokedex;