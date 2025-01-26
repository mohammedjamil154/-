function redirectTo(url) {
  window.location.href = url;
}

function switchTab(tabName) {
    // إخفاء جميع الأقسام
    document.getElementById('ai-section').classList.remove('active');
    document.getElementById('movies-section').classList.remove('active');
    document.getElementById('books-section').classList.remove('active');
    document.getElementById('bots-section').classList.remove('active');
    
    // إظهار القسم المحدد
    document.getElementById(tabName + '-section').classList.add('active');
    
    // تحديث حالة الأزرار
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    event.target.closest('.tab-button').classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    let startX;
    let scrollLeft;
    const container = document.querySelector('.buttons-container');
    let isDown = false;
    let activeCard = null;

    // للشاشات اللمسية
    container.addEventListener('touchstart', (e) => {
        isDown = true;
        const touch = e.touches[0];
        startX = touch.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        
        // تحديد البطاقة التي تم لمسها
        const card = touch.target.closest('.tool-card');
        if (card) {
            activeCard = card;
            card.style.transform = 'translateY(-10px)';
            card.style.transition = 'transform 0.3s ease';
        }
    });

    container.addEventListener('touchend', () => {
        isDown = false;
        if (activeCard) {
            activeCard.style.transform = '';
            activeCard = null;
        }
    });

    container.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });

    // للماوس أيضاً
    container.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        
        const card = e.target.closest('.tool-card');
        if (card) {
            activeCard = card;
            card.style.transform = 'translateY(-10px)';
            card.style.transition = 'transform 0.3s ease';
        }
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        if (activeCard) {
            activeCard.style.transform = '';
            activeCard = null;
        }
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        if (activeCard) {
            activeCard.style.transform = '';
            activeCard = null;
        }
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });
});

const cards = document.querySelectorAll('.tool-card');
const container = document.querySelector('.buttons-container');

const observerOptions = {
  root: container,
  threshold: 0.6
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, observerOptions);

cards.forEach(card => observer.observe(card));
