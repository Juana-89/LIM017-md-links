const fs = require('fs'); // Módulo que nos permita interactuar con directorios y archivos: file system
const path = require('path'); // Módulo que nos permite saber el tipo de extensión de un archivo
const marked = require('marked');
const colors = require('colors'); // Módulo que da color a los comandos de la terminal
const fetch = require('node-fetch');
colors.enable();
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
        console.log('No exists directory or not contain MD files')
        return false
        
        }
    return arrayFilesMD
    };
//console.log(searchDirectoryWithFilesMD('./index.js'))//devuelve un array vacio si no es md

//Leerlos y validar si dentro de esos archivos MD hay links
const searchLinksInFilesMD = (route) => {
    const renderer = new marked.Renderer();
    let arrayLinks = [];
     searchDirectoryWithFilesMD(route).forEach((file) => {
           renderer.link  = (href, title, text) => {
            let linksResult = {
                href: href,
                text: text,
                file: file
            }
            arrayLinks.push(linksResult)
        }
            marked.use({ renderer });
            marked.parse(readFile(file));
        });
        return arrayLinks
};
//console.log(searchLinksInFilesMD('C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba\\prueba.md'))

// Validar el estado de los links
const getLinksStatus = (links) => {
    const statusLinks = links.map((element) => 
    fetch(element)
    .then((response) => {
           element.status = response.status,
           element.message = (response.status >= 200) && (response.status <= 399) ? 'Ok' : 'Fail';
            return element;
          
        })
    .catch((error) => {
        return {
            href: element.href,
            text: element.text,
            file: element.file,
            status: 'Not found' + error,
            message: 'Fail'
        };
    })
    );
    return Promise.all(statusLinks);
};

// const statusLinkMD = getLinksStatus(searchLinksInFilesMD('C:/Users/USER/Desktop/LIM017-md-links/prueba/prueba.md'));
// statusLinkMD.then( res => console.log(res)).catch( error => console.log(error));

module.exports = {absolutePath, pathExists, isDirectory, isFile, extFile, readDir, readFile, joinTwoPaths,
                  searchDirectoryWithFilesMD, searchLinksInFilesMD, getLinksStatus };