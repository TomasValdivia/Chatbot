//ESTA FUNCION PERMITE OBTENER TODOS LOS BENEFICIOS DE LA API
function menuHandler (options, event, context, callback) {
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
	    if(event.message == "Apoyo Escolar"){
	    	options.next_state = 'bot10';
	    	options.data.descr10 = beneficios.benefits_categories.benefits[9].description;
	    }
	    if(event.message == "Seguro de Vida"){
	    	options.next_state='bot11';
	    	options.data.descr11 = beneficios.benefits_categories.benefits[10].description;
	    }
		callback(options, event, context);
	});
}

//ESTA FUNCION PERMITE OBTENER TODAS LAS URL'S DE CADA BENEFICIO
function urlHandler(options, event, context, callback){
	if(event.message=="Si"){
		options.next_state='bot1_1_2';
		options.data.url1 = "https://praxair.rubixware.com/benefits/11";
	}
	if(event.message=="No"){
		options.next_state='bot1_1_3';
	}

	callback(options,event,context);
}
//ESTA FUNCION PERMITE OBTENER LOS CONTACTOS DE LA API
function contactoHandler(options,event,context,callback){
	context.simplehttp.makeGet ("https://praxair.rubixware.com/api/v1/contacts", {}, function (context, event) {
	var ResContac=JSON.parse(event.getresp);
		if(event.message =="No"){
			options.next_state='rh';
			options.data.responsable = ResContac.responsible[0].name;
			options.data.correo = ResContac.responsible[0].email;
			options.data.telefono = ResContac.responsible[0].phones[0].phone;
			options.data.ext = ResContac.responsible[0].phones[0].extention;
			options.data.horario = ResContac.responsible[0].bussines_hours;
			}
		callback(options,event,context);
	});
}
module.exports.main = {//exportamos los titulos
    beneficiosLabel: menuHandler,
    bot: menuHandler,
	bot1_1: urlHandler,
	bot_1_2:contactoHandler
}
