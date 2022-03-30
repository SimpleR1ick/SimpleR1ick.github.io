// Autor: Henrique Dalmagro
// Matricula: 20201tiimi0365
/* #########################
Quadrado magico !
######################### */

// Variaveis globais
const ordem = 3
const somaNumeros = 15
const matriz = Array(ordem)

for (let i = 0; i < matriz.length; i++) {
    matriz[i] = Array(ordem)
}

document.addEventListener('DOMContentLoaded', () => {
    insereTabela()
})

function insereTabela() {
    const tabela = document.createElement('table')
    tabela.id = 'quadradomagico'
    document.body.append(tabela)

    for (let i = 0; i < ordem; i++) {
        const linha = document.createElement('tr')
        tabela.append(linha)

        for (let j = 0; j < ordem; j++) {
            const celula = document.createElement('td')
            linha.append(celula)
            celula.id = `lin${i}col${j}`
            insereInput(celula)
        }
    }
}

function getLinhaColuna(celula) {
    const [linha, coluna] = celula.id.split('col')

    return [linha.split('lin')[1], coluna]
}

function insereInput(celula) {
    const input = document.createElement('input')
    celula.append(input)
    input.addEventListener('change', () => {
        const valor = parseInt(input.value)
        const [linha, coluna] = getLinhaColuna(celula)
        matriz[linha][coluna] = valor
        const quadradoCompleto = verificaMatriz()

        if (quadradoCompleto) {
            document.querySelector('#quadradomagico').classList.add('vitoria')
            document.querySelectorAll('input').forEach(input => {
                input.readOnly = true
            })
            criaConcluido()
            criaReiniciar()
        }
    })
}

function criaConcluido() {
    const concluido = document.createElement('p')
    parabens.innerText = 'Você concluiu o desafio'
    document.body.append(concluido)
}

function criaReiniciar() {
    const reiniciar = document.createElement('button')
    reiniciar.innerText = 'Reiniciar'
    document.body.append(reiniciar)
    reiniciar.addEventListener('click', () => {
        const tabela = document.querySelector('#quadradomagico')
        const concluido = document.querySelector('p')
        tabela.remove()
        concluido.remove()
        reiniciar.remove()
        insereTabela()
    })
}

function verificaMatriz() {
    const numerosRepetidos = verificaNumerosRepetidos()
    const numerosForaDosLimites = verificaNumerosForaDosLimites()
    const todasSomaOK = verificaSomas()
    return !numerosRepetidos && !numerosForaDosLimites && todasSomaOK
}

function verificaSomas() {
    const diagonalPrincpalOK = verificaSomaDiagonalPrincipal()
    const diagonalSegundariaOK = verificaSomaDiagonalSecundaria()
    const todasLinhasOK = verificaSomaLinhas()
    const todasColunasOK = verificaSomaColunas()
    return (
        diagonalPrincpalOK &&
        diagonalSegundariaOK &&
        todasLinhasOK &&
        todasColunasOK
    )
}

function verificaSomaColunas() {
    let todasColunasOK = true
    for (let j = 0; j < ordem; j++) {
        todasColunasOK &= verificaSomaColuna(j)
    }
    return todasColunasOK
}

function verificaSomaLinhas() {
    let todasLinhasOK = true
    for (let i = 0; i < ordem; i++) {
        todasLinhasOK &= verificaSomaLinha(i)
    }
    return todasLinhasOK
}

function celulaVazia(celula) {
    const [i, j] = celula
    return matriz[i][j] == null
}

function somaValores(total, celula) {
    const [i, j] = celula
    return total + matriz[i][j]
}

function verificaSomaCelulas(celulas, classe) {
    if (celulas.some(celulaVazia)) return false
    const soma = celulas.reduce(somaValores, 0)

    if (soma != somaNumeros) {
        acaoClasseCelulas(atribuiClasseCelula, classe, celulas)
        return false
    } else {
        acaoClasseCelulas(removeClasseCelula, classe, celulas)
        return true
    }
}

function acaoClasseCelulas(acao, classe, celulas) {
    celulas.map(celula => {
        const [i, j] = celula
        acao(classe, i, j)
    })
}

function verificaSomaColuna(j) {
    let celulas = []
    for (let i = 0; i < ordem; i++) {
        celulas[i] = [i, j]
    }
    return verificaSomaCelulas(celulas, 'somaErradaColuna')
}

function verificaSomaLinha(j) {
    let celulas = []
    for (let i = 0; i < ordem; i++) {
        celulas[i] = [j, i]
    }
    return verificaSomaCelulas(celulas, 'somaErradaLinha')
}

function verificaSomaDiagonalSecundaria() {
    let celulas = []
    for (let i = 0; i < ordem; i++) {
        celulas[i] = [i, ordem - i - 1]
    }
    return verificaSomaCelulas(celulas, 'somaErradaDiagonalSecundaria')
}

function verificaSomaDiagonalPrincipal() {
    let celulas = []
    for (let i = 0; i < ordem; i++) {
        celulas[i] = [i, i]
    }
    return verificaSomaCelulas(celulas, 'somaErradaDiagonalPrincipal')
}

function verificaNumerosForaDosLimites() {
    const minimo = 1
    const maximo = ordem ** 2
    let numerosForaDosLimites = false

    for (let i = 0; i < ordem; i++) {
        for (let j = 0; j < ordem; j++) {
            if (matriz[i][j] < minimo || matriz[i][j] > maximo) {
                numerosForaDosLimites = true
                atribuiClasseCelula('foraDosLimites', i, j)
            } else {
                removeClasseCelula('foraDosLimites', i, j)
            }
        }
    }
    return numerosForaDosLimites
}

function verificaNumerosRepetidos() {
    const numeros = Array(ordem ** 2).fill(0)
    let numerosRepetidos = false

    for (let i = 0; i < ordem; i++) {
        for (let j = 0; j < ordem; j++) {
            const valor = matriz[i][j]
            if (!isNaN(valor)) {
                numeros[valor - 1]++
            }
        }
    }
    for (let i = 0; i < ordem; i++) {
        for (let j = 0; j < ordem; j++) {
            const valor = matriz[i][j]

            if (!isNaN(valor) && numeros[valor - 1] > 1) {
                numerosRepetidos = true
                atribuiClasseCelula('numerosRepetidos', i, j)
            } else {
                removeClasseCelula('numerosRepetidos', i, j)
            }
        }
    }
    return numerosRepetidos
}

function atribuiClasseCelula(classe, i, j) {
    const celula = document.querySelector(`#lin${i}col${j}`)
    celula.classList.add(classe)
}

function removeClasseCelula(classe, i, j) {
    const celula = document.querySelector(`#lin${i}col${j}`)
    celula.classList.remove(classe)
}
