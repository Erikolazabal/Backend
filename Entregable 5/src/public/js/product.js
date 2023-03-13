const addToCartBtn = document.querySelector('#addToCart')
const prodId = document.querySelector('#prodId')

addToCartBtn.addEventListener('click', () => {
    fetch(`/api/carts/63f7e68c40c71c8462e98304/product/${prodId.innerText}`,{
        method: 'POST'
    }).finally((res) => {
        Toastify({
            text: "Producto agregado al carrito con exito",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "#0d278e",
            }
        }).showToast();
    })
})