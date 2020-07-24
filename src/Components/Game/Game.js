import React, { useEffect, useState } from 'react';
import './Game.css'
import '../../assets/whos-that-pokemon_.mp3'
import {getSinglePokemon} from '../../ApiCalls'

const Game = ({ get4RdmPokemon}) => {
  const [singlePokemon, setSinglePokemon] = useState({});
  const [winCounter, setWinCounter] = useState(0);
  const pokemons = get4RdmPokemon();
  const [pokemonChoices, setPokemonChoices] = useState(pokemons);
  const createOptionList = () => {
    return pokemonChoices.map(( pokemon, index ) => {
      return (
        <button name="user-button" onClick={(event) => checkForWin(event)} id={`${pokemon.name}`} className="pokemon-button" key={index}>
          {pokemon.name}
        </button>
      )
    })
  }

  const playAudio = () => {
  const whosThat = document.getElementsByClassName('pokemonSound')[0]
  if(whosThat){
    whosThat.play()
    }
  }

  const checkForWin = (event) => {
    const winner = singlePokemon.name;
    if(winner === event.target.id){
      setWinCounter(winCounter + 1)
    } else {
      setWinCounter(0)
    }
    setPokemonChoices(get4RdmPokemon())
  }

  useEffect(() => {
    const {name, url} = pokemonChoices[Math.floor(Math.random() * pokemonChoices.length)];

    const fetchSinglePokemon = async () => {
      try {
        const singlePokemon = await getSinglePokemon(url)
        setSinglePokemon(singlePokemon)
      } catch (error) {
        console.log(error);
      }
    }
    fetchSinglePokemon();

  }, [pokemonChoices]);

  return (
    <>
      <section alt="game-section">
      {singlePokemon.sprites && (
        <>
        <h2>{`${singlePokemon.name}`} </h2>
        <h4>Winning streak: {`${winCounter}`}</h4>
        <img className="single-pokemon"
          src={`${singlePokemon.sprites.front_default}`}
          alt="pokemon"
        />
        <section alt='user-choices' className="choices">
        <section className="choices">
          {createOptionList()}
        </section>
        </>)
        }
      {/* <audio className='pokemonSound'>
        <source src='../../assets/whos-that-pokemon_.mp3'></source>
      </audio> */}
      </section>
      {/* {playAudio()} */}
    </>
  
  )
}

export default Game;
