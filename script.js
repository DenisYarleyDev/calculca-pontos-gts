document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando...');
    
    const pointsInput = document.getElementById('points');
    const calculateBtn = document.getElementById('calculate');
    const resultSection = document.getElementById('result');
    const timeResult = document.getElementById('timeResult');
    const formattedTime = document.getElementById('formattedTime');

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

    console.log('Todos os elementos encontrados com sucesso!');

    // Função para calcular o tempo
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

    // Função para mostrar resultado
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

    // Event listener para o botão calcular
    calculateBtn.addEventListener('click', function() {
        console.log('Botão clicado!');
        const points = pointsInput.value.trim();
        console.log('Valor do input:', points);
        const seconds = calculateTime(points);
        showResult(seconds);
    });

    // Event listener para Enter no input
    pointsInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            console.log('Enter pressionado!');
            const points = pointsInput.value.trim();
            const seconds = calculateTime(points);
            showResult(seconds);
        }
    });

    // Event listener para input em tempo real
    pointsInput.addEventListener('input', function() {
        const points = pointsInput.value.trim();
        console.log('Input alterado:', points);
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

    // Foco no input ao carregar a página
    pointsInput.focus();
    console.log('Foco definido no input');
    console.log('Aplicação inicializada com sucesso!');
    
    // Teste inicial
    console.log('Testando com diferentes entradas:');
    console.log('Teste 1 - Números:', calculateTime('5'));
    console.log('Teste 2 - Pontos finais:', calculateTime('...'));
    console.log('Teste 3 - Pontos finais:', calculateTime('....'));
    console.log('Teste 4 - Misturado:', calculateTime('5...'));
});
