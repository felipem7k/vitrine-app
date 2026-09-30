// js/services/vitrineService.js
const STORAGE_KEY = 'garopaba_vitrine_servicos';
// Dados semente iniciais para enriquecer a experiência de aprendizado
const DADOS_INICIAIS = [
    {
        id: '1',
        nome: 'Maré Alta Artesanatos & Cerâmicas',
        categoria: 'Artesanato',
        bairro: 'Centro Histórico',
        precoBase: 35.00,
        telefone: '48991234567',
        descricao: 'Peças artesanais e utilitárias modeladas à mão com argila local.'
    },
    {
        id: '2',
        nome: 'Garopaba Web & Design Studio',
        categoria: 'Tecnologia',
        bairro: 'Ferrugem',
        precoBase: 150.00,
        telefone: '48998765432',
        descricao: 'Criação de websites profissionais responsivos e cardápios digitais.'
    },
    {
        id: '3',
        nome: 'Pescado Fresco do Zequinha',
        categoria: 'Alimentação',
        bairro: 'Canto das Canoas',
        precoBase: 42.00,
        telefone: '48984561234',
        descricao: 'Peixes frescos e frutos do mar da pesca artesanal diária.'
    }
];
export function obterServicos() {
    const dados = localStorage.getItem(STORAGE_KEY);
    if (!dados) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DADOS_INICIAIS));
        return DADOS_INICIAIS;
    }
    return JSON.parse(dados);
}
export function salvarServico(novo) {
    const servicos = obterServicos();
    const completo = {
        id: Date.now().toString(),
        dataCadastro: new Date().toISOString(),
        ...novo
    };
    servicos.unshift(completo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(servicos));
    return completo;
}
export function atualizarServico(id, dados) {
    const servicos = obterServicos();
    const idx = servicos.findIndex(s => s.id === id);
    if (idx !== -1) {
        servicos[idx] = {
            ...servicos[idx], ...dados,
            dataEdicao: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(servicos));
        return servicos[idx];
    }
    return null;
}
export function removerServico(id) {
    const servicos = obterServicos().filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(servicos));
    return servicos;
}