
// Changeing img in hero section
let changeImage = document.getElementById("hero-image");
async function randomImage() {
  try {
    let res = await fetch(`https://dog.ceo/api/breeds/image/random`);
    let data = await res.json();
    if (data.status == "success") {
      changeImage.src = data.message;
    }
  } catch (error) {
    console.log("error fetching dog image:", error);
  }
}

randomImage();
setInterval(randomImage, 2000);

//Fetch breed list
async function loadBreeds() {
  const breedSelect = document.getElementById("breed-select");
  try {
    const res = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await res.json();

    const breeds = Object.keys(data.message);
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed;
      option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
      breedSelect.appendChild(option);
    });
  } catch (err) {
    console.error("Error fetching breed list:", err);
  }
}

// Fetch random or breed image
async function fetchDogImage(breed) {
  const img = document.getElementById("dog-img");
  let url = "https://dog.ceo/api/breeds/image/random";

  if (breed) {
    url = `https://dog.ceo/api/breed/${breed}/images/random`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    img.src = data.message;
  } catch (err) {
    console.error("Error fetching dog image:", err);
  }
}

// Event Listener for Button
document.getElementById("g-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const breed = document.getElementById("breed-select").value;
  fetchDogImage(breed);
});

// Load breeds and initial dog
loadBreeds();
fetchDogImage();
