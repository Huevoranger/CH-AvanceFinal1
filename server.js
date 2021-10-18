/*Coder House
  Curso de Programación Backend
  Grupo:22885
  Entrega Final 1
  Erick Omar Sandoval Báez
*/

//Librerías
const express= require("express")
const router = require("./routes/api");
const handlebars = require("express-handlebars");

//Constantes necesarias para el servidor
const PORT= process.env.PORT || 8080
const app= express()

//Configuración de la ruta
app.use(express.json());
app.use("/api", router);

//Configuración de handlebars
app.set("views", "./views");
app.set("view engine", "hbs");


app.engine(
    "hbs",
    handlebars({
      extname: "hbs",
      layoutsDir: __dirname + "/views/layouts",
      defaultLayout: "main",
      partialsDir:__dirname + "/views/partials"
    })
);
  


app.get("/",(req,res)=>{
    res.send("Holsdsssssssssssssssssaso")
})

//Inicialización del servidor
app.listen(8080,()=>{
        console.log("Server on port 8080")
})