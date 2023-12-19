//Variáveis globais
var altura = 0
var largura = 0
var vidas = 1
var tempo = 60
var criaMosquitoTempo = 1500

//Usando o search conseguimos recuperar todos os parâmetros passados depois do "?" incluindo o mesmo
var nivel = window.location.search
//usando o "replace" substituimos o "?" por um valor vazio, recuperando assim apenas o nível escolhido
nivel = nivel.replace('?', '')
//Identifica qual nível foi escolhido
if(nivel === 'normal'){
    var criaMosquitoTempo = 1500

} else if(nivel === 'dificil'){
    var criaMosquitoTempo = 1000

}else if(nivel === 'chucknorris'){
    var criaMosquitoTempo = 750
}

function ajustarTela(){

    //Recupera de forma dinâmica a altura e largura da janela
    altura = window.innerHeight
    largura = window.innerWidth
}

ajustarTela()

//Cria o cronometro
var cronometro = setInterval(function(){
    tempo -= 1
    if(tempo < 0){
        //Reinicia o cronometro
        clearInterval(cronometro)
        //Impede que novos mosquitos continuem aparecendo após a vitória
        clearInterval(criaMosquito)
        //Se ganhar encaminha para página de vitória
        window.location.href = 'vitoria.html'

    } else{
        document.getElementById('cronometro').innerHTML = tempo
    }
    
}, 1000)

function posicaoRandomica(){

    //Remover o mosquito anterior (caso exista) de forma automatica
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()

        //Altera de coração cheio para coração vazio
        if(vidas > 3){
            window.location.href = 'fim_de_jogo.html'

        } else{
            document.getElementById('v' + vidas).src="imagens/coracao_vazio.png"
            vidas++
        }
    }

    //Produz posições na tela de forma randômica
    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    //Estabelece um controle
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    //Criar o elemento mosquito html
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosquito.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'

    //Remover o mosquito quando clicado sem afetar os pontos de vida
    mosquito.onclick = function(){
        this.remove()
    }

    //Adiciona nosso elemento mosquito no final do body no index.html
    document.body.appendChild(mosquito)
    
}

function tamanhoAleatorio(){

    //Produz tamanhos aleatórios entre as 3 classes de Mosquitos
    var classe = Math.floor(Math.random() * 3)
    switch(classe){
        case 0:
            return 'mosquito1'

        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio(){

    //Produz lados aleatórios entre direita e esquerda dos Mosquitos
    var classe = Math.floor(Math.random() * 2)
    switch(classe){
        case 0:
            return 'ladoA'

        case 1:
            return 'ladoB'
    }
}

/* A função Math.random conseguimos recuperar núm. de 0 à 0,99 */
