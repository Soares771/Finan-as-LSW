document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do formulário de login
    const formLogin = document.getElementById('form-login');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const mensagemErro = document.getElementById('mensagem-erro');

    // Adiciona o evento de submissão do formulário
    formLogin.addEventListener('submit', (evento) => {
        evento.preventDefault(); 
        mensagemErro.textContent = ''; // Limpa mensagens anteriores
        
        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();
        
        // --- Credenciais de Teste para Simulação ---
        const emailValido = 'joao@gmail.com';
        const senhaValida = 'senha123'; 

        if (email === emailValido && senha === senhaValida) {
            // SUCESSO NO LOGIN: Redireciona para o dashboard
            alert('Login bem-sucedido! Redirecionando para a Pagina Inicial...');
            window.location.href = "home.html"; 
            
        } else {
            // FALHA NO LOGIN: Exibe a mensagem de erro
            mensagemErro.textContent = 'E-mail ou senha inválidos. Por favor, tente novamente.';
        }
    });
});