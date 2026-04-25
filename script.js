// ---------- ДАННЫЕ ИГРЫ ----------
const recipes = {
    "mushroom,dew": { name: "🍄 Зелье здоровья", points: 10 },
    "root,dew": { name: "🌿 Зелье маны", points: 10 },
    "berry,dew": { name: "🫐 Зелье ловкости", points: 15 },
    "mushroom,mushroom,dew": { name: "✨ Сильное зелье здоровья", points: 25 },
    "root,root,mushroom": { name: "💪 Эликсир силы", points: 30 },
    "mushroom,root,berry": { name: "🍀 Зелье удачи", points: 40 },
    "mushroom,root,dew": { name: "🔮 Универсальное зелье", points: 50 },
    // Победная комбинация (все 4 ингредиента)
    "berry,dew,mushroom,root": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "berry,mushroom,dew,root": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "berry,mushroom,root,dew": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "berry,root,dew,mushroom": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "berry,root,mushroom,dew": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "dew,berry,mushroom,root": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "dew,berry,root,mushroom": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "dew,mushroom,berry,root": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "dew,mushroom,root,berry": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "dew,root,berry,mushroom": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "dew,root,mushroom,berry": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "mushroom,berry,dew,root": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "mushroom,berry,root,dew": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "mushroom,dew,berry,root": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "mushroom,dew,root,berry": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "mushroom,root,berry,dew": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "mushroom,root,dew,berry": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "root,berry,dew,mushroom": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "root,berry,mushroom,dew": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "root,dew,berry,mushroom": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "root,dew,mushroom,berry": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "root,mushroom,berry,dew": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true },
    "root,mushroom,dew,berry": { name: "💎 Эликсир Бессмертия", points: 500, isVictory: true }
};

const ranks = [
    { name: "Ученик", minXp: 0 },
    { name: "Подмастерье", minXp: 100 },
    { name: "Мастер", minXp: 250 },
    { name: "Архимаг", minXp: 500 }
];

let gameState = {
    ingredientsInCauldron: [],
    score: 0,
    uniquePotions: new Set(),
    totalBrews: 0,
    history: [],
    lives: 3
};

// DOM элементы
let stirBtn, brewBtn, resetCauldronBtn, cauldron, cauldronGlow, liquid;
let scoreSpan, uniqueCountSpan, totalRecipesSpan, historyListMini, cauldronIngredientsList, resultMessageDiv;
let rankValueSpan, rankProgressBar, xpTextSpan;
let heartsContainer;
let victoryScreen, gameOverScreen;
let restartFromVictoryBtn, restartFromGameoverBtn;

// ---------- СОЗДАНИЕ ЛЕТАЮЩИХ ТОЧЕК ----------
function createFloatingParticles() {
    const container = document.getElementById('floatingParticles');
    if (!container) return;
    
    for (let i = 0; i < 80; i++) {
        const dot = document.createElement('div');
        dot.className = 'particle-dot';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.animationDelay = Math.random() * 15 + 's';
        dot.style.animationDuration = 6 + Math.random() * 12 + 's';
        const size = 2 + Math.random() * 4;
        dot.style.width = size + 'px';
        dot.style.height = size + 'px';
        container.appendChild(dot);
    }
}

