// 获取DOM元素
const elements = {
    startBtn: document.getElementById('startBtn'),
    resetBtn: document.getElementById('resetBtn'),
    storyBox: document.getElementById('storyBox'),
    progressBar: document.getElementById('progressBar'),
    answerContainer: document.getElementById('answerContainer'),
    answerInput: document.getElementById('answerInput'),
    submitAnswerBtn: document.getElementById('submitAnswerBtn'),
    answerFeedback: document.getElementById('answerFeedback')
};

// 寻宝流程配置 - 慢节奏间隔（每步停留3秒）
const TREASURE_PROGRESS = [
    { percent: 10, delay: 3000 },
    { percent: 25, delay: 3000 },
    { percent: 40, delay: 3000 },
    { percent: 55, delay: 3000 },
    { percent: 65, delay: 3000 },
    { percent: 75, delay: 3000 },
    { percent: 90, delay: 3000 },
    { percent: 100, delay: 0 }
];

// 模拟宝藏地图API
class TreasureMap {
    // 步骤1：获取藏宝图
    static getMap() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`   你从祖父的书架中找到一张古老的藏宝图，上面标注着寻宝的第一站：镇上的古老图书馆。
                    地图角落写着：真相藏在背后。`);
            }, 3000);
        });
    }

    // 步骤2：图书馆寻找线索
    static searchLibrary(mapInfo) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.2) {
                    reject("图书馆管理员发现了你在寻找线索，把你赶了出去，寻宝中断！");
                }
                resolve("在图书馆的禁书区，你发现了一本没有封面的书，里面夹着一张写满谜语的羊皮纸。");
            }, 4000);
        });
    }

    // 步骤3：破解谜语
    static solveRiddle() {
        return new Promise((resolve) => {
            elements.answerContainer.style.display = 'flex';
            elements.storyBox.textContent = "你展开羊皮纸，上面写着1492和一个谜语：早晨四条腿，中午两条腿，晚上三条腿，打一生物。请输入你的答案：";
            elements.answerInput.focus();
            elements.answerFeedback.textContent = '';

            // 提交答案处理
            const handleSubmit = () => {
                const userAnswer = elements.answerInput.value.trim().toLowerCase();
                if (userAnswer === '人') {
                    elements.answerFeedback.textContent = '正确！你解开了谜语！';
                    elements.answerFeedback.className = 'feedback success';
                    // 延迟隐藏输入框，增强体验
                    setTimeout(() => {
                        elements.answerContainer.style.display = 'none';
                        elements.answerInput.value = '';
                        // 移除事件监听，避免重复触发
                        elements.submitAnswerBtn.removeEventListener('click', handleSubmit);
                        elements.answerInput.removeEventListener('keydown', handleEnter);
                        // 返回正确结果，进入下一步
                        resolve("你想到了答案是人！翻到书的最后一页，发现了新的线索：向东方行进，找到太阳神庙，入口藏在第三块巨石后。");
                    }, 1500);
                } else {
                    elements.answerFeedback.textContent = '答案不正确，请再试一次！';
                    elements.answerFeedback.className = 'feedback fail';
                    elements.answerInput.value = '';
                    elements.answerInput.focus();
                }
            };

            // 回车提交答案
            const handleEnter = (e) => {
                if (e.key === 'Enter') handleSubmit();
            };

            // 绑定事件
            elements.submitAnswerBtn.addEventListener('click', handleSubmit);
            elements.answerInput.addEventListener('keydown', handleEnter);
        });
    }

    // 步骤4：前往神庙（4秒响应）
    static reachTemple(location) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.25) {
                    reject("前往神庙的路上遇到了暴风雨，你被迫返回，寻宝失败！");
                }
                resolve("历经艰险，你终于到达太阳神庙。按照线索找到第三块巨石，移开后发现了一个通往神庙内部的秘密通道。");
            }, 4000);
        });
    }

    // 步骤5：应对守卫（5秒响应）
    static dealWithGuard() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const options = [
                    { success: true, message: "你躲在石柱后，等守卫巡逻离开后悄悄通过" },
                    { success: true, message: "你用随身携带的食物引开了守卫" },
                    { success: false, message: "守卫发现了你，将你驱逐出神庙" },
                    { success: true, message: "你假装成神庙的祭司，成功蒙混过关" }
                ];
                const result = options[Math.floor(Math.random() * options.length)];
                
                if (result.success) {
                    resolve(`应对守卫成功！${result.message}，你继续向神庙深处前进。`);
                } else {
                    reject(`应对守卫失败！${result.message}。`);
                }
            }, 5000);
        });
    }

    // 步骤6：找到神秘箱子（3秒响应）
    static findMysteryBox() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("在神庙的密室里，你发现了一个刻满花纹的神秘箱子，箱子上有四个转盘，每个转盘上有0-9十个数字。");
            }, 3000);
        });
    }

    // 步骤7：破解箱子密码（6秒响应）
    static crackBoxCode() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.3) {
                    reject("你尝试了多次密码都不对，箱子突然发出警报声，你不得不逃离！");
                }
                resolve("你想起纸的背后写着'1492'，箱子'咔哒'一声打开了！");
            }, 6000);
        });
    }

    // 步骤8：找到最终宝藏（4秒响应）
    static getFinalTreasure() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("箱子里装满了黄金、宝石和古老的金币，还有一张记录着更多宝藏位置的地图！恭喜你完成了这次寻宝之旅！");
            }, 4000);
        });
    }
}

