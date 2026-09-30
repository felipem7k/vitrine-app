// js/main.js
import {
    obterServicos, salvarServico,
    atualizarServico, removerServico
} from './services/vitrineService.js';
import {
    renderizarCards, exibirToast
} from './views/vitrineView.js';
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCadastro');
    const container = document.getElementById('vitrineContainer');
    const filtroCategoria = document.getElementById('filtroCategoria');
    const contadorEl = document.getElementById('totalServicosBadge');
    const modalEl = document.getElementById('modalCadastro');
    const servicoIdInput = document.getElementById('servicoId');
    function atualizarInterface() {
        const todos = obterServicos();
        const filtro = filtroCategoria.value;
        const filtrados = filtro === 'todas'
            ? todos
            : todos.filter(s => s.categoria === filtro);
        renderizarCards(filtrados, container);
        if (contadorEl) {
            contadorEl.innerText = `${todos.length} cadastrados`;
        }
    }
    // Filtros Reativos
    filtroCategoria.addEventListener('change', atualizarInterface);
    atualizarInterface();
    // Reset do Modal ao abrir para novo cadastro
    if (modalEl) {
        modalEl.addEventListener('show.bs.modal', () => {
            if (!servicoIdInput.value) {
                form.reset();
                form.classList.remove('was-validated');
                const modalTitulo = document.getElementById('modalCadastroLabel');
                if (modalTitulo) {
                    modalTitulo.innerHTML = '<i class="bi bi-shop text-success me-2"></i>Cadastrar Serviço na Vitrine';
                }
                const btnSalvarTexto = document.getElementById('btnSalvarTexto');
                if (btnSalvarTexto) {
                    btnSalvarTexto.innerText = 'Salvar na Vitrine';
                }
            }
        });
        modalEl.addEventListener('hidden.bs.modal', () => {
            form.reset();
            servicoIdInput.value = '';
            form.classList.remove('was-validated');
        });
    }
    // Submissão do Formulário (Create & Update)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        const idAtual = servicoIdInput ? servicoIdInput.value : '';
        const getVal = (id) => document.getElementById(id).value.trim();
        const dados = {
            nome: getVal('nome'),
            categoria: document.getElementById('categoria').value,
            bairro: getVal('bairro'),
            precoBase: parseFloat(getVal('precoBase')) || 0,
            telefone: getVal('telefone'),
            descricao: getVal('descricao')
        };
        if (idAtual) {
            atualizarServico(idAtual, dados);
            exibirToast('Serviço atualizado com sucesso!');
        } else {
            salvarServico(dados);
            exibirToast('Empreendimento cadastrado com sucesso!');
        }
        form.reset();
        if (servicoIdInput) servicoIdInput.value = '';
        form.classList.remove('was-validated');
        if (modalEl) {
            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.hide();
        }
        atualizarInterface();
    });
    // Delegação de Cliques nos Cards (Edit & Delete)
    container.addEventListener('click', (e) => {
        const btnEditar = e.target.closest('.btn-editar');
        if (btnEditar) {
            const id = btnEditar.getAttribute('data-id');
            const item = obterServicos().find(s => s.id === id); if (item) {
                if (servicoIdInput) servicoIdInput.value = item.id;
                document.getElementById('nome').value = item.nome;
                document.getElementById('categoria').value = item.categoria;
                document.getElementById('bairro').value = item.bairro;
                document.getElementById('precoBase').value = item.precoBase;
                document.getElementById('telefone').value = item.telefone;
                document.getElementById('descricao').value = item.descricao;
                const modalTitulo = document.getElementById('modalCadastroLabel');
                if (modalTitulo) {
                    modalTitulo.innerHTML =
                        '<i class="bi bi-pencil-square text-primary me-2"></i>Editar Serviço na Vitrine';
                }
                const btnSalvarTexto = document.getElementById('btnSalvarTexto');
                if (btnSalvarTexto) {
                    btnSalvarTexto.innerText = 'Salvar Alterações';
                }
                if (modalEl) {
                    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                    modal.show();
                }
            }
            return;
        }
        const btnExcluir = e.target.closest('.btn-excluir');
        if (btnExcluir) {
            const id = btnExcluir.getAttribute('data-id');
            if (confirm('Deseja realmente remover este serviço da vitrine?')) {
                removerServico(id);
                atualizarInterface();
                exibirToast('Serviço removido da vitrine.', 'warning');
            }
        }
    });
});