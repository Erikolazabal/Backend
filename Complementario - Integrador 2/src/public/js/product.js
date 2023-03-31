const addToCartBtn = document.querySelector('#addToCart')
const prodId = document.querySelector('#prodId')

addToCartBtn.addEventListener('click', async () => {
    const user = await fetch('/api/sessions/current').then(res => res.json())
    await fetch(`/api/carts/${user.cart}/product/${prodId.innerText}`,{
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