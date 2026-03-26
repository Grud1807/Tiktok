const revealItems = document.querySelectorAll('.reveal-on-scroll');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.14 });
revealItems.forEach(item => observer.observe(item));

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
}

const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

const flipCards = document.querySelectorAll('.flip-card');
flipCards.forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

const tabGroups = document.querySelectorAll('[data-tab-group]');
tabGroups.forEach(group => {
  const buttons = group.querySelectorAll('.tab-btn');
  const panelWrap = group.parentElement.querySelector('.tab-panels');
  if (!panelWrap) return;
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      panelWrap.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.toggle('active', panel.dataset.panel === target);
      });
    });
  });
});

const sceneButtons = document.querySelectorAll('.scene-btn');
const sceneCards = document.querySelectorAll('.scene-card');
sceneButtons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.dataset.sceneTarget;
    sceneButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    sceneCards.forEach(card => {
      card.classList.toggle('active', card.dataset.scene === target);
    });
  });
});

const accordionButtons = document.querySelectorAll('.accordion-item');
accordionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const panel = button.nextElementSibling;
    const isOpen = panel.classList.contains('open');
    accordionButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.accordion-panel').forEach(p => p.classList.remove('open'));
    if (!isOpen) {
      button.classList.add('active');
      panel.classList.add('open');
    }
  });
});

const quizForm = document.getElementById('quizForm');
const quizResult = document.getElementById('quizResult');
const resultMeterFill = document.getElementById('resultMeterFill');

if (quizForm && quizResult && resultMeterFill) {
  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const answers = ['q1', 'q2', 'q3', 'q4'].map(name => {
      const checked = quizForm.querySelector(`input[name="${name}"]:checked`);
      return checked ? Number(checked.value) : null;
    });

    if (answers.includes(null)) {
      quizResult.querySelector('h2').textContent = 'Не все ответы выбраны';
      quizResult.querySelector('p').textContent = 'Отметь вариант в каждом вопросе, чтобы получить итоговый результат.';
      resultMeterFill.style.width = '0%';
      return;
    }

    const score = answers.reduce((sum, value) => sum + value, 0);
    const percent = Math.round((score / 12) * 100);
    let title = '';
    let text = '';

    if (score >= 10) {
      title = 'Высокая осознанность темы';
      text = 'Результат показывает понимание того, что TikTok действительно влияет на ценности, внимание, язык и модели поведения подростков.';
    } else if (score >= 7) {
      title = 'Базовое понимание влияния';
      text = 'Ты видишь основные механизмы влияния платформы, но часть эффектов может оставаться менее заметной при первом взгляде.';
    } else {
      title = 'Влияние платформы легко недооценить';
      text = 'Такой результат показывает, что роль TikTok часто воспринимается только как развлекательная, хотя на деле его влияние гораздо шире.';
    }

    quizResult.querySelector('h2').textContent = title;
    quizResult.querySelector('p').textContent = text;
    resultMeterFill.style.width = `${percent}%`;
  });
}
