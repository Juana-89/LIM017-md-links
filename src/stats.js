//Obtener el total de links
const totalLinks = (arrayLinks) => arrayLinks.map((el) => el.href).length;

//Obtener los links únicos dentro de la lista del array que fueron encontrados en el path
const uniqueLinks = (arrayLinks) => {
    const linksSet = new Set ([]);// almacena valores únicos irrepetibles
    arrayLinks.forEach((element) => linksSet.add(element.href));
    return linksSet.size
};
//Obtener los links rotos dentro de la lista del array que fueron encontrados en el path
const brokenLinks = (arrayLinks) => {
    const broken = arrayLinks.filter((e)=> e.message=== 'Fail');
    return broken.length;
};


const help= `
                                ▐▓█▀▀▀▀▀▀▀▀▀█▓▌░▄▄▄▄▄░
                                ▐▓█░░▀░░▀▄░░█▓▌░█▄▄▄█░
                                ▐▓█░░▄░░▄▀░░█▓▌░█▄▄▄█░
                                ▐▓█▄▄▄▄▄▄▄▄▄█▓▌░█████░
                                ░░░░▄▄███▄▄░░░░░█████░
_____________________________________________________________________________________________
                                    H E L P 
You can place the following commands to have statistics of the links found in your md files:
--validate: Show the link, text, route, status and status message.
--stats: Show statistics about the links found such as unique links and unique links.
--stats --validate: Show total statistics of the number of links, unique links and broken 
links Use the next structure in the commands line: mdLinks <path> <command> but you want can 
only and it ill show you the link, text and the file where it is located.
_____________________________________________________________________________________________`

const about = `

                                ▐▓█▀▀▀▀▀▀▀▀▀█▓▌░▄▄▄▄▄░
                                ▐▓█░░▀░░▀▄░░█▓▌░█▄▄▄█░
                                ▐▓█░░▄░░▄▀░░█▓▌░█▄▄▄█░
                                ▐▓█▄▄▄▄▄▄▄▄▄█▓▌░█████░
                                ░░░░▄▄███▄▄░░░░░█████░

            ███╗   ███╗██████╗     ██╗     ██╗███╗   ██╗██╗  ██╗███████╗
            ████╗ ████║██╔══██╗    ██║     ██║████╗  ██║██║ ██╔╝██╔════╝
            ██╔████╔██║██║  ██║    ██║     ██║██╔██╗ ██║█████╔╝ ███████╗
            ██║╚██╔╝██║██║  ██║    ██║     ██║██║╚██╗██║██╔═██╗ ╚════██║
            ██║ ╚═╝ ██║██████╔╝    ███████╗██║██║ ╚████║██║  ██╗███████║
            ╚═╝     ╚═╝╚═════╝     ╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
            ____________________________________________________________

            It is a command line interface (CLI) that helps the user to 
            check if the Mark down (md) files contain links and if they 
            work or not. Created by Juana LC, my repository:
            https://github.com/Juana-89/LIM017-md-links
            ____________________________________________________________`

module.exports = {totalLinks, uniqueLinks, brokenLinks, help, about};