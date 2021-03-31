
function getProducts() {
    return fetch("http://webacademy.se/fakestore/").then((r) =>
      r.json()
    );
  }

  function renderProducts(products) {
    let output = "";
    
    products.forEach((p) => {
      output += `
          <div class="card">
          <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
          <img src="${p.image}" class="img-fluid"/>
          <a href="#!">
          <div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>
          </a>
          </div>
          <div class="card-body">
          <h5 class="card-title">${p.title}</h5>
          <p class="card-text">${p.description} </p>
          <h5> $ ${p.price}</h5> 
          <a class="btn btn-primary buy-btn" data-id="${p.id}">buy</a>
          </div>
          </div>
        `;
        
        
    });
    return output;
  }

  async function main() {
  const products = await getProducts();
  localStorage.setItem("products", JSON.stringify(products));
  
  const output = renderProducts(products);

  document.getElementById("output").innerHTML = output;

  
    

    const buyButtons = document.querySelectorAll(".buy-btn");
    buyButtons.forEach((b) =>
      b.addEventListener("click", handlebuyClick)
    );
    
    function handlebuyClick(e) {
  
      const button = e.target;
      const productId = button.dataset.id; 
      sendItemToCart(productId);   

    }

    function sendItemToCart(productId){


      let cart = JSON.parse(localStorage.getItem('cart')||'{}'); // ||'{}' gör att jag vet att cart kommer vara ett objekt
      if(productId in cart) { // finns produkt-id i cart?
        cart[productId]++  // lägg till!
      } else{
        cart[productId]=1 // ger produkt med produkt-id quantity = 1
      }
      localStorage.setItem("cart", JSON.stringify(cart));  // behåller mellan sidladdningarna


      }

  }
  document.addEventListener("DOMContentLoaded", main);

