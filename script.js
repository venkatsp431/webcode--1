let div = document.createElement("div");
div.style.textAlign = "center";
div.style.backgroundColor = "bisque";
div.style.padding = "0 0 20px";
div.classList.add("form-inline", "justify-content-center");

let input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("id", "search");
input.classList.add("form-control");

let button = document.createElement("button");
button.setAttribute("type", "button");
button.classList.add("btn", "btn-light", "ml-2");
button.textContent = "Search";

let section = document.createElement("section");

let container = document.createElement("div");
container.classList.add("container");
let row = document.createElement("div");
row.classList.add("row", "mt-4");

div.append(input, button);
section.append(container, row);
document.body.append(div, section);

let brands = [
  "almay",
  "alva",
  "anna sui",
  "annabelle",
  "benefit",
  "boosh",
  "burt's bees",
  "butter london",
  "c'est moi",
  "cargo cosmetics",
  "china glaze",
  "clinique",
  "coastal classic creation",
  "colourpop",
  "covergirl",
  "dalish",
  "deciem",
  "dior",
  "dr. hauschka",
  "e.l.f.",
  "essie",
  "fenty",
  "glossier",
  "green people",
  "iman",
  "l'oreal",
  "lotus cosmetics usa",
  "maia's mineral galaxy",
  "marcelle",
  "marienatie",
  "maybelline",
  "milani",
  "mineral fusion",
  "misa",
  "mistura",
  "moov",
  "nudus",
  "nyx",
  "orly",
  "pacifica",
  "penny lane organics",
  "physicians formula",
  "piggy paint",
  "pure anada",
  "rejuva minerals",
  "revlon",
  "sally b's skin yummies",
  "salon perfect",
  "sante",
  "sinful colours",
  "smashbox",
  "stila",
  "suncoat",
  "w3llpeople",
  "wet n wild",
  "zorah",
  "zorah biocosmetiques",
];
let tags = [
  "Canadian",
  "CertClean",
  "Chemical Free",
  "Dairy Free",
  "EWG Verified",
  "EcoCert",
  "Fair Trade",
  "Gluten Free",
  "Hypoallergenic",
  "Natural",
  "No Talc",
  "Non-GMO",
  "Organic",
  "Peanut Free Product",
  "Sugar Free",
  "USDA Organic",
  "Vegan",
  "alcohol free",
  "cruelty free",
  "oil free",
  "purpicks",
  "silicone free",
  "water free",
];
let products = [];
let names = [];
let categories = [];
let productSet;
async function init() {
  let url = `http://makeup-api.herokuapp.com/api/v1/products.json`;
  try {
    let res = await fetch(url);
    let res1 = await res.json();
    for (let i = 0; i < res1.length; i++) {
      products.push(res1[i].product_type);
      names.push(res1[i].name);
      categories.push(res1[i].product_category);
    }
    productSet = new Set(products);
    console.log(productSet);
  } catch (error) {
    console.log(error);
  }
}

async function fetchAPI() {
  row.innerHTML = "";
  try {
    await init();
    let searchResult = input.value;
    let url = `https://makeup-api.herokuapp.com/api/v1/products.json`;
    if (brands.includes(searchResult)) {
      url = `https://makeup-api.herokuapp.com/api/v1/products.json?brand=${input.value}`;
    } else if (tags.includes(searchResult)) {
      url = `https://makeup-api.herokuapp.com/api/v1/products.json?product_tags=${input.value}`;
    } else if (products.includes(searchResult)) {
      url = `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${input.value}`;
    } else if (names.includes(searchResult)) {
      url = `https://makeup-api.herokuapp.com/api/v1/products.json?name=${input.value}`;
    }

    let res = await fetch(url);
    let res1 = await res.json();
    console.log(res1);
    for (let i = 0; i < res1.length; i++) {
      row.innerHTML += `<div class="col-md-4 my-4" style="display:flex;justify-content:center;">
    <div class="card" style="width: 20rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);">
    <img class="card-img-top" style="min-height:200px;max-height:300px;" src="${
      res1[i].image_link
    }" alt="Card image cap">
    <div class="card-body">
      <p class="lead" style="font-style:italic;font-color:pink">${
        res1[i].brand
      }</p>
      <h5 class="card-title">${res1[i].name}</h5>
      <span style="background-color:bisque; padding:5px">${
        res1[i].price_sign ? res1[i].price_sign : "$"
      } ${res1[i].price}</span>
      <p class="card-text mt-3">${res1[i]?.description?.slice(0, 100)}...</p>
      <a href="${
        res1[i].product_link
      }" target="_blank" class="btn btn-primary d-block">Buy</a>
    </div>
  </div>
    </div>`;
    }
  } catch (error) {
    console.log(error);
  }
}
button.addEventListener("click", fetchAPI);
