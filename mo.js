function redirectTo(url) {
  window.open(url, '_blank');
}

function switchTab(tabName, event) {
    // منع السلوك الافتراضي للحدث إذا كان موجودًا
    if (event) {
        event.preventDefault();
    }
    
    // الحصول على عناصر القسم قبل إجراء أي تغييرات
    const aiSection = document.getElementById('ai-section');
    const moviesSection = document.getElementById('movies-section');
    const booksSection = document.getElementById('books-section');
    const botsSection = document.getElementById('bots-section');
    const targetSection = document.getElementById(tabName + '-section');
    
    // التحقق من وجود العناصر لتجنب الأخطاء
    if (!aiSection || !moviesSection || !booksSection || !botsSection || !targetSection) {
        console.error('بعض عناصر القسم غير موجودة');
        return;
    }
    
    // إخفاء جميع الأقسام بطريقة أكثر كفاءة
    [aiSection, moviesSection, booksSection, botsSection].forEach(section => {
        section.classList.remove('active');
    });
    
    // إضافة تأخير صغير للتأكد من إكمال العمليات السابقة
    setTimeout(() => {
        // إظهار القسم المحدد
        targetSection.classList.add('active');
        
        // تحديث حالة الأزرار
        const buttons = document.querySelectorAll('.nav-button');
        buttons.forEach(button => button.classList.remove('active'));
        
        // التأكد من وجود الزر الحالي
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        } else {
            // الطريقة البديلة لتحديد الزر النشط
            const activeButton = document.querySelector(`.nav-button[onclick*="switchTab('${tabName}')"]`);
            if (activeButton) {
                activeButton.classList.add('active');
            }
        }
        
        // تمرير إلى أعلى الصفحة بطريقة مُحسّنة
        // استخدام تقنية أكثر توافقًا مع GitHub Pages
        window.scrollTo(0, 0);
    }, 10);
}

// إعادة تعريف وظيفة تبديل التبويب في النافذة العامة
window.switchTab = switchTab;
window.redirectTo = redirectTo;

// إضافة استدعاءات الوظائف المحسنة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحديث الروابط لضمان تطبيق الوظائف المحسنة
    const navButtons = document.querySelectorAll('.nav-button');
    
    navButtons.forEach(button => {
        // استخراج اسم التبويب من وظيفة onclick الحالية
        const onclickAttr = button.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes("switchTab")) {
            const tabMatch = onclickAttr.match(/switchTab\(['"]([^'"]+)['"]\)/);
            if (tabMatch && tabMatch[1]) {
                const tabName = tabMatch[1];
                
                // إعادة تعيين معالج الأحداث للأزرار
                button.onclick = function(event) {
                    switchTab(tabName, event);
                };
            }
        }
    });
    
    // تحسين أداء الصفحة
    document.body.style.overflowX = 'hidden'; // منع التمرير الأفقي
    
    // تخفيف وزن الرسوم المتحركة على الأجهزة ذات الأداء المنخفض
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        document.body.classList.add('reduced-motion');
    }
});

// تحسينات للأداء على GitHub Pages
window.addEventListener('load', function() {
    // تحسين وقت التحميل من خلال تأجيل بعض العمليات
    setTimeout(() => {
        // إزالة أي تأثيرات انتقالية ثقيلة بعد التحميل الأولي
        document.body.classList.add('loaded');
    }, 500);
});
