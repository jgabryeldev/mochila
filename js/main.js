let formulario = document.getElementById('novoItem');
const itens = JSON.parse(localStorage.getItem('itens')) || [];

// Cria todos os meus elementos armazenados no local storage ao recarregar a página
itens.forEach(item => {
    adicionaItem(item);
});

//escuta o evento do formulário e adciona/confere elementos
formulario.addEventListener("submit", function (Event) {
    Event.preventDefault();

    const nomeDigitado = this.elements["nome"];
    const quantidadeDigitada = this.elements["quantidade"];

    //confere se o nome digitado é igual a algum existente na estrutura
    const existe = itens.find(elemento => elemento.nome === nomeDigitado.value);

    const itemAtual = {
        nome: nomeDigitado.value,
        quantidade: quantidadeDigitada.value
    }

    //quando existe o mesmo nome, ele atualiza a quantidade digitada, ao invés de criar um novo item e masntém as IDs, para não ter conflito
    if(existe){
        itemAtual.id = existe.id;
        atualizaItem(itemAtual);
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    }
    //cria nova estrutura e atualiza as IDs para não ter divergência 
    else{
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;
        adicionaItem(itemAtual);
        itens.push(itemAtual);
    }

    localStorage.setItem('itens', JSON.stringify(itens));

    formulario.reset();
})

//cria a minha LI e adiciona a minha estrutura de lista com os values digitados pelo usuário.
function adicionaItem(item) {

    const criaItem = document.createElement('li');

    const adicionaQuantidade = document.createElement('strong');
    adicionaQuantidade.innerHTML = item.quantidade;
    adicionaQuantidade.dataset.id = item.id;

    criaItem.appendChild(adicionaQuantidade);
    criaItem.innerHTML += item.nome;
    criaItem.classList.add('item');

    const lista = document.querySelector("#lista");

    criaItem.appendChild(BotaoremoveItem(item.id));

    lista.appendChild(criaItem);

}

//atualiza os dados da minha quantidade do item, quando for um nome repetido
function atualizaItem(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

//cria o botão que remove a LI com um escutador de eventos
function BotaoremoveItem(id) {
    const botao = document.createElement("button");
    botao.innerText = "x";

    botao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    })

    return botao;
}

//função de deletar o item da minha UL, onde ele remove do meu local storage e atualiza o mesmo
function deletaElemento(elemento, id) { 
    elemento.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}
