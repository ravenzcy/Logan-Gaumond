fetch("./scripts/projects.json")
    .then(res => res.json())
    .then(projects => {
        const track = document.querySelector("#carouselTrack");

        // Prendre les 3 derniers projets
        const lastThree = projects.slice(-3);

        lastThree.forEach(p => {
            const card = document.createElement("div");
            card.className = "carousel-card";

            card.innerHTML = `
                <img src="${p.cover}">
                <div class="carousel-card-title">${p.title}</div>
            `;

            track.appendChild(card);
        });
    });