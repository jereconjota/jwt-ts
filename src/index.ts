import app from "./app";
import './database';
import dotenv from 'dotenv';
dotenv.config();

function main() {
    app.listen(3000);
    console.log("Server on port", app.get("port"));

}

main();