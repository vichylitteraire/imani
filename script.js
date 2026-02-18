// Копируй аккуратно вместе с https://
const supabaseUrl = 'https://gbpntxkkxabndhtpdaai.supabase.co'; 
const supabaseKey = 'sb_publishable_AcsuGHJH7zZd1EEcCPmN4w_m65x6omh'; 

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', function () {
    
    // 1. Получаем элементы модалок
    const contactModal = document.getElementById("contactModal");
    const projectModal = document.getElementById("projectModal");
    const partnerModal = document.getElementById('partnerModal'); // Добавили форму
    
    // 2. Получаем кнопки открытия
    const btnContactNav = document.querySelector(".btn-nav");        // "Nous contacter" в шапке
    const btnDecouvrir = document.querySelector(".btn-primary");   // "Découvrir le projet"
    const btnOpenPartner = document.getElementById('openPartnerModal'); // Кнопка формы
    
    // 3. Получаем ВСЕ крестики закрытия
    const closeBtns = document.querySelectorAll(".close-modal");

    // --- ФУНКЦИИ ---

    // Открыть контакты
    function openContacts(e) {
        e.preventDefault();
        contactModal.style.display = "block";
        document.body.style.overflow = "hidden"; 
    }

    // Открыть описание проекта
    function openProject(e) {
        e.preventDefault();
        projectModal.style.display = "block";
        document.body.style.overflow = "hidden"; 
    }

    // Открыть форму партнера
    function openPartner(e) {
        if(e) e.preventDefault();
        partnerModal.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    // Закрыть всё
    function closeAll() {
        contactModal.style.display = "none";
        projectModal.style.display = "none";
        if (partnerModal) partnerModal.style.display = "none";
        document.body.style.overflow = "auto"; 
    }

    // --- СЛУШАТЕЛИ СОБЫТИЙ ---

    // Назначаем открытие на кнопки (строго по назначению)
    if (btnContactNav) btnContactNav.addEventListener('click', openContacts);
    if (btnDecouvrir)  btnDecouvrir.addEventListener('click', openProject);
    if (btnOpenPartner) btnOpenPartner.addEventListener('click', openPartner);

    // Назначаем закрытие на ВСЕ крестики
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); 
            closeAll();
        });
    });

    // Специальный слушатель для крестика формы (если у него другой ID)
    const closePartnerBtn = document.getElementById('closePartner');
    if (closePartnerBtn) closePartnerBtn.onclick = closeAll;

    // Закрытие кликом по темному фону
    window.addEventListener('click', function(e) {
        if (e.target === contactModal || e.target === projectModal || e.target === partnerModal) {
            closeAll();
        }
    });

    // Закрытие клавишей ESC
    window.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            closeAll();
        }
    });

    // --- ОТПРАВКА ФОРМЫ В SUPABASE ---
    const partnerForm = document.getElementById('partner-form');
    if (partnerForm) {
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
                closeAll();
                partnerForm.reset();
            } else {
                alert("Ошибка. Проверьте подключение.");
                console.error(error);
            }
        };
    }
});
