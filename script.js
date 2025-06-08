// Variáveis globais
let currentQuoteIndex = 0;
let currentQuestionIndex = 0;
let selectedAnswer = null;
let score = 0;
let quizAnswers = [];

// Dados das frases românticas com personagens
const romanticQuotes = [
    {
        text: "Você me completa.",
        author: " Shrek (para Fiona)",
        image: "img-frase/shrek.jpeg"
    },
    {
        text: "Com você, a vida é uma aventura.",
        author: "Carl Fredricksen, em Up: Altas Aventura",
        image: "img-frase/up.jpg"
    },
    {
        text: "Te amo até o infinito... e além!",
        author: "Toy Story",
        image: "img-frase/toy.jpg"
    },
    {
        text: "Se for com você, eu enfrentaria qualquer coisa.",
        author: "Kirito, em Sword Art Online",
        image: "img-frase/kirito.jpeg"
    },
    {
        text: "Estou tentando ser intenso, Ravena... por você.",
        author: "Mutano",
        image: "img-frase/mutano.jpeg"
    },
    {
        text: "Com você, o estranho fica perfeito.",
        author: "Gumball",
        image: "img-frase/gumbaall.jpeg"
    },
    {
        text: "Você é a minha melhor volta nessa corrida maluca chamada vida.",
        author: "mcquuen",
        image: "img-frase/mcqueen.jpeg"
    },
    {
        text: "É você quem vive em mim.",
        author: "Simba & Nala – O Rei Leão",
        image: "img-frase/leao.jpeg"
    }
];

// Dados do quiz
const quizQuestions = [
    {
        question: "Qual é a comida favorita da sua namorada?",
        options: ["Pizza", "Sushi", "Lasanha", "Hambúrguer"],
        correct: 1,
        explanation: "Você sempre escolhe sushi quando saímos para jantar!"
    },
    {
        question: "Em que dia começamos a namorar?",
        options: ["15 de Outubro", "20 de Setembro", "5 de Novembro", "12 de Agosto"],
        correct: 0,
        explanation: "15 de Outubro - o dia mais especial das nossas vidas!"
    },
    {
        question: "Qual é o filme romântico favorito dela?",
        options: ["Titanic", "Diário de uma Paixão", "A Culpa é das Estrelas", "Como Eu Era Antes de Você"],
        correct: 1,
        explanation: "Você sempre chora assistindo Diário de uma Paixão!"
    },
    {
        question: "Qual é a cor favorita da minha princesa?",
        options: ["Rosa", "Vermelho", "Azul", "Roxo"],
        correct: 0,
        explanation: "Rosa, como as rosas que sempre te dou!"
    },
    {
        question: "Qual é o nosso local de encontro favorito?",
        options: ["Parque", "Shopping", "Praia", "Cinema"],
        correct: 2,
        explanation: "A praia, onde tivemos nosso primeiro beijo!"
    },
    {
        question: "Qual música define nosso relacionamento?",
        options: ["Perfect - Ed Sheeran", "All of Me - John Legend", "Thinking Out Loud", "A Thousand Years"],
        correct: 0,
        explanation: "Perfect, porque você é perfeita para mim!"
    },
    {
        question: "O que mais amo em você?",
        options: ["Seu sorriso", "Sua gentileza", "Seu humor", "Tudo"],
        correct: 3,
        explanation: "Amo tudo em você, cada detalhe te torna perfeita!"
    },
    {
        question: "Qual é o sonho que temos juntos?",
        options: ["Viajar o mundo", "Ter uma família", "Comprar uma casa", "Todos os anteriores"],
        correct: 3,
        explanation: "Queremos construir uma vida linda juntos!"
    }
];

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    initializeFloatingHearts();
    initializeRelationshipTimer();
    initializeRomanticQuotes();
    initializeMusicPlayer();
    initializeQuiz();
    initializeSmoothScrolling();
    updateLetterDate();
});

