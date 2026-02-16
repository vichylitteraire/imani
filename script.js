document.addEventListener('DOMContentLoaded', function () {
    
    // --- ВАШ ОСНОВНОЙ КОД (БЕЗ ИЗМЕНЕНИЙ) ---
    const shopData = {
        starbucks: [350, 290], 
        skuratov: [0, 0]      
    };

    const canvasElement = document.getElementById('mainChart');
    if (!canvasElement) return;

    const ctx = canvasElement.getContext('2d');

    let chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Accès via QR code", "Lu jusqu'au bout"],
            datasets: [{
                data: shopData.starbucks, 
                backgroundColor: ['#E5E5EA', '#00c2cb'],
                borderRadius: 12,
                barThickness: 60
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { top: 40 } },
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true }
            },
            scales: {
                y: { 
                    beginAtZero: true, 
                    display: false,
                    suggestedMax: 400 
                },
                x: { grid: { display: false }, ticks: { font: { size: 14, weight: '600' } } }
            }
        },
        plugins: [{
            id: 'alwaysShowLabels',
            afterDraw: (chart) => {
                const ctx = chart.ctx;
                ctx.save();
                ctx.font = "bold 14px sans-serif";
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillStyle = '#1d1d1f';

                chart.data.datasets.forEach((dataset, i) => {
                    const meta = chart.getDatasetMeta(i);
                    meta.data.forEach((bar, index) => {
                        const data = dataset.data[index];
                        const label = data.toLocaleString('fr-FR');
                        const yPos = data === 0 ? bar.y - 5 : bar.y - 10;
                        ctx.fillText(label, bar.x, yPos);
                    });
                });
                ctx.restore();
            }
        }]
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const shop = this.getAttribute('data-shop');
            
            if (shopData[shop]) {
                chart.data.datasets[0].data = shopData[shop];
                chart.update();
            }
        });
    });
}); // <--- Конец вашего основного кода

// --- НОВЫЙ КОД ДЛЯ ОКНА (ДОБАВЛЕН В КОНЕЦ ФАЙЛА) ---
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById("projectModal");
    const btn = document.getElementById("openModal");
    const span = document.querySelector(".close-btn");

    if (btn && modal) {
        btn.onclick = function(e) {
            e.preventDefault();
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // Запретить скролл основной страницы
        }

        if (span) {
            span.onclick = function() {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        }
    }
});
