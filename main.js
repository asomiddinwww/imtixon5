// === Menyu boshqaruvi === //
const menuRemov = document.querySelector('#x');
const menuBtn = document.querySelector('#hum');
const menu = document.querySelector('#menus');

menuBtn.addEventListener('click', (e) => {
  menuBtn.style.display = 'none';
  menuRemov.style.display = 'flex';
  menu.style.display = 'flex';
});

menuRemov.addEventListener('click', (e) => {
  menuRemov.style.display = 'none';
  menuBtn.style.display = 'flex';
  menu.style.display = 'none';
});

// === Swiper === //
var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// === Scroll animatsiyasi === //
(function () {
  const box = document.getElementById('box');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', function () {
    const current = window.scrollY;

    if (current < lastScrollY) {
      box.style.display = 'flex';
    } else {
      box.style.display = 'none';
    }

    lastScrollY = current;
  }, { passive: true });
})();

// === Asosiy kod === //
let cards = document.querySelector(".card-container");
let shop = document.getElementById('shop');

// API dan ma’lumot olish
const getData = async (url) => {
  const res = await (await fetch(url)).json();
  return res;
};

// Like va Shop uchun localStorage
let shop_data = JSON.parse(localStorage.getItem("shop")) || [];
let liked_data = JSON.parse(localStorage.getItem("likedProducts")) || [];

getData("https://690698b2b1879c890ed7a4e7.mockapi.io/pa1/user").then(data => addUiData(data));

function addUiData(data) {
  cards.innerHTML = "";
  data.forEach(element => {
    const div = document.createElement("div");
    div.classList.add("card-container");
    const isLiked = liked_data.includes(element.id); 
    div.innerHTML = `
      <div class="card-item p-5 flex flex-col items-center justify-between h-105 shadow-xl hover:scale-101 cursor-pointer">
        <div class="card-item-img relative">
          <div class="like relative flex items-center justify-center">
            <i class="fa-solid fa-heart like-wh absolute text-2xl right-1 top-3" 
               style="color: ${isLiked ? '#ff0000' : '#b9bcc0'};" 
               data-id="${element.id}"></i>
          </div>
          <img src="${element.img}" alt="">
        </div>
        <div class="card-item-text">
          <p class="max-w-52 font-[600] text-[17px] pb-6 max-[610px]:text-[15px]">${element.title}</p>
          <div class="narx flex items-center justify-between">
            <h3 class="font-bold text-[18px]">${String(element.price).toLocaleString()} сум</h3>
            <button id=${element.id} class="shop-all rounded-full p-1 border-1 cursor-pointer flex items-center justify-center">
              <img src="./imgs/shopp.svg" alt="">
            </button>
          </div>
        </div>
      </div>
    `;
    cards.append(div);
  });

  // 🛍️ Savatga qo‘shish
let btns = document.querySelectorAll(".shop-all");
let shopfla = document.getElementById('shop-fl');

btns.forEach((button) => {
  button.addEventListener('click', (e) => {
    const id = +e.currentTarget.id;
    const findData = data.find((value) => value.id == id);

    // Shop indikatorni ko‘rsatish
    if (shopfla) shopfla.style.display = 'flex';

    // LocalStorage’dan eski ma’lumotlarni olish
    let shop_data = JSON.parse(localStorage.getItem("shop")) || [];

    // Agar oldin mavjud bo‘lsa, countni oshirish
    const existing = shop_data.find((item) => item.id == id);
    if (existing) {
      existing.count += 1;
      existing.userPrice = existing.price * existing.count;
    } else {
      shop_data.push({ ...findData, count: 1, userPrice: findData.price });
    }

    // LocalStorage’ni yangilash
    localStorage.setItem("shop", JSON.stringify(shop_data));

    // 🔁 Shop sahifasiga yo‘naltirish
    // setTimeout(() => {
    //   window.location.href = "shop.html"; // yoki sizda qaysi nom bilan bo‘lsa
    // }, 300);
  });
});

  // ❤️ Like bosish
  const likeBtns = document.querySelectorAll(".like-wh");
  likeBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = +e.target.dataset.id;
      let liked = JSON.parse(localStorage.getItem("likedProducts")) || [];

      if (liked.includes(id)) {
        liked = liked.filter(x => x !== id);
        e.target.style.color = "#b9bcc0"; // oq yurak
      } else {
        liked.push(id);
        e.target.style.color = "#ff0000"; // qizil yurak
      }

      localStorage.setItem("likedProducts", JSON.stringify(liked));

      // Like bosilgandan keyin like sahifasiga o'tish
      setTimeout(() => {
        window.location.href = "/compain/like.html";
      }, 400);
    });
  });
}

// === Like sahifasi uchun === //
function addLikedCards(data) {
  const likedIds = JSON.parse(localStorage.getItem("likedProducts")) || [];
  const likedProducts = data.filter(p => likedIds.includes(p.id));

  const container = document.querySelector("#liked-container");
  if (!container) return;

  container.innerHTML = "";
  if (likedProducts.length === 0) {
    container.innerHTML = "<p class='text-center text-gray-500'>Hech qanday like bosilgan mahsulot yo‘q 😔</p>";
    return;
  }

  likedProducts.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("card-item");
    div.innerHTML = `
      <img src="${item.img}" alt="${item.title}" />
      <p>${item.title}</p>
      <h3>${String(item.price).toLocaleString()} so'm</h3>
    `;
    container.appendChild(div);
  });
}

if (window.location.pathname.includes()) {
  getData("https://690698b2b1879c890ed7a4e7.mockapi.io/pa1/user").then(data => addLikedCards(data));
}
