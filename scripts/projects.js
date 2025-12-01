const containerProgramming = document.querySelector("#listProgrammation");
const containerDesign = document.querySelector("#listDesign");
const containerAudiovisual = document.querySelector("#listAudiovisuel");

const modal = document.querySelector("#projectModal");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const modalYear = document.querySelector("#modalYear");
const modalRole = document.querySelector("#modalRole");
const modalLink = document.querySelector("#modalLink");
const carouselContainer = document.querySelector("#carouselContainer");

const carouselInner = document.querySelector("#carouselInner");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

let currentIndex = 0;
let currentMedia = [];

function closeModal() {
    // Stopper les vidéos YouTube/iFrame en rechargeant la source
    const iframes = carouselInner.querySelectorAll("iframe");
    iframes.forEach(iframe => {
        // Sauvegarde la source et la réinitialise pour arrêter la lecture
        const src = iframe.src;
        iframe.src = src; 
    });

    // Cacher le modal
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

    // tri par catégorie
    if (project.category === "programmation") containerProgramming.appendChild(card);
    if (project.category === "design") containerDesign.appendChild(card);
    if (project.category === "audiovisuel") containerAudiovisual.appendChild(card);
}

function openModal(project) {
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalYear.textContent = project.year;
    modalRole.textContent = project.role;

    if (project.link) {
        modalLink.href = project.link;
        modalLink.classList.remove("hidden");
    } else {
        modalLink.classList.add("hidden");
    }

    carouselInner.innerHTML = "";
    
    currentMedia = project.media.map(item => {
        let element;
        
        if (item.includes("youtube.com/embed/")) {
            element = document.createElement("iframe");
            element.src = item;
            element.setAttribute("frameborder", "0");
            element.setAttribute("allowfullscreen", true);
            element.className = "carousel-media w-full h-96"; 
        } 
        else {
            element = document.createElement("img");
            element.src = item;
            element.className = "carousel-media";
        }
        return element;
    });

    currentIndex = 0;
    showMedia(currentIndex);

    // Vérifie si le média actuel est un IFRAME pour cacher les flèches
    if (currentMedia[currentIndex].tagName === "IFRAME") {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
    } else {
        prevBtn.style.display = "flex";
        nextBtn.style.display = "flex";
    }

    modal.classList.remove("hidden");
}


function showMedia(index) {
    carouselInner.innerHTML = "";
    carouselInner.appendChild(currentMedia[index]);

    if (currentMedia[index].tagName === "IFRAME") {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
    } else {
        prevBtn.style.display = "flex";
        nextBtn.style.display = "flex";
    }
}
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