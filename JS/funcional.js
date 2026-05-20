//CREAR LAS PROPIEDADES DEL OBJETO 

let p = {

    teclas: document.querySelectorAll("#calculadora ul li"),
    accion: null,
    digito: null,
    operaciones: document.querySelector("#operaciones"),
    cantisignos: 0,
    cantdecimal: false,
    resultado: false


}

//crea los metodos

let m ={
    inicio:function()
    {
        for(let i = 0; i < p.teclas.length; i++ )
        {
            p.teclas[i].addEventListener("click",m.oprimirtecla)
        }
        m.teclado();
    },
    oprimirtecla:function(tecla)
    {
        p.accion= tecla.target.getAttribute("class");
        p.digito = tecla.target.innerHTML;
        console.log(p.digito);
        m.calculadora(p.accion,p.digito);

    },
    calculadora: function(accion,digito)
    {
        switch(accion)
        {
            case "numero":
                p.cantisignos = 0;
                //console.log("numero");
                if(p.operaciones.innerHTML == 0)
                    {
                        p.operaciones.innerHTML = digito;
                }else{
                        //p.operaciones.innerHTML += digito;
                        if(p.resultado){
                            p.resultado = false;
                            p.operaciones.innerHTML = digito;
                        }else{
                            p.operaciones.innerHTML += digito;
                        }
                }
            break;
            case "simbolo":
                p.cantisignos ++;
                if(p.cantisignos == 1){

                    if(p.operaciones.innerHTML == 0){
                        p.operaciones.innerHTML = 0;
                    }else{
                        p.operaciones.innerHTML += digito;
                        p.cantdecimal=false;

                    }
                }
                //console.log("simbolo")
    
            break;
            case "decimal":
                if(!p.cantdecimal){
                    p.operaciones.innerHTML += digito;
                    p.cantdecimal = true;
                }
                //console.log("decimal");
            break;
            case "igual":
                //console.log("igual");
                if(/\/\s*0$/.test(p.operaciones.innerHTML)){
                    p.operaciones.innerHTML = "Error: Division en 0";
                    p.resultado = true;
                    break;
                }
                p.operaciones.innerHTML = eval(p.operaciones.innerHTML);
                p.resultado = true;
                p.cantdecimal = false;
                p.cantisignos = 0;
                break;
            
            case "coseno":
                if(p.operaciones.innerHTML !== '' && p.operaciones.innerHTML !== '0'){
                    let gradosCos = parseFloat(p.operaciones.innerHTML);
                    p.operaciones.innerHTML = parseFloat(
                        Math.cos(gradosCos * Math.PI / 180). toFixed(10)
                    );
                    p.resultado = true;

                }
                break;

            case  "seno":
                if(p.operaciones.innerHTML !== '' && p.operaciones.innerHTML !== '0'){
                    let gradosSen = parseFloat(p.operaciones.innerHTML);
                    p.operaciones.innerHTML = parseFloat(
                        Math.sin(gradosSen * Math.PI / 180).toFixed(10)
                    );
                    p.resultado = true;
                }
                break;
            case "exponente":
                if (p.operaciones.innerHTML !== ''){
                    let base = parseFloat(p.operaciones.innerHTML);
                    p.operaciones.innerHTML = Math.pow(base, 2);
                    p.resultado = true;
                }
                break;
            case "raiz":
            if(p.operaciones.innerHTML !== ''){
                let num = parseFloat(p.operaciones.innerHTML);
                if (num < 0){
                    p.operaciones.innerHTML = "Erros: raiz negativa."; 
                } else {
                    p.operaciones.innerHTML = parseFloat(
                        Math.sqrt(num).toFixed(10)
                    );
                }
                p.resultado = true;
            }
            break;

        }
    },
    borrarCalculadora: function(){
        p.operaciones.innerHTML = 0;
    },
    teclado:function(){
        document.addEventListener('keydown', function(e) {
            if(e.key >= '0' && e.key <= '9'){
                m.calculadora('numero', e.key);
            } else if (['+','-','*','/'].includes(e.key)){
                m.calculadora('simbolo', e.key);
            } else if (e.key === '.'){
                m.calculadora('decimal', '.'); 
            } else if (e.key === 'Enter' || e.key === '='){
                m.calculadora('igual', '=');
            }else if (e.key === 'Backspace'){
                const val = p.operaciones.innerHTML;
                p.operaciones.innerHTML = val.length > 1 ? val.slice(0,-1) : '0';
            }else if (e.key === 'Escape'){
                m.borrarCalculadora();
            }
        });

        }
}
m.inicio();