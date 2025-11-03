const shopContainer = document.getElementById("shop-cards");
let shopData = JSON.parse(localStorage.getItem("shop")) || [];

if (shopData.length === 0) {
  shopContainer.innerHTML = "<p>malumot yoq</p>";
} else {
  shopData.forEach(p => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card-item flex rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
        <div class="flex flex-col justify-between space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
          <a href="#" class="shrink-0 md:order-1">
            <img class="hidden h-50 w-50 dark:block" src="${p.img}" alt="imac image" />
          </a>

          <div class="flex items-center justify-between md:order-3 md:justify-end">
            <div class="flex items-center">
              <button type="button" id="minus" class="text-white inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none dark:bg-gray-700">-</button>
              <span id="number" class="pl-2 pr-2 text-white">${p.count}</span>
              <button type="button" id="plus" class="text-white inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none dark:bg-gray-700">+</button>
            </div>
            <div class="text-end md:order-4 md:w-32">
              <p class="text-base font-bold text-gray-900 dark:text-white">${p.price.toLocaleString()} so'm</p>
            </div>
          </div>

          <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
            <span class="text-base font-medium text-gray-900 hover:underline dark:text-white">${p.title}</span>
            <div class="flex items-center gap-4">
              <button type="button" data-id="${p.id}" class="delete-btn inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    shopContainer.appendChild(div);
  });
}

document.querySelectorAll(".delete-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const id = e.currentTarget.dataset.id; 

    let shopData = JSON.parse(localStorage.getItem("shop")) || [];

    const newData = shopData.filter(item => String(item.id) !== String(id));

    localStorage.setItem("shop", JSON.stringify(newData));

    e.currentTarget.closest(".card-item").remove();

    if (newData.length === 0) {
      shopContainer.innerHTML = "<p>malumot yoq</p>";
    }

    console.log(`Mahsulot ID ${id} o‘chirildi. Qolganlar:`, newData);
  });
});

document.querySelectorAll("#plus").forEach(plusBtn => {
  plusBtn.addEventListener("click", (e) => {
    const card = e.currentTarget.closest(".card-item");
    const countEl = card.querySelector("#number");
    const priceEl = card.querySelector("p");
    let count = parseInt(countEl.textContent);
    let basePrice = parseInt(priceEl.textContent.replace(/\D/g, "")) / count; // asosiy narxni topamiz

    count++;
    countEl.textContent = count;
    let newPrice = basePrice * count;
    priceEl.textContent = `${newPrice.toLocaleString()} so'm`;

    let shopData = JSON.parse(localStorage.getItem("shop")) || [];
    const title = card.querySelector("span, h3, p").textContent.trim();
    const item = shopData.find(el => el.title === title);
    if (item) {
      item.count = count;
      item.userPrice = newPrice;
      localStorage.setItem("shop", JSON.stringify(shopData));
    }
  });
});

document.querySelectorAll("#minus").forEach(minusBtn => {
  minusBtn.addEventListener("click", (e) => {
    const card = e.currentTarget.closest(".card-item");
    const countEl = card.querySelector("#number");
    const priceEl = card.querySelector("p");
    let count = parseInt(countEl.textContent);
    if (count <= 1) return; 

    let basePrice = parseInt(priceEl.textContent.replace(/\D/g, "")) / count;

    count--;
    countEl.textContent = count;
    let newPrice = basePrice * count;
    priceEl.textContent = `${newPrice.toLocaleString()} so'm`;

    let shopData = JSON.parse(localStorage.getItem("shop")) || [];
    const title = card.querySelector("span, h3, p").textContent.trim();
    const item = shopData.find(el => el.title === title);
    if (item) {
      item.count = count;
      item.userPrice = newPrice;
      localStorage.setItem("shop", JSON.stringify(shopData));
    }
  });
});

function updateTotal() {
  const shopData = JSON.parse(localStorage.getItem("shop")) || [];
  const total = shopData.reduce((sum, item) => sum + (item.userPrice || 0), 0);

  const orignEl = document.querySelector(".orign");
  if (orignEl) {
    orignEl.textContent = `${total.toLocaleString()} so'm`;
  }
}
localStorage.setItem("shop", JSON.stringify(shopData));

updateTotal();

