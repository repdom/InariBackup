module.exports = function (ItemEvaluacion) {
    ItemEvaluacion.eliminarPorCodigoFormulario = function(cb, codigoFormularioEvaluacion) {
        ItemEvaluacion.destroyAll({formularioEvaluacionCodigo: codigoFormularioEvaluacion}, function(err, result) {
            if(err){
               console.log(err);
            }else{
               console.log('Sucess', result); // {count:X} <- how much records deleted
            }
        });
    }
}