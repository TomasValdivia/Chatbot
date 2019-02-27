
//ESTA FUNCION PERMITE OBTENER TODOS LOS BENEFICIOS DE LA API
function menuHandler (options, event, context, callback) {//se crea la funcion
	context.simplehttp.makeGet ("https://praxair.rubixware.com/api/v1/benefits/", {}, function (context, event) {
		var beneficios = JSON.parse(event.getresp);//obtenemos todos los beneficios de la API en json
		//accedemos al titulo de cada beneficio
		options.data.b1 = beneficios.benefits_categories.benefits[0].title;//accedemos al titulo de cada beneficio
		options.data.b2 = beneficios.benefits_categories.benefits[1].title;
		options.data.b3 = beneficios.benefits_categories.benefits[2].title;
		options.data.b4 = beneficios.benefits_categories.benefits[3].title;
		options.data.b5 = beneficios.benefits_categories.benefits[4].title;
		options.data.b6 = beneficios.benefits_categories.benefits[5].title;
		options.data.b7 = beneficios.benefits_categories.benefits[6].title;
		options.data.b8 = beneficios.benefits_categories.benefits[7].title;
		options.data.b9 = beneficios.benefits_categories.benefits[8].title;
		options.data.b10 = beneficios.benefits_categories.benefits[9].title;
		options.data.b11 = beneficios.benefits_categories.benefits[10].title;
		//mostramos la descripcion de cada beneficio
		if (event.message == "Extensión de Gastos Médicos Flex Plus") {
	        options.next_state = 'bot1';
	        options.data.descr1 = beneficios.benefits_categories.benefits[0].description;
	    }         
	    if(event.message == "Seguro Medicina Preventiva"){
	    	options.next_state = 'bot2';
	    	options.data.descr2 = beneficios.benefits_categories.benefits[1].description
	    }													  
	    if(event.message == "Seguro de Gastos Médicos Mayores 2018 – 2019"){
	    	options.next_state = 'bot3';
	    	options.data.descr3 = beneficios.benefits_categories.benefits[2].description;
	    }				
	    if(event.message =="Gastos Médicos Mayores Pool (Familiares)"){
	    	options.next_state ='bot4';
	    	options.data.descr4 = beneficios.benefits_categories.benefits[3].description;
	    }
	    if(event.message == "Casa Habitación"){
	    	options.next_state = 'bot5';
	    	options.data.descr5 = beneficios.benefits_categories.benefits[4].description;
	    }
	    if(event.message == "Préstamos y Ahorros Máxima"){
	    	options.next_state = 'bot6';
	    	options.data.descr6 = beneficios.benefits_categories.benefits[5].description;
	    }
	    if(event.message == "Seguro Dental"){
	    	options.next_state ='bot7';
	    	options.data.descr7 = beneficios.benefits_categories.benefits[6].description;
	    }
	    if(event.message == "Seguro de Auto"){
	    	options.next_state ='bot8';
	    	options.data.descr8 = beneficios.benefits_categories.benefits[7].description;
	    }
	    if(event.message == "Plan de Pensiones Futura"){
	    	options.next_state ='bot9';
	    	options.data.descr9 = beneficios.benefits_categories.benefits[8].description;
	    }
	    
	  
		callback(options, event, context);
	});
}

module.exports.main = {//exportamos los titulos
    beneficiosLabel: menuHandler,
    bot: menuHandler


    //user1: menuHandler,
    //bot2: menuHandler,
    //user2: menuHandler,
    //bot3: menuHandler

}
