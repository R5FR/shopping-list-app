document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/items')
        .then(response => response.json())
        .then(items => {
            items.forEach(item => addItem(item.name, item.priority, item.id, item.inBasket));
        });
});

document.getElementById('item-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const itemInput = document.getElementById('item-input');
    const priorityInput = document.getElementById('priority-input');
    const itemName = itemInput.value;
    const isPriority = priorityInput.checked;

    fetch('/api/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: itemName, priority: isPriority })
    })
    .then(response => response.json())
    .then(item => {
        addItem(item.name, item.priority, item.id, item.inBasket);
    });

    itemInput.value = '';
    priorityInput.checked = false;
});

function addItem(name, isPriority, id = Date.now(), inBasket = false) {
    const itemList = document.getElementById(inBasket ? 'basket-list' : 'items-list');
    const listItem = document.createElement('li');
    listItem.textContent = name;
    listItem.id = 'item-' + id;

    if (isPriority) {
        listItem.classList.add('priority');
    }

    if (inBasket) {
        listItem.classList.add('in-basket');
    }

    const modifyButton = document.createElement('button');
    modifyButton.textContent = '✎';
    modifyButton.classList.add('modify-button');
    modifyButton.addEventListener('click', (e) => {
        e.stopPropagation();
        modifyItem(listItem, name);
    });

    const basketButton = document.createElement('button');
    basketButton.textContent = '🗸';
    basketButton.classList.add('basket-button');
    basketButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleBasket(listItem);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '×';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        listItem.remove();
        fetch(`/api/items/${id}`, { method: 'DELETE' });
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.appendChild(modifyButton);
    buttonContainer.appendChild(basketButton);
    buttonContainer.appendChild(deleteButton);

    listItem.appendChild(buttonContainer);

    listItem.setAttribute('draggable', true);
    listItem.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', listItem.id);
    });

    itemList.appendChild(listItem);
    sortItems(itemList);
}

function modifyItem(listItem, oldName) {
    const newName = prompt('Modifier l\'article:', oldName);
    if (newName) {
        listItem.firstChild.textContent = newName;
        sortItems(listItem.parentElement);
    }
}

function toggleBasket(listItem) {
    const basketList = document.getElementById('basket-list');
    const itemList = document.getElementById('items-list');
    const id = listItem.id.split('-')[1];
    const inBasket = !listItem.classList.contains('in-basket');
    const name = listItem.firstChild.textContent;
    const priority = listItem.classList.contains('priority');

    if (inBasket) {
        listItem.classList.add('in-basket');
        basketList.appendChild(listItem);
    } else {
        listItem.classList.remove('in-basket');
        itemList.appendChild(listItem);
    }

    fetch(`/api/items/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, priority, inBasket })
    });

    sortItems(listItem.parentElement);
}

function sortItems(list) {
    const items = Array.from(list.children);
    items.sort((a, b) => {
        const aPriority = a.classList.contains('priority');
        const bPriority = b.classList.contains('priority');
        return bPriority - aPriority;
    });
    items.forEach(item => list.appendChild(item));
}

new Sortable(document.getElementById('items-list'), {
    group: 'shared',
    animation: 150,
    draggable: 'li',
    onAdd: function (evt) {
        const itemEl = evt.item;
        itemEl.classList.remove('in-basket');
        const id = itemEl.id.split('-')[1];
        const name = itemEl.firstChild.textContent;
        const priority = itemEl.classList.contains('priority');
        const inBasket = false;

        fetch(`/api/items/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, priority, inBasket })
        });
    }
});

new Sortable(document.getElementById('basket-list'), {
    group: 'shared',
    animation: 150,
    draggable: 'li',
    onAdd: function (evt) {
        const itemEl = evt.item;
        itemEl.classList.add('in-basket');
        const id = itemEl.id.split('-')[1];
        const name = itemEl.firstChild.textContent;
        const priority = itemEl.classList.contains('priority');
        const inBasket = true;

        fetch(`/api/items/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, priority, inBasket })
        });
    }
});