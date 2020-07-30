import React, {useContext} from 'react';
import {AppContext} from '../../AppContext';
import './PokeDetails.scss';
import pokeball from '../../assets/icons8-pokeball-100.png';

const PokeDetails = ({details, isShiny, counter, viewFavorites}) => {
  const {sprites, name, types} = details;
  const {front_default, back_default, front_shiny, back_shiny} = sprites;
  const pokemonType = types.map(poke => poke.type.name + '\n');
  const { allPokemon, singlePokemon } = useContext(AppContext);
  const statNames = details.stats.map(stat => stat.stat.name);
  const statNums = details.stats.map(stat => stat.base_stat);
  const favoritedPokemon = allPokemon.filter(allPokemon => allPokemon.isFavorite);
  const favPokeNames = favoritedPokemon.map(pokemon => pokemon.name + '  ');

  return (
    <figure>
      {!viewFavorites&&
       <>
         <section className="img-container">
           <img
             className='pokemon-pic'
             src={isShiny ? front_shiny : front_default}
             alt={name}
           />
           <img
             className='pokemon-pic'
             src={isShiny ? back_shiny : back_default}
             alt={name}
           />
         </section>
         <div className='stats-title'>
           <h2>{name}</h2>
         </div>
         <figcaption>
           <p>
             <b>Height:</b><br/>{Math.round(parseInt(details.height)*10)/100}m
           </p>
           <p>
             <b>Weight:</b><br/>{Math.round(parseInt(details.weight)*10)/100}kg
           </p>
           <p>
             <b>Type:</b><br/>{pokemonType}
           </p>
         </figcaption>
         <section className="easter-eggs">
           {counter >= 1 && 
      <div className="base-stats">
        <div>Base Stats: </div> 
        <div>{statNums[counter]} {statNames[counter]}</div>
        {counter < statNames.length ? <div>◄ ►</div> : <div>◄</div>}
      </div>}
           {allPokemon[singlePokemon.id - 1].isFavorite &&
        <img
          className='pokeball-icon'
          src={pokeball}
          alt='A Pokeball. This pokemon is favorited'
        />}
         </section>
       </>}
      {viewFavorites && 
        <> 
          <h3><b>Your Favorite Pokemon: </b> </h3>
          <p>{favPokeNames}</p>
          <p>Press B for ◄ </p>
        </>}
    </figure>
  );
};

export default PokeDetails;
