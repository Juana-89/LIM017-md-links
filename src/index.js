const { absolutePath, pathExists, searchDirectoryWithFilesMD, searchLinksInFilesMD, getLinksStatus } = require('./api.js')
const mdLinks = (path, options) => {
    return new Promise ((resolve, reject) => {
        const route = absolutePath(path)
        if(!pathExists(route)){
            reject('Path does not exist');
        } else {
                const validateMdFile= searchDirectoryWithFilesMD(route);
                if (validateMdFile.length === 0 ){
                    reject('There is no md files')
                }
                else{
                    const linksResult = searchLinksInFilesMD(route);
                    if(linksResult.length===0){
                        reject('there is no links')
                    }
                    else{
                            if(!(options.validate)){
                                resolve(linksResult);
                            } else {
                                const statusLink = getLinksStatus(linksResult);
                                resolve(statusLink);
                            }
                        }
                }
        }
    });
}

const result = mdLinks('../prueba2', { validate: true })
result
.then((res)=> console.log(res))
.catch((err) => console.log(err));

module.exports= { mdLinks};