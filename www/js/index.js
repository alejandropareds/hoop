var $$ = Dom7;

var marca ="";
var talla="";
var precio="";
var categoria ="";
var condicion="";
var color="";
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
            url: 'https://hoopbazar.com/api/settoken.php',
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
      url: 'https://hoopbazar.com/api/login.php',
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
    url: 'https://hoopbazar.com/api/users.php',
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

  //alert("alerta");
  getPromo();
  });

  $$(document).on('page:init','.page[data-name="productos"]',function(e){

    //alert("alerta");
    getPromo();
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
        url: 'https://hoopbazar.com/api/producto.php',
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
  
          $$('#favorito-producto').append(id);
        
        },
        error:function(error){
  
          app7.preloader.hide();
        },
        });
  
  });

    $$(document).on('page:init','.page[data-name="perfil"]',function(e){
  
      
    });
  function getPromo(){
  
    app7.preloader.show('blue');
  
    app7.request({
      url: 'https://hoopbazar.com/api/promociones.php',
      data:{},
      method:'POST',
      crossDomain: true,
      success:function(data){
           
        app7.preloader.hide();
  
        var objson = JSON.parse(data);

        var promo="";

        var swiper = app7.swiper.get('.swiper-container');
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


  function getProductos(marca="",talla="",precio="",categoria="",condicion="",color=""){
  
    app7.preloader.show('blue');
    $$('#productos').html("");
  
    app7.request({
      url: 'https://hoopbazar.com/api/filtros.php',
      data:{},
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

  function verproducto(id){
    idproducto = id;
    mainView.router.navigate('/producto/',{animate:true});
  }

  function setMarca(marca){

    mainView.router.navigate('/productos/',{animate:true});
    marca = marca;

  

   setTimeout(function(){ getFiltros(marca)}, 500);

   
  
    

  }

  function getFiltros(marca){

    app7.preloader.show('blue');

    
    $$('#productos').html("");

    app7.request({
      url: 'https://hoopbazar.com/api/filtros.php',
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

  if(correo!="null"){
    return true;
  }
  else{
    return false;
  }

}

function Favorito(id){

  if (ValidaUsuario()){


  var producto = id;
  var usuario = localStorage.getItem('correo');
  


  app7.request({
    url: 'https://localhost/hoop/api/setfavorito.php',
    data:{correo:correo,producto:producto},
    method:'POST',
    crossDomain: true,
    success:function(resultado){

      var objson = JSON.parse(resultado);

      if(objson.data=="ELIMINADO"){ //sin color

        $$('#favorito-'+id).attr('class','f7-icons');

      }else{ //color en rojo f7-icons

        $$('#favorito-'+id).attr('class','f7-icons red');
      }

    },
    error:function(error){

  
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