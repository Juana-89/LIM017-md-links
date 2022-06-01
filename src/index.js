const fs = require('fs'); // Módulo que nos permita interactuar con directorios y archivos: file system
const path = require('path'); // Módulo que nos permite saber el tipo de extensión de un archivo
//const chalk = require('chalk'); // Módulo que da color a los comandos de la terminal

// Convertir a una ruta en absoluta
const absolutePath = (route) => (path.isAbsolute(route)) ? route : path.resolve(route);
//console.log('Convirtiendo a una ruta absoluta con "absolutePath"' + absolutePath('./prueba/prueba'));

// Saber si una ruta existe
const pathExists = (route) => fs.existsSync(route) ? route : 'Path no exists';
//console.log('¿Existe la ruta? ' + pathExists('1111.js'))

// Saber si es un directorio
const isDirectory = (route) => fs.statSync(route).isDirectory();
//console.log('¿Es directorio? ' + isDirectory('C:\\Users\\USER\\Desktop\\LIM017-md-links\\src\\index.js'))

// Saber si es un archivo
const isFile = (route) => fs.statSync(route).isFile();
//console.log('¿Es archivo? ' + isFile('C:\\Users\\USER\\Desktop\\LIM017-md-links\\src\\index.js'))

// Conocer la extensión de un archivo
const extFile = (file) => path.extname(file);
//console.log(extFile('archivo.md'))

// Buscar archivos
const readDir = (route) => fs.readdirSync(route);

// Lee Archivos
const readFile = (file) => fs.readFileSync(file, 'utf-8');

// Unir dos rutas
const joinTwoPaths = (route) => {return readDir(route).map((element) => path.join(route, element))};

//Validar directorio sino listar los archivos que encuentre y hacer la búsqueda de archivos .md
const searchDirectoryWithFilesMD = (route) => {
    let arrayFilesMD = [];
    if(isFile(absolutePath(route)) && extFile(absolutePath(route)) === '.md'){
        arrayFilesMD.push(absolutePath(route))
    } else if(isDirectory(absolutePath(route))){
        joinTwoPaths(absolutePath(route)).forEach(element => {
        const filesMD = searchDirectoryWithFilesMD(element)
        arrayFilesMD = arrayFilesMD.concat(filesMD)
    });
    }
    else{
        //console.log('No exists directory or not contain MD files')
        return false
        }
    return arrayFilesMD
    };
//console.log(searchDirectoryorFiles('./index.js') + "11111111111")//devuelve un array vacio si no es md

//Validar si dentro de esos archivos MD hay links
// const searchLinks = (file) =>{
//     let arrayLinks = [];

// }

module.exports = {absolutePath, pathExists, isDirectory, isFile, extFile, readDir, readFile, joinTwoPaths,
                  searchDirectoryWithFilesMD};