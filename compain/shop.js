//  const shopContainer = document.getElementById("shop-cards");
//     const shopData = JSON.parse(localStorage.getItem("shop")) || [];

//     if (shopData.length === 0) {
//       shopContainer.innerHTML = "<p>Savat bo‘sh 😔</p>";
//     } else {
//       shopData.forEach(p => {
//         const div = document.createElement("div");
//         div.className = "card";
//         div.innerHTML = `
//           <img src="${p.img}" alt="${p.title}">
//           <div>
//             <h3>${p.title}</h3>
//             <p>${Number(p.userPrice).toLocaleString()} so‘m</p>
//           </div>
//           <span>Miqdor: ${p.count}</span>
//         `;
//         shopContainer.appendChild(div);
//       });
//     }

 const shopContainer = document.getElementById("shop-cards");
    const shopData = JSON.parse(localStorage.getItem("shop")) || [];

    if (shopData.length === 0) {
      shopContainer.innerHTML = "<p class='text-gray-600 text-lg'>Savat bo‘sh 😔</p>";
    } else {
      shopData.forEach(p => {
        const div = document.createElement("div");
        div.className = "card-item p-5 flex flex-col items-center justify-between h-105 shadow-xl bg-white rounded-xl hover:scale-[1.01] transition cursor-pointer";
        div.innerHTML = `
          <div class="card-item-img relative w-full flex items-center justify-center">
            <div class="like absolute right-2 top-2 flex items-center justify-center">
              <i class="fa-solid fa-trash text-xl text-red-500 cursor-pointer delete-btn" data-id="${p.id}"></i>
            </div>
            <img src="${p.img}" alt="${p.title}" class="rounded-xl w-[200px] h-[200px] object-cover">
          </div>

          <div class="card-item-text mt-4 text-center">
            <p class="max-w-52 font-[600] text-[17px] pb-3 max-[610px]:text-[15px]">${p.title}</p>
            <div class="narx flex items-center justify-between w-full">
            <button id="plus">g+</button>
            <span id="number"></span>
            <button id="minus">g-</button>
              <h3 class="font-bold text-[18px]" id="price">${(p.price).toLocaleString()} so‘m</h3>
              <span class="text-gray-600 text-sm">Miqdor: ${p.count}</span>
            </div>
          </div>
        `;
        shopContainer.appendChild(div);
      });
    }

    // 🗑️ O‘chirish funksiyasi
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.id;
        let shopData = JSON.parse(localStorage.getItem("shop")) || [];
        shopData = shopData.filter(item => item.id != id);
        localStorage.setItem("shop", JSON.stringify(shopData));
        e.currentTarget.closest(".card-item").remove();

        if (shopData.length === 0) {
          shopContainer.innerHTML = "<p class='text-gray-600 text-lg'>Savat bo‘sh 😔</p>";
        }
      });
    });

const pricePerItem = 4194000;

const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const countEl = document.getElementById("number");
const priceEl = document.getElementById("price");

let savedData = JSON.parse(localStorage.getItem("cart")) || { count: 1, total: pricePerItem };

let count = savedData.count;

function updatePrice() {
    const total = count * pricePerItem;
    priceEl.textContent = total.toLocaleString("uz-UZ") + " so'm";
    countEl.textContent = count;

    localStorage.setItem("cart", JSON.stringify({ count: count, total: total }));
}

plus.addEventListener("click", () => {
    count++;
    updatePrice();
});

minus.addEventListener("click", () => {
    if (count > 1) {
        count--;
        updatePrice();
    }
});

updatePrice();
