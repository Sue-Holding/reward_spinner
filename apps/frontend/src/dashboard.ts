const historyList = document.getElementById("history") as HTMLUListElement;
const orderForm = document.getElementById("order-form") as HTMLFormElement;
const orderInput = document.getElementById("order-name") as HTMLInputElement;
const spinBtn = document.getElementById("spin-btn") as HTMLButtonElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;
const wheel = document.getElementById("wheel") as HTMLDivElement;
const orderSelect = document.getElementById("order-select") as HTMLSelectElement;

let currentRotation = 0;

// add welcome seller with name
const welcomeMsg = document.getElementById("welcome-msg") as HTMLHeadingElement;
const sellerName = localStorage.getItem("sellerName");
const sellerId = localStorage.getItem("sellerId");
const token = localStorage.getItem("token");
const spinHistoryList = document.getElementById("spin-history") as HTMLUListElement;

if (sellerName) {
  welcomeMsg.textContent = `Welcome, ${sellerName}!`;
}

// fetch history from backend
async function loadHistory() {
  try {
    const res = await fetch(`http://localhost:3000/orders/${sellerId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error("Failed to fetch history");
    }

    const orders = await res.json();
    renderHistory(Array.isArray(orders) ? orders : [orders]);
  } catch (err) {
    console.error("Error loading history:", err);
  }
}

function renderHistory(orders: any[]) {
  historyList.innerHTML = "";
  orders.forEach(o => {
    const li = document.createElement("li");
    li.textContent = `Order: ${o.orderNumber} | Amount: ${o.amount}`;
    // li.textContent = `Order: ${o.orderNumber} | Amount: ${o.amount} | Spin: ${o.spins}`;
    // historyList.appendChild(li);
  
  // button to press spin on specific order - and then allows only one spin!
  const spinButton = document.createElement("button");
  spinButton.textContent = "Spin";
  spinButton.style.marginLeft = "10px";
  spinButton.addEventListener("click", () => spinOrder(o.orderNumber));

  li.appendChild(spinButton);
  historyList.appendChild(li);
  });
}

//  fetch spin history
async function loadSpinHistory(){
  try {
    const res = await fetch(`http://localhost:3000/spins/${sellerId}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Failed to fetch spin history");

    const data = await res.json();

    // clear old list data
    spinHistoryList.innerHTML = "";

    if (data.spins && data.spins.length > 0) {
      data.spins.forEach((spin: any) => {
        const li = document.createElement("li");
        const date = new Date(spin.spunAt).toLocaleString();
        li.textContent = `Order: ${spin.orderNumber} | Reward: ${spin.reward} | Date: ${date}`;
        spinHistoryList.appendChild(li);
      });

      // add totals of rewards
      const totals = document.createElement("li");
      totals.style.fontWeight = "bold";
      totals.textContent = 
          `Total spins: ${data.totalSpins}, ` +
          `Total rewards: ${data.totalRewards}, ` +
          `Spins left: ${data.availableSpins}`;
        spinHistoryList.appendChild(totals);
    } else {
      const li = document.createElement("li");
      li.textContent = "No spins yet!";
      spinHistoryList.appendChild(li);
    }
  } catch (err) {
    console.error("Error loading spin history:", err);
  }
}


// Lägg till ny order
orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const orderNumber = orderInput.value.trim();
  if (!orderNumber) return;

  try {
    const res = await fetch("http://localhost:3000/orders/add-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ sellerId, orderNumber, amount: 100 }) //fix this amount
    });

    const data = await res.json();
    if (!res.ok) {
      console.error(data.message);
      return;
    }

    console.log("Order saved", data);
    orderInput.value = "";
    loadHistory();
  } catch (err) {
    console.error(err);
  }
});

async function spinOrder(orderNumber: string) {
  try {
    const res = await fetch("http://localhost:3000/spins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ sellerId, orderNumber })
    });

    const data = await res.json();
    if (!res.ok) {
      resultDiv.textContent = data.message || "Spin failed";
      return;
    }

    // Animate wheel
    const spins = Math.floor(Math.random() * 3) + 3;
    const degree = Math.floor(Math.random() * 360);
    const totalRotation = spins * 360 + degree;
    currentRotation += totalRotation;
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    // Show result after animation
    setTimeout(() => {
      resultDiv.textContent = `Spin complete! Reward: ${data.reward}`;
      loadHistory();      // refresh order list
      loadSpinHistory();  // refresh spin history
    }, 4000);
  } catch (err) {
    console.error(err);
    resultDiv.textContent = "Error performing spin.";
  }
}

// Fetch orders from backend
async function loadOrders() {
  try {
    const res = await fetch(`http://localhost:3000/orders/${sellerId}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Failed to fetch orders");

    const orders = await res.json();
    renderAvailableOrders(Array.isArray(orders) ? orders : [orders]);
  } catch (err) {
    console.error("Error loading orders:", err);
  }
}

// Show only orders that haven’t been spun yet
function renderAvailableOrders(orders: any[]) {
  orderSelect.innerHTML = `<option value="">-- Välj order --</option>`;
  orders.forEach(o => {
    if (!o.spinned) {   // 🔹 make sure backend sets a flag like "spinned"
      const option = document.createElement("option");
      option.value = o.orderNumber;
      option.textContent = `Order: ${o.orderNumber} | Amount: ${o.amount}`;
      orderSelect.appendChild(option);
    }
  });
}

spinBtn.addEventListener("click", () => {
  const orderNumber = orderSelect.value;
  if (!orderNumber) {
    resultDiv.textContent = "Välj en order först!";
    return;
  }
  spinOrder(orderNumber);
});

// logout
const logoutBtn = document.getElementById("logout-btn") as HTMLButtonElement;
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("sellerId");
  localStorage.removeItem("sellerName");
  window.location.href = "/login.html"; // back to login
});

//  check if logged in at page load
window.addEventListener("DOMContentLoaded", () => {
  if (!token) {
    window.location.href = "/login.html"; // block access if not logged in
  } else {
    loadHistory();
    loadOrders();
    loadSpinHistory();
  }
});



// Spinn-knapp
// spinBtn.addEventListener("click", async () => {
//   const firstOrder = historyList.querySelector("li");
//   if (!firstOrder) {
//     resultDiv.textContent = "No orders available!";
//     return;
//   }

//   const orderNumber = firstOrder.textContent?.split(" ")[1];
//   if (!orderNumber) return; 

//   try {
//     const res = await fetch("http://localhost:3000/spins", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//       },
//       body: JSON.stringify({ sellerId, orderNumber })
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       resultDiv.textContent = data.message || "Spin failed";
//       return;
//     }
