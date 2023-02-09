import express from "express";

import { nanoid } from "nanoid";
export default function setupPokemonRouter(db){
    const router =  express.Router();


    //Create our GET route that just sends back the pokemons data
    router.get("/", function (_request, response) {
        //The underscore means to ignore the param that's not being used
        response.status(200).json({
          //Set our response to have a status of 200 (OK!) and to respond with JSON
          success: true,
          pokemons: db.data.pokemons, //Returns the pokemons from our DB
        });
      });
    
    router.post("/", function (request, response) {
        //Push the new pokemon
        db.data.pokemons.push({
            id: nanoid(4),
          name: request.body.name
        });
        
        //Save the pokemon to the "database"
        db.write();
    
        //Respond with 200 (OK!) and tell the user the request is successful
        response.status(200).json({
          success: true,
        });
      });
    

      
    //   put is used to edit
    router.put("/:pokemon", function(request, response){
        const pokemon = request.params.pokemon;
        console.log(pokemon);
    
        const pokemonIndex = db.data.pokemons.findIndex(currentpokemon => currentpokemon.id === pokemon);
    
        db.data.pokemons[pokemonIndex].name = request.body.pokemon;
    
        db.write();
    
        response.status(200).json({
          success: true
        })
    
      })
    
      router.delete("/:id", function(request, response){
        const deletepokemon = request.params.id;
        console.log(deletepokemon);
    
        const pokemonIndex = db.data.pokemons.findIndex(currentpokemon => currentpokemon.id === deletepokemon);
    
        db.data.pokemons.splice(pokemonIndex, 1);
    
        db.write();
    
        response.status(200).json({
          success: true,
        })
    
      })
    
      router.get("/:id", function (request, response) {
    
    
        const getOneId = request.params.id
        console.log(getOneId) 
    
        const pokemonIndex = db.data.pokemons.findIndex(
          (currentPokemon) => currentPokemon.id === getOneId
        );
    
    
        db.write();
        response.status(200).json({
          success: true,
          pokemons: db.data.pokemons[pokemonIndex],
        });
    
        //The underscore means to ignore the param that's not being used
        response.status(200).json({
          //Set our response to have a status of 200 (OK!) and to respond with JSON
          success: true,
          pokemons: db.data.pokemons, //Returns the pokemons from our DB
        });
      });
    
    
      //Have the router listen on port 8080
      
return router     
}


