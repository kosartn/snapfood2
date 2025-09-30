import { validateFood } from "./validation.js";
import { showNotification } from "./notification.js";

let cart = [];
let allFoods = [];

fetch("index.json")
  .then((res) => res.json())
  .then((data) => {
    allFoods = data;
    renderMenu(allFoods);
  })
  .catch((err) => console.error("خطا در دریافت داده‌ها:", err));

function renderMenu(items) {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.material || item.desc}</p>
      <p><strong>${item.price} تومان</strong></p>
      <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})">افزودن به سبد</button>
    `;

    menu.appendChild(card);
  });
}

// اضافه کردن غذا به سبد
window.addToCart = function (id, name, price) {
  cart.push({ id, name, price });
  renderCart();
};

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");

  cartItems.innerHTML = "";

  let total = 0;
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price} تومان`;
    cartItems.appendChild(li);
    total += item.price;
  });

  totalPrice.textContent = total;
}

// ثبت سفارش
document.getElementById("submit").addEventListener("click", () => {
  if (cart.length > 0) {
    showNotification("سفارش شما ثبت شد ✅ تا نیم ساعت دیگر آماده می‌شود.");
  } else {
    showNotification("لطفاً ابتدا غذایی به سبد اضافه کنید!", false);
  }
});

// سفارش جدید
document.getElementById("resetOrder").addEventListener("click", () => {
  cart = [];
  renderCart();
  showNotification("");
});

// افزودن غذای جدید
document.getElementById("addFoodBtn").addEventListener("click", () => {
  const name = document.getElementById("foodName").value;
  const desc = document.getElementById("foodDesc").value;
  const price = parseInt(document.getElementById("foodPrice").value);

  if (validateFood(name, desc, price)) {
    const newFood = {
      id: Date.now(),
      name,
      desc,
      price,
    };

    allFoods.push(newFood);
    renderMenu(allFoods);

    document.getElementById("foodName").value = "";
    document.getElementById("foodDesc").value = "";
    document.getElementById("foodPrice").value = "";

    showNotification("غذا با موفقیت اضافه شد ✅");
  } else {
    showNotification("لطفاً همه‌ی فیلدها را به درستی پر کنید!", false);
  }
});
