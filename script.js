// 模拟文章数据
const articles = [
    {
        id: 1,
        title: "如何使用 HTML5 和 CSS3 构建现代网站",
        date: "2024-03-20",
        category: "前端开发",
        excerpt: "现代网站开发需要掌握最新的 HTML5 和 CSS3 技术。本文将介绍一些常用的技巧和最佳实践...",
        tags: ["HTML5", "CSS3", "Web开发"]
    },
    {
        id: 2,
        title: "JavaScript 异步编程详解",
        date: "2024-03-18",
        category: "JavaScript",
        excerpt: "异步编程是 JavaScript 中的重要概念。本文将深入探讨 Promise、async/await 的使用方法...",
        tags: ["JavaScript", "异步编程", "Promise"]
    },
    // 可以添加更多文章数据
];

// 主题切换功能
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function toggleTheme() {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', document.body.dataset.theme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    icon.className = document.body.dataset.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// 检查本地存储的主题设置
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.dataset.theme = savedTheme;
} else if (prefersDarkScheme.matches) {
    document.body.dataset.theme = 'dark';
}
updateThemeIcon();

themeToggle.addEventListener('click', toggleTheme);

// 文章列表渲染
function renderArticle(article) {
    return `
        <article class="article-card" data-id="${article.id}">
            <h2>${article.title}</h2>
            <div class="article-meta">
                <span><i class="far fa-calendar"></i> ${article.date}</span>
                <span><i class="far fa-folder"></i> ${article.category}</span>
            </div>
            <p class="article-excerpt">${article.excerpt}</p>
            <div class="article-tags">
                ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </article>
    `;
}

function renderArticles(articles) {
    const articlesList = document.getElementById('articlesList');
    articlesList.innerHTML = articles.map(renderArticle).join('');
}

// 搜索功能
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', debounce(function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredArticles = articles.filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    renderArticles(filteredArticles);
}, 300));

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 返回顶部功能
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.opacity = '1';
    } else {
        backToTop.style.opacity = '0';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 文章点击事件
document.getElementById('articlesList').addEventListener('click', (e) => {
    const articleCard = e.target.closest('.article-card');
    if (articleCard) {
        const articleId = articleCard.dataset.id;
        // 这里可以添加跳转到文章详情页的逻辑
        console.log(`跳转到文章 ${articleId} 的详情页`);
    }
});

// 初始化
renderArticles(articles); 