// ---------- ИНИЦИАЛИЗАЦИЯ ----------
document.addEventListener('DOMContentLoaded', () => {
    createFloatingParticles();
    
    scoreSpan = document.getElementById('scoreValue');
    uniqueCountSpan = document.getElementById('uniqueCount');
    totalRecipesSpan = document.getElementById('totalRecipes');
    historyListMini = document.getElementById('historyListMini');
    cauldronIngredientsList = document.getElementById('cauldronIngredientsList');
    resultMessageDiv = document.getElementById('resultMessage');
    rankValueSpan = document.getElementById('rankValue');
    rankProgressBar = document.getElementById('rankProgress');
    xpTextSpan = document.getElementById('xpText');
    heartsContainer = document.getElementById('heartsContainer');
    victoryScreen = document.getElementById('victoryScreen');
    gameOverScreen = document.getElementById('gameOverScreen');
    restartFromVictoryBtn = document.getElementById('restartFromVictoryBtn');
    restartFromGameoverBtn = document.getElementById('restartFromGameoverBtn');
    
    cauldron = document.getElementById('cauldron');
    cauldronGlow = document.getElementById('cauldronGlow');
    liquid = document.getElementById('liquid');
    stirBtn = document.getElementById('stirBtn');
    brewBtn = document.getElementById('brewBtn');
    resetCauldronBtn = document.getElementById('resetCauldronBtn');
    
    totalRecipesSpan.textContent = Object.keys(recipes).length;
    
    // МОБИЛЬНОЕ УПРАВЛЕНИЕ: нажатие на ингредиент вместо drag-and-drop
    const ingredientItems = document.querySelectorAll('.ingredient-item');
    ingredientItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const ingredient = item.dataset.ingredient;
            if (gameState.lives > 0) addIngredientToCauldron(ingredient);
        });
        
        // Для сенсорных экранов также
        item.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const ingredient = item.dataset.ingredient;
            if (gameState.lives > 0) addIngredientToCauldron(ingredient);
        });
    });
    
    // Кнопки
    stirBtn.addEventListener('click', () => { if(gameState.lives > 0) stir(); });
    brewBtn.addEventListener('click', () => { if(gameState.lives > 0) brew(); });
    resetCauldronBtn.addEventListener('click', () => { if(gameState.lives > 0) clearCauldron(); });
    restartFromVictoryBtn.addEventListener('click', fullReset);
    restartFromGameoverBtn.addEventListener('click', fullReset);
    
    // Для сенсорных экранов на кнопках
    stirBtn.addEventListener('touchstart', (e) => { e.preventDefault(); if(gameState.lives > 0) stir(); });
    brewBtn.addEventListener('touchstart', (e) => { e.preventDefault(); if(gameState.lives > 0) brew(); });
    resetCauldronBtn.addEventListener('touchstart', (e) => { e.preventDefault(); if(gameState.lives > 0) clearCauldron(); });
    
    // Клик по ведьмочке
    const witchElement = document.getElementById('witch');
    if (witchElement) {
        witchElement.addEventListener('click', () => {
            showWitchMessage("Смешивай ингредиенты и нажимай «Сварить»!");
        });
        witchElement.addEventListener('touchstart', (e) => {
            e.preventDefault();
            showWitchMessage("Смешивай ингредиенты и нажимай «Сварить»!");
        });
    }
    
    updateUI();
    updateRankUI();
    updateHeartsUI();
    
    setTimeout(() => {
        showWitchMessage("Я помогу тебе сварить Эликсир Бессмертия!");
    }, 500);
    
    showMessage("✨ Нажми на ингредиент, чтобы добавить в котёл! ✨", "info");
});

// ---------- ЛОГИКА ЖИЗНЕЙ ----------
function loseLife() {
    gameState.lives--;
    updateHeartsUI();
    showMessage("💔 Варка провалилась! -1 жизнь 💔", "error");
    createSparkles(5);
    cauldron.classList.add('shake');
    setTimeout(() => cauldron.classList.remove('shake'), 400);
    
    if (gameState.lives <= 0) {
        gameOver();
    }
}

function updateHeartsUI() {
    heartsContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const heartSpan = document.createElement('span');
        heartSpan.className = 'heart';
        if (i < gameState.lives) {
            heartSpan.innerHTML = '❤️';
        } else {
            heartSpan.innerHTML = '🖤';
            heartSpan.classList.add('lost');
        }
        heartsContainer.appendChild(heartSpan);
    }
}

function gameOver() {
    document.getElementById('gameoverRank').innerText = getCurrentRank().name;
    document.getElementById('gameoverPotions').innerText = gameState.totalBrews;
    document.getElementById('gameoverRecipes').innerText = `${gameState.uniquePotions.size}/${Object.keys(recipes).length}`;
    gameOverScreen.style.display = 'flex';
}

function finishGame() {
    victoryScreen.style.display = 'flex';
    document.getElementById('finalRank').innerText = getCurrentRank().name;
    document.getElementById('finalPotions').innerText = gameState.totalBrews;
    document.getElementById('finalRecipes').innerText = `${gameState.uniquePotions.size}/${Object.keys(recipes).length}`;
}

function fullReset() {
    victoryScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    gameState = {
        ingredientsInCauldron: [],
        score: 0,
        uniquePotions: new Set(),
        totalBrews: 0,
        history: [],
        lives: 3
    };
    updateUI();
    updateRankUI();
    updateHeartsUI();
    clearCauldron();
    liquid.style.height = '0%';
    showMessage("✨ Игра перезапущена! Береги жизни! ✨", "info");
    setTimeout(() => {
        showWitchMessage("Давай попробуем снова!");
    }, 500);
}

// ---------- ОСНОВНЫЕ МЕХАНИКИ ----------
function addIngredientToCauldron(ingredient) {
    if (gameState.lives <= 0) return;
    if (gameState.ingredientsInCauldron.length >= 4) {
        showMessage("⚠️ В котле уже 4 ингредиента! Сначала свари зелье.", "error");
        return;
    }
    gameState.ingredientsInCauldron.push(ingredient);
    updateCauldronDisplay();
    showMessage(`➕ Добавлен ${getIngredientName(ingredient)}`, "info");
    const liquidHeight = Math.min(30 + gameState.ingredientsInCauldron.length * 10, 80);
    liquid.style.height = `${liquidHeight}%`;
}

