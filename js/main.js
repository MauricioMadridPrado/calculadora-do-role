const form = document.getElementById("formulario")
const lista = document.getElementById("listaCompras")
const total = document.getElementById("valorFinal")
const valorDividido = document.getElementById("totalPorAmigo")
const amigos = document.getElementById("quantidadeAmigos")
const itens = JSON.parse(localStorage.getItem("itens")) || [];
let valorFinal = 0;

const teste = [
    amigos,
    lista
]



amigos.addEventListener ("change", divide)
lista.addEventListener ("change", divide)

function divide() {
    const numeroDeAmigos = document.getElementById("quantidadeAmigos").value
    const totalPorAmigo = parseFloat(valorFinal)/ parseFloat(numeroDeAmigos);
    valorDividido.innerHTML = totalPorAmigo.toFixed(2)
}
itens.forEach((elemento => {
    somaValor(elemento.valor);
    criaItem(elemento);
}))

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const item = evento.target.elements["nomeItem"];
    const valor = evento.target.elements["valor"];
    const itemAtual = {
        "item": item.value,
        "valor": valor.value
    }
    const existe = itens.find(elemento => elemento.item === itemAtual.item)

    if(existe){
        itemAtual.id = existe.id;
        alteraValor(itemAtual)
        valorFinal = 0;
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
        itens.forEach((elemento => {
            somaValor(elemento.valor);
        }))
    } else {
        itemAtual.id = itens[itens.length -1] ? itens[itens.length-1].id + 1 :0;
        criaItem(itemAtual);
        itens.push(itemAtual)
        somaValor(itemAtual.valor);

    }
    localStorage.setItem("itens", JSON.stringify(itens))
    divide()
    item.value = "";
    valor.value = "";  
})

function criaItem(itemAtual) {
    const linha = document.createElement("tr")
    const novoItem = document.createElement("td")
    novoItem.innerHTML = itemAtual.item;
    const itemValor = document.createElement("td")
    itemValor.innerHTML = itemAtual.valor + " R$";
    itemValor.dataset.id = (itemAtual.id);
    const botaoDeleta = (criaBotaoDeleta(itemAtual.id, itemAtual.valor));
    botaoDeleta.classList.add("botaoDeleta")
    linha.appendChild(novoItem);
    linha.appendChild(itemValor);
    linha.appendChild(botaoDeleta);
    lista.appendChild(linha); 
}

function somaValor(valor){
    let valorAjustado = parseFloat(valor.replace(',','.'));
    valorFinal += parseFloat(valorAjustado);
    total.innerHTML = valorFinal.toFixed(2);
}
function subtraiValor(valor){
    let valorAjustado = parseFloat(valor.replace(',','.'));
    valorFinal -= parseFloat(valorAjustado);
    total.innerHTML = valorFinal.toFixed(2);
}

function alteraValor (item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.valor +" R$";
}

function criaBotaoDeleta(id, valor) {
    const botaoDeleta = document.createElement("button")
    botaoDeleta.innerHTML= "X";
    botaoDeleta.addEventListener("click", function(evento) {
        deletaLinha(evento.target.parentNode, id, valor)
    })
    return botaoDeleta;
}
function deletaLinha(tag, id,valor) {
    subtraiValor(valor);
    itens.splice(itens[id],1);
    localStorage.setItem("itens", JSON.stringify(itens));
    tag.remove();
    divide()
}
const reseta = document.getElementById("resetar");
reseta.addEventListener("click", () => {
    location.reload();
    localStorage.clear();
})