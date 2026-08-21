document.addEventListener('DOMContentLoaded', () => {
  /* --- Controle de Acessibilidade (Tamanho da Fonte) --- */
  let fontSizeAtual = 16;
  const btnIncreaseFont = document.getElementById('btn-increase-font');
  const btnDecreaseFont = document.getElementById('btn-decrease-font');
  const btnContrast = document.getElementById('btn-contrast');

  btnIncreaseFont.addEventListener('click', () => {
    let novaFonte = fontSizeAtual + 2;
    if (novaFonte >= 12 && novaFonte <= 24) {
      fontSizeAtual = novaFonte;
      document.documentElement.style.fontSize = `${fontSizeAtual}px`;
    }
  });

  btnDecreaseFont.addEventListener('click', () => {
    let novaFonte = fontSizeAtual - 2;
    if (novaFonte >= 12 && novaFonte <= 24) {
      fontSizeAtual = novaFonte;
      document.documentElement.style.fontSize = `${fontSizeAtual}px`;
    }
  });

  btnContrast.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
  });

  /* --- Menu Responsivo (Mobile) --- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('show');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      navLinks.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
      
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  /* --- Componente: Tipos de Bullying (Array de Objetos) --- */
  const tiposBullying = [
    {
      titulo: 'Bullying Verbal',
      descricao: 'Apelidos pejorativos, xingamentos, insultos, piadas ofensivas e comentários discriminatórios de forma recorrente.'
    },
    {
      titulo: 'Bullying Físico',
      descricao: 'Agressões corporais diretas, como empurrões, socos, chutes, ou danos e roubo de pertences do estudante.'
    },
    {
      titulo: 'Bullying Social/Relacional',
      descricao: 'Exclusão proposital de atividades em grupo, espalhar rumores falsos, ignorar sistematicamente ou isolar a vítima.'
    },
    {
      titulo: 'Cyberbullying',
      descricao: 'Hostilização realizada em meio virtual: redes sociais, aplicativos de mensagem e jogos online, amplificando o alcance das ofensas.'
    }
  ];

  const tiposContainer = document.getElementById('tipos-container');
  if (tiposContainer) {
    tiposContainer.innerHTML = tiposBullying.map(tipo => `
      <div class="info-card">
        <h3>${tipo.titulo}</h3>
        <p>${tipo.descricao}</p>
      </div>
    `).join('');
  }

  /* --- Componente: Carrossel de Depoimentos (Array de Objetos) --- */
  const depoimentos = [
    {
      texto: '"Após as palestras de conscientização e a abertura do canal seguro de escuta na escola, meu filho voltou a ter vontade de estudar e interagir com os colegas."',
      autor: 'Mariana S., Mãe de Aluno'
    },
    {
      texto: '"A implementação dos protocolos de mediação nos ajudou a identificar focos de conflito precocemente, transformando o ambiente das salas de aula."',
      autor: 'Prof. Roberto A., Orientador Educacional'
    },
    {
      texto: '"Saber que existia um local discreto para pedir ajuda me deu forças para relatar o que estava acontecendo. O suporte fez toda a diferença."',
      autor: 'Lucas M., Estudante do Ensino Médio'
    }
  ];

  let currentDepoimentoIndex = 0;
  const carouselContent = document.getElementById('carousel-content');
  const carouselDots = document.getElementById('carousel-dots');
  const btnPrev = document.getElementById('carousel-prev');
  const btnNext = document.getElementById('carousel-next');

  function renderCarousel() {
    if (!carouselContent) return;
    
    const dep = depoimentos[currentDepoimentoIndex];
    carouselContent.innerHTML = `
      <p class="carousel-text">${dep.texto}</p>
      <p class="carousel-author">${dep.autor}</p>
    `;

    if (carouselDots) {
      carouselDots.innerHTML = depoimentos.map((_, index) => `
        <button class="dot ${index === currentDepoimentoIndex ? 'active' : ''}" data-index="${index}" aria-label="Ir para depoimento ${index + 1}"></button>
      `).join('');

      carouselDots.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
          currentDepoimentoIndex = parseInt(e.target.dataset.index);
          renderCarousel();
        });
      });
    }
  }

  if (btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => {
      currentDepoimentoIndex = (currentDepoimentoIndex - 1 + depoimentos.length) % depoimentos.length;
      renderCarousel();
    });

    btnNext.addEventListener('click', () => {
      currentDepoimentoIndex = (currentDepoimentoIndex + 1) % depoimentos.length;
      renderCarousel();
    });
  }

  renderCarousel();

  /* --- Componente: Acordeão FAQ (Array de Objetos) --- */
  const faqData = [
    {
      pergunta: 'Como diferenciar brincadeiras saudáveis do bullying?',
      resposta: 'Brincadeiras saudáveis são consensuais, divertem ambos os lados e cessam se alguém demonstrar desconforto. O bullying envolve intenção de magoar, assimetria de poder e frequência repetitiva.'
    },
    {
      pergunta: 'Quais sinais podem indicar que um aluno sofre bullying?',
      resposta: 'Mudanças repentinas de comportamento, queda no rendimento escolar, isolamento social, recusa em ir à escola, dores físicas frequentes sem causa médica e perda de pertences.'
    },
    {
      pergunta: 'O que a escola deve fazer ao identificar um caso?',
      resposta: 'A instituição deve intervir imediatamente, acolher a vítima de forma confidencial, orientar os agressores e envolver as famílias para a construção de soluções pedagógicas e preventivas.'
    },
    {
      pergunta: 'Como denunciar de forma anônima?',
      resposta: 'Você pode utilizar canais nacionais como o Disque 100 ou entrar em contato diretamente com o canal de suporte da sua instituição de ensino.'
    }
  ];

  const accordionContainer = document.getElementById('accordion-container');
  if (accordionContainer) {
    accordionContainer.innerHTML = faqData.map((faq, index) => `
      <div class="accordion-item" id="faq-item-${index}">
        <button class="accordion-toggle" aria-expanded="false" onclick="toggleAccordion(${index})">
          <span>${faq.pergunta}</span>
          <span class="icon">+</span>
        </button>
        <div class="accordion-content">
          <p>${faq.resposta}</p>
        </div>
      </div>
    `).join('');
  }

  window.toggleAccordion = function(index) {
    const item = document.getElementById(`faq-item-${index}`);
    if (!item) return;
    
    const isOpen = item.classList.contains('open');
    
    document.querySelectorAll('.accordion-item').forEach(el => {
      el.classList.remove('open');
      const toggleBtn = el.querySelector('.accordion-toggle');
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.querySelector('.icon').textContent = '+';
      }
    });

    if (!isOpen) {
      item.classList.add('open');
      const toggleBtn = item.querySelector('.accordion-toggle');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.querySelector('.icon').textContent = '−';
    }
  };
});