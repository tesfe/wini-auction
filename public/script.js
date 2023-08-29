//script for products page

const fetchBtn = document.querySelectorAll(".category");
const price = document.querySelector("#prices");
const company = document.querySelectorAll(".company");
const colors = document.querySelectorAll(".colors");
const item = document.querySelector(".item");
const rangeValue = document.querySelector(".rangeValue");
const search = document.querySelector("#search");
const searchBtn = document.querySelector(".search-btn");

const bid = document.querySelector("#bid");
const submit = document.querySelector("#submit");
const key = "products";

const colorsArray = Array.from(colors);
const companyArray = Array.from(company);
const categoryArray = Array.from(fetchBtn);
const menu = {};
menu.category = "all";
menu.company = "all";
menu.color = "all";
menu.price = price.value;
searchBtn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  try {
    const query = search.value;
    // const query = search.value;
    console.log(query);
    if (!query) {
      return;
    }
    item.innerHTML = "";
    const url = "http://localhost:3000/product";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    search.value = "";
    console.log("the status is ", response.status);
    if (response.status === 201) {
      item.innerHTML = "<h5>exact match is not found</h5>";
    }
    const data = await response.json();

    if (data) {
      sessionStorage.clear();
      //  storage.push(data);
      // console.log(storage);

      sessionStorage.setItem(key, JSON.stringify(data));
      //storage = "";
    }

    data.forEach(createItem);
  } catch (error) {
    console.log({ message: "failed to retrieve" });
  }
});

function createItem(data) {
  const spanName = document.createElement("span");
  const spanPrice = document.createElement("span");
  const div = document.createElement("div");
  const img = document.createElement("img");
  const container = document.createElement("div");
  const form = document.createElement("form");
  const bidBtn = document.createElement("button");
  spanName.classList.add("name");
  spanName.innerText = data.name;
  spanPrice.classList.add("price");
  spanPrice.innerText = "$" + data.prices;
  div.classList.add("name-price-tag");
  const imgScr = data.url;
  console.log(imgScr);
  // img.loading = "eager";
  img.src = imgScr;
  // img.height = "350";

  img.classList.add(
    "col-12",
    "col-sm-12",
    "col-md-12",
    "col-lg-12",
    "ps-5",
    "ps-sm-0"
  );
  container.classList.add(
    "col-12",
    "col-sm-12",
    "col-md-4",
    "col-lg-4",
    "containerBg-color"
  );

  form.action = "/auctionItem";
  form.method = "post";
  form.classList.add("bid");
  bidBtn.type = "submit";
  bidBtn.classList.add("submit", "w-100", "m-1", "rounded-pill");
  bidBtn.textContent = "Join Auction";
  bidBtn.value = data.name;
  bidBtn.name = "model";
  // const clonedForm = bid.cloneNode(true);
  // submit.style.display = "block";
  // container.appendChild(clonedForm);
  // //bid.appendChild(submit);
  form.appendChild(bidBtn);

  div.append(spanName, spanPrice);
  container.append(form, img, div);
  // container.appendChild(img);
  // container.appendChild(div);
  item.appendChild(container);
}

categoryArray.forEach((button) => {
  button.addEventListener("click", (evt) => {
    // evt.preventDefault();

    //button.style.backgroundColor = "white";

    const val = evt.target.value;
    console.log(JSON.stringify(val));
    menu.category = val;
    // val = "";
    item.innerHTML = "";
    options();
  });
});
companyArray.forEach((button) => {
  button.addEventListener("change", (evt) => {
    // evt.preventDefault();

    const val = evt.target.value;
    console.log(JSON.stringify(val));
    menu.company = val;
    item.innerHTML = "";
    // val = "";
    console.log(JSON.stringify(menu.company));
    options();
  });
});
colorsArray.forEach((button) => {
  button.addEventListener("click", (evt) => {
    // evt.preventDefault();
    const val = evt.target.value;
    console.log(JSON.stringify(val));
    menu.color = val;
    // val = "";
    item.innerHTML = "";
    console.log(JSON.stringify(menu.color));
    options();
  });
});

price.addEventListener("change", (evt) => {
  const val = evt.target.value;
  console.log(JSON.stringify(val));
  menu.price = val;
  rangeValue.style.color = "black";
  rangeValue.textContent = "$" + val;
  item.innerHTML = "";
  console.log(JSON.stringify(menu));
  options();
});

const options = async () => {
  try {
    const category = menu.category;
    const company = menu.company;
    const color = menu.color;
    const price = menu.price;

    const url = `http://localhost:3000/product?category=${category}&company=${company}&color=${color}&price=${price}`;
    const response = await fetch(url, {
      method: "GET",
    });

    console.log("the status is ", response.status);
    if (response.status === 201) {
      item.innerHTML = "<h5>exact match is not found</h5>";
    }
    const data = await response.json();

    if (data) {
      sessionStorage.clear();
      //  storage.push(data);
      // console.log(storage);

      sessionStorage.setItem(key, JSON.stringify(data));
      //storage = "";
    }

    data.forEach(createItem);
  } catch (error) {
    console.log({ message: "failed to retrieve" });
  }
};
document.addEventListener("DOMContentLoaded", () => {
  const storageSession = JSON.parse(sessionStorage.getItem(key));
  console.log(storageSession);
  storageSession.forEach(createItem);
});

// try {
//   const response = await fetch(
//     `http://localhost:3000/employe?query=${encodeURIComponent(query)}`,
//     { method: "GET" }
//   );
//   if (!response.ok) {
//     throw new Error("network is failed");
//   }
//   const querData = await response.json();
// } catch (err) {
//   console.log("failed to retrieve search value");
// }
