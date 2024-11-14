const items = document.querySelectorAll('.item');
const dropZone = document.querySelector('.drop-zone');
let i = 2;

items.forEach(item => {
    item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', item.textContent);
        e.dataTransfer.setData('text/html', item.outerHTML); // armazena o HTML do item
        e.dataTransfer.setData('text/id', item.dataset.item_id || item.id);
    });
});

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault(); // permite que o drop aconteça
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    
    const itemText = e.dataTransfer.getData('text/plain');
    
    i++;
    
    const newItem = document.createElement('div');
    newItem.classList.add('item');
    newItem.id ='item' + i;
    newItem.dataset.item_id = i;
    newItem.textContent = itemText;

    dropZone.appendChild(newItem);
    
 
    newItem.setAttribute('draggable', 'true');
    newItem.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', newItem.textContent);
        e.dataTransfer.setData('text/id', newItem.id); 
    });

    if (newItem.textContent === "Right") {
        const game = document.querySelector('.obj');
        
        const currentLeft = parseInt(window.getComputedStyle(game).left) || 0;
        game.style.left = (currentLeft + 60) + 'px'; 
   
    }

    if (newItem.textContent === "Down") {
        const game = document.querySelector('.obj');
      
        const currentTop = parseInt(window.getComputedStyle(game).top) || 0;
        game.style.top = (currentTop + 60) + 'px'; 
    }

    if (newItem.textContent === "Left") {
        const game = document.querySelector('.obj');
       
        const currenrRight = parseInt(window.getComputedStyle(game).right) || 0;
        game.style.right = (currenrRight + 60) + 'px'; 
    }

    if (newItem.textContent === "Up") {
        const game = document.querySelector('.obj');
       
        const currentBottom = parseInt(window.getComputedStyle(game).bottom) || 0;
        game.style.bottom = (currentBottom + 60) + 'px'; 
    }

});

dropZone.addEventListener('dragend', (e) => {
    const text = e.target.textContent;

    if (text === "Right") {
        const game = document.querySelector('.obj');
        // Move a posição para a esquerda
        const currentLeft = parseInt(window.getComputedStyle(game).left) || 0;
        game.style.left = (currentLeft - 60) + 'px'; // Move 20px para a direita
    }  
    if (text === "Down") {
        const game = document.querySelector('.obj');
        // Move a posição para a esquerda
        const currentTop = parseInt(window.getComputedStyle(game).top) || 0;
        game.style.top = (currentTop - 60) + 'px'; // Move 20px para a direita
    }
    if (text === "Up") {
        const game = document.querySelector('.obj');
        // Move a posição para a esquerda
        const currentBottom = parseInt(window.getComputedStyle(game).bottom) || 0;
        game.style.bottom = (currentBottom - 60) + 'px'; // Move 20px para a direita
    }  
    if (text === "Left") {
        const game = document.querySelector('.obj');
        // Move a posição para a esquerda
        const currentRight = parseInt(window.getComputedStyle(game).right) || 0;
        game.style.right = (currentRight - 60) + 'px'; // Move 20px para a direita
    }
    
    
    dropZone.removeChild(e.target);
   
});