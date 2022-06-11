#!/usr/bin/env node
//te ayuda a convertir este archivo en un linea de comandos de node js
const { mdLinks } = require('./index');
const option = require('./options');
const colors = require('colors');
colors.enable();
const [, , ...args] = process.argv;

// Si el usuario no escribe ruta a validar
if(args.length === 0) {
    console.error('Enter the path of the file');
  }

// Si el usuario pone un argumento en la línea de comandos
if(args.length === 1){
    mdLinks(args[0], { validate:false })
    .then(result => result.forEach(element=> console.log(`\nhref: ${element.href}\ntext: ${element.text}\nfile: ${element.file}\n`)))
    .catch(error => console.log(error));
}

// Si el usuario pone 2 argumentos en la línea de comandos
if(args.length === 2){
    switch (args[1]) {
    case '--validate':
    mdLinks(args[0], { validate: true })
    .then(result => result.forEach(element => console.log(`\nhref: ${element.href} \ntext: ${element.text} \nfile: ${eelement.file} \nstatus: ${element.status} \nmessage: ${element.message}`)))
    .catch(error => console.log(error));
    break;
  
    case '--stats':
    mdLinks(args[0], { validate: true })
    .then(result => console.log(`Total: ${option.totalLinks(result)} Unique: ${option.uniqueLinks(result)}`))
    .catch(error => console.log(error));
    break;
  
    case '--help':
    console.log(`${option.help}`);
    break;

    case '--about':
    console.log(`${option.about}`);
    break;
  
    default: console.log('Sorry, the command you entered doesnt exist. Try the --help command to receive instructions');
    break;
    }
  
  }

  // Si el usuario pone 3 argumentos en la línea de comandos
  if(args.length === 3){
    if ((args[1] === "--stats" && args[2] === "--validate") ||
    (args[1] === "--validate" && args[2] === "--stats")) {
    mdLinks(args[0], { validate: true })
    .then(res=> console.log(`Total: ${option.totalLinks(res)} 
    Unique: ${option.uniqueLinks(res)}
    Broken: ${option.brokenLinks(res)}`))
    .catch(err => console.log(err));
    } else{
    console.log('Sorry, the command does not exist. Try with command "--help"')
    }
}