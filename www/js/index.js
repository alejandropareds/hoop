var $$ = Dom7;

var marca2 ="";
var talla2="";
var precio2="";
var categoria2 ="";
var detalle2 ="";
var condicion2="";
var color2="";
var token="";
var platform = "";


var app = {
  // Application Constructor
  initialize: function() {
      this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
      app.receivedEvent('deviceready');
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {


    platform = device.platform;

    if(device.platform !="browser"){
     
        var push = PushNotification.init({
              android:{

              },ios:{
                  alert:"true",
                  badge:true,
                  sound:'false'
              }
        });


        push.on('registration', function (data) {
         
          

          getToken(data.registrationId,device.platform);
          
          token = data.registrationId;
          console.log(data.registrationId);
          console.log(data.registrationType);
      
          });


          push.on('notification', function (data) {

              console.log(data.message);
              console.log(data.title);
              console.log(data.count);
              console.log(data.sound);
              console.log(data.image);
              console.log(data.additionalData);

          });
        }

  }
};


        function getToken(token,platform){


          var token = token;
          var platform = platform;

        


          app7.request({
            url: 'http://localhost/hoop/api/settoken.php',
            data:{token:token,platform:platform},
            method:'POST',
            crossDomain: true,
            success:function(data){
           
            
            },
            error:function(error){

            }
            
            });
          
        }

var app7 = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Hoop',
    // App id
    id: 'com.hoop.app',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/start/',
        url: 'views/start.html',
      },
      {
        path: '/registrop/',
        url: 'views/registrop.html',
      },
      {
        path: '/home/',
        url: 'views/home.html',
      },
      {
        path: '/registro/',
        url: 'views/registro.html',
      },
      {
        path: '/login/',
        url: 'views/login.html',
      },
      {
        path: '/recuperar/',
        url: 'views/recuperar.html',
      },
      {
        path: '/productos/',
        url: 'views/productos.html',
      },
      {
        path: '/producto/',
        url: 'views/producto.html',
      },
      {
        path: '/perfil/',
        url: 'views/perfil.html',
      },
    ],
    // ... other parameters
  });
  
  var mainView = app7.views.create('.view-main');

  function showSplash(){

    setTimeout(function(){ InitApp()}, 1000);
    
  }
  function InitApp(){

    if( localStorage.getItem("team-login")=="autenticado"){
   
     mainView.router.navigate('/home/',{animate:true});
    }
    else{
   
     mainView.router.navigate('/start/',{animate:true});
    }
   }
  
  function Ingresar(){

   var correo = $$('#correo').val();
    var password = $$('#password').val();

    app7.preloader.show('blue');

    app7.request({
      url: 'http://localhost/hoop/api/login.php',
      data:{correo:correo,password:password},
      method:'POST',
      crossDomain: true,
      success:function(data){
           
        app7.preloader.hide();

        var objson = JSON.parse(data);

        if(objson.data == "AUTENTICADO"){

          localStorage.setItem("team-login", "autenticado");
          localStorage.setItem("correo", correo);

        mainView.router.navigate('/home/',{animate:true});
        }
        else{
          alert("CORREO Y/O PASSWORD INCORRECTO");
        } 
      },
      error:function(error){

        app7.preloader.hide(); 
      } 
      });
  }
  
