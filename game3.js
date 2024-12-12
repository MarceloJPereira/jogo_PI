const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let collisionOccurred = false;

const blockGifs = {
    "Esquerda": "img/andar-move.gif",
    "Ande/move": "img/andar-move.gif",
    "Direita": "img/vire-para-esquerda.gif",
    "Se/Esquerd": "img/vire-para-Esquerda.gif",
    "Se/Direita": "img/if.gif"
};

function showGif(block) {
    const gifUrl = blockGifs[block];
    const previewScreen = document.querySelector('.preview-screen');
    const gifElement = document.createElement('img');
    gifElement.src = gifUrl;
    gifElement.classList.add('block-gif');
    previewScreen.innerHTML = ''; // Limpa qualquer GIF anterior
    previewScreen.appendChild(gifElement);
}

function hideGif() {
    const previewScreen = document.querySelector('.preview-screen');
    previewScreen.innerHTML = ''; // Remove o GIF
}


// Definir limites de blocos e peças disponíveis
const blockLimits = {
    "Esquerda": 3,
    "Ande/move": 3,
    "Direita": 3,
    "Se/Esquerd": 1,            //["Ande/move", "Se/Direita", "Se/esquer"];
    "Se/Direita": 1
};

const availableBlocks = ["Ande/move", "Esquerda",  "Direita", "Se/Esquerd", "Se/Direita"];

const blockUsage = {
    "Esquerda": 0,
    "Ande/move": 0,
    "Direita": 0,
    "Se/Esquerd": 0,
    "Se/Direita": 0
};

function createAvailableBlocks() {
    const leftPanel = document.querySelector('.left-panel');
    
    // Verifique se o leftPanel existe
    if (!leftPanel) {
        console.error('Elemento .left-panel não encontrado.');
        return;
    }
    
    // Certifique-se de que o leftPanel não afete outros elementos
    leftPanel.innerHTML = ''; // Limpa os blocos existentes

    availableBlocks.forEach(block => {
        const blockItem = document.createElement('div');
        blockItem.classList.add('item');
        blockItem.textContent = block;
        blockItem.setAttribute('draggable', 'true');
        blockItem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', blockItem.textContent);
            e.dataTransfer.setData('text/id', blockItem.id);
        });

        // Adiciona os eventos mouseover e mouseout para mostrar e esconder o GIF
        blockItem.addEventListener('mouseover', () => showGif(block));
        blockItem.addEventListener('mouseout', () => hideGif());

        leftPanel.appendChild(blockItem);
    });

    // Verifique o console para garantir que os blocos foram adicionados corretamente
    console.log('Blocos adicionados:', leftPanel.innerHTML);
}

// Certifique-se de chamar createAvailableBlocks no carregamento do DOM
document.addEventListener('DOMContentLoaded', (event) => {
    createAvailableBlocks();
});





const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];



const cellSize = 53;
const player = { x: 6, y: 4, image: new Image() };
const goal = { x: 0, y: 10, image: new Image() };
const fplane = { x: 12, y: 12, image: new Image() };

fplane.image.src = 'fplane3.png';
player.image.src = 'player.png';
goal.image.src = 'goal.png';

player.image.onload = function() {
    draw(); // Garante que o jogo desenhe após carregar a imagem do jogador
};

function drawMaze() {
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 1) {
                ctx.fillStyle = 'black';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
}

function drawFplane() {
    ctx.drawImage(fplane.image, 0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
    ctx.drawImage(player.image, player.x * cellSize, player.y * cellSize, cellSize, cellSize);
}

function drawGoal() {
    ctx.drawImage(goal.image, goal.x * cellSize, goal.y * cellSize, cellSize, cellSize);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawFplane();
    drawGoal();
    drawPlayer();
}

// Chame a função createAvailableBlocks para inicializar os blocos disponíveis
createAvailableBlocks();


const dropZone = document.querySelector('.drop-zone');
let i = 2;

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();

    const itemText = e.dataTransfer.getData('text/plain');

    // Verificar se o bloco pode ser usado
    if (blockUsage[itemText] < blockLimits[itemText]) {
        blockUsage[itemText] += 1;
        i++;

        const newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.id = 'item' + i;
        newItem.dataset.item_id = i;
        newItem.textContent = itemText;

        dropZone.appendChild(newItem);

        newItem.setAttribute('draggable', 'true');
        newItem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', newItem.textContent);
            e.dataTransfer.setData('text/id', newItem.id);
        });

        // Em vez de mover o jogador imediatamente, apenas acumule a ação
        actions.push(newItem.textContent);
        draw();
    } else {
        alert(`Limite de blocos "${itemText}" atingido.`);
    }
});

