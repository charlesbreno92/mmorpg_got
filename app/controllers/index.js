module.exports.index = function(appllication, req, res){
    res.render('index', {validacao: {}});
}

module.exports.autenticar = function(appllication, req, res){
    
    var dadosForm = req.body;

    req.assert('usuario', 'Usuario deve ser digitado').notEmpty();
    req.assert('senha', 'Senha deve ser digitada').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('index', {validacao:erros});
        return;
    }

    var connection = appllication.config.dbConnection;
    var UsuariosDAO = new appllication.app.models.UsuariosDAO(connection);

    UsuariosDAO.autenticar(dadosForm, req, res);

    //res.send('tudo ok para criar a sessao');

}