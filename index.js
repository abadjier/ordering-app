import menuArray from './data'

const menuItemsEl = document.getElementById('menu-items')
const orderItemsEl = document.getElementById('order-items')
const totalPriceEl = document.getElementById('total-price')
const orderEl = document.getElementById('order')
const paymentModalEl = document.getElementById('payment-modal')
const paymentForm = document.getElementById('payment-form')

let totalPrice = 0
const orderItems = []


document.addEventListener('click', function(e){
    if(e.target.dataset.add){         
        const selection = menuArray.filter(function(menuItem){
            return menuItem.id == e.target.dataset.add
        })
        addItemToOrder(selection[0])
    }else if(e.target.dataset.remove){
        const selection = menuArray.filter(function(menuItem){
            return menuItem.id == e.target.dataset.remove
        })
        removeItemFromOrder(selection[0])
    } else if(e.target.id === 'order-btn'){
        completeOrder()        
    }      
})

paymentForm.addEventListener('submit', function(e){
    e.preventDefault()
    
    submitPayment() 
})

function submitPayment(){  
    const paymentFormData = new FormData(paymentForm)
    const name = paymentFormData.get('fullName')
       
    // empty order items array
    orderItems.length = 0
    totalPrice = 0
    
    paymentModalEl.style.display = "none"
    orderEl.style.display = "none"    
    
    menuItemsEl.innerHTML += `<div class="thanks-msg" id="thanks-msg"><p>Thanks, ${name}! Your order is on its way.</p></div>`     
}

function addItemToOrder(item){
    totalPrice += item.price
    // check it this is the first item to be added
    if(orderItems.length < 1){
        renderMenu()
        // make order field visible
        orderEl.style.display = "flex"
    }
    orderItems.push(item)
      
    displayItemsInOrder()    
    totalPriceEl.innerHTML = `$${totalPrice}`
}

function removeItemFromOrder(item){
    totalPrice -= item.price    
    const indexToRemove = orderItems.findIndex(function(orderItem){
        return orderItem.id == item.id
    })
    orderItems.splice(indexToRemove, 1)
    displayItemsInOrder()    
    totalPriceEl.innerHTML = `$${totalPrice}`
}

function completeOrder() {    
    paymentModalEl.style.display = "inline"    
}

function displayItemsInOrder(){          
    orderItemsEl.innerHTML = orderItems.map(item => {
        return `<div class="order-item">
         <h3>${item.name}</h3>
         <button class="remove-btn" data-remove="${item.id}">remove</button>
         <p class="item-price">$${item.price}</p>      
    </div>`
    }).join('')
}

function renderMenu(){
   const menuItemsHtml = menuArray.map(menuItem => {
    
    return `<div class='single-item'>
        <div class="item-emoji">${menuItem.emoji}</div>
        <div class="item-description">
            <h3>${menuItem.name}</h3>
            <p class="ingredients">${menuItem.ingredients}</p>
            <p class="price">$ ${menuItem.price}</p>
        </div>
            <button class="add-btn" data-add='${menuItem.id}'>+</button>
        </div>`
    }).join('')

    menuItemsEl.innerHTML = menuItemsHtml 
}

renderMenu()

