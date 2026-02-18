// Копируй аккуратно вместе с https://
const supabaseUrl = 'https://gbpntxkkxabndhtpdaai.supabase.co'; 
const supabaseKey = 'sb_publishable_AcsuGHJH7zZd1EEcCPmN4w_m65x6omh'; 

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', function () {
    
    // 1. Получаем элементы модалок
    const contactModal = document.getElementById("contactModal");
    const projectModal = document.getElementById("projectModal");
    
    // 2. Получаем кнопки открытия
    const btnContactNav = document.querySelector(".btn-nav");        // "Nous contacter" в шапке
    const btnAccueillir = document.querySelector(".btn-secondary"); // "Accueillir le projet"
    const btnDecouvrir = document.querySelector(".btn-primary");   // "Découvrir le projet"
    
    // 3. Получаем ВСЕ крестики закрытия
    const closeBtns = document.querySelectorAll(".close-modal");

    // --- ФУНКЦИИ ---

    // Открыть контакты
    function openContacts(e) {
        e.preventDefault();
        contactModal.style.display = "block";
        document.body.style.overflow = "hidden"; // Блокируем скролл сайта
    }

    // Открыть описание проекта
    function openProject(e) {
        e.preventDefault();
        projectModal.style.display = "block";
        document.body.style.overflow = "hidden"; // Блокируем скролл сайта
    }

    // Закрыть всё
    function closeAll() {
        contactModal.style.display = "none";
        projectModal.style.display = "none";
        document.body.style.overflow = "auto"; // Возвращаем скролл
    }

    // --- СЛУШАТЕЛИ СОБЫТИЙ ---

    // Назначаем открытие на кнопки
    if (btnContactNav) btnContactNav.addEventListener('click', openContacts);
    if (btnAccueillir) btnAccueillir.addEventListener('click', openContacts);
    if (btnDecouvrir)  btnDecouvrir.addEventListener('click', openProject);

    // Назначаем закрытие на ВСЕ крестики
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Чтобы клик не ушел на фон
            closeAll();
        });
    });

    // Закрытие кликом по темному фону (вне белого окна)
    window.addEventListener('click', function(e) {
        if (e.target === contactModal || e.target === projectModal) {
            closeAll();
        }
    });

    // Закрытие клавишей ESC
    window.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            closeAll();
        }
    });
});


// Логика для окна "Rejoindre le projet"
const partnerModal = document.getElementById('partnerModal');
const openPartnerBtn = document.getElementById('openPartnerModal');
const closePartnerBtn = document.getElementById('closePartner');
const partnerForm = document.getElementById('partner-form');

// Открытие окна
openPartnerBtn.onclick = () => {
    partnerModal.style.display = 'block';
};

// Закрытие на крестик
closePartnerBtn.onclick = () => {
    partnerModal.style.display = 'none';
};

// Закрытие при клике мимо окна
window.addEventListener('click', (event) => {
    if (event.target == partnerModal) {
        partnerModal.style.display = 'none';
    }
});

// Отправка данных в Supabase
partnerForm.onsubmit = async (e) => {
    e.preventDefault();
    
    const applicationData = {
        name: document.getElementById('p-name').value,
        establishment: document.getElementById('p-estab').value,
        contact: document.getElementById('p-contact').value,
        stickers_count: parseInt(document.getElementById('p-stickers').value),
        comment: document.getElementById('p-comment').value
    };

    const { error } = await _supabase
        .from('applications')
        .insert([applicationData]);

    if (!error) {
        alert("Merci ! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.");
        partnerModal.style.display = "none";
        partnerForm.reset();
    } else {
        alert("Ошибка. Проверьте подключение.");
        console.error(error);
    }
};
