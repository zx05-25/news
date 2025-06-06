// 人物信息数据
const personInfo = {
    macron: {
        title: '埃马纽埃尔·马克龙',
        content: `法国总统（2017年至今）<br><br>
        2019年11月4日-6日对中国进行国事访问，系2018年1月首次访华后第二次来华。<br>
        访问期间与中国领导人就中法关系、中欧合作、气候变化等议题深入交换意见，签署包括航空、农业、文化等领域的20余项合作协议。<br>
        特别强调中法应共同维护多边主义，推动构建开放型世界经济。`
    },
    'chinese-leader': {
        title: '习近平',
        content: `中华人民共和国领导人<br><br>
        主持中法建交55周年庆祝活动及马克龙总统国事访问相关议程。<br>
        与马克龙总统共同见证《中法生物多样性保护和气候变化北京倡议》等重要文件签署，推动两国在新能源、科技创新等领域合作升级。<br>
        指出中法作为联合国安理会常任理事国，应加强战略协作，为世界和平与发展作出更大贡献。`
    }
};

// 获取DOM元素
const cards = document.querySelectorAll('.character-card');
const modal = document.getElementById('infoModal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.getElementById('closeBtn');

// 打开模态框函数
function openModal(personKey) {
    const info = personInfo[personKey];
    modalTitle.textContent = info.title;
    modalContent.innerHTML = info.content;
    modal.style.display = 'block';
}

// 关闭模态框函数
function closeModal() {
    modal.style.display = 'none';
}

// 获取图片热点区域
const areas = document.querySelectorAll('area');

// 为热点区域添加点击事件监听
areas.forEach(area => {
    area.addEventListener('click', () => {
        const personKey = area.dataset.person;
        openModal(personKey);
    });
});

// 添加点击事件监听
cards.forEach(card => {
    card.addEventListener('click', () => {
        const personKey = card.dataset.person;
        openModal(personKey);
    });
});

// 绑定红点点击事件（兼容移动端触摸）
document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', handleDotClick);
    dot.addEventListener('touchend', handleDotClick); // 改为触摸结束时触发，避免误触
});
// 动态计算移动端红点位置
function adjustMobileDotPosition() {
    const mainImage = document.querySelector('.main-image');
    if (!mainImage) return;
    const imageRect = mainImage.getBoundingClientRect();
    const dots = document.querySelectorAll('.dot');
    // 基于图片容器尺寸计算相对位置（最终优化参数）
    dots[0].style.top = `${imageRect.height * 0.26}px`; // 26%高度（精准上移）
    dots[0].style.left = `${imageRect.width * 0.75}px`; // 75%宽度（精准右移）
    dots[1].style.top = `${imageRect.height * 0.3}px`; // 30%高度（精准上移）
    dots[1].style.left = `${imageRect.width * 0.35}px`; // 35%宽度（精准右移）
}

// 页面加载和窗口调整时触发
window.addEventListener('load', adjustMobileDotPosition);
window.addEventListener('resize', adjustMobileDotPosition);


function handleDotClick(e) {
    e.preventDefault();
    const personKey = e.currentTarget.title.includes('马克龙') ? 'macron' : 'chinese-leader';
    openModal(personKey);
}


// 点击关闭按钮或模态框外区域关闭
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
