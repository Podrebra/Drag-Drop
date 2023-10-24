const liItems = [] 
const dashboard = document.querySelector('.dashboard')
const input = document.getElementById('business_input')
const holdColumn = document.querySelector('.hold_column')
const doneColumn = document.querySelector('.done_column')
const body = document.querySelector('body')

window.ondragover = allowDrop;

window.ondrop = drop;

input.addEventListener('keydown', createLiElem)

function getRandomId(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min) + min)
}


function allowDrop(e) {
    e.preventDefault()
}

function setDragEvent(items) {
    items.forEach((item)=>{
        item.ondragstart = drag;
        item.ondragend = dragEnd;
    })
}

function drag(e) {
    e.target.id = getRandomId() + e.target.textContent[0]
    e.dataTransfer.setData('id', e.target.id)
    e.target.style.opacity = '0.3'
}
function dragEnd(e) {
    e.target.style = ''
}

function drop(e) {
    let itemId = e.dataTransfer.getData('id')
    if (e.target === doneColumn || e.target === holdColumn) {
        e.target.append(document.getElementById(itemId));
    } else if (e.target.dataset.zone === 'delete') {
        liItems.splice(itemId, 1)
        document.getElementById(itemId).remove()
        liItemsNodes = document.querySelectorAll('.item')
    }
}



function createLiElem(e) {
    if (e.code === 'Enter' && e.target.value !== '')
    {
        holdColumn.insertAdjacentHTML("beforeend",`<li id="${liItems.length}" class="item" draggable="true">${e.target.value}</li>`);
        liItems.push(e.target.value)
        e.target.value = '';
        liItemsNodes = document.querySelectorAll('.item')
        setDragEvent(liItemsNodes)
    }
}