function Registrarse(){

  var nombre = $$('#nombre').val();
  var apellidos = $$('#apellidos').val();
  var correo = $$('#correor').val();
  var password = $$('#passwordr').val();

  app7.preloader.show('blue');

  app7.request({
    url: 'http://localhost/hoop/api/users.php',
    data:{nombre:nombre,apellidos:apellidos,correo:correo,password:password},
    method:'POST',
    crossDomain: true,
    success:function(data){
         
      app7.preloader.hide();

      var objson = JSON.parse(data);

      if(objson.status_message == "CORRECTO"){
        alert("Se ha registrado correctamente");

      mainView.router.navigate('/login/',{animate:true});  
      }
      else{

        alert("Hubo un error en el registro, por favor intentelo nuevamente.");
      }
    
    },
    error:function(error){

      app7.preloader.hide();
    }
    });
  }
  
  $$(document).on('page:init','.page[data-name="login"]',function(e){

    
    });

    $$(document).on('page:init','.page[data-name="registro"]',function(e){
  
    });

    $$(document).on('page:init','.page[data-name="registrop"]',function(e){
  
    });

  

  $$(document).on('page:init','.page[data-name="home"]',function(e){

    $$('#price-filter').on('range:change', function (e) {
      var range = app7.range.get(e.target);
      $$('.price-value').text('$'+(range.value[0])+' - $'+(range.value[1]));
    });

  //alert("alerta");
  getPromo();
  
  });

  $$(document).on('page:init','.page[data-name="productos"]',function(e){

    //alert("alerta");
    getPromo2();
   

    
      getProductos();


    
  

    });

    $$(document).on('page:init', '.page[data-name="producto"]', function (e) {

      app7.preloader.show('blue');
      
      var mySwiper = new Swiper('.swiper-container', {
        zoom: {
          maxRatio: 5,
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
          },
        },
      });
      app7.request({
        url: 'http://localhost/hoop/api/producto.php',
        data:{id:idproducto},
        method:'POST',
        crossDomain: true,
        success:function(data){
             
          app7.preloader.hide();
  
          var objson = JSON.parse(data);
  
          var producto= "";
  
          $$('#titulo-producto').html(objson.data.titulo);
          $$('#talla-producto').html(objson.data.talla);
          $$('#precio-producto').html(objson.data.precio);
      
          $$('#imagen1-producto').html('<img src="'+objson.data.imagen1+'" width="100%"/>');  
          $$('#imagen2-producto').html('<img src="'+objson.data.imagen2+'" width="100%"/>');
          $$('#imagen3-producto').html('<img src="'+objson.data.imagen3+'" width="100%"/>');  
  
         $$('#favorito-producto').attr("onclick","Favorito("+idproducto+")");

         

        },
        error:function(error){
  
          app7.preloader.hide();
        },
        });
  
  });

    $$(document).on('page:init','.page[data-name="perfil"]',function(e){
  
      getPromo3();
      getFavoritos();
      getProductosPerfil();
    });
  function getPromo(){
  
    app7.preloader.show('blue');
  
    app7.request({
      url: 'http://localhost/hoop/api/promociones.php',
      data:{},
      method:'POST',
      crossDomain: true,
      success:function(data){
           
        app7.preloader.hide();
  
        var objson = JSON.parse(data);

        var promo="";

        var swiper = app7.swiper.get('.demo-swiper');
        swiper.removeAllSlides();

        for(x in objson.data){

         // console.log(objson.data[x].titulo);

           

          var slide = '<div class="swiper-slide"><img src="'+objson.data[x].imagen+'"width="100%"/> </div>';

          swiper.appendSlide(slide);

        }

      },
      error:function(error){
  
        app7.preloader.hide();
      }
      });

  }

  function getPromo2(){
  
    app7.preloader.show('blue');
  
    app7.request({
      url: 'http://localhost/hoop/api/promociones.php',
      data:{},
      method:'POST',
      crossDomain: true,
      success:function(data){
           
        app7.preloader.hide();
  
        var objson = JSON.parse(data);

        var promo="";

        var swiper = app7.swiper.get('.demo-swiper2');
        swiper.removeAllSlides();

        for(x in objson.data){

         // console.log(objson.data[x].titulo);

           

          var slide = '<div class="swiper-slide"><img src="'+objson.data[x].imagen+'"width="100%"/> </div>';

          swiper.appendSlide(slide);

        }

      },
      error:function(error){
  
        app7.preloader.hide();
      }
      });

  }
  function getPromo3(){
  
    app7.preloader.show('blue');
  
    app7.request({
      url: 'http://localhost/hoop/api/promociones.php',
      data:{},
      method:'POST',
      crossDomain: true,
      success:function(data){
           
        app7.preloader.hide();
  
        var objson = JSON.parse(data);

        var promo="";

        var swiper = app7.swiper.get('.demo-swiper3');
        

        for(x in objson.data){

         // console.log(objson.data[x].titulo);

           

          var slide = '<div class="swiper-slide"><img src="'+objson.data[x].imagen+'"width="100%"/> </div>';

          swiper.appendSlide(slide);

        }

      },
      error:function(error){
  
        app7.preloader.hide();
      }
      });

  }
  function setMarca(marca){
    categoria2="";
    detalle2="";
    talla2="";
    precio2="";
    condicion2="";
    color2="";

    marca2 = marca;

    mainView.router.navigate('/productos/',{animate:true});
  }

  function setDetalleFiltro(detalle){
    categoria2="";
    marca2="";
    talla2="";
    precio2="";
    condicion2="";
    color2="";

    detalle2=detalle;
  }
  function setMarcaFiltro(marca){

    
    switch(marca){

      case "Zara":
        
       
         $$('#Zara').attr("class","col button button-fill marca2press elevation-24");
         $$('#Bershka').attr("class","col button button-outline marca2 elevation-3");
         $$('#MassimoDutti').attr("class","col button button-outline marca2 elevation-3");
         $$('#Pull&Bear').attr("class","col button button-outline marca2 elevation-3");
         $$('#Oysho').attr("class","col button button-outline marca2 elevation-3");
         $$('#Stradivarius').attr("class","col button button-outline marca2 elevation-3");
      break; 
    
      case "Bershka":
        
       
        $$('#Bershka').attr("class","col button button-fill marca2press elevation-24");
        $$('#Zara').attr("class","col button button-outline marca2 elevation-3");
        $$('#MassimoDutti').attr("class","col button button-outline marca2 elevation-3");
        $$('#Pull&Bear').attr("class","col button button-outline marca2 elevation-3");
        $$('#Oysho').attr("class","col button button-outline marca2 elevation-3");
        $$('#Stradivarius').attr("class","col button button-outline marca2 elevation-3");
     break;

     case "MassimoDutti":
        
       
        $$('#MassimoDutti').attr("class","col button button-fill marca2press elevation-24");
        $$('#Zara').attr("class","col button button-outline marca2 elevation-3");
        $$('#Bershka').attr("class","col button button-outline marca2 elevation-3");
        $$('#Pull&Bear').attr("class","col button button-outline marca2 elevation-3");
        $$('#Oysho').attr("class","col button button-outline marca2 elevation-3");
        $$('#Stradivarius').attr("class","col button button-outline marca2 elevation-3");
     break;

     case "Pull&Bear":
        
       
        $$('#Pull&Bear').attr("class","col button button-fill marca2press elevation-24");
        $$('#Zara').attr("class","col button button-outline marca2 elevation-3");
        $$('#Bershka').attr("class","col button button-outline marca2 elevation-3");
        $$('#MassimoDutti').attr("class","col button button-outline marca2 elevation-3");
        $$('#Oysho').attr("class","col button button-outline marca2 elevation-3");
        $$('#Stradivarius').attr("class","col button button-outline marca2 elevation-3");
     break;

     case "Oysho":
        
       
      $$('#Oysho').attr("class","col button button-fill marca2press elevation-24");
      $$('#Zara').attr("class","col button button-outline marca2 elevation-3");
      $$('#Bershka').attr("class","col button button-outline marca2 elevation-3");
      $$('#MassimoDutti').attr("class","col button button-outline marca2 elevation-3");
      $$('#Pull&Bear').attr("class","col button button-outline marca2 elevation-3");
      $$('#Stradivarius').attr("class","col button button-outline marca2 elevation-3");
   break;

   case "Stradivarius":
        
       
    $$('#Stradivarius').attr("class","col button button-fill marca2press elevation-24");
    $$('#Zara').attr("class","col button button-outline marca2 elevation-3");
    $$('#Bershka').attr("class","col button button-outline marca2 elevation-3");
    $$('#MassimoDutti').attr("class","col button button-outline marca2 elevation-3");
    $$('#Pull&Bear').attr("class","col button button-outline marca2 elevation-3");
    $$('#Oysho').attr("class","col button button-outline marca2 elevation-3");
 break;
    }

    categoria2="";
    detalle2="";
    talla2="";
    precio2="";
    condicion2="";
    color2="";

    marca2 = marca;

  }

  function setTallaFiltro(talla){

    switch(talla){

      case "XS":
       
         $$('#XS').attr("class","col button button-fill tallabpress elevation-24");
         $$('#S').attr("class","col button button-outline tallab elevation-3");
         $$('#M').attr("class","col button button-outline tallab elevation-3");
         $$('#L').attr("class","col button button-outline tallab elevation-3");
         $$('#XL').attr("class","col button button-outline tallab elevation-3");
         $$('#XXL').attr("class","col button button-outline tallab elevation-3");
         $$('#22').attr("class","col button button-outline tallab elevation-3");
         $$('#22medio').attr("class","col button button-outline tallab elevation-3");
         $$('#23').attr("class","col button button-outline tallab elevation-3");
         $$('#23medio').attr("class","col button button-outline tallab elevation-3");
         $$('#24').attr("class","col button button-outline tallab elevation-3");
         $$('#24medio').attr("class","col button button-outline tallab elevation-3");
         $$('#25').attr("class","col button button-outline tallab elevation-3");
         $$('#25medio').attr("class","col button button-outline tallab elevation-3");
         $$('#26').attr("class","col button button-outline tallab elevation-3");
         $$('#26medio').attr("class","col button button-outline tallab elevation-3");
         $$('#27').attr("class","col button button-outline tallab elevation-3");
         $$('#27medio').attr("class","col button button-outline tallab elevation-3");
      break; 

      case "S":
       
         $$('#S').attr("class","col button button-fill tallabpress elevation-24");
         $$('#XS').attr("class","col button button-outline tallab elevation-3");
         $$('#M').attr("class","col button button-outline tallab elevation-3");
         $$('#L').attr("class","col button button-outline tallab elevation-3");
         $$('#XL').attr("class","col button button-outline tallab elevation-3");
         $$('#XXL').attr("class","col button button-outline tallab elevation-3");
         $$('#22').attr("class","col button button-outline tallab elevation-3");
         $$('#22medio').attr("class","col button button-outline tallab elevation-3");
         $$('#23').attr("class","col button button-outline tallab elevation-3");
         $$('#23medio').attr("class","col button button-outline tallab elevation-3");
         $$('#24').attr("class","col button button-outline tallab elevation-3");
         $$('#24medio').attr("class","col button button-outline tallab elevation-3");
         $$('#25').attr("class","col button button-outline tallab elevation-3");
         $$('#25medio').attr("class","col button button-outline tallab elevation-3");
         $$('#26').attr("class","col button button-outline tallab elevation-3");
         $$('#26medio').attr("class","col button button-outline tallab elevation-3");
         $$('#27').attr("class","col button button-outline tallab elevation-3");
         $$('#27medio').attr("class","col button button-outline tallab elevation-3");
      break; 

      case "M":
       
         $$('#M').attr("class","col button button-fill tallabpress elevation-24");
         $$('#XS').attr("class","col button button-outline tallab elevation-3");
         $$('#S').attr("class","col button button-outline tallab elevation-3");
         $$('#L').attr("class","col button button-outline tallab elevation-3");
         $$('#XL').attr("class","col button button-outline tallab elevation-3");
         $$('#XXL').attr("class","col button button-outline tallab elevation-3");
         $$('#22').attr("class","col button button-outline tallab elevation-3");
         $$('#22medio').attr("class","col button button-outline tallab elevation-3");
         $$('#23').attr("class","col button button-outline tallab elevation-3");
         $$('#23medio').attr("class","col button button-outline tallab elevation-3");
         $$('#24').attr("class","col button button-outline tallab elevation-3");
         $$('#24medio').attr("class","col button button-outline tallab elevation-3");
         $$('#25').attr("class","col button button-outline tallab elevation-3");
         $$('#25medio').attr("class","col button button-outline tallab elevation-3");
         $$('#26').attr("class","col button button-outline tallab elevation-3");
         $$('#26medio').attr("class","col button button-outline tallab elevation-3");
         $$('#27').attr("class","col button button-outline tallab elevation-3");
         $$('#27medio').attr("class","col button button-outline tallab elevation-3");
      break; 

      case "L":
       
         $$('#L').attr("class","col button button-fill tallabpress elevation-24");
         $$('#XS').attr("class","col button button-outline tallab elevation-3");
         $$('#M').attr("class","col button button-outline tallab elevation-3");
         $$('#S').attr("class","col button button-outline tallab elevation-3");
         $$('#XL').attr("class","col button button-outline tallab elevation-3");
         $$('#XXL').attr("class","col button button-outline tallab elevation-3");
         $$('#22').attr("class","col button button-outline tallab elevation-3");
         $$('#22medio').attr("class","col button button-outline tallab elevation-3");
         $$('#23').attr("class","col button button-outline tallab elevation-3");
         $$('#23medio').attr("class","col button button-outline tallab elevation-3");
         $$('#24').attr("class","col button button-outline tallab elevation-3");
         $$('#24medio').attr("class","col button button-outline tallab elevation-3");
         $$('#25').attr("class","col button button-outline tallab elevation-3");
         $$('#25medio').attr("class","col button button-outline tallab elevation-3");
         $$('#26').attr("class","col button button-outline tallab elevation-3");
         $$('#26medio').attr("class","col button button-outline tallab elevation-3");
         $$('#27').attr("class","col button button-outline tallab elevation-3");
         $$('#27medio').attr("class","col button button-outline tallab elevation-3");
      break; 

      case "XL":
       
         $$('#XL').attr("class","col button button-fill tallabpress elevation-24");
         $$('#XS').attr("class","col button button-outline tallab elevation-3");
         $$('#M').attr("class","col button button-outline tallab elevation-3");
         $$('#L').attr("class","col button button-outline tallab elevation-3");
         $$('#S').attr("class","col button button-outline tallab elevation-3");
         $$('#XXL').attr("class","col button button-outline tallab elevation-3");
         $$('#22').attr("class","col button button-outline tallab elevation-3");
         $$('#22').attr("class","col button button-outline tallab elevation-3");
         $$('#22medio').attr("class","col button button-outline tallab elevation-3");
         $$('#23').attr("class","col button button-outline tallab elevation-3");
         $$('#23medio').attr("class","col button button-outline tallab elevation-3");
         $$('#24').attr("class","col button button-outline tallab elevation-3");
         $$('#24medio').attr("class","col button button-outline tallab elevation-3");
         $$('#25').attr("class","col button button-outline tallab elevation-3");
         $$('#25medio').attr("class","col button button-outline tallab elevation-3");
         $$('#26').attr("class","col button button-outline tallab elevation-3");
         $$('#26medio').attr("class","col button button-outline tallab elevation-3");
         $$('#27').attr("class","col button button-outline tallab elevation-3");
         $$('#27medio').attr("class","col button button-outline tallab elevation-3");
      break; 

      case "XXL":
       
         $$('#XXL').attr("class","col button button-fill tallabpress elevation-24");
         $$('#XS').attr("class","col button button-outline tallab elevation-3");
         $$('#M').attr("class","col button button-outline tallab elevation-3");
         $$('#L').attr("class","col button button-outline tallab elevation-3");
         $$('#XL').attr("class","col button button-outline tallab elevation-3");
         $$('#S').attr("class","col button button-outline tallab elevation-3");
         $$('#22').attr("class","col button button-outline tallab elevation-3");
         $$('#22medio').attr("class","col button button-outline tallab elevation-3");
         $$('#23').attr("class","col button button-outline tallab elevation-3");
         $$('#23medio').attr("class","col button button-outline tallab elevation-3");
         $$('#24').attr("class","col button button-outline tallab elevation-3");
         $$('#24medio').attr("class","col button button-outline tallab elevation-3");
         $$('#25').attr("class","col button button-outline tallab elevation-3");
         $$('#25medio').attr("class","col button button-outline tallab elevation-3");
         $$('#26').attr("class","col button button-outline tallab elevation-3");
         $$('#26medio').attr("class","col button button-outline tallab elevation-3");
         $$('#27').attr("class","col button button-outline tallab elevation-3");
         $$('#27medio').attr("class","col button button-outline tallab elevation-3");
      break; 

      case "22":
       
         $$('#22').attr("class","col button button-fill tallabpress elevation-24");
         $$('#XS').attr("class","col button button-outline tallab elevation-3");
         $$('#M').attr("class","col button button-outline tallab elevation-3");
         $$('#L').attr("class","col button button-outline tallab elevation-3");
         $$('#XL').attr("class","col button button-outline tallab elevation-3");
         $$('#S').attr("class","col button button-outline tallab elevation-3");
         $$('#XXL').attr("class","col button button-outline tallab elevation-3");
         $$('#22medio').attr("class","col button button-outline tallab elevation-3");
         $$('#23').attr("class","col button button-outline tallab elevation-3");
         $$('#23medio').attr("class","col button button-outline tallab elevation-3");
         $$('#24').attr("class","col button button-outline tallab elevation-3");
         $$('#24medio').attr("class","col button button-outline tallab elevation-3");
         $$('#25').attr("class","col button button-outline tallab elevation-3");
         $$('#25medio').attr("class","col button button-outline tallab elevation-3");
         $$('#26').attr("class","col button button-outline tallab elevation-3");
         $$('#26medio').attr("class","col button button-outline tallab elevation-3");
         $$('#27').attr("class","col button button-outline tallab elevation-3");
         $$('#27medio').attr("class","col button button-outline tallab elevation-3");
      break; 

      case "22medio":
       
         $$('#22medio').attr("class","col button button-fill tallabpress elevation-24");
         $$('#XS').attr("class","col button button-outline tallab elevation-3");
         $$('#M').attr("class","col button button-outline tallab elevation-3");
         $$('#S').attr("class","col button button-outline tallab elevation-3");
         $$('#XL').attr("class","col button button-outline tallab elevation-3");
         $$('#XXL').attr("class","col button button-outline tallab elevation-3");
         $$('#22').attr("class","col button button-outline tallab elevation-3");
         $$('#L').attr("class","col button button-outline tallab elevation-3");
         $$('#23').attr("class","col button button-outline tallab elevation-3");
         $$('#23medio').attr("class","col button button-outline tallab elevation-3");
         $$('#24').attr("class","col button button-outline tallab elevation-3");
         $$('#24medio').attr("class","col button button-outline tallab elevation-3");
         $$('#25').attr("class","col button button-outline tallab elevation-3");
         $$('#25medio').attr("class","col button button-outline tallab elevation-3");
         $$('#26').attr("class","col button button-outline tallab elevation-3");
         $$('#26medio').attr("class","col button button-outline tallab elevation-3");
         $$('#27').attr("class","col button button-outline tallab elevation-3");
         $$('#27medio').attr("class","col button button-outline tallab elevation-3");
      break; 

      case "23":
       
         $$('#23').attr("class","col button button-fill tallabpress elevation-24");
         $$('#XS').attr("class","col button button-outline tallab elevation-3");
         $$('#M').attr("class","col button button-outline tallab elevation-3");
         $$('#S').attr("class","col button button-outline tallab elevation-3");
         $$('#XL').attr("class","col button button-outline tallab elevation-3");
         $$('#XXL').attr("class","col button button-outline tallab elevation-3");
         $$('#22').attr("class","col button button-outline tallab elevation-3");
         $$('#L').attr("class","col button button-outline tallab elevation-3");
         $$('#22medio').attr("class","col button button-outline tallab elevation-3");
         $$('#23medio').attr("class","col button button-outline tallab elevation-3");
         $$('#24').attr("class","col button button-outline tallab elevation-3");
         $$('#24medio').attr("class","col button button-outline tallab elevation-3");
         $$('#25').attr("class","col button button-outline tallab elevation-3");
         $$('#25medio').attr("class","col button button-outline tallab elevation-3");
         $$('#26').attr("class","col button button-outline tallab elevation-3");
         $$('#26medio').attr("class","col button button-outline tallab elevation-3");
         $$('#27').attr("class","col button button-outline tallab elevation-3");
         $$('#27medio').attr("class","col button button-outline tallab elevation-3");
      break; 

      case "23medio":
       
         $$('#23medio').attr("class","col button button-fill tallabpress elevation-24");
         $$('#XS').attr("class","col button button-outline tallab elevation-3");
         $$('#M').attr("class","col button button-outline tallab elevation-3");
         $$('#S').attr("class","col button button-outline tallab elevation-3");
         $$('#XL').attr("class","col button button-outline tallab elevation-3");
         $$('#XXL').attr("class","col button button-outline tallab elevation-3");
         $$('#22').attr("class","col button button-outline tallab elevation-3");
         $$('#L').attr("class","col button button-outline tallab elevation-3");
         $$('#23').attr("class","col button button-outline tallab elevation-3");
         $$('#22medio').attr("class","col button button-outline tallab elevation-3");
         $$('#24').attr("class","col button button-outline tallab elevation-3");
         $$('#24medio').attr("class","col button button-outline tallab elevation-3");
         $$('#25').attr("class","col button button-outline tallab elevation-3");
         $$('#25medio').attr("class","col button button-outline tallab elevation-3");
         $$('#26').attr("class","col button button-outline tallab elevation-3");
         $$('#26medio').attr("class","col button button-outline tallab elevation-3");
         $$('#27').attr("class","col button button-outline tallab elevation-3");
         $$('#27medio').attr("class","col button button-outline tallab elevation-3");
      break; 

      case "24":
       
         $$('#24').attr("class","col button button-fill tallabpress elevation-24");
         $$('#XS').attr("class","col button button-outline tallab elevation-3");
         $$('#M').attr("class","col button button-outline tallab elevation-3");
         $$('#S').attr("class","col button button-outline tallab elevation-3");
         $$('#XL').attr("class","col button button-outline tallab elevation-3");
         $$('#XXL').attr("class","col button button-outline tallab elevation-3");
         $$('#22').attr("class","col button button-outline tallab elevation-3");
         $$('#L').attr("class","col button button-outline tallab elevation-3");
         $$('#23').attr("class","col button button-outline tallab elevation-3");
         $$('#23medio').attr("class","col button button-outline tallab elevation-3");
         $$('#22medio').attr("class","col button button-outline tallab elevation-3");
         $$('#24medio').attr("class","col button button-outline tallab elevation-3");
         $$('#25').attr("class","col button button-outline tallab elevation-3");
         $$('#25medio').attr("class","col button button-outline tallab elevation-3");
         $$('#26').attr("class","col button button-outline tallab elevation-3");
         $$('#26medio').attr("class","col button button-outline tallab elevation-3");
         $$('#27').attr("class","col button button-outline tallab elevation-3");
         $$('#27medio').attr("class","col button button-outline tallab elevation-3");
      break; 

      case "24medio":
       
         $$('#24medio').attr("class","col button button-fill tallabpress elevation-24");
         $$('#XS').attr("class","col button button-outline tallab elevation-3");
         $$('#M').attr("class","col button button-outline tallab elevation-3");
         $$('#S').attr("class","col button button-outline tallab elevation-3");
         $$('#XL').attr("class","col button button-outline tallab elevation-3");
         $$('#XXL').attr("class","col button button-outline tallab elevation-3");
         $$('#22').attr("class","col button button-outline tallab elevation-3");
         $$('#L').attr("class","col button button-outline tallab elevation-3");
         $$('#23').attr("class","col button button-outline tallab elevation-3");
         $$('#23medio').attr("class","col button button-outline tallab elevation-3");
         $$('#24').attr("class","col button button-outline tallab elevation-3");
         $$('#22medio').attr("class","col button button-outline tallab elevation-3");
         $$('#25').attr("class","col button button-outline tallab elevation-3");
         $$('#25medio').attr("class","col button button-outline tallab elevation-3");
         $$('#26').attr("class","col button button-outline tallab elevation-3");
         $$('#26medio').attr("class","col button button-outline tallab elevation-3");
         $$('#27').attr("class","col button button-outline tallab elevation-3");
         $$('#27medio').attr("class","col button button-outline tallab elevation-3");
      break; 

      case "25":
       
         $$('#25').attr("class","col button button-fill tallabpress elevation-24");
         $$('#XS').attr("class","col button button-outline tallab elevation-3");
         $$('#M').attr("class","col button button-outline tallab elevation-3");
         $$('#S').attr("class","col button button-outline tallab elevation-3");
         $$('#XL').attr("class","col button button-outline tallab elevation-3");
         $$('#XXL').attr("class","col button button-outline tallab elevation-3");
         $$('#22').attr("class","col button button-outline tallab elevation-3");
         $$('#L').attr("class","col button button-outline tallab elevation-3");
         $$('#23').attr("class","col button button-outline tallab elevation-3");
         $$('#23medio').attr("class","col button button-outline tallab elevation-3");
         $$('#24').attr("class","col button button-outline tallab elevation-3");
         $$('#24medio').attr("class","col button button-outline tallab elevation-3");
         $$('#22medio').attr("class","col button button-outline tallab elevation-3");
         $$('#25medio').attr("class","col button button-outline tallab elevation-3");
         $$('#26').attr("class","col button button-outline tallab elevation-3");
         $$('#26medio').attr("class","col button button-outline tallab elevation-3");
         $$('#27').attr("class","col button button-outline tallab elevation-3");
         $$('#27medio').attr("class","col button button-outline tallab elevation-3");
      break; 

      case "25medio":
       
         $$('#25medio').attr("class","col button button-fill tallabpress elevation-24");
         $$('#XS').attr("class","col button button-outline tallab elevation-3");
         $$('#M').attr("class","col button button-outline tallab elevation-3");
         $$('#S').attr("class","col button button-outline tallab elevation-3");
         $$('#XL').attr("class","col button button-outline tallab elevation-3");
         $$('#XXL').attr("class","col button button-outline tallab elevation-3");
         $$('#22').attr("class","col button button-outline tallab elevation-3");
         $$('#L').attr("class","col button button-outline tallab elevation-3");
         $$('#23').attr("class","col button button-outline tallab elevation-3");
         $$('#23medio').attr("class","col button button-outline tallab elevation-3");
         $$('#24').attr("class","col button button-outline tallab elevation-3");
         $$('#24medio').attr("class","col button button-outline tallab elevation-3");
         $$('#25').attr("class","col button button-outline tallab elevation-3");
         $$('#22medio').attr("class","col button button-outline tallab elevation-3");
         $$('#26').attr("class","col button button-outline tallab elevation-3");
         $$('#26medio').attr("class","col button button-outline tallab elevation-3");
         $$('#27').attr("class","col button button-outline tallab elevation-3");
         $$('#27medio').attr("class","col button button-outline tallab elevation-3");
      break; 

      case "26":
       
         $$('#26').attr("class","col button button-fill tallabpress elevation-24");
         $$('#XS').attr("class","col button button-outline tallab elevation-3");
         $$('#M').attr("class","col button button-outline tallab elevation-3");
         $$('#S').attr("class","col button button-outline tallab elevation-3");
         $$('#XL').attr("class","col button button-outline tallab elevation-3");
         $$('#XXL').attr("class","col button button-outline tallab elevation-3");
         $$('#22').attr("class","col button button-outline tallab elevation-3");
         $$('#L').attr("class","col button button-outline tallab elevation-3");
         $$('#23').attr("class","col button button-outline tallab elevation-3");
         $$('#23medio').attr("class","col button button-outline tallab elevation-3");
         $$('#24').attr("class","col button button-outline tallab elevation-3");
         $$('#24medio').attr("class","col button button-outline tallab elevation-3");
         $$('#25').attr("class","col button button-outline tallab elevation-3");
         $$('#25medio').attr("class","col button button-outline tallab elevation-3");
         $$('#22.5').attr("class","col button button-outline tallab elevation-3");
         $$('#26medio').attr("class","col button button-outline tallab elevation-3");
         $$('#27').attr("class","col button button-outline tallab elevation-3");
         $$('#27medio').attr("class","col button button-outline tallab elevation-3");
      break; 

      case "26medio":
       
         $$('#26medio').attr("class","col button button-fill tallabpress elevation-24");
         $$('#XS').attr("class","col button button-outline tallab elevation-3");
         $$('#M').attr("class","col button button-outline tallab elevation-3");
         $$('#S').attr("class","col button button-outline tallab elevation-3");
         $$('#XL').attr("class","col button button-outline tallab elevation-3");
         $$('#XXL').attr("class","col button button-outline tallab elevation-3");
         $$('#22').attr("class","col button button-outline tallab elevation-3");
         $$('#L').attr("class","col button button-outline tallab elevation-3");
         $$('#23').attr("class","col button button-outline tallab elevation-3");
         $$('#23medio').attr("class","col button button-outline tallab elevation-3");
         $$('#24').attr("class","col button button-outline tallab elevation-3");
         $$('#24medio').attr("class","col button button-outline tallab elevation-3");
         $$('#25').attr("class","col button button-outline tallab elevation-3");
         $$('#25medio').attr("class","col button button-outline tallab elevation-3");
         $$('#26').attr("class","col button button-outline tallab elevation-3");
         $$('#22medio').attr("class","col button button-outline tallab elevation-3");
         $$('#27').attr("class","col button button-outline tallab elevation-3");
         $$('#27medio').attr("class","col button button-outline tallab elevation-3");
      break; 

      case "27":
       
         $$('#27').attr("class","col button button-fill tallabpress elevation-24");
         $$('#XS').attr("class","col button button-outline tallab elevation-3");
         $$('#M').attr("class","col button button-outline tallab elevation-3");
         $$('#S').attr("class","col button button-outline tallab elevation-3");
         $$('#XL').attr("class","col button button-outline tallab elevation-3");
         $$('#XXL').attr("class","col button button-outline tallab elevation-3");
         $$('#22').attr("class","col button button-outline tallab elevation-3");
         $$('#L').attr("class","col button button-outline tallab elevation-3");
         $$('#23').attr("class","col button button-outline tallab elevation-3");
         $$('#23medio').attr("class","col button button-outline tallab elevation-3");
         $$('#24').attr("class","col button button-outline tallab elevation-3");
         $$('#24medio').attr("class","col button button-outline tallab elevation-3");
         $$('#25').attr("class","col button button-outline tallab elevation-3");
         $$('#25medio').attr("class","col button button-outline tallab elevation-3");
         $$('#26').attr("class","col button button-outline tallab elevation-3");
         $$('#26medio').attr("class","col button button-outline tallab elevation-3");
         $$('#22medio').attr("class","col button button-outline tallab elevation-3");
         $$('#27medio').attr("class","col button button-outline tallab elevation-3");
      break; 

      case "27medio":
       
         $$('#27medio').attr("class","col button button-fill tallabpress elevation-24");
         $$('#XS').attr("class","col button button-outline tallab elevation-3");
         $$('#M').attr("class","col button button-outline tallab elevation-3");
         $$('#S').attr("class","col button button-outline tallab elevation-3");
         $$('#XL').attr("class","col button button-outline tallab elevation-3");
         $$('#XXL').attr("class","col button button-outline tallab elevation-3");
         $$('#22').attr("class","col button button-outline tallab elevation-3");
         $$('#L').attr("class","col button button-outline tallab elevation-3");
         $$('#23').attr("class","col button button-outline tallab elevation-3");
         $$('#23medio').attr("class","col button button-outline tallab elevation-3");
         $$('#24').attr("class","col button button-outline tallab elevation-3");
         $$('#24medio').attr("class","col button button-outline tallab elevation-3");
         $$('#25').attr("class","col button button-outline tallab elevation-3");
         $$('#25medio').attr("class","col button button-outline tallab elevation-3");
         $$('#26').attr("class","col button button-outline tallab elevation-3");
         $$('#26medio').attr("class","col button button-outline tallab elevation-3");
         $$('#27').attr("class","col button button-outline tallab elevation-3");
         $$('#22medio').attr("class","col button button-outline tallab elevation-3");
      break; 
    }
    categoria2="";
    detalle2="";
    precio2="";
    condicion2="";
    color2="";
    marca2="";

    talla2= talla;
  }

  function setCondicionFiltro(condicion){
    categoria2="";
    detalle2="";
    precio2="";
    color2="";
    marca2="";
    talla2="";

    condicion2=condicion;
  }

  function setColorFiltro(color){

    switch(color){

      case "Rojo":
        
       
         $$('#Rojo').attr("class","col button button-fill colorbpress elevation-24 redb");
         $$('#Azul').attr("class","col button button-outline colorb elevation-3 azulb");
         $$('#Amarillo').attr("class","col button button-outline colorb amarillob elevation-3");
         $$('#Verde').attr("class","col button button-outline colorb verdeb elevation-3");
         $$('#Naranja').attr("class","col button button-outline colorb naranjab elevation-3");
         $$('#Morado').attr("class","col button button-outline colorb moradob elevation-3");
         $$('#Negro').attr("class","col button button-outline colorb negrob elevation-3");
         $$('#Dorado').attr("class","col button button-outline colorb doradob elevation-3");
         $$('#Gris').attr("class","col button button-outline colorb grisb elevation-3");
         $$('#Cafe').attr("class","col button button-outline colorb cafeb elevation-3");
         $$('#Rosa').attr("class","col button button-outline colorb rosab elevation-3");
         $$('#Blanco').attr("class","col button button-outline colorb blancob elevation-3");
      break; 

      case "Azul":
        
       
         $$('#Azul').attr("class","col button button-fill colorbpress azulb  elevation-24");
         $$('#Rojo').attr("class","col button button-outline colorb redb elevation-3");
         $$('#Amarillo').attr("class","col button button-outline colorb amarillob elevation-3");
         $$('#Verde').attr("class","col button button-outline colorb verdeb elevation-3");
         $$('#Naranja').attr("class","col button button-outline colorb naranjab elevation-3");
         $$('#Morado').attr("class","col button button-outline colorb moradob elevation-3");
         $$('#Negro').attr("class","col button button-outline colorb negrob elevation-3");
         $$('#Dorado').attr("class","col button button-outline colorb doradob elevation-3");
         $$('#Gris').attr("class","col button button-outline colorb grisb elevation-3");
         $$('#Cafe').attr("class","col button button-outline colorb cafeb elevation-3");
         $$('#Rosa').attr("class","col button button-outline colorb rosab elevation-3");
         $$('#Blanco').attr("class","col button button-outline colorb blancob elevation-3");
      break; 

      case "Amarillo":
        
       
         $$('#Amarillo').attr("class","col button button-fill colorbpress  amarillob elevation-24");
         $$('#Rojo').attr("class","col button button-outline colorb redb elevation-3");
         $$('#Azul').attr("class","col button button-outline colorb azulb elevation-3");
         $$('#Verde').attr("class","col button button-outline colorb verdeb elevation-3");
         $$('#Naranja').attr("class","col button button-outline colorb naranjab elevation-3");
         $$('#Morado').attr("class","col button button-outline colorb moradob elevation-3");
         $$('#Negro').attr("class","col button button-outline colorb negrob elevation-3");
         $$('#Dorado').attr("class","col button button-outline colorb doradob elevation-3");
         $$('#Gris').attr("class","col button button-outline colorb grisb elevation-3");
         $$('#Cafe').attr("class","col button button-outline colorb cafeb elevation-3");
         $$('#Rosa').attr("class","col button button-outline colorb rosab elevation-3");
         $$('#Blanco').attr("class","col button button-outline colorb blancob elevation-3");
      break; 

      case "Verde":
        
       
         $$('#Verde').attr("class","col button button-fill colorbpress verdeb  elevation-24");
         $$('#Rojo').attr("class","col button button-outline colorb redb elevation-3");
         $$('#Azul').attr("class","col button button-outline colorb azulb elevation-3");
         $$('#Amarillo').attr("class","col button button-outline colorb amarillob elevation-3");
         $$('#Naranja').attr("class","col button button-outline colorb naranjab elevation-3");
         $$('#Morado').attr("class","col button button-outline colorb moradob elevation-3");
         $$('#Negro').attr("class","col button button-outline colorb negrob elevation-3");
         $$('#Dorado').attr("class","col button button-outline colorb doradob elevation-3");
         $$('#Gris').attr("class","col button button-outline colorb grisb elevation-3");
         $$('#Cafe').attr("class","col button button-outline colorb cafeb elevation-3");
         $$('#Rosa').attr("class","col button button-outline colorb rosab elevation-3");
         $$('#Blanco').attr("class","col button button-outline colorb blancob elevation-3");
      break; 

      case "Naranja":
        
       
         $$('#Naranja').attr("class","col button button-fill colorbpress naranjab  elevation-24");
         $$('#Rojo').attr("class","col button button-outline colorb redb elevation-3");
         $$('#Azul').attr("class","col button button-outline colorb azulb elevation-3");
         $$('#Verde').attr("class","col button button-outline colorb verdeb elevation-3");
         $$('#Amarillo').attr("class","col button button-outline colorb amarillob elevation-3");
         $$('#Morado').attr("class","col button button-outline colorb moradob elevation-3");
         $$('#Negro').attr("class","col button button-outline colorb negrob elevation-3");
         $$('#Dorado').attr("class","col button button-outline colorb doradob elevation-3");
         $$('#Gris').attr("class","col button button-outline colorb grisb elevation-3");
         $$('#Cafe').attr("class","col button button-outline colorb cafeb elevation-3");
         $$('#Rosa').attr("class","col button button-outline colorb rosab elevation-3");
         $$('#Blanco').attr("class","col button button-outline colorb blancob elevation-3");
      break; 

      case "Morado":
        
       
         $$('#Morado').attr("class","col button button-fill colorbpress moradob  elevation-24");
         $$('#Rojo').attr("class","col button button-outline colorb redb elevation-3");
         $$('#Azul').attr("class","col button button-outline colorb azulb elevation-3");
         $$('#Verde').attr("class","col button button-outline colorb verdeb elevation-3");
         $$('#Naranja').attr("class","col button button-outline colorb naranjab elevation-3");
         $$('#Amarillo').attr("class","col button button-outline colorb amarillob elevation-3");
         $$('#Negro').attr("class","col button button-outline colorb negrob elevation-3");
         $$('#Dorado').attr("class","col button button-outline colorb doradob elevation-3");
         $$('#Gris').attr("class","col button button-outline colorb grisb elevation-3");
         $$('#Cafe').attr("class","col button button-outline colorb cafeb elevation-3");
         $$('#Rosa').attr("class","col button button-outline colorb rosab elevation-3");
         $$('#Blanco').attr("class","col button button-outline colorb blancob elevation-3");
      break; 

      case "Negro":
        
       
         $$('#Negro').attr("class","col button button-fill colorbpress negrob  elevation-24");
         $$('#Rojo').attr("class","col button button-outline colorb redb elevation-3");
         $$('#Azul').attr("class","col button button-outline colorb azulb elevation-3");
         $$('#Verde').attr("class","col button button-outline colorb verdeb elevation-3");
         $$('#Naranja').attr("class","col button button-outline colorb naranjab elevation-3");
         $$('#Morado').attr("class","col button button-outline colorb moradob elevation-3");
         $$('#Amarillo').attr("class","col button button-outline colorb amarillob elevation-3");
         $$('#Dorado').attr("class","col button button-outline colorb doradob elevation-3");
         $$('#Gris').attr("class","col button button-outline colorb grisb elevation-3");
         $$('#Cafe').attr("class","col button button-outline colorb cafeb elevation-3");
         $$('#Rosa').attr("class","col button button-outline colorb rosab elevation-3");
         $$('#Blanco').attr("class","col button button-outline colorb blancob elevation-3");
      break; 

      case "Dorado":
        
       
         $$('#Dorado').attr("class","col button button-fill colorbpress doradob  elevation-24");
         $$('#Rojo').attr("class","col button button-outline colorb redb elevation-3");
         $$('#Azul').attr("class","col button button-outline colorb azulb elevation-3");
         $$('#Verde').attr("class","col button button-outline colorb verdeb elevation-3");
         $$('#Naranja').attr("class","col button button-outline colorb naranjab elevation-3");
         $$('#Morado').attr("class","col button button-outline colorb moradob elevation-3");
         $$('#Negro').attr("class","col button button-outline colorb negrob elevation-3");
         $$('#Amarillo').attr("class","col button button-outline colorb amarillob elevation-3");
         $$('#Gris').attr("class","col button button-outline colorb grisb elevation-3");
         $$('#Cafe').attr("class","col button button-outline colorb cafeb elevation-3");
         $$('#Rosa').attr("class","col button button-outline colorb rosab elevation-3");
         $$('#Blanco').attr("class","col button button-outline colorb blancob elevation-3");
      break; 

      case "Gris":
        
       
         $$('#Gris').attr("class","col button button-fill colorbpress grisb  elevation-24");
         $$('#Rojo').attr("class","col button button-outline colorb redb elevation-3");
         $$('#Azul').attr("class","col button button-outline colorb azulb elevation-3");
         $$('#Verde').attr("class","col button button-outline colorb verdeb elevation-3");
         $$('#Naranja').attr("class","col button button-outline colorb naranjab elevation-3");
         $$('#Morado').attr("class","col button button-outline colorb moradob elevation-3");
         $$('#Negro').attr("class","col button button-outline colorb negrob elevation-3");
         $$('#Dorado').attr("class","col button button-outline colorb doradob elevation-3");
         $$('#Amarillo').attr("class","col button button-outline colorb amarillob elevation-3");
         $$('#Cafe').attr("class","col button button-outline colorb cafeb elevation-3");
         $$('#Rosa').attr("class","col button button-outline colorb rosab elevation-3");
         $$('#Blanco').attr("class","col button button-outline colorb blancob elevation-3");
      break; 

      case "Cafe":
        
       
         $$('#Cafe').attr("class","col button button-fill colorbpress cafeb  elevation-24");
         $$('#Rojo').attr("class","col button button-outline colorb redb elevation-3");
         $$('#Azul').attr("class","col button button-outline colorb azulb elevation-3");
         $$('#Verde').attr("class","col button button-outline colorb verdeb elevation-3");
         $$('#Naranja').attr("class","col button button-outline colorb naranjab elevation-3");
         $$('#Morado').attr("class","col button button-outline colorb moradob elevation-3");
         $$('#Negro').attr("class","col button button-outline colorb negrob elevation-3");
         $$('#Dorado').attr("class","col button button-outline colorb doradob elevation-3");
         $$('#Gris').attr("class","col button button-outline colorb grisb elevation-3");
         $$('#Amarillo').attr("class","col button button-outline colorb amarillob elevation-3");
         $$('#Rosa').attr("class","col button button-outline colorb rosab elevation-3");
         $$('#Blanco').attr("class","col button button-outline colorb blancob elevation-3");
      break; 

      case "Rosa":
        
       
         $$('#Rosa').attr("class","col button button-fill colorbpress rosab  elevation-24");
         $$('#Rojo').attr("class","col button button-outline colorb redb elevation-3");
         $$('#Azul').attr("class","col button button-outline colorb azulb elevation-3");
         $$('#Verde').attr("class","col button button-outline colorb verdeb elevation-3");
         $$('#Naranja').attr("class","col button button-outline colorb naranjab elevation-3");
         $$('#Morado').attr("class","col button button-outline colorb moradob elevation-3");
         $$('#Negro').attr("class","col button button-outline colorb negrob elevation-3");
         $$('#Dorado').attr("class","col button button-outline colorb doradob elevation-3");
         $$('#Gris').attr("class","col button button-outline colorb grisb elevation-3");
         $$('#Cafe').attr("class","col button button-outline colorb cafeb elevation-3");
         $$('#Amarillo').attr("class","col button button-outline colorb amarillob elevation-3");
         $$('#Blanco').attr("class","col button button-outline colorb blancob elevation-3");
      break;

      case "Blanco":
        
       
        $$('#Blanco').attr("class","col button button-fill colorbpress blancob  elevation-24");
        $$('#Rojo').attr("class","col button button-outline colorb redb elevation-3");
        $$('#Azul').attr("class","col button button-outline colorb azulb elevation-3");
        $$('#Verde').attr("class","col button button-outline colorb verdeb elevation-3");
        $$('#Naranja').attr("class","col button button-outline colorb naranjab elevation-3");
        $$('#Morado').attr("class","col button button-outline colorb moradob elevation-3");
        $$('#Negro').attr("class","col button button-outline colorb negrob elevation-3");
        $$('#Dorado').attr("class","col button button-outline colorb doradob elevation-3");
        $$('#Gris').attr("class","col button button-outline colorb grisb elevation-3");
        $$('#Cafe').attr("class","col button button-outline colorb cafeb elevation-3");
        $$('#Rosa').attr("class","col button button-outline colorb rosab elevation-3");
        $$('#Amarillo').attr("class","col button button-outline colorb amarillob elevation-3");
     break;
    }
    categoria2="";
    detalle2="";
    precio2="";
    marca2="";
    talla2="";
    condicion2="";

    color2=color;
  }
  function AplicarFiltros() {
    mainView.router.navigate('/productos/',{animate:true});
  }

  function setCategoria(categoria){

    marca2="";
    detalle2="";
    talla2="";
    precio2="";
    condicion2="";
    color2="";

    categoria2 = categoria;

    mainView.router.navigate('/productos/',{animate:true});

    //console.log("categoria:-"+categoria2);
    
  }

  function getProductos(){

    

    app7.preloader.show('blue');
    $$('#productos').html("");
  
    app7.request({
      url: 'http://localhost/hoop/api/filtros.php',
      data:{marca:marca2,talla:talla2,precio:precio2,categoria:categoria2,detalle:detalle2,condicion:condicion2,color:color2},
      method:'POST',
      crossDomain: true,
      success:function(data){
           
        app7.preloader.hide();
  
        var objson = JSON.parse(data);

        var producto="";

        for(x in objson.data){

         // console.log(objson.data[x].titulo);

         producto = '<a href="javascript:verproducto('+objson.data[x].id+')" class="card demo-card-header-pic vistaproductos"><div style="background-image:url('+objson.data[x].imagen1+')" class="card-header align-items-flex-end">'+objson.data[x].titulo+'</div><div class="card-content card-content-padding"><p class="date">'+objson.data[x].marca+'</p></div><div class"row"><div class="letraprod" style="padding-left: 20%;">'+objson.data[x].talla+'</div><div class="letraprod" style="padding-left: 10%;">'+objson.data[x].precio+'</div></div> <div class="card-footer"></div></a>';

          $$('#productos').append(producto);
        }

      },
      error:function(error){
  
        app7.preloader.hide();
      }
      });

  }
 
  function getFavoritos(){

    var correo = localStorage.getItem('correo');

    app7.preloader.show('blue');
    $$('#productos').html("");
  
    app7.request({
      url: 'http://localhost/hoop/api/favorito.php',
      data:{correo:correo},
      method:'POST',
      crossDomain: true,
      success:function(data){
           
        app7.preloader.hide();
  
        var objson = JSON.parse(data);

        var producto="";

        for(x in objson.data){

         // console.log(objson.data[x].titulo);

         producto = '<a href="javascript:verproducto('+objson.data[x].id+')" class="card demo-card-header-pic vistaproductos"><div style="background-image:url('+objson.data[x].imagen1+')" class="card-header align-items-flex-end">'+objson.data[x].titulo+'</div><div class="card-content card-content-padding"><p class="date">'+objson.data[x].marca+'</p></div><div class"row"><div class="letraprod" style="padding-left: 20%;">'+objson.data[x].talla+'</div><div class="letraprod" style="padding-left: 10%;">'+objson.data[x].precio+'</div></div> <div class="card-footer"></div></a>';

          $$('#productos').append(producto);
        }

      },
      error:function(error){
  
        app7.preloader.hide();
      }
      });

  }

  function getProductosPerfil(){

    var correo = localStorage.getItem('correo');

    app7.preloader.show('blue');
    $$('#productos').html("");
  
    app7.request({
      url: 'http://localhost/hoop/api/productoperfil.php',
      data:{correo:correo},
      method:'POST',
      crossDomain: true,
      success:function(data){
           
        app7.preloader.hide();
  
        var objson = JSON.parse(data);

        var producto="";

        for(x in objson.data){

         // console.log(objson.data[x].titulo);

         producto = '<a href="javascript:verproducto('+objson.data[x].id+')" class="card demo-card-header-pic vistaproductos"><div style="background-image:url('+objson.data[x].imagen1+')" class="card-header align-items-flex-end">'+objson.data[x].titulo+'</div><div class="card-content card-content-padding"><p class="date">'+objson.data[x].marca+'</p></div><div class"row"><div class="letraprod" style="padding-left: 20%;">'+objson.data[x].talla+'</div><div class="letraprod" style="padding-left: 10%;">'+objson.data[x].precio+'</div></div> <div class="card-footer"></div></a>';

          $$('#productosp').append(producto);
        }

      },
      error:function(error){
  
        app7.preloader.hide();
      }
      });

  }
  
  function verproducto(id){
    idproducto = id;
    mainView.router.navigate('/producto/',{animate:true});
  }

  function getFiltros(marca){

    app7.preloader.show('blue');

    
    $$('#productos').html("");

    app7.request({
      url: 'https://localhost/hoop/api/filtros.php',
      data:{marca:marca},
      method:'POST',
      crossDomain: true,
      success:function(data){
          
        app7.preloader.hide();
  
        var objson = JSON.parse(data);

        var producto="";

        for(x in objson.data){

         // console.log(objson.data[x].titulo);

         producto = '<a href="javascript:verproducto('+objson.data[x].id+')" class="card demo-card-header-pic vistaproductos"><div style="background-image:url('+objson.data[x].imagen1+')" class="card-header align-items-flex-end">'+objson.data[x].titulo+'</div><div class="card-content card-content-padding"><p class="date">'+objson.data[x].marca+'</p></div><div class"row"><div class="letraprod" style="padding-left: 20%;">'+objson.data[x].talla+'</div><div class="letraprod" style="padding-left: 10%;">'+objson.data[x].precio+'</div></div> <div class="card-footer"></div></a>';

          $$('#productos').append(producto);
        }

      },
      error:function(error){
  
        app7.preloader.hide();
      }
      });
  }

 

function ValidaUsuario(){
  var correo = localStorage.getItem('correo');

  if(correo!=""){
    return true;
  }
  else{
    return false;
  }

}

function Favorito(id){

  

  if (ValidaUsuario()){

    

  var producto = id;
  var correo = localStorage.getItem('correo');
  


  app7.request({
    url: 'http://localhost/hoop/api/setfavorito.php',
    data:{correo:correo,producto:producto},
    method:'POST',
    crossDomain: true,
    success:function(resultado){

     

      var objson = JSON.parse(resultado);

      if(objson.data=="ELIMINADO"){ //sin color

       

        $$('#favorito-producto').attr('class','f7-icons');

      }else{ //color en rojo f7-icons

        $$('#favorito-producto').attr('class','f7-icons redfav');
      }

    },
    error:function(error){

      alert("error");
  
    }
    });}
    else { 
      alert('Es necesario registrarse para guardar un favorito')
    }
}


  function Cancelar () {

    mainView.router.navigate('/start/',{animate:true});
  }

  function CerrarSesion (){

    //checkConnection();
    localStorage.setItem("team-login", "false");
    localStorage.setItem("correo", null);
  
    mainView.router.navigate('/start/',{animate:true});
  }