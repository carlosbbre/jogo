//let titulo =document.querySelector('h1');
//titulo.innerHTML = 'jogo do numero secreto';
//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML='escolha um numero entre 1 e 10';
let listaDeNumerosSorteados=[];
let numeroLimite= parseInt(Math.random() * 100+1);
let numeroSecreto = gerarNumeroAleatorio();
let tentativas=1;

function exibirTextoNaTela(tag,Texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = Texto;
    responsiveVoice.speak(Texto, 'Brazilian portuguese famale',{rate:1.2});
}
 function exibirMensagemInicial() {
    exibirTextoNaTela('h1','jogo do número secreto');
    exibirTextoNaTela('p',`escolha um número entre 1 e ${numeroLimite}`);
 }
 exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

     if (chute==numeroSecreto){
        exibirTextoNaTela('h1','acertou!');
        let palavraTentativas= tentativas> 1? 'tentativas':'tentativa';
        let mensagemTentativas=`você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
     } else{
        if(chute>numeroSecreto){
            exibirTextoNaTela('p',`o número secreto é menor que: ${chute}`);
        }else{
            exibirTextoNaTela('p',`o número secreto é maior que: ${chute}`);
        }
        tentativas++;
        linparCampo();
     }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido= parseInt(Math.random() * numeroLimite+1);
    let quantidadeDeElementosnaLista =listaDeNumerosSorteados.length;

    if (quantidadeDeElementosnaLista==numeroLimite){
        listaDeNumerosSorteados=[]
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}
function linparCampo() {
    chute=document.querySelector('input');
    chute.value='';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    linparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}