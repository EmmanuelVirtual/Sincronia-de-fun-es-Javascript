/* 
0 - Obter um usuárop
1 - Obter o numero de telefone de um usuáro a partir do seu Id
2 - Obter o endereço do usuário pelo Id
*/

// importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    // quando der algum problema -> reject(ERRO)
    // quando sucess -> RESOLV
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
            //return reject (new Error('Deu muita merda!'))
            return resolve({
                id: 1,
                nome: 'Emmanuel',
                dataNascimento: new Date()
            })
        }, 1000)

    })

}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '987582590',
                ddd: 11
            })
        }, 2000);
    })

}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: "Av",
            numero: 0
        })
    }, 2000);

}

//1º passo adcionar a palavra async -> automaticamente ela retornará uma Promise
main()
async function main () {
    try {
        console.time('medida-promise')
        const usuario = await obterUsuario()
        /* const telefone = await obterTelefone(usuario.id)
        const endereco = await obterEnderecoAsync(usuario.id) */
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const endereco = resultado[1]
        const telefone = resultado[0]
        console.log(`
            Nome: ${usuario.nome}
            Telefone: (${telefone.ddd}) ${telefone.telefone}
            Endereco: ${endereco.rua}, ${endereco.numero}
        `)
        console.timeEnd('medida-promise')

    } catch (error) {
        console.error('Deu Ruim', error)
    }

}

/* const usuarioPromise = obterUsuario()
// para manipular o sucesso a função .then
// para manipular erros, usamo o .catch
// usuario -> telefone -> telefone
usuarioPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
            .then(function resolverTelefone(result) {
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: result
                }
            })
    })
    .then(function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado) {
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `)
    })
    .catch(function (error) {
        console.error('Deu Ruim', error)
    }) */

//obterUsuario(function resolverUsuario(error, usuario) {
    // null || "" || 0 === false
    //if(error) {
    //    console.error('Error Usuario', error)
    //    return;
    //}
   // obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
   //     if(error1) {
   //         console.error('Error Telefone', error)
   //         return;
   //     }
   //     obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
    //        if(error2) {
   //             console.error('Error Endereço', error)
   //             return;
   //         }

   //         console.log(`
   //         Nome: ${usuario.nome}, 
   //         Endereco: ${endereco.rua}, ${endereco.numero}
   //         Telefone: (${telefone.ddd})${telefone.telefone}
   //         `)
   //     })
//
   // })
//})
//const telefone = obterTelefone(usuario.id)


//console.log('telefone', telefone)
