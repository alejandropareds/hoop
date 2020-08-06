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
      {
        path: '/productos/',
        url: 'views/productos.html',
      },
      {
        path: '/producto/',
        url: 'views/producto.html',
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

  $$(document).on('page:init','.page[data-name="productos"]',function(e){

    //alert("alerta");
    getPromo();
    getProductos();
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



  function getProductos(){
  
    app7.preloader.show('blue');
    $$('#productos').html("");
  
    app7.request({
      url: 'http://localhost/hoop/api/productos.php',
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

          $$('#productos').append(producto)
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

  $$(document).on('page:init', '.page[data-name="producto"]', function (e) {

  

    app7.preloader.show('blue');
    

    app7.request({
      url: 'http://localhost/hoop/api/producto.php',
      data:{id:idproducto},
      method:'POST',
      crossDomain: true,
      success:function(data){
           
        app7.preloader.hide();

        var objson = JSON.parse(data);

        var producto= "";


        //console.log(objson.data.titulo);


        $$('#titulo-producto').html(objson.data.titulo);
        $$('#talla-producto').html(objson.data.talla);
        $$('#precio-producto').html(objson.data.precio);


        $$('#imagen1-producto').html('<img src="'+objson.data.imagen1+'" width="100%"/>');   
      
      },
      error:function(error){

        app7.preloader.hide();
      
      }
      
      });

});

 


  function Cancelar () {

    mainView.router.navigate('/start/',{animate:true});
  }

  function CerrarSesion (){

    //checkConnection();
    localStorage.setItem("team-login", "false");
  
    mainView.router.navigate('/start/',{animate:true});
  }