// 历史数据（模拟6个月的数据）
const historicalData = {
  months: ['1月', '2月', '3月', '4月', '5月', '6月'],
  assets: [1180000, 1210000, 1234567.89, 1256000, 1278000, 1290000],
  liabilities: [245000, 242000, 234567.89, 230000, 225000, 220000],
  netWorth: [935000, 968000, 1000000, 1026000, 1053000, 1070000]
};

// 资产负债数据
const balanceData = {
  assets: {
    cash: {
      name: '现金及现金等价物',
      amount: 500000,
      percentage: 40.5,
      description: '包括活期存款和定期存款',
      icon: 'money-bill-wave',
      change: 2.5
    },
    investments: {
      name: '投资',
      amount: 400000,
      percentage: 32.4,
      description: '股票、基金和债券',
      icon: 'chart-line',
      change: 5.2
    },
    realEstate: {
      name: '房地产',
      amount: 300000,
      percentage: 24.3,
      description: '住宅和商业地产',
      icon: 'building',
      change: 1.8
    },
    other: {
      name: '其他资产',
      amount: 34567.89,
      percentage: 2.8,
      description: '车辆和其他固定资产',
      icon: 'car',
      change: -0.5
    }
  },
  liabilities: {
    mortgage: {
      name: '房贷',
      amount: 200000,
      percentage: 85.3,
      description: '30年固定利率贷款',
      icon: 'home',
      change: -1.2
    },
    carLoan: {
      name: '车贷',
      amount: 30000,
      percentage: 12.8,
      description: '5年期车辆贷款',
      icon: 'car',
      change: -2.5
    },
    creditCard: {
      name: '信用卡',
      amount: 4567.89,
      percentage: 1.9,
      description: '信用卡余额',
      icon: 'credit-card',
      change: -15.3
    }
  }
};

// 更新资产负债表摘要
function updateBalanceSummary() {
  const totalAssets = Object.values(balanceData.assets)
    .reduce((sum, asset) => sum + asset.amount, 0);

  const totalLiabilities = Object.values(balanceData.liabilities)
    .reduce((sum, liability) => sum + liability.amount, 0);

  const netWorth = totalAssets - totalLiabilities;

  document.querySelector('.total-assets .amount').textContent =
    `¥${totalAssets.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}`;

  document.querySelector('.total-liabilities .amount').textContent =
    `¥${totalLiabilities.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}`;

  document.querySelector('.net-worth .amount').textContent =
    `¥${netWorth.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}`;
}

// 更新资产列表
function updateAssetList() {
  const assetList = document.querySelector('.asset-list');
  assetList.innerHTML = Object.entries(balanceData.assets)
    .map(([key, asset]) => `
            <div class="asset-item">
                <div class="asset-info">
                    <i class="fas fa-${asset.icon}"></i>
                    <div>
                        <h4>${asset.name}</h4>
                        <p>${asset.description}</p>
                    </div>
                </div>
                <div class="asset-value">
                    <p class="amount">¥${asset.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</p>
                    <p class="percentage">${asset.percentage}%</p>
                    <p class="change ${asset.change >= 0 ? 'up' : 'down'}">
                        ${asset.change >= 0 ? '+' : ''}${asset.change}%
                    </p>
                </div>
            </div>
        `).join('');
}

// 更新负债列表
function updateLiabilityList() {
  const liabilityList = document.querySelector('.liability-list');
  liabilityList.innerHTML = Object.entries(balanceData.liabilities)
    .map(([key, liability]) => `
            <div class="liability-item">
                <div class="liability-info">
                    <i class="fas fa-${liability.icon}"></i>
                    <div>
                        <h4>${liability.name}</h4>
                        <p>${liability.description}</p>
                    </div>
                </div>
                <div class="liability-value">
                    <p class="amount">¥${liability.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</p>
                    <p class="percentage">${liability.percentage}%</p>
                    <p class="change ${liability.change >= 0 ? 'up' : 'down'}">
                        ${liability.change >= 0 ? '+' : ''}${liability.change}%
                    </p>
                </div>
            </div>
        `).join('');
}

