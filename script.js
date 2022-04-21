const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const doList = document.querySelector('.doList');
const p = document.querySelector('p');
const button = document.querySelector('.btn');
const plusBtn = document.querySelector('.plus-btn')
const input_delete_btn = document.querySelector('.input-delete-btn');
const current_delete_btn = document.querySelector('.current-delete-btn');
const searchinput = document.querySelector('.searchinput');
const searchiconn = document.querySelector('.searchiconn');
const sort = document.querySelector('.sort');
const sortBtn = document.querySelector('.sortBtn');
const uppBtn = document.querySelector('.uppBtn');
let items;

// load items
loadItems();

// call event Listeners
eventListeners();

function eventListeners() {
    // submit event
    form.addEventListener('submit', addNewItem);

    // delete an item
    doList.addEventListener('click', deleteItem);

    // change an item
    doList.addEventListener('click', changeItem);
}

function loadItems() {
    items = getItemsFromLS();
    items.forEach(function (item) {
        createItem(item);
    })
}

// get items from Local Storage
function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

// set item to Local Storage
function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

// delete item from LS
function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach((item, index) => {
        if (item === text) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}

function createItem(text) {
    const div = document.createElement('div');
    div.classList = 'task inputs';
    div.appendChild(document.createTextNode(text));
    if (text.length > 0) {
        doList.appendChild(div);
        doList.style.display = 'block';
    }
    const dButton = document.createElement('button');
    dButton.className = 'clears';
    dButton.innerHTML = '<img src="./images/delete.png" alt="x isaresi" class="previuos-delete-btn2">'
    div.appendChild(dButton);
}

// add new item
function addNewItem(e) {
    if (input.value) {
        createItem(input.value);
        setItemToLS(input.value);
        input.style.display = 'none';
        input_delete_btn.style.display = 'none';
        input.value = '';
        e.preventDefault();
    }

}

// delete an item
function deleteItem(e) {
    if (e.target.className === 'previuos-delete-btn2') {
        e.target.parentElement.parentElement.remove();

        // delete item from LS
        deleteItemFromLS(e.target.parentElement.parentElement.textContent)
    }
    if (+doList.innerHTML === 0) {
        doList.style.display = 'none';
    }
    e.preventDefault();
}

// change an item
function changeItem(e) {
    if (e.target.className === 'task inputs') {
        let newInput = document.createElement('input');
        newInput.className = 'new-input';
        newInput.value = e.target.textContent;
        newInput.appendChild(document.createTextNode(e.target.value));
        e.target.style.display = 'none';
        let a = e.target.innerText;
        doList.insertBefore(newInput, e.target);
        newInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter' && newInput.value) {
                createItem(newInput.value);
                deleteItemFromLS(a);
                setItemToLS(newInput.value);
                newInput.style.display = 'none';
            }
        });
    }
    e.preventDefault();
}










// Search item

searchiconn.addEventListener('click', () => {

    searchinput.style.display = 'block';

    searchinput.addEventListener('keyup', (e) => {

        let divs = document.querySelectorAll('.task');
        for (let i = 0; i < divs.length; i++) {

            for (let j = 0; j < divs[i].innerText.length; j++) {

                if (divs[i].textContent.toLowerCase().includes(searchinput.value.toLowerCase())) {

                    divs[i].style.display = "";

                } else {

                    divs[i].style.display = "none";

                }

            }

        }

    })


})

searchiconn.addEventListener('dblclick', () => {
    searchinput.style.display = 'none';
})


// sort elements
sortBtn.addEventListener('click', () => {

    let data = getItemsFromLS();
    let old = [...data];
    let funcSort = () => {
        old.forEach(item => {
            deleteItemFromLS(item);
        })
        data.sort();
        data.forEach(item => {
            setItemToLS(item);
        })
        doList.innerHTML = '';
        data.forEach(item => {
            createItem(item);
        })
    }
    funcSort();
    uppBtn.style.display = 'block';
    sortBtn.style.display = 'none';
})
uppBtn.addEventListener('click', () => {
    let data = getItemsFromLS();
    let old = [...data];
    let funcSort = () => {
        old.forEach(item => {
            deleteItemFromLS(item);
        })
        data.reverse();
        data.forEach(item => {
            setItemToLS(item);
        })
        doList.innerHTML = '';
        data.forEach(item => {
            createItem(item);
        })
    }
    funcSort();
    sortBtn.style.display = 'block';
    uppBtn.style.display = 'none';
})


input_delete_btn.addEventListener('click', () => {
    input.style.display = 'none';
    input_delete_btn.style.display = 'none';
})


plusBtn.addEventListener('click', () => {
    input.style.display = 'block';
    input_delete_btn.style.display = 'block';
})