function stir() {
    if (gameState.lives <= 0) return;
    if (gameState.ingredientsInCauldron.length === 0) {
        showWitchMessage("Добавь ингредиенты в котёл!");
        return;
    }
    
    const witch = document.getElementById('witch');
    witch.classList.add('stirring-witch');
    setTimeout(() => witch.classList.remove('stirring-witch'), 600);
    
    createBubbles(12);
    
    const random = Math.random();
    if (random < 0.2) {
        const events = [
            { msg: "✨ Ведьмочка взмахнула палочкой! +5 очков!", action: () => { gameState.score += 5; updateUI(); }, type: "success", witchMsg: "+5 очков!" },
            { msg: "🍄 'Ой, лишний гриб упал!' -1 ингредиент.", action: () => { if(gameState.ingredientsInCauldron.length > 0) gameState.ingredientsInCauldron.pop(); updateCauldronDisplay(); }, type: "error", witchMsg: "Гриб выпал..." },
            { msg: "💨 'Котёл перегрелся!' -10 очков.", action: () => { gameState.score = Math.max(0, gameState.score - 10); updateUI(); }, type: "error", witchMsg: "Осторожнее с огнём!" },
            { msg: "🎁 'Вот тебе подарок!' Добавлена роса!", action: () => { addIngredientToCauldron("dew"); }, type: "success", witchMsg: "Держи росу!" }
        ];
        const event = events[Math.floor(Math.random() * events.length)];
        showWitchMessage(event.witchMsg);
        showMessage(event.msg, event.type);
        event.action();
        createSparkles();
    } else {
        showWitchMessage("Помешиваю...");
        showMessage("🥄 Ведьмочка помешивает зелье", "info");
    }
    
    cauldronGlow.style.background = "radial-gradient(circle, rgba(255, 180, 80, 0.4) 0%, rgba(255, 140, 50, 0) 80%)";
    setTimeout(() => cauldronGlow.style.background = "radial-gradient(circle, rgba(255, 140, 50, 0) 0%, rgba(255, 140, 50, 0) 100%)", 400);
}

function brew() {
    if (gameState.lives <= 0) return;
    if (gameState.ingredientsInCauldron.length === 0) {
        showMessage("❌ В котле нет ингредиентов!", "error");
        return;
    }
    
    gameState.totalBrews++;
    const sorted = [...gameState.ingredientsInCauldron].sort();
    const key = sorted.join(',');
    
    if (recipes[key]) {
        const recipe = recipes[key];
        const isNew = !gameState.uniquePotions.has(key);
        if (isNew) gameState.uniquePotions.add(key);
        
        gameState.score += recipe.points;
        updateUI();
        
        createSparkles(15);
        liquid.style.background = `radial-gradient(circle at 30% 40%, #ffcc88, #ffaa44)`;
        liquid.style.height = '85%';
        cauldronGlow.style.background = `radial-gradient(circle, #ffaa66aa 0%, rgba(255, 140, 50, 0) 80%)`;
        cauldron.classList.add('shake');
        setTimeout(() => cauldron.classList.remove('shake'), 400);
        
        showMessage(`✨ Сварено ${recipe.name}! +${recipe.points} очков ✨`, "success");
        addToHistory(recipe.name, true);
        
        if (recipe.isVictory) {
            finishGame();
            return;
        }
        
        setTimeout(() => {
            liquid.style.background = "linear-gradient(135deg, #2d6a2d, #1a4a1a)";
            liquid.style.height = '0%';
            cauldronGlow.style.background = "radial-gradient(circle, rgba(255, 140, 50, 0) 0%, rgba(255, 140, 50, 0) 100%)";
        }, 1500);
        
        clearCauldron();
    } else {
        showWitchMessage("Ой... Неудача!");
        showMessage(`💀 ВАРКА ПРОВАЛИЛАСЬ! ${gameState.ingredientsInCauldron.map(getIngredientName).join(' + ')}. Ты теряешь жизнь! 💀`, "error");
        addToHistory("Неудачная варка", false);
        loseLife();
        
        clearCauldron();
        liquid.style.height = '0%';
        cauldronGlow.style.background = "radial-gradient(circle, rgba(255, 50, 50, 0.6) 0%, rgba(255, 0, 0, 0) 80%)";
        setTimeout(() => {
            cauldronGlow.style.background = "radial-gradient(circle, rgba(255, 140, 50, 0) 0%, rgba(255, 140, 50, 0) 100%)";
        }, 800);
    }
    updateCauldronDisplay();
}