// 显示加载状态
function showLoading() {
    elements.storyBox.innerHTML = '<i class="fa fa-spinner fa-spin"></i> 探索中...';
}

// 延迟函数
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 开始寻宝（完整流程逻辑 - 补全核心步骤）
async function startTreasureHunt() {
    const { startBtn, resetBtn, storyBox, progressBar } = elements;
    
    // 初始化游戏状态
    startBtn.disabled = true;
    resetBtn.disabled = false;
    storyBox.textContent = "开始你的寻宝之旅...";
    progressBar.style.width = "0%";
    storyBox.style.color = "#3d230a"; // 恢复默认文本颜色
    elements.answerContainer.style.display = 'none'; // 确保输入框默认隐藏

    try {
        // -------------------------- 步骤1：获取藏宝图 --------------------------
        showLoading();
        const map = await TreasureMap.getMap();
        storyBox.textContent = map;
        progressBar.style.width = `${TREASURE_PROGRESS[0].percent}%`;
        await delay(TREASURE_PROGRESS[0].delay);

        // -------------------------- 步骤2：图书馆找线索 --------------------------
        showLoading();
        const libraryClue = await TreasureMap.searchLibrary(map);
        storyBox.textContent = libraryClue;
        progressBar.style.width = `${TREASURE_PROGRESS[1].percent}%`;
        await delay(TREASURE_PROGRESS[1].delay);

        // -------------------------- 步骤3：破解谜语（交互环节） --------------------------
        // 这里不显示loading，直接触发输入交互
        const riddleResult = await TreasureMap.solveRiddle();
        storyBox.textContent = riddleResult;
        progressBar.style.width = `${TREASURE_PROGRESS[2].percent}%`;
        await delay(TREASURE_PROGRESS[2].delay);

        // -------------------------- 步骤4：前往太阳神庙 --------------------------
        showLoading();
        const templeResult = await TreasureMap.reachTemple(riddleResult);
        storyBox.textContent = templeResult;
        progressBar.style.width = `${TREASURE_PROGRESS[3].percent}%`;
        await delay(TREASURE_PROGRESS[3].delay);

        // -------------------------- 步骤5：应对神庙守卫 --------------------------
        showLoading();
        const guardResult = await TreasureMap.dealWithGuard();
        storyBox.textContent = guardResult;
        progressBar.style.width = `${TREASURE_PROGRESS[4].percent}%`;
        await delay(TREASURE_PROGRESS[4].delay);

        // -------------------------- 步骤6：找到神秘箱子 --------------------------
        showLoading();
        const boxResult = await TreasureMap.findMysteryBox();
        storyBox.textContent = boxResult;
        progressBar.style.width = `${TREASURE_PROGRESS[5].percent}%`;
        await delay(TREASURE_PROGRESS[5].delay);

        // -------------------------- 步骤7：破解箱子密码 --------------------------
        showLoading();
        const codeResult = await TreasureMap.crackBoxCode();
        storyBox.textContent = codeResult;
        progressBar.style.width = `${TREASURE_PROGRESS[6].percent}%`;
        await delay(TREASURE_PROGRESS[6].delay);

        // -------------------------- 步骤8：找到最终宝藏 --------------------------
        showLoading();
        const finalResult = await TreasureMap.getFinalTreasure();
        storyBox.textContent = finalResult;
        storyBox.style.color = "#236b35"; // 成功文本绿色
        progressBar.style.width = `${TREASURE_PROGRESS[7].percent}%`;
        // 游戏结束，启用重新开始按钮
        startBtn.disabled = false;
        startBtn.textContent = "再玩一次";

    } catch (error) {
        // 处理所有步骤的失败情况（比如被管理员赶出门、守卫发现等）
        storyBox.textContent = `寻宝失败：${error}`;
        storyBox.style.color = "#802020"; // 失败文本红色
        progressBar.style.width = "0%"; // 失败后重置进度条
        elements.answerContainer.style.display = 'none'; // 隐藏输入框
        // 启用重新开始按钮
        startBtn.disabled = false;
        startBtn.textContent = "重新尝试";
    }
}

// 重置游戏（补全重置逻辑）
function resetGame() {
    const { startBtn, resetBtn, storyBox, progressBar } = elements;
    // 恢复初始状态
    storyBox.textContent = "点击'开始探险'按钮，开启你的寻宝之旅！";
    storyBox.style.color = "#3d230a";
    progressBar.style.width = "0%";
    elements.answerContainer.style.display = 'none';
    elements.answerInput.value = '';
    elements.answerFeedback.textContent = '';
    // 按钮状态重置
    startBtn.disabled = false;
    startBtn.textContent = "开始探险";
    resetBtn.disabled = true;
}

// DOM加载完成后绑定事件（补全初始化逻辑）
document.addEventListener('DOMContentLoaded', () => {
    // 验证必要DOM元素是否存在（避免报错）
    const missingElements = Object.entries(elements)
        .filter(([_, element]) => !element)
        .map(([name]) => name);

    if (missingElements.length > 0) {
        console.error(`缺少必要DOM元素，游戏无法运行：${missingElements.join(', ')}`);
        return;
    }

    // 绑定按钮点击事件
    elements.startBtn.addEventListener('click', startTreasureHunt);
    elements.resetBtn.addEventListener('click', resetGame);
});