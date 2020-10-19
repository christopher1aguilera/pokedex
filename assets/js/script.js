$(document).ready(function(){
    //funcion de boton
    let consultar = $("#consultar")
    consultar.on("click", function () {
        //almacenar numero ingresado
        let num1 = $("#pokemon").val()
        //validando el numero ingresado sea entero, entre el 1 y 807
        if ((1 <= num1) && (num1 <= 807) && ((num1 % 1) == 0)) {
            //animacion agrandar la imagen del pokemon
            $("img").click(function(){
                var img = $("img");
                img.animate({height: '400px', width: '400px'});
                $("#nombre").css({"text-align": "center"});
                $("#peso").css({"text-align": "center"});
            });
            //animacion al mostrar contenido del pokemon
            $(".collapse").fadeOut();
            $(".collapse").fadeIn(1000);
            //llamando el api y ingresando una variable para cambiarlo dependiendo el numero ingresado
            let poke1 = "https://pokeapi.co/api/v2/pokemon/" + num1 + "/"
            var dataPoints = [];
            //grafica
            var options = {
                animationEnabled: true,
                theme: "light1",
                title: {
                    text: "stats base"
                },
                axisX: {
                    title: "value"
                },
                axisY: {
                    title: "stats",
                    includeZero: true
                },
                data: [{
                    type: "column",
                    dataPoints: dataPoints
                }]
            };
            //llamando api para extraer los objetos para crear el grafico y informacion del pokemon
            $.ajax({
                type:"GET",
                url: poke1,
                dataType:"json",
                success: function(datos) {
                    //datos estadisticas
                    let datosApi = datos.stats;
                    //datos peso
                    let datosApi1 = datos.weight;
                    //datos del pokemon
                    let datosApi2 = datos.forms;
                    //ciclo para agregar todas las caracteristicas del pokemon
                    for (var i = 0; i < datosApi.length; i++) {
                        //if para agregar el ultimo dato para la grafica y agregar la informacion del pokemon
                        if (i == datosApi.length - 1) {
                            //agregando datos a la grafica
                            dataPoints.push({
                            label: `${datosApi[i].stat.name}`,
                            y: datosApi[i].base_stat                              
                            });
                            dataPoints = dataPoints.reverse()
                            //añadir informacion del pokemon y imagen
                            $("#peso").html(`${datosApi1 / 10} [kg]`)
                            $("#nombre").html(`${datosApi2[0].name}`)
                            $("#imagen").attr("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + num1 + ".png");
                            $(".alerta").append(`<p>ID: ${dataPoints[i].label} - Name:
                            ${dataPoints[i].y}</p>`);
                            $("#chartContainer").click(function(){
                             });
                        }
                        else {
                            dataPoints.push({
                                label: `${datosApi[i].stat.name}`,
                                y: datosApi[i].base_stat     
                                });
                            }
                        }
                    //llamando grafica con los datos guardados y presentado en la grafica
                    $("#chartContainer").CanvasJSChart(options);
                    },
                error: function(error) {
                    console.log(error)
                }
            });
        }
        else {
            alert("ingrese numero valido entre 1 a 807")
        }
    });
})