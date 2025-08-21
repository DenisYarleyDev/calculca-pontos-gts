document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando...');
    
    // Elementos da aba de pontos
    const pointsInput = document.getElementById('points');
    const calculateBtn = document.getElementById('calculate');
    const resultSection = document.getElementById('result');
    const timeResult = document.getElementById('timeResult');
    const formattedTime = document.getElementById('formattedTime');
    
    // Elementos da aba de timeout
    const timeoutText = document.getElementById('timeout-text');
    const countTimeoutBtn = document.getElementById('count-timeout');
    const timeoutResultSection = document.getElementById('timeout-result');
    const timeoutCount = document.getElementById('timeout-count');
    const timeoutInfo = document.getElementById('timeout-info');
    
    // Elementos das abas
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Verificar se todos os elementos foram encontrados
    if (!pointsInput) {
        console.error('Elemento points não encontrado!');
        return;
    }
    if (!calculateBtn) {
        console.error('Botão calculate não encontrado!');
        return;
    }
    if (!resultSection) {
        console.error('Seção result não encontrada!');
        return;
    }
    if (!timeResult) {
        console.error('Elemento timeResult não encontrado!');
        return;
    }
    if (!formattedTime) {
        console.error('Elemento formattedTime não encontrado!');
        return;
    }
    if (!timeoutText) {
        console.error('Elemento timeout-text não encontrado!');
        return;
    }
    if (!countTimeoutBtn) {
        console.error('Botão count-timeout não encontrado!');
        return;
    }
    if (!timeoutResultSection) {
        console.error('Seção timeout-result não encontrada!');
        return;
    }
    if (!timeoutCount) {
        console.error('Elemento timeout-count não encontrado!');
        return;
    }
    if (!timeoutInfo) {
        console.error('Elemento timeout-info não encontrado!');
        return;
    }

    console.log('Todos os elementos encontrados com sucesso!');

    // Sistema de Abas
    function switchTab(tabName) {
        // Remove active de todas as abas
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Adiciona active na aba selecionada
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    // Event listeners para as abas
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    // Função para calcular o tempo (aba de pontos)
    function calculateTime(points) {
        console.log('Calculando tempo para:', points);
        console.log('Tipo do input:', typeof points);
        console.log('Comprimento:', points.length);
        
        // Remove espaços e caracteres especiais, mantendo apenas pontos finais e números
        const cleanPoints = points.replace(/[^\d.]/g, '');
        console.log('Pontos limpos:', cleanPoints);
        console.log('Comprimento limpo:', cleanPoints.length);
        
        if (!cleanPoints) {
            console.log('Nenhum ponto válido encontrado');
            return 0;
        }

        let pointCount = 0;

        // Se contém apenas números, usa o número diretamente
        if (/^\d+$/.test(cleanPoints)) {
            pointCount = parseInt(cleanPoints);
            console.log('Usando número:', pointCount);
        } else {
            // Conta os pontos finais (.)
            const pointMatches = cleanPoints.match(/\./g) || [];
            pointCount = pointMatches.length;
            console.log('Pontos encontrados:', pointMatches);
            console.log('Contando pontos:', pointCount);
        }

        // Cada ponto = 2 segundos
        const result = pointCount * 2;
        console.log('Resultado final:', result, 'segundos');
        return result;
    }

    // Função para formatar o tempo
    function formatTime(seconds) {
        if (seconds < 60) {
            return `${seconds} segundo${seconds !== 1 ? 's' : ''}`;
        } else if (seconds < 3600) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            let result = `${minutes} minuto${minutes !== 1 ? 's' : ''}`;
            if (remainingSeconds > 0) {
                result += ` e ${remainingSeconds} segundo${remainingSeconds !== 1 ? 's' : ''}`;
            }
            return result;
        } else {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;
            let result = `${hours} hora${hours !== 1 ? 's' : ''}`;
            if (minutes > 0) {
                result += ` e ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
            }
            if (remainingSeconds > 0) {
                result += ` e ${remainingSeconds} segundo${remainingSeconds !== 1 ? 's' : ''}`;
            }
            return result;
        }
    }

    // Função para mostrar resultado dos pontos
    function showResult(seconds) {
        console.log('Mostrando resultado:', seconds);
        timeResult.textContent = seconds;
        formattedTime.textContent = formatTime(seconds);
        resultSection.style.display = 'block';
        
        // Adiciona animação
        resultSection.style.animation = 'none';
        resultSection.offsetHeight; // Trigger reflow
        resultSection.style.animation = 'fadeIn 0.5s ease';
    }

    // Função para contar timeouts
    function countTimeouts(text) {
        console.log('Contando timeouts no texto:', text);
        
        if (!text || text.trim() === '') {
            console.log('Texto vazio');
            return 0;
        }

        // Conta as ocorrências de "Request time out" (case insensitive)
        const timeoutRegex = /Request time out/gi;
        const matches = text.match(timeoutRegex) || [];
        const count = matches.length;
        
        console.log('Timeouts encontrados:', count);
        return count;
    }

    // Função para mostrar resultado dos timeouts
    function showTimeoutResult(count) {
        console.log('Mostrando resultado de timeouts:', count);
        timeoutCount.textContent = count;
        
        let info = '';
        if (count === 0) {
            info = 'Nenhum timeout encontrado no texto';
        } else if (count === 1) {
            info = '1 timeout encontrado';
        } else {
            info = `${count} timeouts encontrados`;
        }
        
        timeoutInfo.textContent = info;
        timeoutResultSection.style.display = 'block';
        
        // Adiciona animação
        timeoutResultSection.style.animation = 'none';
        timeoutResultSection.offsetHeight; // Trigger reflow
        timeoutResultSection.style.animation = 'fadeIn 0.5s ease';
    }

    // Event listener para o botão calcular pontos
    calculateBtn.addEventListener('click', function() {
        console.log('Botão calcular pontos clicado!');
        const points = pointsInput.value.trim();
        console.log('Valor do input:', points);
        const seconds = calculateTime(points);
        showResult(seconds);
    });

    // Event listener para Enter no input de pontos
    pointsInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            console.log('Enter pressionado no input de pontos!');
            const points = pointsInput.value.trim();
            const seconds = calculateTime(points);
            showResult(seconds);
        }
    });

    // Event listener para input em tempo real dos pontos
    pointsInput.addEventListener('input', function() {
        const points = pointsInput.value.trim();
        console.log('Input de pontos alterado:', points);
        if (points) {
            const seconds = calculateTime(points);
            if (seconds > 0) {
                showResult(seconds);
            } else {
                resultSection.style.display = 'none';
            }
        } else {
            resultSection.style.display = 'none';
        }
    });

    // Event listener para o botão contar timeouts
    countTimeoutBtn.addEventListener('click', function() {
        console.log('Botão contar timeouts clicado!');
        const text = timeoutText.value.trim();
        console.log('Texto do timeout:', text);
        const count = countTimeouts(text);
        showTimeoutResult(count);
    });

    // Event listener para textarea de timeout em tempo real
    timeoutText.addEventListener('input', function() {
        const text = timeoutText.value.trim();
        console.log('Textarea de timeout alterado:', text);
        if (text) {
            const count = countTimeouts(text);
            if (count > 0) {
                showTimeoutResult(count);
            } else {
                timeoutResultSection.style.display = 'none';
            }
        } else {
            timeoutResultSection.style.display = 'none';
        }
    });

    // Foco no input ao carregar a página
    pointsInput.focus();
    console.log('Foco definido no input de pontos');
    console.log('Aplicação inicializada com sucesso!');
    
    // Teste inicial
    console.log('Testando com diferentes entradas:');
    console.log('Teste 1 - Números:', calculateTime('5'));
    console.log('Teste 2 - Pontos finais:', calculateTime('...'));
    console.log('Teste 3 - Pontos finais:', calculateTime('....'));
    console.log('Teste 4 - Misturado:', calculateTime('5...'));
    
    // Teste de timeout
    const testTimeoutText = `Reply from 172.16.32.69: bytes=56 time=40 ms
Request time out
Request time out
Reply from 172.16.32.69: bytes=56 time=39 ms`;
    console.log('Teste de timeout:', countTimeouts(testTimeoutText));
});
