var $$ = Dom7;

var app = {
    /* // Application Constructor
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
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
    */
};

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

 

  $$(document).on('page:init','.page[data-name="home"]',function(e){

  //alert("alerta");
  getPromo();
  });

  function getPromo(){
  
    app7.preloader.show();
  
    app7.request({
      url: 'http://localhost/hoop/api/promociones.php',
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

          console.log(objson.data[x].titulo);

          var slide = '<div class="swiper-slide"><img src="'+objson.data[x].imagen+'" /></div>';

          swiper.appendSlide(slide);
        }

      },
      error:function(error){
  
        app7.preloader.hide();
      }
      });

  }

  function Cancelar () {

    mainView.router.navigate('/start/',{animate:true});
  }

  function CerrarSesion (){

    //checkConnection();
    localStorage.setItem("team-login", "false");
  
    mainView.router.navigate('/start/',{animate:true});
  }