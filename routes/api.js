/*Coder House
  Curso de Programación Backend
  Grupo:22885
  Entrega Final 1
  Erick Omar Sandoval Báez
*/

//Librerías
const { time } = require("console");
const { application, json } = require("express");
const express = require("express");
const handlebars= require("express-handlebars")
const fs = require('fs');
const moment = require("moment");

//Inicialización a router
const { Router } = express;
const router = new Router();

//let arr=[]

//   API | PRODUCTOS

//GET | OBTIENE LOS ARTÍCULOS
router.get("/productos",(req, res)=>{
   //lectura del archivo
    let fileR= fs.readFile("./productos/productos.json", "utf-8",(err, data)=>{
        if(err) throw "Error al leer el archivo"
        let data_parse=JSON.parse(data)
        //Notificación al servidor
        console.log("Se han mostrado todos los artículos")
        //Envio al usuario
        res.send(data_parse)

    })
})

//GET/:ID | OBTIENE LOS ARTÍCULOS SEGÚN EL ID DESEADO
router.get("/productos/:id", (req, res)=>{
    //Obtención del Id a modificar
    let idNum= req.params.id
    //Inicialización del array
    let arr=[]
    //Lectura del archivo
    let fileR= fs.readFile("./productos/productos.json", "utf-8", (err, data)=>{
        if(err) throw "Error al leer el archivo"
        //Obtención del valor y guardado en el array
        arr = JSON.parse(data);
        //Filtrado por el id
        let arrNew= arr.filter(x=> x.id== idNum)
        //Notificación al servidor
        console.log("Se ha mostrado el artículo con el id: "+idNum)
        //Envio al usuario
        res.send(arrNew[0])

    })

    
})

//POST | AGREGA ARTÍCULOS AL FINAL DEL ARRAY Y LE ASIGNA SU ID
router.post("/productos",(req, res)=>{
    //Inicialización del array
    let arr=[]
    //Lectura del archivo
    let fileR= fs.readFile("./productos/productos.json", "utf-8", (err, data)=>{
        if(err) throw "Error al leer el archivo"
        //Se le dan los valores al array
        arr = JSON.parse(data);
        //Se obtienen los datos del nuevo producto 
        let { name, price, thumbnail, descripcion,codigo,stock } = req.body; 
        //Obtención del siguiente id según la longitud del array
        let id= arr.length  
        let timestamp= moment().format('MMMM Do YYYY, h:mm:ss a');
        console.log(typeof(timestamp))
        //Se estructura el nuevo objeto
        let obj = { 
            name,
            price,
            thumbnail,
            descripcion,
            codigo,
            stock,
            timestamp, 
            id
        };
        //Se agrega el objeto
        arr.push(obj) 
        //Se formatea String
        let producto_escritura= JSON.stringify(arr,null,2)
        //Se guarda el archivo
        fs.writeFileSync("./productos/productos.json", producto_escritura, "utf-8")
        //Se notifica tanto a servidor como a usuario
        res.send({"message":"Objeto Guardado", "data":arr[id]})
        console.log("Se ha añadido un nuevo artículo con el id: "+id)

    })
    
})

//PUT | ACTUALIZA EL PRODUCTO SEGÚN SU ID
router.put("/productos/:id", (req, res)=>{
    //Se obtiene el objeto a modificar
    let idNum= req.params.id
    //Se inicializa el array
    let arr=[]
    //Se lee el archivo
    let fileR= fs.readFile("./productos/productos.json", "utf-8", (err, data)=>{
        if(err) throw "Error al leer el archivo"
        //Se le da valor al array
        arr = JSON.parse(data);
        //Se obtienen los datos a actualizar
        let {  name, price, thumbnail, descripcion,codigo,stock } = req.body; 
        let timestamp= moment().format('MMMM Do YYYY, h:mm:ss a');
        //Se obtiene el id y se convierte a entero para respetar el formato
        let id= parseInt(idNum) 
        //Se estructura el nuevo objeto
        let obj = { 
            name,
            price,
            thumbnail,
            descripcion,
            codigo,
            stock,
            timestamp, 
            id
        };
        //Se actualiza el array en la posición deseada
        arr[idNum]=obj
        //Se formatea el producto para guardarlo
        let producto_escritura= JSON.stringify(arr,null,2)
        //Se guarda
        fs.writeFileSync("./productos/productos.json", producto_escritura, "utf-8")
        //Se notifica a usuario y a servidor
        res.send({"message":"objeto actualizado", "data":arr[id]})
        console.log("Se ha actualizado el artículo con el id: "+idNum)
        
    })
})