dropZone.addEventListener('dragend', (e) => {
    const itemText = e.target.textContent;
    actions.push(`revert ${itemText}`); // Acumula as ações de decremento
    draw();
    dropZone.removeChild(e.target);

    // Atualizar contagem de uso dos blocos
    if (blockUsage[itemText] > 0) {
        blockUsage[itemText] -= 1;
    }
});


function movePlayer(direction) {
    const steps = direction.includes('x2') ? 1 : 1;
    const baseDirection = direction.replace(' x2', '');

    for (let step = 0; step < steps; step++) {
        let newX = player.x;
        let newY = player.y;

        switch (baseDirection) {
            case "Esquerda":
                newX += 2;
                break;
            case "Ande/move":
                newY += 2;
                break;
            case "Direita":
                newX -= 2;
                break;
            case "Se/Esquerd":
                newX += 2;
                checkCollision(newX, newY);
                draw();
                setTimeout(() => {
                    newx += 2;
                    checkCollision(newX, newY);
                    draw();
                }, 1000);
                return;
                break;
            case "Se/Direita": // Ação combinada: para baixo e para a esquerda com atraso
                newY += 2;
                checkCollision(newX, newY);
                draw();
                setTimeout(() => {
                    newX -= 2;
                    checkCollision(newX, newY);
                    draw();
                }, 1000); // Atraso de 1000ms (1 segundo) entre os comandos
                return; // Sai da função após executar a ação combinada
            default:
                console.warn("Comando desconhecido: ", baseDirection);
        }

        checkCollision(newX, newY);
    }
}

function revertPlayer(direction) {
    const steps = direction.includes('x2') ? 1 : 1;
    const baseDirection = direction.replace(' x2', '');

    for (let step = 0; step < steps; step++) {
        let newX = player.x;
        let newY = player.y;

        switch (baseDirection) {
            case "Esquerda":
                newX -= 1;
                break;
            case "Ande/move":
                newY -= 2;
                break;
            case "Direita":
                newX += 2;
                break;
            case "Se/Esquerd":
                newY += 1;
                break;
            default:
                console.warn("Comando desconhecido: ", baseDirection);
        }

        checkCollision(newX, newY);
    }
}


function checkCollision(newX, newY) {
    let collision = false;
    if (maze[newY][newX] === 1) {
        collision = true;
    } else if (newX === goal.x && newY === goal.y) {
        player.x = newX;
        player.y = newY;
        draw();
        setTimeout(() => {
            alert('Parabéns, você venceu!');
        }, 100); // Adiciona um atraso de 100ms antes de exibir o alerta
        return;
    }

    player.x = newX;
    player.y = newY;
    draw();

    if (collision) {
        setTimeout(() => {
            const confirmReset = window.confirm('Colisão! Tente outra vez!');
            if (confirmReset) {
                resetPlayer(); // Redefine o jogador e os blocos
            }
        }, 100); // Adiciona um atraso de 100ms antes de exibir o alerta
    }
}

function resetPlayer() {
    player.x = 6;
    player.y = 4;
    resetBlocks(); // Chame a função para redefinir os blocos usados
}

function resetBlocks() {
    dropZone.innerHTML = '';
    
    // Redefina o uso dos blocos
    for (let block in blockUsage) {
        blockUsage[block] = 0;
    }

    // Recrie os blocos iniciais no painel esquerdo
    availableBlocks.forEach(block => {
        const blockItem = document.createElement('div');
        blockItem.classList.add('item');
        blockItem.textContent = block;
        blockItem.setAttribute('draggable', 'true');
        blockItem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', blockItem.textContent);
            e.dataTransfer.setData('text/id', blockItem.id);
        });
        document.querySelector('.left-panel').appendChild(blockItem);
    });

    createAvailableBlocks();
    draw(); // Certifique-se de desenhar o estado inicial novamente
}


// Adiciona um array de ações
let actions = [];

// Adiciona um EventListener para o botão "Executar"
document.querySelector('.execute-button').addEventListener('click', () => {
    if (collisionOccurred) {
        resetPlayer(); // Redefine o jogador e os blocos
        collisionOccurred = false; // Reseta o estado de colisão
    } else {
        let delay = 0;
        actions.forEach((action, index) => {
            setTimeout(() => {
                if (action.startsWith('revert ')) {
                    revertPlayer(action.replace('revert ', ''));
                } else {
                    movePlayer(action);
                }
                draw();
                if (index === actions.length - 1) {
                    actions = []; // Limpa as ações após a execução
                }
            }, delay);
            delay += 600; // Atraso de 500ms entre cada passo
        });
    }
});





