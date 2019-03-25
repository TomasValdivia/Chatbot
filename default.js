//ESTA FUNCION PERMITE OBTENER TODOS LOS BENEFICIOS DE LA API
function menuHandler (options, event, context, callback) {
	context.simplehttp.makeGet("https://praxair.rubixware.com/api/v1/benefits/",{},function (context, event) {
		var beneficios = JSON.parse(event.getresp);//obtenemos todos los beneficios de la API en json
		var bene = beneficios.benefits_categories.benefits;//accede a los beneficios de la API 
		var b1="",link="",nombre="",enumaracion="", beneficio="";
		var links=[]; 
		//for para recorrer los links de cada beneficio
		for (var i=0; i<bene.length; i++) {//bucle para obtener todos los beneficios
			var con=i+1; // <------- Aqui esta el indice
			links.push(con);
			b1=b1 +con+": "+ bene[i].title + '\n';//obtenemos el titulo de los beneficios
		}
		//for para recorrer los links de cada beneficio
		for(var k = 0; k < links.length; k++){
			if (event.message == links[k]){//if para recibir el messaje de usuario
				options.next_state='bot1_1';
				nombre=nombre +bene[k].title;//obtenemos titulo de beneficio
				link=link+"https://praxair.rubixware.com/benefits/"+bene[k].id;//obtenemos el link de beneficio
			}
		}
		options.data.title=nombre; //se agrega el titulo a la variable name
		options.data.url=link;//se agrega los link a la variable url
		options.data.beneficios=b1;//agregamos todos los beneficios
	    callback(options, event, context);
	});
}
//ESTA FUNCION PERMITE OBTENER LAS CATEGORIAS DE LA API
function categoriasHandler (options, event, context, callback) {
	context.simplehttp.makeGet("https://praxair.rubixware.com/api/v1/benefits/",{},function (context, event) {
		var beneficios = JSON.parse(event.getresp);//obtenemos todos los beneficios de la API en json
		var bene = beneficios.benefits_categories.benefits;//accede a los beneficios de la API 
		var category = beneficios.benefits_categories.categories;//accede a las categorias de la API 
		var benef="",categoria="",name="",link="";
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
				name=name +category[l].name;//nombre de la categoria
				for(var k=0;k<bene.length;k++){//for para recorrer los beneficios
					if(category[l].id==bene[k].category_id){
						var con=k+1;//contador
						benef=benef + con+": "+bene[k].title+'\n' ;//beneficios de la categoria
					}
				}
				options.next_state ='bot2';
				options.data.respuesta =benef;//Guarda el titulo del beneficio
				options.data.titulo_categ =name;//guarda el nombre de la categoria
			}
		}
		options.data.url=link;//se agrega a la variable url
		options.data.categorias=categoria;//se agrega las categorias
	    callback(options, event, context);
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
    categoriasLabel:categoriasHandler,//exportamos las categorias
    bott:categoriasHandler,//exporta beneficios de las categorias
    bot2:menuHandler,//exporta los links
    bot1_2:contactoHandler //exporta los datos de contacto
}