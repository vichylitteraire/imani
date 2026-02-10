document.addEventListener('DOMContentLoaded', function () {
    
    // Данные (проверь, чтобы эти ключи совпадали с data-shop в HTML)
    const shopData = {
        starbucks: [350, 290], 
        skuratov: [0, 0]      
    };

    const canvasElement = document.getElementById('mainChart');
    if (!canvasElement) return;

    const ctx = canvasElement.getContext('2d');

    // Инициализируем график сразу
    let chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Accès via QR code", "Lu jusqu'au bout"],
            datasets: [{
                // По умолчанию загружаем данные первой кнопки (Colada)
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
                    // Важно: фиксируем макс. значение, чтобы график не "прыгал" при нулях
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
                        // Рисуем число в любом случае, даже если это 0
                        const label = data.toLocaleString('fr-FR');
                        // Если столбик нулевой, рисуем цифру чуть выше основания (bar.base)
                        const yPos = data === 0 ? bar.y - 5 : bar.y - 10;
                        ctx.fillText(label, bar.x, yPos);
                    });
                });
                ctx.restore();
            }
        }]
    });

    // Логика переключения
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Визуальное переключение кнопок
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const shop = this.getAttribute('data-shop');
            
            if (shopData[shop]) {
                // Обновляем данные на те, что соответствуют кнопке (даже если там [0, 0])
                chart.data.datasets[0].data = shopData[shop];
                chart.update();
            }
        });
    });
});