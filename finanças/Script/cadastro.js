document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do formulário de cadastro
    const formCadastro = document.getElementById('form-cadastro');
    const senhaInput = document.getElementById('senha-cad');
    const confirmaSenhaInput = document.getElementById('confirma-senha');
    const mensagemErro = document.getElementById('mensagem-erro-cad');
    const nomeInput = document.getElementById('nome'); // Campo adicional

    // Adiciona o evento de submissão do formulário
    formCadastro.addEventListener('submit', (evento) => {
        evento.preventDefault(); 
        mensagemErro.textContent = ''; // Limpa mensagens anteriores
        
        const senha = senhaInput.value.trim();
        const confirmaSenha = confirmaSenhaInput.value.trim();
        
        // 1. Validação de Comprimento da Senha
        if (senha.length < 6) {
            mensagemErro.textContent = 'A senha deve ter no mínimo 6 caracteres.';
            return;
        }

        // 2. Validação de Confirmação de Senha
        if (senha !== confirmaSenha) {
            mensagemErro.textContent = 'As senhas digitadas não coincidem.';
            return;
        }
        
        // SUCESSO NO CADASTRO: Simula o registro e redireciona
        alert('Cadastro de ' + nomeInput.value + ' realizado com sucesso! Redirecionando para a Pagina Inicial...');
        window.location.href = '/finanças/Paginas/home.html'; 
    });
});