function redirectTo(url) {
  window.open(url, '_blank');
}

function switchTab(tabName) {
    // الحصول على الأقسام والأزرار
    const sections = document.querySelectorAll('.buttons-container');
    const buttons = document.querySelectorAll('.nav-button');
    const targetSection = document.getElementById(tabName + '-section');
    
    // إخفاء جميع الأقسام بشكل تدريجي
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.opacity = '0';
    });
    
    // إزالة الكلاس النشط من جميع الأزرار
    buttons.forEach(button => button.classList.remove('active'));
    
    // إضافة الكلاس النشط للزر المختار
    event.currentTarget.classList.add('active');
    
    // عرض القسم المختار بعد إخفاء الأقسام الأخرى
    setTimeout(() => {
        targetSection.classList.add('active');
        targetSection.style.opacity = '1';
        
        // تمرير سلس إلى أعلى الصفحة
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 100);
}

// انتظار تحميل المستند بالكامل
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

    // تحديد ارتفاع الشاشة لتحسين تجربة المستخدم على الهواتف المختلفة
    const setScreenHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    // تعيين ارتفاع الشاشة عند التحميل وعند تغيير حجم النافذة
    setScreenHeight();
    window.addEventListener('resize', setScreenHeight);
    
    // إضافة تأثير التحميل التدريجي للبطاقات
    const cards = document.querySelectorAll('.tool-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.08}s`;
        
        // إضافة تأثير ضغط عند النقر على البطاقة
        card.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.97)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // إضافة تأثير للأجهزة اللمسية
        card.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.97)';
            this.style.transition = 'transform 0.2s ease';
        }, {passive: true});
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
        
        // إضافة تأثير الموجة عند النقر
        card.addEventListener('click', function(e) {
            // إنشاء عنصر دائرة للتأثير
            const circle = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            circle.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                width: 5px;
                height: 5px;
                top: ${y}px;
                left: ${x}px;
                transform: scale(0);
                transition: transform 0.5s, opacity 0.5s;
                pointer-events: none;
                z-index: 1000;
            `;
            
            this.style.overflow = 'hidden';
            this.appendChild(circle);
            
            // تشغيل الأنيميشن
            setTimeout(() => {
                circle.style.transform = 'scale(50)';
                circle.style.opacity = '0';
                
                // إزالة العنصر بعد انتهاء الأنيميشن
                setTimeout(() => {
                    if (circle.parentNode) {
                        circle.remove();
                    }
                }, 500);
            }, 10);
        });
    });
    
    // تنعيم حركة التمرير عند النقر على الروابط الداخلية
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // إضافة تأخير للبطاقات
    const nav = document.querySelector('.mobile-nav');
    let lastScrollTop = 0;

    // تحسين تفاعل الأزرار
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('nav-clicked');
            
            // إزالة التأثير بعد انتهاء الأنيميشن
            setTimeout(() => {
                this.classList.remove('nav-clicked');
            }, 300);
        });
    });

    // تأثير التمويج عند النقر على الأزرار
    const actionButtons = document.querySelectorAll('.ai-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // منع انتشار الحدث للبطاقة الأم
            
            // إظهار تأثير التموج عند النقر
            const circle = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            circle.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                width: 5px;
                height: 5px;
                top: ${y}px;
                left: ${x}px;
                transform: scale(0);
                transition: transform 0.6s, opacity 0.6s;
                pointer-events: none;
            `;
            
            button.style.overflow = 'hidden';
            button.style.position = 'relative';
            button.appendChild(circle);
            
            // تشغيل الأنيميشن
            setTimeout(() => {
                circle.style.transform = 'scale(20)';
                circle.style.opacity = '0';
                
                // إزالة العنصر بعد انتهاء الأنيميشن
                setTimeout(() => {
                    if (circle.parentNode) {
                        circle.remove();
                    }
                }, 600);
            }, 10);
        });
        
        // تطبيق تأثير اللمعان على الأزرار
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });

    // إخفاء/إظهار شريط التنقل عند التمرير
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // تمرير لأسفل - إخفاء شريط التنقل
            nav.classList.add('nav-hidden');
        } else {
            // تمرير لأعلى - إظهار شريط التنقل
            nav.classList.remove('nav-hidden');
        }
        
        lastScrollTop = scrollTop;
    });

    // تأثير لمعان على البطاقات
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const boundingRect = card.getBoundingClientRect();
            const x = e.clientX - boundingRect.left;
            const y = e.clientY - boundingRect.top;
            
            const centerX = boundingRect.width / 2;
            const centerY = boundingRect.height / 2;
            
            const angleX = (centerY - y) / 15;
            const angleY = (x - centerX) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            card.style.transition = 'transform 0.5s ease';
        });
    });

    // إضافة تأثيرات للبطاقات على الأجهزة اللمسية
    if ('ontouchstart' in window) {
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // مراقبة ظهور البطاقات
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

    // إزالة الخط الأزرق عند التمرير
    document.body.style.overflowX = 'hidden';
    
    // التأكد من أن القسم النشط مرئي عند التحميل
    const activeSection = document.querySelector('.buttons-container.active');
    if (activeSection) {
        activeSection.style.opacity = '1';
    }
});
