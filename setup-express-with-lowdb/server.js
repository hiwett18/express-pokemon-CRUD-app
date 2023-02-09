import express from "express"; //Import Express
import { Low } from "lowdb"; //Import the LowDB module. Uses a JSON file to create our "database"
import { JSONFile } from "lowdb/node";

import setupPokemonRouter from "./routes/pokemonRoutes.js";



export default async function createServer() {
  // Configure lowdb to write to JSONFile. This will be our "database"
  const adapter = new JSONFile("db.json");
  const db = new Low(adapter);

  //Reads the database
  await db.read();

  //Checks if there is any data in the database. If not, we give default data.
  db.data = db.data || { pokemons: [] };

  //This writes to the database if there are any changes
  await db.write();

  //Instantiate our express application
  const app = express();

  //Use Builtin middleware to extract JSON data from the body of any request made to the server
  app.use(express.json());
  


app.use("/pokemon", setupPokemonRouter(db));



  //Have the app listen on port 8080
//   app.listen(8080, function () {
//     //After the app is running, run this console.log
//     console.log("App running on http://localhost:8080");
//   });
// })();

return app;
};