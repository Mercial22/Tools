// 塔罗牌数据
const tarotCards = [
    {
        name: '愚者',
        number: 0,
        upright: '新的开始、冒险、自发性、纯真、自由、理想主义',
        reversed: '鲁莽、冒险、不负责任、过于理想化',
        image: 'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg'
    },
    {
        name: '魔术师',
        number: 1,
        upright: '创造力、技能、意志力、自信、专注、掌控',
        reversed: '技能欠缺、意志力薄弱、自信心不足、能量分散',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg'
    },
    {
        name: '女祭司',
        number: 2,
        upright: '直觉、神秘、内在知识、平和、智慧、洞察力',
        reversed: '隐藏的动机、表面信息、混乱、直觉被忽视',
        image: 'https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg'
    },
    {
        name: '女皇',
        number: 3,
        upright: '丰收、母性、创造力、自然、滋养、富足',
        reversed: '依赖、过度保护、创造力受阻、自我怀疑',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg'
    },
    {
        name: '皇帝',
        number: 4,
        upright: '权威、建立、成就、结构、领导力、稳定',
        reversed: '专制、僵化、过度控制、缺乏弹性',
        image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg'
    },
    {
        name: '教皇',
        number: 5,
        upright: '精神指引、传统、信仰、教育、建议',
        reversed: '教条主义、限制、反叛、不信任',
        image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg'
    },
    {
        name: '恋人',
        number: 6,
        upright: '爱情、和谐、关系、价值观、选择',
        reversed: '不和谐、失衡、误判、价值观冲突',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg'
    },
    {
        name: '战车',
        number: 7,
        upright: '胜利、意志力、决心、自信、控制',
        reversed: '自我怀疑、缺乏方向、侵略性',
        image: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg'
    }
];

// 牌阵类型定义
const spreadTypes = {
    three: {
        name: '三张牌阵',
        count: 3,
        positions: [
            '过去 - 表示影响当前情况的过去经历或事件',
            '现在 - 表示当前的情况和面临的挑战',
            '未来 - 表示可能的发展方向和潜在结果'
        ]
    },
    five: {
        name: '五张牌阵',
        count: 5,
        positions: [
            '当前处境 - 表示目前的核心问题',
            '过去影响 - 导致现状的原因',
            '潜在可能 - 尚未显现的机会',
            '阻碍因素 - 需要克服的障碍',
            '最终结果 - 事情的可能发展'
        ]
    },
    seven: {
        name: '七张牌阵',
        count: 7,
        positions: [
            '当前状况 - 当前面临的核心问题',
            '挑战 - 需要面对的主要困难',
            '过去根源 - 问题的历史原因',
            '即将离去 - 正在消退的影响',
            '新的可能 - 即将到来的机会',
            '前进方向 - 建议采取的行动',
            '最终结果 - 可能的结局'
        ]
    }
};

// 当前选择的牌阵类型
let currentSpreadType = 'three';

// 洗牌函数
function shuffleCards(cards) {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// 切换牌阵类型
function setSpreadType(type) {
    // 更新按钮状态
    const buttons = document.querySelectorAll('.spread-type button');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.textContent === spreadTypes[type].name) {
            button.classList.add('active');
        }
    });

    currentSpreadType = type;
    // 更新说明文字
    document.getElementById('spreadDescription').textContent = 
        `选择的牌阵：${spreadTypes[type].name}（${spreadTypes[type].count}张牌）`;

    // 清空现有的卡牌
    document.getElementById('cardContainer').innerHTML = '';
    document.getElementById('interpretation').innerHTML = '';
}

// 随机抽取卡牌
function drawCards() {
    // 清空之前的卡牌
    const cardContainer = document.getElementById('cardContainer');
    const interpretation = document.getElementById('interpretation');
    cardContainer.innerHTML = '';
    interpretation.innerHTML = '';

    // 洗牌并抽取指定数量的卡牌
    const shuffledCards = shuffleCards(tarotCards);
    const spread = spreadTypes[currentSpreadType];
    const drawnCards = shuffledCards.slice(0, spread.count);

    // 显示抽取的卡牌
    drawnCards.forEach((card, index) => {
        // 随机决定正逆位
        const isReversed = Math.random() < 0.5;
        
        // 创建卡牌元素
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        
        // 创建图片元素
        const img = document.createElement('img');
        img.src = card.image;
        img.style.transform = isReversed ? 'rotate(180deg)' : '';
        img.style.transition = 'transform 0.5s';
        
        // 添加抽牌动画效果
        cardElement.style.opacity = '0';
        cardElement.style.transform = 'translateY(20px)';
        
        // 创建卡牌名称元素
        const nameElement = document.createElement('p');
        nameElement.textContent = `${card.name} ${isReversed ? '(逆位)' : '(正位)'}`;        

        // 将元素添加到卡牌容器
        cardElement.appendChild(img);
        cardElement.appendChild(nameElement);
        cardContainer.appendChild(cardElement);

        // 添加解释
        const interpretationText = document.createElement('div');
        interpretationText.className = 'card-interpretation';
        interpretationText.innerHTML = `
            <h3>${index + 1}. ${card.name} ${isReversed ? '(逆位)' : '(正位)'}</h3>
            <p><strong>牌面数字：</strong>${card.number}</p>
            <p><strong>牌面含义：</strong>${isReversed ? card.reversed : card.upright}</p>
            <p><strong>位置解释：</strong>${spread.positions[index]}</p>
        `;
        interpretation.appendChild(interpretationText);

        // 延迟显示卡牌动画
        setTimeout(() => {
            cardElement.style.opacity = '1';
            cardElement.style.transform = 'translateY(0)';
        }, index * 300);
    });
}