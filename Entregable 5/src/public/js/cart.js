const emptyCartBtn = document.querySelector('#emptyCart')

emptyCartBtn.addEventListener('click', () => {
    fetch('/api/carts/63f7e68c40c71c8462e98304', {
        method: 'DELETE'
    }).finally(() => {
        location.reload()
    })
})