// Corações flutuantes
function initializeFloatingHearts() {
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘'];
    const container = document.getElementById('floating-hearts');
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        
        container.appendChild(heart);
        
        // Remove o coração após a animação
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 8000);
    }
    
    // Criar corações a cada 2 segundos
    setInterval(createHeart, 2000);
}

// Timer do relacionamento
function initializeRelationshipTimer() {
    function updateTimer() {
        const startDate = new Date('2023-10-15'); // Ajuste para a data real
        const now = new Date();
        const diffTime = now.getTime() - startDate.getTime();
        
        const years = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)) + 3;
        const days = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        document.getElementById('years').textContent = Math.max(1, years);
        document.getElementById('months').textContent = Math.max(3, months);
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
    }
    
    updateTimer();
    setInterval(updateTimer, 3600000); // Atualizar a cada hora
}

// Frases românticas
function initializeRomanticQuotes() {
    displayQuote(currentQuoteIndex);
    createQuoteIndicators();
    
    // Trocar frase a cada 4 segundos
    setInterval(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % romanticQuotes.length;
        displayQuote(currentQuoteIndex);
        updateQuoteIndicators();
    }, 4000);
}

function displayQuote(index) {
    const quote = romanticQuotes[index];
    document.getElementById('current-quote').textContent = `"${quote.text}"`;
    document.getElementById('quote-author').textContent = `- ${quote.author}`;
    document.getElementById('quote-character-img').src = quote.image;
}

function createQuoteIndicators() {
    const container = document.querySelector('.quote-indicators');
    container.innerHTML = '';
    
    romanticQuotes.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'quote-indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
            currentQuoteIndex = index;
            displayQuote(index);
            updateQuoteIndicators();
        });
        container.appendChild(indicator);
    });
}

function updateQuoteIndicators() {
    const indicators = document.querySelectorAll('.quote-indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentQuoteIndex);
    });
}

// Player de música
function initializeMusicPlayer() {
    const audio = document.getElementById('romantic-audio');
    const playBtn = document.getElementById('play-btn');
    const muteBtn = document.getElementById('mute-btn');
    const volumeSlider = document.getElementById('volume-slider');
    
    // Configurar volume inicial muito baixo
    audio.volume = 0.15;
    
    // Tentar tocar automaticamente
    setTimeout(() => {
        audio.play().catch(() => {
            console.log('Autoplay bloqueado - usuário precisa interagir primeiro');
        });
    }, 1000);
    
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(() => {
                console.log('Erro ao reproduzir áudio');
            });
            playBtn.textContent = '⏸️';
        } else {
            audio.pause();
            playBtn.textContent = '▶️';
        }
    });
    
    muteBtn.addEventListener('click', () => {
        audio.muted = !audio.muted;
        muteBtn.textContent = audio.muted ? '🔇' : '🔊';
    });
    
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value / 100;
    });
    
    // Atualizar botão quando áudio pausa/toca
    audio.addEventListener('play', () => playBtn.textContent = '⏸️');
    audio.addEventListener('pause', () => playBtn.textContent = '▶️');
    
    // Interação inicial para permitir autoplay
    document.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(() => {
                console.log('Erro ao iniciar música');
            });
        }
    }, { once: true });
}

// Quiz do casal
function initializeQuiz() {
    displayQuestion(currentQuestionIndex);
}

function displayQuestion(index) {
    const question = quizQuestions[index];
    
    document.getElementById('question-counter').textContent = `Pergunta ${index + 1} de ${quizQuestions.length}`;
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('answer-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, optionIndex) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'answer-option';
        optionElement.textContent = `${String.fromCharCode(65 + optionIndex)}. ${option}`;
        optionElement.addEventListener('click', () => selectAnswer(optionIndex));
        optionsContainer.appendChild(optionElement);
    });
    
    // Atualizar barra de progresso
    const progress = ((index + 1) / quizQuestions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    
    selectedAnswer = null;
    document.getElementById('next-btn').disabled = true;
}

