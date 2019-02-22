//ESTA FUNCION PERMITE OBTENER TODOS LOS BENEFICIOS DE LA API
function beneficiosHandler (options, event, context, callback) {//se crea la funcion
	context.simplehttp.makeGet ("https://praxair.rubixware.com/api/v1/benefits/", {}, function (context, event) { //hacemos una instancia al API
	var res = JSON.parse(event.getresp);//obtenemos los datos de la api en json
	options.data.beneficios0 = res.benefits_categories.benefits[0].title;//accedemos al titulo de cada beneficio
	options.data.detalles = res.benefits_categories.benefits[0].description;

	options.data.beneficios1 = res.benefits_categories.benefits[1].title;
	options.data.beneficios2 = res.benefits_categories.benefits[2].title;
	options.data.beneficios3 = res.benefits_categories.benefits[3].title;
	options.data.beneficios4 = res.benefits_categories.benefits[4].title;
	options.data.beneficios5 = res.benefits_categories.benefits[5].title;
	options.data.beneficios6 = res.benefits_categories.benefits[6].title;
	options.data.beneficios7 = res.benefits_categories.benefits[7].title;
	options.data.beneficios8 = res.benefits_categories.benefits[8].title;
	options.data.beneficios9 = res.benefits_categories.benefits[9].title;
	options.data.beneficios10 = res.benefits_categories.benefits[10].title;
	
	callback(options, event, context);
	});
}


module.exports.main = {//exportamos los titulos
    beneficiosLabel: beneficiosHandler,
    user1: beneficiosHandler
    // suser1: beneficiosHandler
}
