const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h5>${product.title}</h5>
      <p>Category: ${product.category}</p>
      <h4>Price: $ ${product.price}</h4>
      <h6>Rating: ${product.rating.rate}/<small class="text-muted">${product.rating.count}</small><h6>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="loadProductDetails(${product.id})" id="details-btn" class="btn btn-danger">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// LOAD PRODUCT DETAILS 
const loadProductDetails = (productID) => {
  const url = `https://fakestoreapi.com/products/${productID}`;
  fetch(url)
    .then(res => res.json())
    .then(data => productDetails(data))
}

// DISPLAY PRODUCT DETAILS 
const productDetails = (singleProduct) => {
  const detailsContainer = document.getElementById('productDetails');
  detailsContainer.textContent = '';
  const row = document.createElement('div');
  row.classList.add('row', 'w-75', 'bg-light', 'p-3', 'mx-auto', 'rounded');
  row.innerHTML = `
  <div class="col-md-4 detailImage">
  <div><img class="w-75 mx-auto" src="${singleProduct.image}"></div>
  </div>
  <div class="col-md-8">
  <h5>${singleProduct.title}</h5>
  <p>${singleProduct.description}</p>
      <p>Category: ${singleProduct.category}</p>
      <h4>Price: $ ${singleProduct.price}</h4>
      <h6>Rating: ${singleProduct.rating.rate}/<small class="text-muted">${singleProduct.rating.count}</small><h6>
  </div>
  `;
  detailsContainer.appendChild(row);
}

// PRODUCT COUNT
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

// GET PRODUCT VALUE 
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const oldPrice = parseFloat(convertedOldPrice.toFixed(2))
  console.log(oldPrice);
  const convertPrice = value;
  console.log(convertPrice);
  const total = oldPrice + parseFloat(convertPrice.toFixed(2));
  document.getElementById(id).innerText = parseFloat(total.toFixed(2));
  // return total;
  updateTotal();
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value.toFixed(2));
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal.toFixed(2));
};


