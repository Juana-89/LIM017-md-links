const {absolutePath, pathExists, isDirectory, isFile, extFile, readDir, readFile, joinTwoPaths,
       searchDirectoryWithFilesMD, searchLinksInFilesMD, getLinksStatus}  = require ('../../src/api.js');
const fetch = jest.createMockFromModule('node-fetch');
const routeFolder = 'C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba';
const routeFile = 'C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba\\prueba.md';
const manyFiles = ['C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba\\prueba.md',
'C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba\\prueba1.md',
'C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba\\prueba2.md'];
const fileNotMD = 'C:\\Users\\USER\\Desktop\\LIM017-md-links\\test\\src\\api.spec.js';
const files = ['prueba.md', 'prueba1.md','prueba2.md'];
const readText = "agregando cosas";
const mdLinks = 
{
    href: 'https://marked.js.org/#installation', 
    text: 'https://marked.js.org/#installation',
    file: 'C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba\\prueba2.md'
}
const mdLinksStatusOk = {
    href: 'https://marked.js.org/#installation', 
    text: 'https://marked.js.org/#installation',
    file: 'C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba\\prueba2.md',
    status: 200,
    message: 'Ok'
}
const mdLinksStatusFail = {
    href: 'https://www.google.com/404', 
    text: 'https://www.google.com/404',
    file: 'C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba3.md',
    status: 404,
    message: 'Fail'
}

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
    it('Corrobora si una ruta existe', () => {
        expect(pathExists('1111.js')).toBe("Path no exists");
        console.log(pathExists('1111.js'))
    });

    it('Devuelve un archivo si existe', () => {
        expect(pathExists('C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba\\prueba.md')).toEqual(routeFile);
        console.log(pathExists('prueba\\prueba.md'))
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

describe('searchLinksInFilesMD', () => {
    it('Lee y valida si en los archivos MD hay links con searchLinksInFilesMD', () => {
        expect(searchLinksInFilesMD(routeFolder)).toEqual([mdLinks]);
    });
});

describe('getLinksStatus', () => {
    it('Valida estados resueltos de los links con getLinksStatus', () => {
        fetch.mockImplementation(() => Promise.resolve([{
                href: 'https://marked.js.org/#installation', 
                text: 'https://marked.js.org/#installation',
                file: 'C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba\\prueba2.md',
                status: 200,
                message: 'Ok'
            }]))
            return getLinksStatus ([{
                href: 'https://marked.js.org/#installation', 
                text: 'https://marked.js.org/#installation',
                file: 'C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba\\prueba2.md',
                status: 200,
                message: 'Ok'

            }])
         .then((data) => {
             expect(data).toEqual([mdLinksStatusOk])
         })   
    });

    it('Valida estados rechazados de los links con getLinksStatus', () => {
        fetch.mockImplementation(() => Promise.reject([{
                href: 'https://www.google.com/404', 
                text: 'https://www.google.com/404',
                file: 'C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba3.md',
                status: 404,
                message: 'Fail'
            }]))
            return getLinksStatus ([{
                href: 'https://www.google.com/404', 
                text: 'https://www.google.com/404',
                file: 'C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba3.md',
                status: 404,
                message: 'Fail'

            }])
         .then((data) => {
             expect(data).toEqual([mdLinksStatusFail])
         })   
    });
});