// ---------- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ----------
function showWitchMessage(text) {
    const bubble = document.getElementById('witchBubble');
    const textSpan = document.getElementById('witchText');
    if (!bubble) return;
    
    textSpan.textContent = text;
    bubble.style.display = 'block';
    
    setTimeout(() => {
        bubble.style.opacity = '0';
        setTimeout(() => {
            bubble.style.display = 'none';
            bubble.style.opacity = '1';
        }, 300);
    }, 2000);
}

function getIngredientName(ing) {
    const names = { mushroom: "Гриб", root: "Корень", berry: "Ягода", dew: "Роса" };
    return names[ing];
}

function getIngredientIcon(ing) {
    const icons = { mushroom: "🍄", root: "🌿", berry: "🫐", dew: "💧" };
    return icons[ing];
}

function updateCauldronDisplay() {
    const container = document.getElementById('ingredientsInCauldron');
    container.innerHTML = '';
    gameState.ingredientsInCauldron.forEach(ing => {
        const piece = document.createElement('div');
        piece.className = 'ingredient-piece';
        piece.textContent = getIngredientIcon(ing);
        container.appendChild(piece);
    });
    
    cauldronIngredientsList.innerHTML = '';
    if (gameState.ingredientsInCauldron.length === 0) cauldronIngredientsList.innerHTML = '<li>— пусто —</li>';
    else gameState.ingredientsInCauldron.forEach(ing => {
        const li = document.createElement('li');
        li.textContent = `${getIngredientIcon(ing)} ${getIngredientName(ing)}`;
        cauldronIngredientsList.appendChild(li);
    });
}

function clearCauldron() {
    gameState.ingredientsInCauldron = [];
    updateCauldronDisplay();
    showMessage("🧹 Котёл очищен!", "info");
}

function addToHistory(name, isSuccess) {
    gameState.history.unshift(isSuccess ? `✅ ${name}` : `❌ Неудача`);
    if (gameState.history.length > 5) gameState.history.pop();
    historyListMini.innerHTML = '';
    if (gameState.history.length === 0) historyListMini.innerHTML = '<li>— ничего не сварено —</li>';
    else gameState.history.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = entry;
        historyListMini.appendChild(li);
    });
}

function updateUI() {
    scoreSpan.textContent = gameState.score;
    uniqueCountSpan.textContent = gameState.uniquePotions.size;
    updateRankUI();
}

function getCurrentRank() {
    let currentRank = ranks[0];
    for (let i = ranks.length-1; i >= 0; i--) {
        if (gameState.score >= ranks[i].minXp) {
            currentRank = ranks[i];
            break;
        }
    }
    return currentRank;
}

function updateRankUI() {
    const rank = getCurrentRank();
    rankValueSpan.textContent = rank.name;
    
    let nextRank = ranks[ranks.indexOf(rank) + 1];
    if (nextRank) {
        const xpNeeded = nextRank.minXp - rank.minXp;
        const xpProgress = gameState.score - rank.minXp;
        const percent = (xpProgress / xpNeeded) * 100;
        rankProgressBar.style.width = `${Math.min(100, percent)}%`;
        xpTextSpan.textContent = `${xpProgress}/${xpNeeded}`;
    } else {
        rankProgressBar.style.width = '100%';
        xpTextSpan.textContent = 'Макс!';
    }
}

function showMessage(msg, type) {
    resultMessageDiv.innerHTML = `<p>${msg}</p>`;
    resultMessageDiv.style.borderLeft = type === "success" ? "4px solid #88ff88" : (type === "error" ? "4px solid #ff8888" : "4px solid #c89a4a");
    setTimeout(() => { 
        if (resultMessageDiv.innerHTML === `<p>${msg}</p>`) {
            resultMessageDiv.style.borderLeft = "4px solid #c89a4a";
        }
    }, 3000);
}

function createBubbles(count) {
    const container = document.getElementById('cauldronInner');
    for (let i = 0; i < count; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble-effect';
        bubble.style.bottom = '10%';
        bubble.style.left = `${Math.random() * 80 + 10}%`;
        bubble.style.width = `${Math.random() * 12 + 6}px`;
        bubble.style.height = bubble.style.width;
        container.appendChild(bubble);
        setTimeout(() => bubble.remove(), 600);
    }
}

function createSparkles(count = 8) {
    const container = document.getElementById('particlesContainer');
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        container.appendChild(p);
        setTimeout(() => p.remove(), 800);
    }
}

// Ширина экрана для мобильных уведомлений
console.log("Мобильная версия игры загружена! Нажимай на ингредиенты для добавления в котёл.");