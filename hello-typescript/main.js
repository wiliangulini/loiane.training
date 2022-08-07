var MinhaVar = 'Minha variavel';
function minhaFunc(x, y) {
    return x + y;
}
var num = 2;
var PI = 3.141592653589793;
var numeros = [1, 2, 3];
numeros.map(function (valor) {
    return valor * 2;
});
numeros.map(function (valor) { return valor * 2; });
var Matematica = /** @class */ (function () {
    function Matematica() {
    }
    Matematica.prototype.soma = function (x, y) {
        return x + y;
    };
    return Matematica;
}());
