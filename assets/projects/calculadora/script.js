var display = document.getElementById("display");
var conta = "";

function pressed(valor) {

    if (display.innerText == "Erro") {
        conta = "";
    }

    conta = conta + valor;
    display.innerText = conta;

}


function clearAll() {

    conta = "";
    display.innerText = "";

}


function backspace() {

    conta = conta.slice(0, -1);
    display.innerText = conta;

}


function calculate() {

    if (conta == "") {
        return;
    }

    try {

        var resultado = eval(conta);

        if (isNaN(resultado) || resultado == Infinity || resultado == -Infinity) {
            throw "Erro";
        }

        conta = resultado;
        display.innerText = conta;

    } catch (erro) {

        conta = "";
        display.innerText = "Erro";

    }

}


var botoes = document.querySelectorAll(".btn");

for (var i = 0; i < botoes.length; i++) {

    botoes[i].addEventListener("pointerdown", function() {

        this.style.backgroundImage = "linear-gradient(gray, red)";

    });

}

document.addEventListener("pointerup", function() {

    for (var i = 0; i < botoes.length; i++) {

        botoes[i].style.backgroundImage = "linear-gradient(gray, black)";

    }

});


document.addEventListener("keydown", function(event) {

    var tecla = event.key;

    if (tecla >= "0" && tecla <= "9" ||
        tecla == "." || tecla == "+" ||
        tecla == "-" || tecla == "*" ||
        tecla == "/") {

        pressed(tecla);

    }

    else if (tecla == "Backspace") {

        backspace();

    }

    else if (tecla == "Enter") {

        calculate();

    }

    else if (tecla == "Escape") {

        clearAll();

    }

    else {

        return;

    }

    event.preventDefault();

    for (var i = 0; i < botoes.length; i++) {

        if (botoes[i].innerText == tecla ||
            (tecla == "Backspace" && botoes[i].innerText == "<") ||
            (tecla == "Enter" && botoes[i].innerText == "=") ||
            (tecla == "Escape" && botoes[i].innerText == "C")) {

            botoes[i].style.backgroundImage = "linear-gradient(gray, red)";

        }

    }

});


document.addEventListener("keyup", function() {

    for (var i = 0; i < botoes.length; i++) {

        botoes[i].style.backgroundImage = "linear-gradient(gray, black)";

    }

});


window.addEventListener("blur", function() {

    for (var i = 0; i < botoes.length; i++) {

        botoes[i].style.backgroundImage = "linear-gradient(gray, black)";

    }

});