function selectAnswer(answerIndex) {
    selectedAnswer = answerIndex;
    
    // Remover seleção anterior
    document.querySelectorAll('.answer-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Adicionar seleção atual
    document.querySelectorAll('.answer-option')[answerIndex].classList.add('selected');
    
    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    if (selectedAnswer === null) return;
    
    quizAnswers.push(selectedAnswer);
    
    // Tocar som baseado na resposta
    const correctSound = document.getElementById('correct-sound');
    const wrongSound = document.getElementById('wrong-sound');
    
    if (selectedAnswer === quizQuestions[currentQuestionIndex].correct) {
        score++;
        if (correctSound) {
            correctSound.currentTime = 0;
            correctSound.play().catch(() => console.log('Erro ao tocar som de acerto'));
        }
    } else {
        if (wrongSound) {
            wrongSound.currentTime = 0;
            wrongSound.play().catch(() => console.log('Erro ao tocar som de erro'));
        }
    }
    
    // Mostrar feedback visual temporário
    const options = document.querySelectorAll('.answer-option');
    options.forEach((option, index) => {
        if (index === quizQuestions[currentQuestionIndex].correct) {
            option.style.background = '#28a745';
            option.style.borderColor = '#1e7e34';
        } else if (index === selectedAnswer && selectedAnswer !== quizQuestions[currentQuestionIndex].correct) {
            option.style.background = '#dc3545';
            option.style.borderColor = '#bd2130';
        }
    });
    
    // Aguardar um momento antes de continuar
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizQuestions.length) {
            displayQuestion(currentQuestionIndex);
        } else {
            showQuizResult();
        }
    }, 1500);
}

function showQuizResult() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';
    
    document.getElementById('final-score').textContent = `${score}/${quizQuestions.length}`;
    
    const percentage = (score / quizQuestions.length) * 100;
    let message;
    
    if (percentage === 100) {
        message = "Perfeito! Você me conhece completamente! ❤️";
    } else if (percentage >= 80) {
        message = "Excelente! Você realmente me ama! 💕";
    } else if (percentage >= 60) {
        message = "Muito bom! Estamos aprendendo juntos! 😊";
    } else {
        message = "Precisamos conversar mais, meu amor! 💝";
    }
    
    document.getElementById('score-message').textContent = message;
}

function resetQuiz() {
    currentQuestionIndex = 0;
    selectedAnswer = null;
    score = 0;
    quizAnswers = [];
    
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
    
    displayQuestion(0);
}



// Carta de amor
function openLetter() {
    document.getElementById('letter-envelope').style.display = 'none';
    document.getElementById('letter-content').style.display = 'block';
}

function closeLetter() {
    document.getElementById('letter-envelope').style.display = 'block';
    document.getElementById('letter-content').style.display = 'none';
}

function updateLetterDate() {
    const date = new Date().toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    document.querySelector('.letter-date').textContent = date;
}

// Modal de imagens
function openModal(imageSrc) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    
    modal.style.display = 'block';
    modalImage.src = imageSrc;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Scroll suave
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Fechar modal clicando fora
window.onclick = function(event) {
    const modal = document.getElementById('image-modal');
    const letterContent = document.getElementById('letter-content');
    
    if (event.target === modal) {
        closeModal();
    }
    
    if (event.target === letterContent) {
        closeLetter();
    }
}

// Fechar modal com tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
        closeLetter();
        closeSecretModal();
        closeSecretPage();
    }
});

