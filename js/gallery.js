function fetchGallery() {
  const PROJECT_ID = "c7jd3ho8";
  const DATASET = "production";
  const QUERY = encodeURIComponent('*[_type == "gallery"]');

  const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

  fetch(URL)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .then(({ result }) => {
      const galleryHeadings = result.map((i) => i.galleryName);
      const galleryImages = result.map(({ galleryName, images }) => {
        return { galleryName: galleryName, images: images };
      });

      buildGalleryHeadings(galleryHeadings);
      buildGalleryContent(galleryImages);
    })
    .catch((error) => {
      console.error("An error occurred while fetching gallery:", error);
    });
}

function buildGalleryHeadings(headings) {
  let headingsContainer = document.getElementById("gallerySection");
  let headingContent = headings
    .map((heading, i) => {
      return `
      <button onClick="changeSelected('${heading.replaceAll(
        " ",
        "-"
      )}')" class="gallery-heading__container">
        ${i !== 0 ? '<div class="gallery__heading--separator">|</div>' : ""}
        <div 
          id="${heading.replaceAll(" ", "-")}" 
          class="gallery-heading ${
            i === 0 ? "active" : ""
          } gallery-heading-${heading.replaceAll(" ", "-")}"
        >
          ${heading}
        </div>
      </button>
    `;
    })
    .join("");

  headingsContainer.insertAdjacentHTML("afterbegin", headingContent);
}

function buildGalleryContent(images) {
  let galleryContainer = document.getElementById("galleryImageWrapper");
  let galleryContent = images
    .map((image, i) => {
      const { galleryName, images } = image;
      return `<div id="${galleryName.replaceAll(
        " ",
        "-"
      )}--container" class="gallery__image-container ${
        i === 0 ? "container-active" : ""
      }">
      ${images
        .map((image) => {
          const [_, id, width, format] = image.asset._ref.split("-");
          return `
            <div class="gallery__image-wrapper"><img src="https://cdn.sanity.io/images/c7jd3ho8/production/${id}-${width}.${format}" alt="${images.alt}" class="gallery-image__img" style="height: 100%; width: 100%" /></div>
        `;
        })
        .join("")}
    </div>`;
    })
    .join("");

  galleryContainer.insertAdjacentHTML("afterbegin", galleryContent);
}

function changeSelected(selectedHeading) {
  console.log("SElected headingt", selectedHeading.trim());
  const currentGrid = document.querySelector(".container-active");
  const currentHeading = document.querySelector(".gallery-heading.active");
  const newHeading = document.getElementById(selectedHeading.trim());
  const newGrid = document.getElementById(`${selectedHeading}--container`);

  currentGrid.classList.remove("container-active");
  newGrid.classList.add("container-active");

  currentHeading.classList.remove("active");
  newHeading.classList.add("active");
}

fetchGallery();

//gallery-heading-I.S.T.D-Examinations
