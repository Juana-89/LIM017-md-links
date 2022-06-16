const { totalLinks, uniqueLinks, brokenLinks } = require ('../../src/options.js');
const path = require('path')
const links = [
    { 
        href: 'https://www.youtube.com/watch?v=ixcjgxsN_3Q',
        text: 'https://www.youtube.com/watch?v=ixcjgxsN_3Q',
        file:  path.resolve('./prueba2/doc.md'),
        status: 200,
        message: 'Ok'
    },
    { 
        href: 'https://www.youtube.com/watch?v=ixcjgxsN_3Q',
        text: 'https://www.youtube.com/watch?v=ixcjgxsN_3Q',
        file:  path.resolve('./prueba2/doc.md'),
        status: 200,
        message: 'Ok'
    },
    { 
        href: 'https://google.com/404-error-page',
        text: 'https://google.com/404-error-page',
        file:  path.resolve('./prueba2/doc.md'),
        status: 404,
        message: 'Fail'
    }
]

describe('totalLinks', () => {
    it('Debería contar la cantidad total de links que hay dentro del archivo buscado', () => {
     expect(totalLinks(links)).toBe(3);
    });
});

describe('uniqueLinks', () => {
    it('Debería contar la cantidad de links únicos, no repetidos', () => {
     expect(uniqueLinks(links)).toBe(2);
    });
});

describe('brokenLinks', () => {
    it('Debería contar la cantidad de links no servibles', () => {
     expect(brokenLinks(links)).toBe(1);
    });
});