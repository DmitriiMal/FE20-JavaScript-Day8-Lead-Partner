const products = JSON.parse(productsStr);

console.table(products);

//current object formatter
const currencyFormater = new Intl.NumberFormat('de-AT', {
  style: 'currency',
  currency: 'EUR',
});

//select the products row and add items dynamically
let productsRow = document.querySelector('.product-list');

for (let product of products) {
  productsRow.innerHTML += `
  <div class="col-sm-4">
          <section class="card panel">
            <div class="pro-img-box">
              <img
                src="${product.img}"
                alt />
              <a href="#" class="adtocart">
                <i class="fa fa-shopping-cart"></i>
              </a>
            </div>
            <div class="panel-body text-center">
              <h4>
                <a href="#" class="pro-title">${product.name}</a>
              </h4>
              <p>${product.description}</p>
              <p class="price">${currencyFormater.format(product.price)}</p>
            </div>
          </section>
        </div>

  `;
}

//product button selected
const addToCartBtn = document.querySelectorAll('.adtocart');

//cart declared
const cart = [];

//adds product to cart
const addToCart = (product) => {
  if (cart.find((val) => val.name == product.name)) {
    console.log(cart.find((val) => val.name == product.name));
    product.qtty++;
  } else {
    cart.push(product);
  }
  console.table(cart);
  createRows();
  // cartTotal();
};

//add event to add to cart buttons
addToCartBtn.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    addToCart(products[i]);
    console.table(cart);
  });
});

const createRows = () => {
  let result = '';
  for (let item of cart) {
    result += `

        <div class="panel-body my-cart">
          <img
            src="${item.img}"
            alt="${item.name}" />
          <h5>${item.name}</h5>
          <button class="btn plus"><i class="fa-solid fa-plus"></i></button>
          <p>${item.quantity}</p>
          <button class="btn minus"><i class="fa-solid fa-minus"></i></button>
          <button class="btn del"><i class="fa-solid fa-trash"></i></button>
          <p class="price">${currencyFormater.format(item.price)}</p>
        </div>

  
    `;
  }
  document.querySelector('.cart').innerHTML = result;
};
