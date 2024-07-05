const menBtn = document.getElementById("men");
const womenBtn = document.getElementById("women");
const kidBtn = document.getElementById("kids");

const cardsContainer = document.getElementById("cards-container");
let data = [];

const url =
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";

menBtn.addEventListener("click", (e) => {
  removeActiveClass();
  e.target.classList.add("active");
  cardsContainer.innerHTML = " ";
  data[0].category_products.forEach((product) => {
    const productCard = createCard(product);
    cardsContainer.appendChild(productCard);
  });
});
womenBtn.addEventListener("click", (e) => {
  removeActiveClass();
  e.target.classList.add("active");
  cardsContainer.innerHTML = " ";
  data[1].category_products.forEach((product) => {
    const productCard = createCard(product);
    cardsContainer.appendChild(productCard);
  });
});
kidBtn.addEventListener("click", (e) => {
  removeActiveClass();
  e.target.classList.add("active");
  cardsContainer.innerHTML = " ";
  data[2].category_products.forEach((product) => {
    const productCard = createCard(product);
    cardsContainer.appendChild(productCard);
  });
});

function removeActiveClass() {
  const buttons = [menBtn, womenBtn, kidBtn];
  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });
}

async function getData() {
  try {
    const res = await fetch(url);
    const result = await res.json();
    data = result.categories;
    // console.log(result.categories[0].category_products);
    const products = [
      ...result.categories[0].category_products,
      ...result.categories[1].category_products,
      ...result.categories[2].category_products,
    ];
    // console.log(products);
    products.forEach((product) => {
      const productCard = createCard(product);
      cardsContainer.appendChild(productCard);
    });
  } catch (error) {}
}

function createCard(cardData) {
  const cardContainer = document.createElement("div");
  cardContainer.className = "card";

  const img = document.createElement("img");
  img.src = cardData.image;
  img.alt = cardData.title;
  cardContainer.appendChild(img);

  const cardInfo = document.createElement("div");
  cardInfo.className = "card-info";

  const title = document.createElement("p");
  title.className = "title";
  title.innerHTML = `${cardData.title} <span>${cardData.vendor}</span>`;
  cardInfo.appendChild(title);

  const productPrice = document.createElement("div");
  productPrice.className = "product-price";
  productPrice.innerHTML = `RS ${cardData.price}<small>$${cardData.compare_at_price}</small>`;
  cardInfo.appendChild(productPrice);

  const discount = document.createElement("span");
  discount.id = "discount";
  discount.innerText = `50% off`;
  productPrice.appendChild(discount);

  cardContainer.appendChild(cardInfo);

  const button = document.createElement("button");
  button.id = "addToCart";
  button.innerText = "Add to Cart";
  cardContainer.appendChild(button);

  return cardContainer;
}

getData();


/*

<div class="card">
            <img src="./example.png" alt="" />
            <div class="card-info">
              <p class="title">Mens Kurta .<span>Manywar</span></p>
              <div class="product-price">
                RS 230.99<small>$96.00</small>
                <span id="discount">50% off</span>
              </div>
            </div>
            <button id="addToCart">Add to Cart</button>
          </div>
*/