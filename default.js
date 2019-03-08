//ESTA FUNCION PERMITE OBTENER TODOS LOS BENEFICIOS DE LA API
function menuHandler (options, event, context, callback) {
	var api=context.simplehttp.makeGet ("https://praxair.rubixware.com/api/v1/benefits/", {}, function (context, event) {

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
	    else if(event.message == "Seguro Medicina Preventiva"){
	    	options.next_state = 'bot2';
	    	options.data.descr2 = beneficios.benefits_categories.benefits[1].description;
	    }													  
	    else if(event.message == "Seguro de Gastos Médicos Mayores 2018 – 2019"){
	    	options.next_state = 'bot3';
	    	options.data.descr3 = beneficios.benefits_categories.benefits[2].description;
	    }				
	    else if(event.message =="Gastos Médicos Mayores Pool (Familiares)"){
	    	options.next_state ='bot4';
	    	options.data.descr4 = beneficios.benefits_categories.benefits[3].description;
	    }
	    else if(event.message == "Casa Habitación"){
	    	options.next_state = 'bot5';
	    	options.data.descr5 = beneficios.benefits_categories.benefits[4].description;
	    }
	    else if(event.message == "Préstamos y Ahorros Máxima"){
	    	options.next_state = 'bot6';
	    	options.data.descr6 = beneficios.benefits_categories.benefits[5].description;
	    }
	    else if(event.message == "Seguro Dental"){
	    	options.next_state ='bot7';
	    	options.data.descr7 = beneficios.benefits_categories.benefits[6].description;
	    }
	    else if(event.message == "Seguro de Auto"){
	    	options.next_state ='bot8';
	    	options.data.descr8 = beneficios.benefits_categories.benefits[7].description;
	    }
	    else if(event.message == "Plan de Pensiones Futura"){
	    	options.next_state ='bot9';
	    	options.data.descr9 = beneficios.benefits_categories.benefits[8].description;
	    }
	    else if(event.message == "Apoyo Escolar"){
	    	options.next_state = 'bot10';
	    	options.data.descr10 = beneficios.benefits_categories.benefits[9].description;
	    }
	    else if(event.message == "Seguro de Vida"){
	    	options.next_state='bot11';
	    	options.data.descr11 = beneficios.benefits_categories.benefits[10].description;
	    }
		callback(options, event, context);
	});
}

//ESTA FUNCION PERMITE ACCEDER A TODAS LAS URL'S DE CADA BENEFICIO
function urlHandler(options, event, context, callback){
	if(event.message=="Si claro"){
		options.next_state='bot1_1';
		options.data.url1 = "https://praxair.rubixware.com/benefits/11";
	}
	if(event.message == "Si"){
		options.next_state='bot2_1';
		options.data.url2 = "https://praxair.rubixware.com/benefits/13";
	}
	if(event.message=="Si por favor"){
		options.next_state='bot3_1';
		options.data.url3 = "https://praxair.rubixware.com/benefits/1";
	}
	if(event.message=="Si gracias"){
		options.next_state='bot4_1';
		options.data.url4= "https://praxair.rubixware.com/benefits/14";
	}
	if(event.message=="Si por supuesto"){
		options.next_state='bot5_1';
		options.data.url5="https://praxair.rubixware.com/benefits/15";
	}
	if(event.message=="Si con mucho gusto"){
		options.next_state='bot6_1';
		options.data.url6="https://praxair.rubixware.com/benefits/18";
	}
	if(event.message=="Claro que si. Por favor"){
		options.next_state='bot7_1';
		options.data.url7="https://praxair.rubixware.com/benefits/12";
	}
	if(event.message=="Si. Estoy interesado"){
		options.next_state='bot8_1';
		options.data.url8= "https://praxair.rubixware.com/benefits/16";
	}
	if(event.message=="Si. Claro que me gustaría"){
		options.next_state='bot9_1';
		options.data.url9="https://praxair.rubixware.com/benefits/19";
	}
	if(event.message=="Si deseo verlo"){
		options.next_state='bot10_1';
		options.data.url10="https://praxair.rubixware.com/benefits/20";
	}
	if(event.message=="Si deseo consultarlo"){
		options.next_state='bot11_1';
		options.data.url11="https://praxair.rubixware.com/benefits/21";
	}
	callback(options,event,context);
}
//ESTA FUNCION PERMITE OBTENER LOS CONTACTOS DE LA API
function contactoHandler(options,event,context,callback){
	context.simplehttp.makeGet ("https://praxair.rubixware.com/api/v1/contacts", {}, function (context, event) {
	var ResContac=JSON.parse(event.getresp);
		if(event.message == "Si"){
			options.next_state='bot1_3';	
		}
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
//exportamos los datos al archivo default.scr
module.exports.main = {//exportamos los titulos
    beneficiosLabel: menuHandler,
    bot: menuHandler,//exporta todos los beneficios
    bot1_0: urlHandler, //exportamos la url del 1er beneficio
	bot2_0:urlHandler,  //exportamos la url del 2do beneficio
	bot3_0:urlHandler,  //exportamos la url del 3er beneficio
	bot4_0:urlHandler,  //exportamos la url del 4to beneficio
	bot5_0:urlHandler,  //exportamos la url del 5to beneficio
	bot6_0:urlHandler,  //exportamos la url del 6to beneficio 
	bot7_0:urlHandler,	//exportamos la url del 7mo beneficio
	bot8_0:urlHandler,  //exportamos la url del 8vo beneficio
	bot9_0:urlHandler,  //exportamos la url del 9no beneficio
	bot10_0:urlHandler, //exportamos la url del 10mo beneficio
	bot11_0:urlHandler, //exportamos la url del 11vo beneficio
	bot1_2:contactoHandler,  //exporta los datos de contacto al 1er beneficio
	bot2_2:contactoHandler,  //exporta los datos de contacto al 2do beneficio
	bot3_2:contactoHandler,  //exporta los datos de contacto al 3er beneficio
	bot4_2:contactoHandler,  //exporta los datos de contacto al 4to beneficio
	bot5_2:contactoHandler,  //exporta los datos de contacto al 5to beneficio
	bot6_2:contactoHandler,  //exporta los datos de contacto al 6to beneficio
	bot7_2:contactoHandler,  //exporta los datos de contacto al 7mo beneficio
	bot8_2:contactoHandler,  //exporta los datos de contacto al 8vo beneficio
	bot9_2:contactoHandler,	 //exporta los datos de contacto al 9no beneficio
	bot10_2:contactoHandler,  //exporta los datos de contacto al 10mo beneficio
	bot11_2:contactoHandler  //exporta los datos de contacto al 10mo beneficio
}






