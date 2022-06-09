const totalLinks = (arrayLinks) => arrayLinks.map((el) => el.href).length;

// Función para obtener la cantidad de los links unicos(unique) encontrados en la ruta
const uniqueLinks = (arrayLinks) => {
    const linksSet = new Set ([]);// almacena valores únicos irrepetibles
    arrayLinks.forEach((element) => linksSet.add(element.href));
    return linksSet.size
};

// Función para obtener la cantidad de los links rotos(broken) encontrados en la ruta
const brokenLinks = (arrayLinks) => {
    const broken = arrayLinks.filter((e)=> e.message=== 'fail');
    return broken.length;
};


const help= `
********************************************************************************************
                                         HELP
--validate / Show the link, its text, its route, its status number and its status message
--stats    /  Show the total links and the unique links
--stats --validate  / Show the total, unique and broken links
*********************************************************************************************
Use this structure : mdLinks <route> <command> to run the cli
But you can also write only mdLinks <route> and you will get the link, its text and its file`

module.exports = {
    totalLinks,
    uniqueLinks,
    brokenLinks,
    help,
  };