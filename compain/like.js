const likeBtns = document.querySelectorAll(".like-wh");
  likeBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = +e.target.dataset.id;
      let liked = JSON.parse(localStorage.getItem("likedProducts")) || [];

      if (liked.includes(id)) {
        liked = liked.filter(x => x !== id);
        e.target.style.color = "#b9bcc0"; 
      } else {
        liked.push(id);
        e.target.style.color = "#ff0000"; 
      }

      localStorage.setItem("likedProducts", JSON.stringify(liked));

      setTimeout(() => {
        window.location.href = "/compain/like.html";
      }, 400);
    });
  });

function addLikedCards(data) {
  const likedIds = JSON.parse(localStorage.getItem("likedProducts")) || [];
  const likedProducts = data.filter(p => likedIds.includes(p.id));

  const container = document.querySelector("#liked-container");
  if (!container) return;

  container.innerHTML = "";
  if (likedProducts.length === 0) {
    container.innerHTML = "<p class='text-center text-gray-500'>Hech qanday like bosilgan mahsulot yo‘q </p>";
    return;
  }
}