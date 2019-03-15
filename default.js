//ESTA FUNCION PERMITE OBTENER TODOS LOS BENEFICIOS DE LA API
function menuHandler (options, event, context, callback) {
	context.simplehttp.makeGet("https://praxair.rubixware.com/api/v1/benefits/",{},function (context, event,err) {
		var beneficios = JSON.parse(event.getresp);//obtenemos todos los beneficios de la API en json
		var bene = beneficios.benefits_categories.benefits;//accede a los beneficios de la API 
		var b1="";
		for (var i=0; i<bene.length; i++) {//bucle para obtener todos los beneficios
			var con=i+1;
			b1=b1 +con+": "+ bene[i].title + '\n';
		}
		options.data.beneficios=b1;
		
		if ((event.message=="extensión de gastos medicos flex plus")||(event.message == "1")){
			options.next_state='bot1_1';
			options.data.url = "https://praxair.rubixware.com/benefits/11";
		}
	   if((event.message == "seguro medicina preventiva")||(event.message == "2")){
	    	options.next_state='bot1_1';
			options.data.url = "https://praxair.rubixware.com/benefits/13";
		}
	   if((event.message == "seguro de gastos medicos mayores 2018 – 2019")||(event.message=="3")){
	    	options.next_state = 'bot1_1';
	    	options.data.url ="https://praxair.rubixware.com/benefits/1";
	    }				
	    if((event.message =="gastos medicos mayores pool (Familiares)")||(event.message == "4")){
	    	options.next_state ='bot1_1';
	    	options.data.url="https://praxair.rubixware.com/benefits/14";
	    }
	    if((event.message == "casa habitacion")||(event.message == "5")){
	    	options.next_state = 'bot1_1';
	    	options.data.url ="https://praxair.rubixware.com/benefits/15";
	    }
	    if((event.message == "prestamos y ahorros maxima")||(event.message == "6")){
	    	options.next_state = 'bot1_1';
	    	options.data.url="https://praxair.rubixware.com/benefits/18";
	    }
	    if((event.message == "seguro dental")||(event.message == "7")){
	    	options.next_state ='bot1_1';
	    	options.data.url = "https://praxair.rubixware.com/benefits/12";
	    }
	    if((event.message == "seguro de auto")||(event.message == "8")){
	    	options.next_state ='bot1_1';
	    	options.data.url="https://praxair.rubixware.com/benefits/16";
	    }
	    if((event.message == "plan de pensiones futura")||(event.message == "9")){
	    	options.next_state ='bot1_1';
	    	options.data.url = "https://praxair.rubixware.com/benefits/19";
	    }
	    if((event.message == "apoyo escolar")||(event.message == "10")){
	    	options.next_state = 'bot1_1';
	    	options.data.url="https://praxair.rubixware.com/benefits/20";
	    }
	    if((event.message == "seguro de vida")||(event.message == "11")){
	    	options.next_state='bot1_1';
	    	options.data.url="https://praxair.rubixware.com/benefits/21";
	    }
	    callback(options, event, context,err);
	});
}
//ESTA FUNCION PERMITE OBTENER LOS CONTACTOS DE LA API
function contactoHandler(options,event,context,callback){
	context.simplehttp.makeGet ("https://praxair.rubixware.com/api/v1/contacts", {}, function (context, event) {
	var ResContac=JSON.parse(event.getresp);
		if(event.message == "Si"){
			options.next_state='bot1_3';	
		}
		if(event.message =="No"){
			var cont = ResContac.responsible;
			var nom="",mail="",hrs="";
			for (var i=0; i<cont.length; i++) {
				options.next_state='rh';
				nom=nom +cont[i].name;
				mail=mail +cont[i].email;
				hrs=hrs +cont[i].bussines_hours;
			}
			options.data.responsable=nom;
			options.data.correo=mail;
			options.data.horario=hrs;
			options.data.telefono = ResContac.responsible[0].phones[0].phone;
			options.data.ext = ResContac.responsible[0].phones[0].extention;
			}
		callback(options,event,context);
	});
}
//exportamos los datos al archivo default.scr
module.exports.main = {
    beneficiosLabel: menuHandler,
    bot: menuHandler,//exporta todos los beneficios
    bot1_2:contactoHandler //exporta los datos de contacto al 1er beneficio
}