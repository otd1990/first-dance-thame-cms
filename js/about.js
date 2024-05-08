fetchContent();

const generateImageURL = (imageAsset) => {
  const { _ref } = imageAsset;
  const [_, id, rev, format] = _ref.split("-");
  return `https://cdn.sanity.io/images/c7jd3ho8/production/${id}-${rev}.${format}`;
};

const updateImageSrc = (element, imageAsset) => {
  if (imageAsset && element) {
    element.setAttribute("src", generateImageURL(imageAsset));
    element.style.opacity = 1;
  }
};

const buildAbout = (content) => {
  const parent = document.getElementById("aboutMeContent");
  const profileImage = document.getElementById("profileImage");
  const accreditationImage = document.getElementById("accreditationImage");

  const {
    profileImage: profileImageData,
    accreditationImage: accreditationImageData,
  } = content[0];

  // Update the images
  updateImageSrc(profileImage, profileImageData?.asset);
  updateImageSrc(accreditationImage, accreditationImageData?.asset);

  parent.insertAdjacentHTML(
    "beforeend",
    content.map((aboutMeContent) => {
      return `
        <p class="about__me--text">${aboutMeContent.paragrapOne}</p>
        <p class="about__me--text">${aboutMeContent.paragrapTwo}</p>
        <p class="about__me--text">${aboutMeContent.paragrapThree}</p>
        <p class="about__me--text">${aboutMeContent.paragrapFour}</p>
    `;
    })
  );
};

function fetchContent() {
  let PROJECT_ID = "c7jd3ho8";
  let DATASET = "production";
  let QUERY = encodeURIComponent('*[_type == "about"]');

  // Compose the URL for your project's endpoint and add the query
  let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

  fetch(URL)
    .then((res) => res.json())
    .then((response) => {
      buildAbout(response.result);
    })
    .catch((error) => {
      console.error("THIS WEAS AN ERROR fetching content ", error);
    });
}
