function preverAlinhamento(alinhamentos) {
    const n = alinhamentos.length;
    
    // Verifica padrão linear
    const difLinear = alinhamentos[1] - alinhamentos[0];
    if (alinhamentos.every((val, i) => i === 0 || val - alinhamentos[i-1] === difLinear)) {
        return alinhamentos[n-1] + difLinear;
    }
    
    // Verifica padrão quadrático
    const dif2 = alinhamentos[2] - 2*alinhamentos[1] + alinhamentos[0];
    if (alinhamentos.every((val, i) => i < 2 || val - 2*alinhamentos[i-1] + alinhamentos[i-2] === dif2)) {
        return 2*alinhamentos[n-1] - alinhamentos[n-2] + dif2;
    }
    
    // Verifica padrão exponencial
    const razao = alinhamentos[1] / alinhamentos[0];
    if (alinhamentos.every((val, i) => i === 0 || Math.abs(val / alinhamentos[i-1] - razao) < 0.001)) {
        return Math.round(alinhamentos[n-1] * razao);
    }
    
    // Padrão harmônico (baseado na série de Fibonacci)
    if (n >= 3 && alinhamentos.every((val, i) => i < 2 || val === alinhamentos[i-1] + alinhamentos[i-2])) {
        return alinhamentos[n-1] + alinhamentos[n-2];
    }
    
    // Padrão misterioso (sequência de Collatz)
    const collatz = (x) => x % 2 === 0 ? x / 2 : 3 * x + 1;
    if (alinhamentos.every((val, i) => i === 0 || val === collatz(alinhamentos[i-1]))) {
        return collatz(alinhamentos[n-1]);
    }
    
    // Se nenhum padrão for identificado, retorna undefined
    return undefined;
}

function analisarAlinhamento() {
    const input = document.getElementById('alignment-input').value;
    const alinhamentos = input.split(',').map(Number);
    
    if (alinhamentos.length < 3 || alinhamentos.some(isNaN)) {
        alert('Por favor, insira pelo menos 3 números válidos separados por vírgulas.');
        return;
    }
    
    const proximoAlinhamento = preverAlinhamento(alinhamentos);
    const resultado = document.getElementById('resultado');
    
    if (proximoAlinhamento === undefined) {
        resultado.innerHTML = `<p>"Há mais coisas entre o céu e a terra do que nossa vã filosofia"</p>`;
        resultado.innerHTML += `<p>O padrão cósmico é muito complexo para ser previsto!</p>`;
    } else {
        resultado.innerHTML = `<p>Próximo alinhamento previsto: <span style="color: #00ffff; font-size: 1.2em;">${proximoAlinhamento}</span></p>`;
        resultado.innerHTML += `<p>Interpretação cósmica: ${interpretacaoCosmica(proximoAlinhamento)}</p>`;
    }
    
    animarEstrelas();
}

function interpretacaoCosmica(numero) {
    const interpretacoes = [
        "Os planetas se alinharão em uma dança celestial única!",
        "Uma nova constelação será descoberta em breve!",
        "Prepare-se para uma chuva de meteoros espetacular!",
        "Um portal interdimensional pode se abrir brevemente!",
        "As auroras boreais serão visíveis em todo o planeta!"
    ];
    return interpretacoes[numero % interpretacoes.length];
}

function animarEstrelas() {
    const observatory = document.querySelector('.observatory');
    observatory.innerHTML += '<div class="shooting-star"></div>';
    setTimeout(() => {
        observatory.lastChild.remove();
    }, 1000);
}

// Adiciona estrelas cadentes aleatórias
setInterval(() => {
    if (Math.random() < 0.3) {
        animarEstrelas();
    }
}, 2000);