// 创建资产配置图表
function createAssetAllocationChart() {
  const ctx = document.getElementById('assetAllocationChart').getContext('2d');
  const assets = Object.values(balanceData.assets);

  // 自定义颜色方案
  const colors = {
    cash: {
      main: 'rgba(76, 175, 80, 0.8)',
      hover: 'rgba(76, 175, 80, 1)'
    },
    investments: {
      main: 'rgba(33, 150, 243, 0.8)',
      hover: 'rgba(33, 150, 243, 1)'
    },
    realEstate: {
      main: 'rgba(255, 193, 7, 0.8)',
      hover: 'rgba(255, 193, 7, 1)'
    },
    other: {
      main: 'rgba(156, 39, 176, 0.8)',
      hover: 'rgba(156, 39, 176, 1)'
    }
  };

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: assets.map(asset => asset.name),
      datasets: [{
        data: assets.map(asset => asset.amount),
        backgroundColor: Object.values(colors).map(color => color.main),
        hoverBackgroundColor: Object.values(colors).map(color => color.hover),
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverBorderWidth: 0,
        spacing: 5,
        offset: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '55%',
      layout: {
        padding: {
          top: 20,
          bottom: 20,
          left: 10,
          right: 100
        }
      },
      plugins: {
        legend: {
          position: 'right',
          align: 'center',
          labels: {
            boxWidth: 15,
            padding: 15,
            font: {
              size: 13,
              family: "'Microsoft YaHei', sans-serif"
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          titleColor: '#333',
          titleFont: {
            size: 16,
            family: "'Microsoft YaHei', sans-serif",
            weight: 'bold'
          },
          bodyColor: '#666',
          bodyFont: {
            size: 15,
            family: "'Microsoft YaHei', sans-serif"
          },
          borderColor: '#ddd',
          borderWidth: 1,
          padding: 15,
          boxPadding: 8,
          callbacks: {
            label: function (context) {
              const value = context.raw.toLocaleString('zh-CN', {
                style: 'currency',
                currency: 'CNY'
              });
              const percentage = ((context.raw / context.dataset.data.reduce((a, b) => a + b)) * 100).toFixed(1);
              return `${context.label}: ${value} (${percentage}%)`;
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// 创建净资产趋势图表
function createNetWorthTrendChart() {
  const ctx = document.getElementById('netWorthTrendChart').getContext('2d');

  // 计算同比增长率
  const yoyGrowth = ((historicalData.netWorth[historicalData.netWorth.length - 1] -
    historicalData.netWorth[0]) / historicalData.netWorth[0] * 100).toFixed(1);

  // 创建渐变背景
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(25, 118, 210, 0.2)');
  gradient.addColorStop(1, 'rgba(25, 118, 210, 0.0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: historicalData.months,
      datasets: [{
        label: '净资产',
        data: historicalData.netWorth,
        borderColor: '#1976D2',
        backgroundColor: gradient,
        borderWidth: 3,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#1976D2',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 3,
        pointHoverBackgroundColor: '#1976D2',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 20,
          bottom: 20,
          left: 20,
          right: 20
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          titleColor: '#333',
          titleFont: {
            size: 14,
            family: "'Microsoft YaHei', sans-serif",
            weight: 'bold'
          },
          bodyColor: '#666',
          bodyFont: {
            size: 13,
            family: "'Microsoft YaHei', sans-serif"
          },
          borderColor: '#ddd',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: function (context) {
              const value = context.raw.toLocaleString('zh-CN', {
                style: 'currency',
                currency: 'CNY'
              });
              return `净资产: ${value}`;
            }
          }
        },
        title: {
          display: true,
          text: `半年净资产走势 (同比增长 ${yoyGrowth}%)`,
          color: '#333',
          font: {
            size: 16,
            family: "'Microsoft YaHei', sans-serif",
            weight: 'bold'
          },
          padding: {
            top: 20,
            bottom: 30
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 12
            },
            padding: 5
          }
        },
        y: {
          beginAtZero: false,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
            drawBorder: false
          },
          ticks: {
            font: {
              size: 12
            },
            padding: 5,
            callback: function (value) {
              return '¥' + (value / 10000).toFixed(0) + '万';
            }
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  // 更新数据显示
  updateBalanceSummary();
  updateAssetList();
  updateLiabilityList();

  // 创建图表
  createAssetAllocationChart();
  createNetWorthTrendChart();
});