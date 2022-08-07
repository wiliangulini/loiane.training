var MinhaVar = 'Minha variavel';

function minhaFunc(x, y) {
   return x + y;
}

let num = 2;
const PI = 3.141592653589793;

var numeros = [1, 2, 3];

numeros.map(function (valor) {
   return valor * 2;
})

numeros.map(valor => valor * 2);

class Matematica {
   soma(x, y) { 
      return x + y;
   }
}