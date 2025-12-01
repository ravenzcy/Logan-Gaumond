const containerProgramming = document.querySelector("#listProgrammation");
const containerDesign = document.querySelector("#listDesign");
const containerAudiovisual = document.querySelector("#listAudiovisuel");

const modal = document.querySelector("#projectModal");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const modalYear = document.querySelector("#modalYear");
const modalRole = document.querySelector("#modalRole");
const modalLink = document.querySelector("#modalLink");

const carouselInner = document.querySelector("#carouselInner");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

let currentIndex = 0;
let currentMedia = [];

function closeModal() {
    carouselInner.innerHTML = "";
    modal.classList.add("hidden");
}

document.querySelector("#closeModal").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

fetch("./scripts/projects.json")
    .then(res => res.json())
    .then(data => {
        data.forEach(project => {
            createProjectCard(project);
        });
    });

function createProjectCard(project) {
    const card = document.createElement("div");
    card.className =
        "cursor-pointer bg-[#1e1e1e] w-56 sm:w-64 rounded-xl overflow-hidden shadow-lg hover:scale-[1.03] hover:shadow-xl transition transform duration-300";

    card.innerHTML = `
        <img src="${project.cover}" class="w-full h-64 object-cover rounded-t-xl">
        <div class="p-4">
            <h3 class="text-lg font-semibold text-center text-[#9b5de5]">
                ${project.title}
            </h3>
        </div>
    `;

    card.addEventListener("click", () => openModal(project));

    // Tri par catégorie
    if (project.category === "programmation") containerProgramming.appendChild(card);
    if (project.category === "design") containerDesign.appendChild(card);
    if (project.category === "audiovisuel") containerAudiovisual.appendChild(card);
}

// OUVRIR LE MODAL
function openModal(project) {
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalYear.textContent = project.year;
    modalRole.textContent = project.role;

    // Gérer le lien du projet
    if (project.link) {
        modalLink.href = project.link;
        modalLink.classList.remove("hidden");
    } else {
        modalLink.classList.add("hidden");
    }

    // Préparer le carrousel
    carouselInner.innerHTML = "";
    currentMedia = project.media.map(item => {
        let element;

        if (item.includes("youtube.com/embed/")) {
            element = document.createElement("iframe");
            element.src = item;
            element.setAttribute("frameborder", "0");
            element.setAttribute("allowfullscreen", true);
            element.className = "carousel-media w-full h-96";
        } else {
            element = document.createElement("img");
            element.src = item;
            element.className = "carousel-media w-full h-96 object-cover";
        }

        return element;
    });

    currentIndex = 0;
    showMedia(currentIndex);

    modal.classList.remove("hidden");
}
function showMedia(index) {
    carouselInner.innerHTML = "";
    carouselInner.appendChild(currentMedia[index]);

    // Masquer ou afficher les flèches selon le type de média
    if (currentMedia[index].tagName === "IFRAME") {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
    } else {
        prevBtn.style.display = "flex";
        nextBtn.style.display = "flex";
    }
}

// BOUTONS CARROUSEL
prevBtn.addEventListener("click", () => {
    if (currentMedia.length === 0) return;
    currentIndex = (currentIndex - 1 + currentMedia.length) % currentMedia.length;
    showMedia(currentIndex);
});

nextBtn.addEventListener("click", () => {
    if (currentMedia.length === 0) return;
    currentIndex = (currentIndex + 1) % currentMedia.length;
    showMedia(currentIndex);
});

