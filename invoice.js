/* GET input Items Data ID */

const item = document.getElementById("item_name_id");
const quantity = document.getElementById("qty_id");
const price = document.getElementById("price_id");
const alert = document.getElementById("alert");

/* Invoice Summary ID */

const customerName = document.getElementById("customer_id");
const date = document.getElementById("date_id");
const discount = document.getElementById("discount_id");
const vat = document.getElementById("vat_input_id");

/* Rendering Summary ID */
const renderCustomer = document.getElementById("customer_by");
const renderDate = document.getElementById("date_by");
const renderDiscount = document.getElementById("discount_id_render");
const renderVatInput = document.getElementById("vat_id_render");

const renderSubtotal = document.getElementById("subtotal_id");
const renderDiscountPrice = document.getElementById("discount_id_price");
const renderVat = document.getElementById("vat_id");
const renderGrandTotal = document.getElementById("grand_id");

/*  ====================  */

/*  Data Storage 📊🗄️ */

let items = [
  // { name: "Iphone", qty: 2, price: 500 },
  // { name: "PC", qty: 3, price: 900 },
];

//==============================//
//== Currency As Format  💵💸==//
//==============================//

let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

//========== ==========//
//==     Summary     ==//
//========== ==========//

function handleSummary() {
  /* Validate Discount Input */

  if (discount.value < 0) {
    return (alert.innerHTML =
      "<span style='color:red'>Discount must be positive integer</span>");
  }

  if (discount.value > 100) {
    return (alert.innerHTML =
      "<span style='color:red'>Discount must not exceed 100%</span>");
  }

  if (vat.value < 0) {
    return (alert.innerHTML =
      "<span style='color:red'>Vat must be positive integer</span>");
  }

  if (vat.value > 100) {
    return (alert.innerHTML =
      "<span style='color:red'>Vat must not exceed 100%</span>");
  }

  /* Refrash Alert After validate */
  alert.innerHTML = "<span></span";

  /* Calculate Subtotal, Discount Price, Vat and Grand-total ➕ ✖️*/
  const subTotal = items.reduce((accumulator, item) => {
    return accumulator + item.qty * item.price;
  }, 0);
  const discountPrice = (subTotal * discount.value) / 100;
  const vatPrice = ((subTotal - discountPrice) * vat.value) / 100;
  const grandTotal = subTotal - (discountPrice - vatPrice);

  /* Render Invoice Summary 🧾🍃*/

  renderSubtotal.textContent = USDollar.format(subTotal.toFixed(2));

  renderDiscountPrice.textContent =
    "-" + USDollar.format(discountPrice.toFixed(2));

  renderVat.textContent = "+" + USDollar.format(vatPrice.toFixed(2));

  renderGrandTotal.textContent = USDollar.format(grandTotal.toFixed(2));
}

//========== ==========//
//==   Render Item   ==//
//========== ==========//

function renderItem() {
  let dataHTML = "";

  items.forEach((item, i) => {
    dataHTML += "<tr>";
    dataHTML += `<td>${i + 1}</td>`;
    dataHTML += `<td>${item.name}</td>`;
    dataHTML += `<td>${item.qty}</td>`;
    dataHTML += `<td>${USDollar.format(item.price.toFixed(2))}</td>`;

    /* Calculate [ ✖️ ] price of SubTotal */
    dataHTML += `<td>${USDollar.format(
      (item.qty * item.price).toFixed(2)
    )}</td>`;
    dataHTML += `<td><button onclick="removeItem(${i})">❌</button></td>`;
    dataHTML += "</tr>";
  });

  document.getElementById("result_table_row").innerHTML = dataHTML;
}

//========== ==========//
//==   Remove Item   ==//
//========== ==========//

function removeItem(i) {
  /* Refrash Alert After validate */
  alert.innerHTML = "<span></span";

  /*  Delete Item ❌ */
  items = items.filter((item, index) => index !== i);

  /* Render Existing Items 💫*/

  renderItem();
  handleSummary();
}

//========== ==========//
//==     Add Item    ==//
//========== ==========//

function addItems() {
  /* Refrash Alert After validate */
  alert.innerHTML = "<span></span";

  /*  Create Item 🏗️*/

  const newItem = {
    name: String(item.value),
    qty: Number(quantity.value),
    price: Number(price.value),
  };
  items.push(newItem);

  /* Render Created Items 💫*/

  renderItem();
}

//========== ================//
//== Input Form validation ==//
//========== ================//

function validateInput() {
  if (!item.value || !quantity.value || !price.value) {
    return (alert.innerHTML =
      "<span style='color:red'>All fields are required</span>");
  }

  if (quantity.value <= 0) {
    return (alert.innerHTML =
      "<span style='color:red'>Quantity must be positive integer</span>");
  }

  if (price.value <= 0) {
    return (alert.innerHTML =
      "<span style='color:red'>Price must be positive integer</span>");
  }

  if (parseInt(item.value)) {
    return (alert.innerHTML =
      "<span style='color:red'>Item must be string</span>");
  }

  /* Call Add Item Function */

  addItems();

  /* Call Add Summary Function */

  handleSummary();
}

//==============================================//
/* Real Time Update on Customer name && Date ⌛*/
//==============================================//

function handleCustomer() {
  renderCustomer.textContent = customerName.value;
}

function handleDate() {
  renderDate.textContent = date.value;
}

function handleDiscount() {
  handleSummary();
  renderDiscount.textContent = discount.value;
}

function handleVat() {
  handleSummary();
  renderVatInput.textContent = vat.value;
}