//DELETE | ELIMINA UN PRODUCTO SEGÚN SU ID
router.delete("/productos/:id", (req, res)=>{
    //Se obtiene el id del producto
    let idNum= req.params.id
    //Se inicializa el array
    let arr=[]
    //Se lee el archivo
    let fileR= fs.readFile("./productos/productos.json", "utf-8", (err, data)=>{
        if(err) throw "Error al leer el archivo"
        //Se le da valor al array
        arr = JSON.parse(data);
        //Se le da valor al id y se convierte en entero para que mantenga el formato
        let id= parseInt(idNum)  
        let timestamp= moment().format('MMMM Do YYYY, h:mm:ss a');
        //Se le dan los valores deseados a cada parámetro del objeto. En este caso decidí poner estos valores para evitar un conflicto con las id en un futuro
        arr[id]={
            "name":"Objeto eliminado",
            "price":0,
            "thumbnail":"Objeto eliminado",
            "descripcion":"Objeto eliminado",
            "codigo":0,
            "stock":0,
            "timestamp":"Objeto eliminado",
            "id":id
        }
        //Se formatea a Strring para ser guardado
        let producto_escritura= JSON.stringify(arr,null,2)
        //Se guarda
        fs.writeFileSync("./productos/productos.json", producto_escritura, "utf-8")
        //Se notifica a usuario y a servidor
        res.send({"message":"objeto eliminado", "data":arr[id]})
        console.log("Se ha eliminado el artículo con el id: "+id)
        
    })
})


//  API | CARRITO

//POST | CREA UN NUEVO CARRITO Y DEVUELVE SU ID
router.post("/carrito",(req, res)=>{
    let arr_car=[]
    //lectura del archivo
    let fileR= fs.readFile("./productos/carrito.json", "utf-8", (err, data)=>{
        if(err) throw "Error al leer el archivo"
        arr_car=JSON.parse(data)
        //se obtiene el id
        let id_car= arr_car.length
        //se obtiene el timestamp
        let timestamp_car= moment().format('MMMM Do YYYY, h:mm:ss a');
        let obj_car={
            "id_car": id_car,
            "timestamp_car":timestamp_car,
            "producto_car":[]
        }
        //se agrega al array
        arr_car.push(obj_car)
        //se ajusta al formato y se guarda
        let escritura_arr_carr= JSON.stringify(arr_car,null,2)
        fs.writeFileSync("./productos/carrito.json", escritura_arr_carr, "utf-8")
        res.send({"message":"Carrito agregado", "data":obj_car.id_car})
        console.log(`Carrito creado con el id: ${id_car}`)
    })
})

router.delete("/carrito/:id", (req, res)=>{
    //Se obtiene el id del producto
    let idNum= req.params.id
    //Se inicializa el array
    let arr_car=[]
    //Se lee el archivo
    let fileR= fs.readFile("./productos/carrito.json", "utf-8", (err, data)=>{
        if(err) throw "Error al leer el archivo"
        //Se le da valor al array
        arr_car = JSON.parse(data);
        //Se le da valor al id y se convierte en entero para que mantenga el formato
        let id_car= parseInt(idNum)  
        let timestamp_car= moment().format('MMMM Do YYYY, h:mm:ss a');
        //Se le dan los valores deseados a cada parámetro del objeto. En este caso decidí poner estos valores para evitar un conflicto con las id en un futuro
        arr_car[id_car]={
            "id_car": id_car,
            "timestamp_car":timestamp_car,
            "producto_car":[]
        }
        //Se formatea a Strring para ser guardado
        let producto_escritura= JSON.stringify(arr_car,null,2)
        //Se guarda
        fs.writeFileSync("./productos/carrito.json", producto_escritura, "utf-8")
        //Se notifica a usuario y a servidor
        res.send({"message":"objeto eliminado", "data":arr_car[id_car]})
        console.log("Se ha eliminado el artículo con el id: "+id_car)   
    })
})


