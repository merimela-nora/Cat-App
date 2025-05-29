

const factsContainer = document.getElementById("facts");
const factsInput = document.getElementById("cat-facts");
const factButton = document.getElementById("fact");
const photoContainer = document.getElementById("photos");
const photosInput = document.getElementById("cat-photos");
const photoButton = document.getElementById("photo");

const loading = document.getElementById("loading");

function setLoading(active) {
  if (active) {
    loading.classList.add("loading-indicator-active");
  } else {
    loading.classList.remove("loading-indicator-active");
  }
}
factButton.addEventListener("click", async (e) => {
  e.preventDefault();
  showFacts();
});

photoButton.addEventListener("click", async (e) => {
  e.preventDefault();
  showPhotos();
});

async function showFacts() {
  const factCount = parseInt(factsInput.value) || 1;
  factsContainer.innerHTML = "";
  setLoading(true);

  try {
    const res = await axios.get(`https://meowfacts.herokuapp.com/?count=${factCount}`);
    const facts = res.data.data;

    facts.forEach(fact => {
      const li = document.createElement("li");
      li.textContent = fact;
      factsContainer.appendChild(li);
    });
  } catch (error) {
    factsContainer.textContent = "Failed to load cat facts.";
    console.error("Cat facts error:", error);
  }

  setLoading(false);
}

async function showPhotos() {
  const photoCount = parseInt(photosInput.value) || 1;
  photoContainer.innerHTML = "";
  setLoading(true);

  try {
    const res = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${photoCount}`);
    const photos = res.data;

    photos.forEach(photo => {
      const img = document.createElement("img");
      img.src = photo.url;
      img.alt = "Random Cat";
      img.style.width = "200px";
      img.style.margin = "10px";
      photoContainer.appendChild(img);
    });
  } catch (error) {
    photoContainer.textContent = "Failed to load cat photos.";
    console.error("Cat photos error:", error);
  }

  setLoading(false);
}
