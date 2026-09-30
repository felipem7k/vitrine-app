// js/views/vitrineView.js (Parte 1: Template do Card)
import { formatarMoeda, formatarTelefone, escapeHtml }
    from '../utils/formatters.js';
const CORES_CATEGORIA = {
    'Alimentação': 'success',
    'Tecnologia': 'info',
    'Artesanato': 'warning',
    'Serviços Gerais': 'primary',
    'Turismo': 'secondary'
};
export function criarCardHtml(s) {
    const corBadge = CORES_CATEGORIA[s.categoria] || 'primary';
    const tel = (s.telefone || '').replace(/\D/g, '');
    return `
<div class="col-md-6 col-lg-4 mb-4">
<div class="card h-100 shadow-sm border-0 vitrine-card rounded-4 overflow-hidden">
<div class="card-body p-4 d-flex flex-column">
<div class="d-flex justify-content-between align-items-center mb-2">
<span class="badge bg-${corBadge} px-3 py-2 rounded-pill font-outfit">
<i class="bi bi-tag-fill me-1"></i>${escapeHtml(s.categoria)}
</span>
<span class="fw-bold text-success font-outfit fs-5">
${formatarMoeda(s.precoBase)}
</span>
</div>
<h5 class="card-title fw-bold text-dark mt-2 mb-1">${escapeHtml(s.nome)}</h5>
<h6 class="text-muted small mb-3">
<i class="bi bi-geo-alt-fill text-danger me-1"></i>
${escapeHtml(s.bairro)}
</h6>
<p class="card-text text-secondary small flex-grow-1" style="line-height: 1.5;">
${escapeHtml(s.descricao)}
</p>
<hr class="my-3 text-muted opacity-25">
<div class="d-flex justify-content-between align-items-center mt-auto">
<a href="https://wa.me/55${tel}" target="_blank"
class="btn btn-sm btn-outline-success rounded-pill px-3 fw-bold">
<i class="bi bi-whatsapp me-1"></i>
${formatarTelefone(s.telefone)}
</a>
<div class="d-flex gap-1">
<button class="btn btn-sm btn-outline-primary btn-editar rounded-pill px-2"
data-id="${s.id}" title="Editar">
<i class="bi bi-pencil-square"></i>
</button>
<button class="btn btn-sm btn-outline-danger btn-excluir rounded-pill px-2"
data-id="${s.id}" title="Excluir">
<i class="bi bi-trash"></i>
</button>
</div>
</div>
</div>
</div>
</div>`;
}
// js/views/vitrineView.js (Parte 2: Renderização e Estado Vazio)
export function renderizarCards(servicos, container) {
    if (!servicos || servicos.length === 0) {
        container.innerHTML = `
<div class="col-12 text-center py-5">
<i class="bi bi-inbox fs-1 text-muted"></i>
<h5 class="text-muted mt-2">
Nenhum serviço cadastrado nesta categoria.
</h5>
</div>`;
        return;
    }
    container.innerHTML = servicos.map(criarCardHtml).join('');
}
// js/views/vitrineView.js (Parte 3: Notificações Flutuantes Toasts)
export function exibirToast(mensagem, tipo = 'success') {
    const toastEl = document.getElementById('toastNotificacao');
    const toastBody = document.getElementById('toastMensagem');
    if (toastEl && toastBody) {
        toastBody.innerText = mensagem;
        toastEl.className =
            `toast align-items-center text-bg-${tipo} border-0`;
        const toast = bootstrap.Toast.getOrCreateInstance(toastEl);
        toast.show();
    }
}