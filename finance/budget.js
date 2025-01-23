// 预算数据
const budgetData = {
    totalBudget: 15000,
    spent: 9750,
    remaining: 5250,
    daysLeft: 12,
    dailyAverage: 325,
    categories: [
        {
            name: '餐饮',
            icon: 'utensils',
            budget: 3000,
            spent: 2250,
            color: '#4CAF50'
        },
        {
            name: '交通',
            icon: 'car',
            budget: 2000,
            spent: 1100,
            color: '#2196F3'
        },
        {
            name: '购物',
            icon: 'shopping-cart',
            budget: 2500,
            spent: 2100,
            color: '#FFC107'
        },
        {
            name: '娱乐',
            icon: 'film',
            budget: 1500,
            spent: 900,
            color: '#9C27B0'
        },
        {
            name: '居住',
            icon: 'home',
            budget: 4000,
            spent: 2800,
            color: '#FF5722'
        },
        {
            name: '医疗',
            icon: 'hospital',
            budget: 1000,
            spent: 200,
            color: '#00BCD4'
        }
    ],
    transactions: [
        {
            id: 1,
            type: 'expense',
            category: '日用品',
            description: '超市购物',
            amount: 258.50,
            time: '今天 14:30',
            icon: 'shopping-cart'
        },
        // 更多交易记录...
    ]
};

// 更新预算分类卡片
function updateBudgetCategories() {
    const categoryGrid = document.querySelector('.category-grid');
    categoryGrid.innerHTML = budgetData.categories.map(category => {
        const progress = (category.spent / category.budget) * 100;
        const remaining = category.budget - category.spent;
        return `
            <div class="category-card">
                <div class="category-header">
                    <i class="fas fa-${category.icon}"></i>
                    <h3>${category.name}</h3>
                </div>
                <div class="category-progress">
                    <div class="progress-bar" style="--progress: ${progress}%; --color: ${category.color}"></div>
                </div>
                <div class="category-details">
                    <p class="spent">已用: ¥${category.spent.toLocaleString()} / ¥${category.budget.toLocaleString()}</p>
                    <p class="remaining">剩余: ¥${remaining.toLocaleString()}</p>
                </div>
            </div>
        `;
    }).join('');
}

// 创建预算趋势图表 - 使用堆叠面积图
function createBudgetTrendChart() {
    const ctx = document.getElementById('budgetTrendChart').getContext('2d');

    // 创建渐变背景
    const gradientSpent = ctx.createLinearGradient(0, 0, 0, 400);
    gradientSpent.addColorStop(0, 'rgba(33, 150, 243, 0.3)');
    gradientSpent.addColorStop(1, 'rgba(33, 150, 243, 0.05)');

    const gradientRemaining = ctx.createLinearGradient(0, 0, 0, 400);
    gradientRemaining.addColorStop(0, 'rgba(76, 175, 80, 0.2)');
    gradientRemaining.addColorStop(1, 'rgba(76, 175, 80, 0.05)');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['餐饮', '交通', '购物', '娱乐', '居住', '医疗'],
            datasets: [
                {
                    label: '已使用',
                    data: budgetData.categories.map(cat => cat.spent),
                    backgroundColor: '#2196F3',
                    borderRadius: 6,
                    barPercentage: 0.6,
                },
                {
                    label: '剩余',
                    data: budgetData.categories.map(cat => cat.budget - cat.spent),
                    backgroundColor: '#E3F2FD',
                    borderRadius: 6,
                    barPercentage: 0.6,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 13
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#666',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function (context) {
                            return context.dataset.label + ': ¥' +
                                context.raw.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false
                    }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        callback: value => '¥' + value.toLocaleString()
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

// 创建支出分布图表 - 使用极坐标图
function createExpenseDistributionChart() {
    const ctx = document.getElementById('expenseDistributionChart').getContext('2d');
    const categories = budgetData.categories;

    // 计算百分比
    const total = categories.reduce((sum, cat) => sum + cat.spent, 0);
    const percentages = categories.map(cat => (cat.spent / total * 100).toFixed(1));

    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: categories.map(cat => cat.name),
            datasets: [{
                data: categories.map(cat => cat.spent),
                backgroundColor: [
                    'rgba(76, 175, 80, 0.7)',  // 绿色
                    'rgba(33, 150, 243, 0.7)', // 蓝色
                    'rgba(255, 193, 7, 0.7)',  // 黄色
                    'rgba(156, 39, 176, 0.7)', // 紫色
                    'rgba(255, 87, 34, 0.7)',  // 橙色
                    'rgba(0, 188, 212, 0.7)'   // 青色
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    ticks: {
                        display: false
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 13
                        },
                        generateLabels: function (chart) {
                            const data = chart.data;
                            return data.labels.map((label, i) => ({
                                text: `${label} (${percentages[i]}%)`,
                                fillStyle: data.datasets[0].backgroundColor[i],
                                hidden: false,
                                index: i
                            }));
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#666',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function (context) {
                            const value = context.raw.toLocaleString('zh-CN', {
                                style: 'currency',
                                currency: 'CNY'
                            });
                            const percentage = percentages[context.dataIndex];
                            return `${context.label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    updateBudgetCategories();
    createBudgetTrendChart();
    createExpenseDistributionChart();
}); 