const items = document.querySelectorAll('.item');
const dropZone = document.querySelector('.drop-zone');
let i = 8;

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
    newItem.id = 'item' + i;
    newItem.dataset.item_id = i;
    newItem.textContent = itemText;

    dropZone.appendChild(newItem);
    
    newItem.setAttribute('draggable', 'true');
    newItem.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', newItem.textContent);
        e.dataTransfer.setData('text/id', newItem.id); 
    });

    const game = document.querySelector('.obj');
    const moveDistance = 60;

    switch (newItem.textContent) {
        
        case "Right":
            game.style.left = (parseInt(window.getComputedStyle(game).left) || 0) + moveDistance + 'px';
            break;
        case "Left":
            game.style.left = (parseInt(window.getComputedStyle(game).left) || 0) - moveDistance + 'px';
            break;

        case "Up":
            game.style.top = (parseInt(window.getComputedStyle(game).top) || 0) - moveDistance + 'px';
            break;
        case "Down":
            game.style.top = (parseInt(window.getComputedStyle(game).top) || 0) + moveDistance + 'px';
            break;

    }
});

dropZone.addEventListener('dragend', (e) => {
    const text = e.target.textContent;
    const game = document.querySelector('.obj');
    const moveDistance = 60;

    switch (text) {

        case "Right":
            game.style.left = (parseInt(window.getComputedStyle(game).left) || 0) - moveDistance + 'px';
            break;
        case "Left":
            game.style.left = (parseInt(window.getComputedStyle(game).left) || 0) + moveDistance + 'px';
            break;
        case "Up":
            game.style.top = (parseInt(window.getComputedStyle(game).top) || 0) + moveDistance + 'px';
            break;        
        case "Down":
            game.style.top = (parseInt(window.getComputedStyle(game).top) || 0) - moveDistance + 'px';
            break;
    }
    
    dropZone.removeChild(e.target);
});