function renderCart() {
    let itemsInCart = JSON.parse(localStorage.getItem("cart"));
    let output = "";
    let sum =0;
    const products = JSON.parse(localStorage.getItem("products"));
    for (let id in itemsInCart) {
      id = parseInt(id);
      const product = products.find((p) => p.id === id); // kör igenom och testar villkoret mot alla element
      const quantity = itemsInCart[id];
      output += `
    <tr>
    <div class="card">
    <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
    <img src="${product.image}" class="img-fluid"/>
    <a href="#!">
    <div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>
    </a>
    </div>
    <div class="card-body">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text">${quantity} st</p>
    <h5> $ ${product.price}</h5> 
    <button type="button" class="btn btn-outline-primary add-btn" data-mdb-ripple-color="dark" style="margin-right: 10px;" data-id="${product.id}">
  + </button>
  <button type="button" class="btn btn-outline-primary remove-btn" data-mdb-ripple-color="dark" data-id="${product.id}">
    - </button></td>
    </div>
    </div>
  </tr>
    `
    ;
    sum += (product.price * quantity)
    }
  
    document.getElementById("cart-output").innerHTML = output;
    document.getElementById("summary").innerHTML = 'Summa: $'+sum.toFixed(2)
    
    const addItemButtons = document.querySelectorAll(".add-btn");
    addItemButtons.forEach((b) =>
      b.addEventListener("click", function (e) {
        const button = e.target;
        const productId = button.dataset.id;
        
        let itemsInCart = JSON.parse(localStorage.getItem("cart"));
        itemsInCart[productId]++;
        localStorage.setItem("cart", JSON.stringify(itemsInCart));
        renderCart();
      })
    );
  
    const removeItemButtons = document.querySelectorAll(".remove-btn");
    removeItemButtons.forEach((b) =>
      b.addEventListener("click", function (e) {
        const button = e.target;
        const productId = button.dataset.id;
  
        let itemsInCart = JSON.parse(localStorage.getItem("cart"));
        itemsInCart[productId]--;
        if (itemsInCart[productId] == 0) {
          delete itemsInCart[productId];
         
          
        }
        localStorage.setItem("cart", JSON.stringify(itemsInCart));
        renderCart();
      })
    );
  }
  renderCart();
  
  
  function checkFirstname(){
    let alertElement = document.getElementById("alert-firstname");
    let firstnameValue = document.getElementById("firstname").value;
     
    
     if(firstnameValue.length < 2){
      alertElement.innerHTML = 'ange ett namn! Minst 2 bokstäver'
      return false;
    
    }else if(/\d/.test(firstnameValue)){ // testar för siffror
     alertElement.innerHTML = 'ange ett ordentligt namn utan siffror '
     return false;
    
    } else if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(firstnameValue)){ // testar special tecken
     alertElement.innerHTML = 'ange ett ordentligt namn utan specialtecken!'
     return false;
    
    } 
    alertElement.innerHTML = '';  
    return true;
  }
  
  function checkLastname(){
    let alertElement = document.getElementById("alert-lastname");
    let lastnameValue = document.getElementById("lastname").value;
    
    
     if(lastnameValue.length < 2 ){
      alertElement.innerHTML = 'ange ett namn! Minst 2 bokstäver'
      return false;
    
    }else if(/\d/.test(lastnameValue)){ 
     alertElement.innerHTML = 'ange ett ordentligt namn utan siffror!'
     return false;
    
    } else if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(lastnameValue)){ 
     alertElement.innerHTML = 'ange ett ordentligt namn utan specialtecken!'
     return false;
    
    } 
    alertElement.innerHTML = '';  
    return true;
  
  }
  
  function checkAddress(){
    let alertElement = document.getElementById("alert-address");
    let addressValue = document.getElementById("address").value;
      
    if(addressValue.length < 5 ){
    alertElement.innerHTML = 'ange en längre adress!'
    return false;
      
    } else if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(addressValue)){ 
    alertElement.innerHTML = 'ange en ordentlig adress med bokstäver och siffor!'
    return false;
      
    } 
    alertElement.innerHTML = '';
    return true; 
  
  }
  
  function checkPhonenumber(){
    let alertElement = document.getElementById("alert-phone");
    let phoneValue = document.getElementById("phone").value;
      
    if(!/\d/.test(phoneValue)){ 
    alertElement.innerHTML = 'numret får inte innehålla tecken eller bokstäver!'
    return false;
      
    }
    if(phoneValue.length != 10){
      alertElement.innerHTML = 'numret är inte 10 siffror'
      return false;
    }
    alertElement.innerHTML = '';
    return true;
  }
  
  function checkEmail(){
  let alertElement = document.getElementById("alert-email");
  const emailCheck = /^[^ ]+@[^ ]+.[a-z]{2,3}$/;
    
  let emailValue = document.getElementById("email").value;
  
    
  if(emailValue.length < 6 ){
  alertElement.innerHTML = 'address du angivit är antingen för kort'
  return false;
    
  } else if(!emailValue.match(emailCheck)){ 
  alertElement.innerHTML = 'Error! använd bokstäver, giltiga tecken eller siffror'
   return false;
   
  } 
  alertElement.innerHTML = '';  
  return true;
  
  }
  function checkCart(){
  let itemsInCart = JSON.parse(localStorage.getItem("cart")||"{}");
   if(Object.keys(itemsInCart).length === 0){
    return false; 
   }
   return true;
  }
  
  function checkOut(e){
    e.preventDefault();

    if(!checkCart()){
      alert('du kan inte checka ut en tom varukorg')
      return false;
    }
    if(!(checkFirstname() && checkLastname() && checkAddress() && checkPhonenumber() && checkEmail())){
      alert('Kontrollera stavningen i inmatningsfälten!')
      return false;
    }
    
    e.target.submit();

    return true;
    
  }
  
  
  
   
  
  