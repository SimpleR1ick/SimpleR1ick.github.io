document.addEventListener('DOMContentLoaded', inserirBotoesComInnerHTML)

function inserirBotoesComInnerHTML() {
    div = document.createElement('div')
    div.innerHTML = `
    <button onclick="mudartamanho('60')">+</button>
    <button onclick="mudartamanho('25')">-</button>
    `
    document.body.prepend(div)
}

function mudartamanho(tamanho) {
    h2 = document.querySelector('h1')
    h2.style.fontSize = tamanho + 'px'
}
