//ESTA FUNCION PERMITE OBTENER TODOS LOS BENEFICIOS DE LA API
function menuHandler (options, event, context, callback) {
	context.simplehttp.makeGet ("https://praxair.rubixware.com/api/v1/benefits/",{},function (context, event) {
	
		var beneneficios = JSON.parse(event.getresp);//obtenemos todos los beneficios de la API en json
		//accedemos al titulo de cada beneficio
		var bene = beneneficios.benefits_categories.benefits;
		var b1="";
		for (var i=0; i<bene.length; i++) {//bucle para obtener todos los beneficios
			var con=i+1;
			b1=b1 +con+": "+ bene[i].title + '\n';
			options.data.b1=b1;
		}
		//options.data.b1=resp;
	 if((event.message == "Seguro de Vida")||(event.message == "seguro de vida")||(event.message == "11")){
	    	options.next_state='bot11';
	    	options.data.descr11 = beneneficios.benefits_categories.benefits[10].description;
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






