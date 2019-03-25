//ESTA FUNCION PERMITE OBTENER TODOS LOS BENEFICIOS DE LA API
function menuHandler (options, event, context, callback) {
	context.simplehttp.makeGet("https://praxair.rubixware.com/api/v1/benefits/",{},function (context, event) {//hacemos la llamada a la api
		var benefit = JSON.parse(event.getresp);//obtenemos todos los beneficios de la API en json
		var beneficios = benefit.benefits_categories.benefits;//accede a los beneficios de la API 
		var benefits="",link="",title="";
		var links=[]; 
		//for para recorrer los links de cada beneficio
		for (var i=0; i<beneficios.length; i++) {//bucle para obtener todos los beneficios
			var con=i+1; // Aqui esta el indice
			links.push(con);//guarda el indice en el arreglo
			benefits=benefits +con+": "+ beneficios[i].title + '\n';//obtenemos el titulo de los beneficios
		}
		//for para recorrer los links de cada beneficio
		for(var k = 0; k < links.length; k++){
			if (event.message == links[k]){//if para recibir el messaje de usuario
				options.next_state='bot1_1';
				title=title +beneficios[k].title;//obtenemos titulo de beneficio
				link=link+"https://praxair.rubixware.com/benefits/"+beneficios[k].id;//obtenemos el link de beneficio
			}
		}
		options.data.title=title; //se agrega el titulo a la variable
		options.data.url=link;//se agrega los link a la variable url
		options.data.beneficios=benefits;//agregamos todos los beneficios
	    callback(options, event, context);
	});
}
//ESTA FUNCION PERMITE OBTENER LAS CATEGORIAS DE LA API
function categoriasHandler (options, event, context, callback) {
	context.simplehttp.makeGet("https://praxair.rubixware.com/api/v1/benefits/",{},function (context, event) {//hacemos la llamada a la api
		var beneficios = JSON.parse(event.getresp);//obtenemos todos los beneficios de la API en json
		var benefit = beneficios.benefits_categories.benefits;//accede a los beneficios de la API 
		var category = beneficios.benefits_categories.categories;//accede a las categorias de la API 
		var benefit_category="",categoria="",title_category="",link="";
		var id_categorias = [];
		//bucle para obtener el nombre de las categorias
		for (var i=0; i<category.length; i++) {
			cont=i+1;//contador
			id_categorias.push(cont);//<-----guardamos el contador en el arreglo
			categoria=categoria +cont+": "+ category[i].name +'\n';//nombre categoria
		}
		//for para recorrer las categorias
		for(var l = 0; l < category.length;l++){
			if (event.message == id_categorias[l]){//if para recibir el messaje de usuario
				title_category=title_category +category[l].name;//nombre de la categoria
				for(var k=0;k<benefit.length;k++){//for para recorrer los beneficios
					if(category[l].id==benefit[k].category_id){
						var con=k+1;//contador
						benefit_category=benefit_category + con+": "+benefit[k].title+'\n' ;//beneficios de la categoria
					}
				}
				options.next_state ='bot2';
				options.data.beneficio_categoria =benefit_category;//Guarda el titulo del beneficio
				options.data.titulo_categoria =title_category;//guarda el nombre de la categoria
			}
		}
		options.data.url=link;//se agrega a la variable url
		options.data.categorias=categoria;//se agrega las categorias
	    callback(options, event, context);
	});
}
//ESTA FUNCION PERMITE OBTENER LOS CONTACTOS DE LA API
function contactoHandler(options,event,context,callback){
	context.simplehttp.makeGet ("https://praxair.rubixware.com/api/v1/contacts", {}, function (context, event) {//hacemos la llamada a la api
	var contacts=JSON.parse(event.getresp);//obtenemos los contactos en un json
		if(event.message == "Si"){//condicion
			options.next_state='bot1_3';	
		}
		if(event.message =="No"){//condicion
			var contacto = contacts.responsible;
			var name="",mail="",hrs="";
			for (var i=0; i<contacto.length; i++) {//bucle para obtener los datos del contacto
				options.next_state='rh';
				name=name +contacto[i].name;
				mail=mail +contacto[i].email;
				hrs=hrs +contacto[i].bussines_hours;
			}
			options.data.responsible=name;//guarda el responsable del contacto
			options.data.email=mail;//guarda el correo
			options.data.hours=hrs;//guarda el horario de trabajo
			options.data.phone = contacts.responsible[0].phones[0].phone;//guarda telefono
			options.data.ext = contacts.responsible[0].phones[0].extention;//guarda la extencion
			}
		callback(options,event,context);
	});
}
//exportamos los datos al archivo default.scr
module.exports.main = {
    beneficiosLabel: menuHandler,
    bot: menuHandler,//exporta todos los beneficios
    categoriasLabel:categoriasHandler,//exportamos las categorias
    bott:categoriasHandler,//exporta beneficios de las categorias
    bot2:menuHandler,//exporta los links
    bot1_2:contactoHandler //exporta los datos de contacto
}