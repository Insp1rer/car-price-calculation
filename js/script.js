const carCalculatiionForm = document.querySelector(".form");
const selectedCab = document.getElementById("cab");
const selectedFuel = document.getElementById("fuel");
const selectedGearbox = document.getElementById("gearbox");
const radioButton = document.querySelector(".button-label span");

const markaKolupalka = document.getElementById("brand");

markaKolupalka.addEventListener("change", async () => {
  try {
    console.log(markaKolupalka.value);
    const response = await fetch("http://localhost:3000/dai-meni-marka", {
      mode: "no-cors",
    });
    console.log(response);
  } catch (error) {
    console.log("mask gaychik");
  }
});

carCalculatiionForm.addEventListener("submit", handleShowPrice);

radioButton.addEventListener("click", () => {
  console.log(radioButton.textContent);
});

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
  getSomething();
}

const autoData = {
  inputMark: "Audi",
  inputModel: "A4",
  inputYear: 2016,
};

let markValue;
let modelValue;

async function getSomething() {
  try {
    const responseMark = await fetch("/message.json");
    const responseModel = await fetch("/models.json");
    const dataMark = await responseMark.json();
    const dataModel = await responseModel.json();

    dataMark.forEach((itemMark) => {
      if (itemMark.name === autoData.inputMark) {
        markValue = itemMark.value;
      }
    });

    dataModel.forEach((itemModel) => {
      if (itemModel.name === autoData.inputModel) {
        modelValue = itemModel.value;
      }
    });

    const BASE_URL =
      "https://developers.ria.com/auto/average_price?api_key=CS5CXlWTH79BZcfO50D5PsP2iNdXGOKKdXC2A8Ne";

    const url = `${BASE_URL}&marka_id=${markValue}&model_id=${modelValue}&yers=${
      autoData.inputYear - 3
    }&yers=${autoData.inputYear + 3}`;

    const responseAutoData = await fetch(url);
    if (!responseAutoData.ok) throw new Error("Network response was not ok");

    const jsonData = await responseAutoData.json();
    document.body.innerHTML = `<h1>${jsonData.arithmeticMean}</h1>`;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}
