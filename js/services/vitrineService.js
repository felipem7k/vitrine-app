const STORAGE_KEY = 'garopaba_vitrine_servicos';
export function obterServicos() {
    const dados = localStorage.getItem(STORAGE_KEY);
    return dados ? JSON.parse(dados) : [];
}

export function salvarServico(novoServico) {
    const servicos = obterServicos();
    const servicoCompleto = {
        id: Date.now().toString(),
        dataCadastro: new Date().toISOString(),
        ...novoServico
    };
    servicos.push(servicoCompleto);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(servicos));
    return servicoCompleto;
}

export function removerServico(id) {
    const servicos = obterServicos();
    const filtrados = servicos.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtrados));
    return filtrados;
}