const { mdLinks }  = require('../../src/index.js');
const link = [
  {
    href: 'https://marked.js.org/#installation',
    text: 'https://marked.js.org/#installation',
    file: 'C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba\\prueba2.md'
  }]

const linkWithStatus = [
  {
    href: 'https://www.google.com/404',
    text: 'https://www.google.com/404',
    file: 'C:\\Users\\USER\\Desktop\\LIM017-md-links\\prueba3.md',
    status: 404,
    message: 'Fail'
  }]

describe('mdLinks', () => {
  it('Debería ser función', () => {
   expect(typeof mdLinks).toBe('function');
  });

  it('Debe de retornar mensaje indicando que la ruta no existe', () => {
    const result = mdLinks('./prueba/prueba22.md')
    result
    .catch((error) => expect(error).toStrictEqual('Path no exists'));
  });

  it('Debe de retornar mensaje indicando que no hay archivos MD', () => {
    const result = mdLinks('./src')
    result
    .catch((error) => expect(error).toStrictEqual('There are not files MD'))
   
  });

  it('Debe de retornar mensaje indicando que no hay links', () => {
    const result = mdLinks('./prueba/prueba1.md')
    result
    .catch((error) => expect(error).toStrictEqual('There are not links'));
  });

  it('Debe de retornar dentro de un array las propiedades tales como el href, text y file de los archivos MD que encuentre al no colocar ningún comando en options', () => {
    const result = mdLinks(('./prueba'),{ validate: false });
    result.then((resolve) => expect(resolve).toStrictEqual(link));
  });

  it('Debe de retornar dentro de un array las propiedades de los links con los estados de estos de los archivos MD que encuentre al validarse algún comando en options', () => {
    const result = mdLinks(('./prueba3.md'),{ validate: true });
    result.then((resolve) => expect(resolve).toStrictEqual(linkWithStatus));
  });

});