// Funções da página secreta
function showSecretModal() {
    document.getElementById('secret-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeSecretModal() {
    document.getElementById('secret-modal').style.display = 'none';
    document.getElementById('secret-password').value = '';
    document.getElementById('password-error').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function checkSecretPassword() {
    const password = document.getElementById('secret-password').value;
    const errorElement = document.getElementById('password-error');
    
    if (password === 'xibiu') {
        closeSecretModal();
        document.getElementById('secret-page').style.display = 'block';
        document.body.style.overflow = 'hidden';
    } else {
        errorElement.style.display = 'block';
        document.getElementById('secret-password').value = '';
        // Adicionar efeito de shake
        const input = document.getElementById('secret-password');
        input.style.animation = 'none';
        setTimeout(() => {
            input.style.animation = 'shake 0.5s ease-in-out';
        }, 10);
    }
}

function closeSecretPage() {
    document.getElementById('secret-page').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Simulador de pedido
let currentScenario = '';

function setScenario(scenario) {
    currentScenario = scenario;
    const bg = document.querySelector('.romantic-bg');
    
    // Remove todas as classes de cenário
    bg.classList.remove('beach', 'restaurant', 'park', 'home');
    // Adiciona a nova classe
    bg.classList.add(scenario);
    
    // Atualiza botões ativos
    document.querySelectorAll('.scenario-buttons button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Limpa mensagem anterior
    document.getElementById('proposal-message').innerHTML = '';
}

function simulateProposal(type) {
    const messageElement = document.getElementById('proposal-message');
    const ringBox = document.getElementById('ring-box');
    
    if (!currentScenario) {
        messageElement.innerHTML = 'Primeiro escolha um cenário romântico! 💕';
        return;
    }
    
    // Mostra o anel
    ringBox.style.display = 'block';
    
    let message = '';
    const scenarios = {
        beach: {
            marriage: 'Na praia ao pôr do sol, com as ondas como testemunhas... "Quer casar comigo? Você é minha paz e minha aventura!" 🌅💍',
            dating: 'Caminhando pela areia, mãos dadas... "Quer namorar comigo? Você faz meu coração bater como as ondas!" 🏖️💕'
        },
        restaurant: {
            marriage: 'No nosso restaurante favorito, à luz de velas... "Você quer ser minha esposa? Vamos comer juntos para sempre!" 🍽️💍',
            dating: 'Durante um jantar especial... "Quer ser minha namorada? Você tempera minha vida com amor!" 🍷💕'
        },
        park: {
            marriage: 'No parque onde nos conhecemos, sob as árvores... "Quer crescer comigo como uma árvore? Casar comigo?" 🌳💍',
            dating: 'No banco do parque, rodeados de natureza... "Quer namorar comigo? Você é minha primavera eterna!" 🌸💕'
        },
        home: {
            marriage: 'Em casa, no nosso cantinho... "Quer fazer deste nosso lar para sempre? Casa comigo!" 🏠💍',
            dating: 'Aconchegados em casa... "Quer namorar comigo? Você é meu lar, onde quer que seja!" 🥰💕'
        }
    };
    
    message = scenarios[currentScenario][type];
    
    // Animação da mensagem
    messageElement.style.opacity = '0';
    setTimeout(() => {
        messageElement.innerHTML = message;
        messageElement.style.opacity = '1';
        
        // Efeito especial nos emojis do casal
        const couple = document.querySelector('.couple-silhouette');
        couple.style.animation = 'pulse-heart 1s ease-in-out 3';
        
        // Som de sucesso se disponível
        const correctSound = document.getElementById('correct-sound');
        if (correctSound) {
            correctSound.currentTime = 0;
            correctSound.play().catch(() => console.log('Som não disponível'));
        }
        
        // Efeito de corações flutuantes extra
        createSpecialHearts();
    }, 500);
}

function createSpecialHearts() {
    const container = document.getElementById('floating-hearts');
    const heartEmojis = ['💍', '💒', '👰', '🤵', '💐', '🎊'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = '24px';
            heart.style.animationDuration = '3s';
            
            container.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 3000);
        }, i * 200);
    }
}

// Permitir Enter na senha
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('secret-password');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkSecretPassword();
            }
        });
    }
});