//GET
router.get("/carrito/:id/productos", (req, res)=>{
    //Obtención del Id a modificar
    let idNum= req.params.id
    //Inicialización del array
    let arr_car=[]
    //Lectura del archivo
    let fileR= fs.readFile("./productos/carrito.json", "utf-8", (err, data)=>{
        if(err) throw "Error al leer el archivo"
        //Obtención del valor y guardado en el array
        arr_car = JSON.parse(data);
        //Filtrado por el id
        let arrNew= arr_car.filter(x=> x.id_car== idNum)
        //Notificación al servidor
        res.send(arrNew[0].producto_car)
        console.log("Se han mostrado los productos del carrito id: "+idNum)
        //Envio al usuario
    })    
})


router.post("/carrito/:id/productos/:id_prod", (req, res)=>{
    //Obtención del Id a modificar
    let idNum= req.params.id
    let idNum_prod= req.params.id_prod
    //Inicialización del array
    let arr_car=[]
    let arr_prod=[]

    
    //Lectura del archivo
    let fileR= fs.readFile("./productos/carrito.json", "utf-8", (err, data)=>{
        if(err) throw "Error al leer el archivo"
        //Obtención del valor y guardado en el array
        arr_car = JSON.parse(data);
        
        //res.send(arrNew[0])
        let arrNew_car= arr_car.filter(x=> x.id_car== idNum)
       
        //se lee el archivo
        let fileR_prod= fs.readFile("./productos/productos.json", "utf-8", (err, data_prod)=>{
            if(err) throw "Error al leer el archivo"
            arr_prod = JSON.parse(data_prod);
            let producto_car_arr=arrNew_car[0].producto_car
            //se busca el producto que corresponda con el id
            let arrNew_prod= arr_prod.filter(x=> x.id== idNum_prod)
            //se agrega al array
            producto_car_arr.push(arrNew_prod[0])
            //se hace entero el id
            let id_car= parseInt(idNum)  
            //se obtiene el timestamp
            let timestamp_car= moment().format('MMMM Do YYYY, h:mm:ss a');
            //se el dan valores al pbjeto y se guarda en el array
            arr_car[id_car]={
            "id_car": id_car,
            "timestamp_car":timestamp_car,
            "producto_car":producto_car_arr
            }
            res.send({"message": `Se ha agregado un nuevo producto al carrito: ${id_car}`, "data": arr_car[id_car]})
            let producto_escritura= JSON.stringify(arr_car,null,2)
             //Se guarda
            fs.writeFileSync("./productos/carrito.json", producto_escritura, "utf-8")
            
        })

    })    
    
})


router.delete("/carrito/:id/productos/:id_prod", (req, res)=>{
    //Obtención del Id a modificar
    let idNum= req.params.id
    let idNum_prod= req.params.id_prod
    //Inicialización del array
    let arr_car=[]
    let arr_prod=[]
    let carr_prod=[]
    //Lectura del archivo
    let fileR= fs.readFile("./productos/carrito.json", "utf-8", (err, data)=>{
        if(err) throw "Error al leer el archivo"
        //Obtención del valor y guardado en el array
        arr_car = JSON.parse(data);
        //se filtra según el id
        let arrNew_car= arr_car.filter(x=> x.id_car== idNum)
        //se crea un array de solo productos
        let NewProducts=arrNew_car[0].producto_car
      
        //según el id ingresado, busca en el array original
        let buscar_id=arrNew_car[0].producto_car.findIndex(x=>x.id==idNum_prod)
       //Se elimina el objeto del array
        NewProducts.splice(buscar_id, 1);
        //se obtiene nuevo timestamp
        let timestamp_car= moment().format('MMMM Do YYYY, h:mm:ss a');
        //se hace entero el id
        let id_car= parseInt(idNum)
        //se dan valores al objeto y se guarda en el array
        arr_car[id_car]={
            "id_car": id_car,
            "timestamp_car":timestamp_car,
            "producto_car":NewProducts
        }
        //se firmate y guarda en el archivo
        let producto_escritura= JSON.stringify(arr_car,null,2)
        fs.writeFileSync("./productos/carrito.json", producto_escritura, "utf-8")
        //se notifica al cliente 
        res.send({"message": `Se ha eliminado el producto del carrito: ${id_car}`, "data": arr_car[id_car]})
        console.log("Se ha eliminado un objeto del carrito: "+idNum)
    })    
    
})

module.exports = router;