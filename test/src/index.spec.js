const {absolutePath, pathExists, isDirectory, isFile, extFile, readDir, readFile, joinTwoPaths,
       searchDirectoryWithFilesMD}  = require ('../../src/index.js');

const routeFolder = 'C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba';
const routeFile = 'C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba\\prueba.md';
const manyFiles = ['C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba\\prueba.md',
'C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba\\prueba1.md',
'C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba\\prueba2.md'];
const fileNotMD = 'C:\\Users\\USER\\Desktop\\LIM017-md-links\\test\\src\\index.spec.js';
const files = ['prueba.md', 'prueba1.md','prueba2.md'];
const readText = "agregando cosas";

describe('absolutePath', () => {
    it('Devuelve una ruta absoluta si la ingresada es tal', () => {
        expect(absolutePath('C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba')).toEqual(routeFolder);
        console.log(absolutePath('C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba\\prueba.md'))
    });

    it('Convierte una ruta relativa en absoluta', () => {
        expect(absolutePath('prueba\\prueba.md')).toEqual(routeFile);
        console.log(absolutePath('prueba\\prueba.md'))
    });
});

describe('pathExists', () => {
    it('Devuelve un archivo si existe', () => {
        expect(pathExists('C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba\\prueba.md')).toEqual(routeFile);
        console.log(pathExists('prueba\\prueba.md'))
    });

    it('Corrobora si una ruta existe', () => {
        expect(pathExists('1111.js')).toBe("Path no exists");
        console.log(pathExists('1111.js'))
    });
});

describe('isDirectory', () => {
    it('Verifica si es un directorio', () => {
        expect(isDirectory(routeFolder)).toBe(true);
    });

    it('Verifica si no es un directorio', () => {
        expect(isDirectory(routeFile)).toBe(false);
    });
});

describe('isFile', () => {
    it('Verifica si es un archivo', () => {
        expect(isFile(routeFile)).toBe(true);
    });

    it('Verifica si no es un archivo', () => {
        expect(isFile(routeFolder)).toBe(false);
    });
});

describe('extFile', () => {
    it('Extrae la extensión de un archivo', () => {
        expect(extFile(routeFile)).toEqual('.md');
    });
});

describe('readDir', () => {
    it('Lee directorio en routeFolder', () => {
        expect(readDir(routeFolder)).toEqual(files);
    });
});

describe('readFile', () => {
    it('Lee el archivo de routeFile', () => {
        expect(readFile(routeFile)).toEqual(readText);
    });
});

describe('joinTwoPaths', () => {
    it('Une dos rutas para retornar una lista de archivos en un array con joinTwoPaths ', () => {
        expect(joinTwoPaths(routeFolder)).toEqual(manyFiles);
    });
});

describe('searchDirectoryWithFilesMD', () => {
    it('Valida directorio, lista los archivos que encuentre y hace la búsqueda de archivos con searchDirectoryWithFilesMD', () => {
        expect(searchDirectoryWithFilesMD(routeFolder)).toEqual(manyFiles);
    });

    it('Retorna false al no encontrar archivos MD', () => {
        expect(searchDirectoryWithFilesMD(fileNotMD)).toBe(false);
    });
});
