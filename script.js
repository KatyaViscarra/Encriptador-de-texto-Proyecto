const TextoEntrada = document.getElementById("textarea"),
      iconoP = document.getElementById("icono-inf"),
      iconoSvg = document.getElementById("icono-design"),
      btnEncriptar = document.getElementById("btn-encriptar"),
      btnDesencriptar = document.getElementById("btn-desencriptar"),
      textoEncriptado = document.getElementById("texto-encriptado"),
      btnCopiar = document.getElementById("btn-copiar"),
      imagenBusqueda = document.getElementById("img-search");
      sinTexto = document.getElementById("sin-texto"),
      svg = document.getElementById("svg"),
      elementosOcultar = document.querySelectorAll(
  "#btnCopiar, #textoEncriptado"
),
      elementosMostrar = document.querySelectorAll(
  "#img-search, #sin-texto"
);

function MOElemenos(elementosOcultar, elementosMostrar) {
  elementosOcultar.forEach((elemento) => (elemento.style.display = "none"));
  elementosMostrar.forEach((elemento) => (elemento.style.display = "block"));
}

TextoEntrada.addEventListener("input", function () {
  let texto = TextoEntrada.value;
  let expresionRegular1 = /[\u0300-\u036f]/g;
  let expresionRegular2 = /[^a-z0-9.,?\n ]/g;
  let resultado1 = texto.match(expresionRegular1);
  let resultado2 = texto.match(expresionRegular2);

  if (resultado1 || resultado2) {
    iconoP.style.color = "red";
    iconoSvg.style.stroke = "red";
    btnEncriptar.disabled = true;
    btnDesencriptar.disabled = true;
  } else {
    iconoP.style.color = "#495057";
    iconoSvg.style.stroke = "#495057";
    btnEncriptar.disabled = false;
    btnDesencriptar.disabled = false;
  }

  if (texto.trim() == "") {
    MOElemenos(
      [btnCopiar, textoEncriptado],
      [imagenBusqueda, sinTexto]
    );
  }

});

function limpiar() {
  TextoEntrada.value = "";
  iconoP.style.color = "#495057";
  iconoSvg.style.stroke = "#495057";
  MOElemenos(
    [btnCopiar, textoEncriptado],
    [imagenBusqueda, sinTexto]
  );
  TextoEntrada.focus();
}

svg.addEventListener("click", limpiar);

const encrypt = {
  "e": "enter",
  "i": "imes",
  "a": "ai",
  "o": "ober",
  "u": "ufat"
};

const decrypt = {
  "enter": "e",
  "imes": "i",
  "ai": "a",
  "ober": "o",
  "ufat": "u"
};

function encriptar() {
  let texto = TextoEntrada.value;
  if (texto != "") {
    for (let key in encrypt) {
      texto = texto.replace(new RegExp(key, "g"), encrypt[key]);
    }
    mostrarTextoEncriptado(texto);
  }
}

function desencriptar() {
  let texto = TextoEntrada.value;
  if (texto != "") {
    for (let key in decrypt) {
      texto = texto.replace(new RegExp(key, "g"), decrypt[key]);
    }
    mostrarTextoEncriptado(texto);
  }
}

function mostrarTextoEncriptado(texto) {
  textoEncriptado.value = texto;
  imagenBusqueda.style.display = "none";
  sinTexto.style.display = "none";
  btnCopiar.style.display = "block";
  textoEncriptado.style.display = "block";
}

btnEncriptar.addEventListener("click", encriptar);
btnDesencriptar.addEventListener("click", desencriptar);

btnCopiar.addEventListener("click", function () {
  textoEncriptado.select();
  document.execCommand("copy");
  alert("Texto copiado al portapapeles!");
});
