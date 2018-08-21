function UsuariosDAO(connection){
    this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            collection.insert(usuario);
            mongoclient.close();
        });
    });
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){ //criando o autenticar 
    this._connection.open(function(err, mongoClient){ // abrindo a conexao com o banco de dados
        mongoClient.collection("usuarios", function(err, collection){//abrindo a collection usuarios
            collection.find(usuario).toArray(function(err, result){//fazendo uma pesquisa no usuario
                if(result[0] != undefined){ // resultado for = ele retorna
                    req.session.autorizado = true; // carrega os dados da autorizaçao
                    req.session.usuario = result[0].usuario; // carrega os dados do usuario
                    req.session.casa = result[0].casa; // carrega os dados da casa que eles fez cadastro
                }
                if(req.session.autorizado){ // si for autorizado ele retorna a pagina de jogo
                    res.redirect("jogo");
                }else{
                    res.render("index", {validacao: {}}); // si nao for ele volta pra index
                }
            });
            mongoClient.close(); //fecha a conexao a cada requisição
        });
    });
}

module.exports = function(){
    return UsuariosDAO;
}