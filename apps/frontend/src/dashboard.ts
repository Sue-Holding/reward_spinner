const historyList = document.getElementById("history") as HTMLUListElement;
const orderForm = document.getElementById("order-form") as HTMLFormElement;
const orderInput = document.getElementById("order-name") as HTMLInputElement;
const spinBtn = document.getElementById("spin-btn") as HTMLButtonElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;
const wheel = document.getElementById("wheel") as HTMLDivElement;

let currentRotation = 0;

interface Order {
  name: string;
  spins: number;
}

const history: Order[] = [];

// Lägg till ny order
orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const orderName = orderInput.value.trim();
  if (!orderName) return;

  history.push({ name: orderName, spins: 1 }); // varje order ger 1 spinn
  renderHistory();
  orderInput.value = "";
});

// Render historik
function renderHistory() {
  historyList.innerHTML = "";
  history.forEach(o => {
    const li = document.createElement("li");
    li.textContent = `${o.name} - Spinn kvar: ${o.spins}`;
    historyList.appendChild(li);
  });
}

// Spinn-knapp
spinBtn.addEventListener("click", () => {
  // Hitta första order med spins kvar
  const nextOrder = history.find(o => o.spins > 0);
  if (!nextOrder) {
    resultDiv.textContent = "Inga spinn kvar!";
    return;
  }

  // Minska spins för den ordern
  nextOrder.spins -= 1;

  // Animera hjulet (frontend dummy)
  const spins = Math.floor(Math.random() * 3) + 3; // antal varv
  const degree = Math.floor(Math.random() * 360);
  const totalRotation = spins * 360 + degree;
  currentRotation += totalRotation;

  wheel.style.transform = `rotate(${currentRotation}deg)`;

  // Visa resultat efter animationen (frontend dummy)
  setTimeout(() => {
    resultDiv.textContent = `Spinn genomförd för order "${nextOrder.name}"! Backend avgör priset.`;
    renderHistory();
  }, 4000); // matcha CSS transition duration
});
