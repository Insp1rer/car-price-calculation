const carCalculatiionForm = document.querySelector(".form");
const selectedCab = document.getElementById("cab");
const selectedFuel = document.getElementById("fuel");
const selectedGearbox = document.getElementById("gearbox");

carCalculatiionForm.addEventListener("submit", handleShowPrice);

function handleShowPrice(event) {
  event.preventDefault();

  if (
    selectedCab.value === "" ||
    selectedFuel.value === "" ||
    selectedGearbox.value === ""
  ) {
    alert("Будь ласка, заповніть всі поля");
    return;
  }

  //   console.log(selectedCab.value);

  document.body.innerHTML = `<h1>Price</h1>`;
}
