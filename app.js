const taxPrice = 0.08;
const shippingPrice = 30;
const shippingFreePrice = 200;

window.addEventListener("load", () => {
  localStorage.setItem("taxPrice", taxPrice);
  localStorage.setItem("shippingPrice", shippingPrice);
  localStorage.setItem("shippingFreePrice", shippingFreePrice);

  sessionStorage.setItem("taxPrice", taxPrice);
  sessionStorage.setItem("shippingPrice", shippingPrice);
  sessionStorage.setItem("shippingFreePrice", shippingFreePrice);
});

const calculatePrice = (btn) => {
  const perProductDiv = btn.parentElement.parentElement;
  const perPrice = perProductDiv.querySelector(".product-price").innerText;
  const quantity = perProductDiv.querySelector(".quantity").innerText;
  const subt = perProductDiv.querySelector(".subt");
  subt.innerText = (perPrice * quantity).toFixed(2);
};

const totalCal = () => {
  const productTotal = document.querySelectorAll(".subt");
  let total = 0;
  productTotal.forEach((sub) => (total += Number(sub.innerText)));

  const taxPrice = total * localStorage.getItem("taxPrice");

  const shipPrice = Number(
    total > 0 && localStorage.getItem("shippingFreePrice") > total
      ? localStorage.getItem("shippingFreePrice")
      : 0
  );

  document.querySelector(".subtotal").innerText = total.toFixed(2);
  document.querySelector(".shipping").innerText = shipPrice.toFixed(2);
  document.querySelector(".tax").innerText = taxPrice.toFixed(2);
  document.querySelector(".lastTotal").innerText = (
    total +
    taxPrice +
    shipPrice
  ).toFixed(2);
};

const checkBox = (btn) => {
  const perProductDiv = btn.parentElement.parentElement;
  const check = perProductDiv.querySelector("#check");
  if (check.checked == false) {
    perProductDiv.querySelector(".quantity").innerText = 0;
    perProductDiv.querySelector(".subt").innerText = 0;

    totalCal();
  }
};

const productDiv = document.querySelector(".product");

productDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("plus")) {
    e.target.parentElement.querySelector(".quantity").innerText++;
    if (e.target.parentElement.querySelector(".quantity").innerText > 9) {
      alert("you can get a maximum of 10");
    }

    calculatePrice(e.target);
    totalCal();
  } else if (e.target.classList.contains("minus")) {
    if (e.target.parentElement.querySelector(".quantity").innerText <= 1) {
      confirm("The product will be delete.Are you sure?") &&
        e.target.parentElement.parentElement.remove();

      totalCal();

      //   e.target.classList.add("pure-button-disabled");
    } else {
      e.target.parentElement.querySelector(".quantity").innerText--;

      calculatePrice(e.target);
      totalCal();
    }
  } else if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.parentElement.remove();

    totalCal();
  }
  checkBox(e.target);
});
