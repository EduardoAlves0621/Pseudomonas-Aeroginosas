const bacteriaData = [
  {
    name: "Escherichia coli (E. coli)",
    description: "Uma bactéria comum encontrada no intestino humano.",
    antibiotics: ["Amoxicilina", "Ciprofloxacina", "Tetraciclina"],
    resistantTo: ["Amoxicilina"],
  },
  {
    name: "Staphylococcus aureus",
    description: "Causa infecções cutâneas e outros problemas graves.",
    antibiotics: ["Vancomicina", "Eritromicina", "Penicilina"],
    resistantTo: ["Penicilina"],
  },
  {
    name: "Klebsiella pneumoniae",
    description: "Uma bactéria que pode causar pneumonia.",
    antibiotics: ["Ceftriaxona", "Gentamicina", "Colistina"],
    resistantTo: ["Ceftriaxona", "Gentamicina"],
  },
];

let currentBacteriaIndex = 0;

const elements = {
  bacteriaName: document.getElementById("bacteria-name"),
  bacteriaDescription: document.getElementById("bacteria-description"),
  antibioticsContainer: document.getElementById("antibiotics"),
  result: document.getElementById("result"),
  nextButton: document.getElementById("next-bacteria"),
};

function updateResult(message, isSuccess) {
  elements.result.textContent = message;
  elements.result.className = isSuccess ? "success" : "error";
  if (isSuccess) {
    elements.nextButton.classList.remove("hidden");
  }
}

function loadBacteria() {
  const bacteria = bacteriaData[currentBacteriaIndex];
  elements.bacteriaName.textContent = bacteria.name;
  elements.bacteriaDescription.textContent = bacteria.description;

  elements.antibioticsContainer.innerHTML = "";
  bacteria.antibiotics.forEach((antibiotic) => {
    const button = document.createElement("button");
    button.textContent = antibiotic;
    button.addEventListener("click", () => checkResistance(antibiotic));
    elements.antibioticsContainer.appendChild(button);
  });

  elements.result.textContent = "";
  elements.nextButton.classList.add("hidden");
}

function checkResistance(selectedAntibiotic) {
  const bacteria = bacteriaData[currentBacteriaIndex];
  if (bacteria.resistantTo.includes(selectedAntibiotic)) {
    updateResult("Resistente! Tente outro antibiótico.", false);
  } else {
    updateResult("Sucesso! Bactéria tratada.", true);
  }
}

elements.nextButton.addEventListener("click", () => {
  currentBacteriaIndex++;
  if (currentBacteriaIndex < bacteriaData.length) {
    loadBacteria();
  } else {
    elements.bacteriaName.textContent = "";
    elements.bacteriaDescription.innerHTML = "<h2>Parabéns! Você completou o jogo.</h2>";
    elements.antibioticsContainer.style.display = "none";
    elements.nextButton.style.display = "none";
  }
});

// Inicializar o jogo
loadBacteria();
