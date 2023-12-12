import axios from "axios";

export const carouselFromAPI = async () => {
  try {
    const { data } = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
    );
    const meals = data.meals;
    const carouselContainer = document.getElementById("carouselContainer");

    const carousel = document.createElement("div");
    carousel.id = "carouselExampleIndicators";
    carousel.classList.add("carousel", "slide");

    const carouselIndicators = document.createElement("div");
    carouselIndicators.classList.add("carousel-indicators");

    meals.forEach((_, index) => {
      const indicator = document.createElement("button");
      indicator.type = "button";
      indicator.dataset.bsTarget = "#carouselExampleIndicators";
      indicator.dataset.bsSlideTo = index.toString();
      if (index === 0) {
        indicator.classList.add("active");
      }
      carouselIndicators.appendChild(indicator);
    });

    const carouselInner = document.createElement("div");
    carouselInner.classList.add("carousel-inner");

    meals.forEach((meal, index) => {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      if (index === 0) {
        carouselItem.classList.add("active");
      }

      const img = document.createElement("img");
      img.classList.add("d-block", "w-100");
      img.src = meal.strMealThumb || "img/default.jpg";

      const carouselCaption = document.createElement("div");
      carouselCaption.classList.add("carousel-caption");
      const captionText = document.createElement("h5");
      captionText.textContent = meal.strMeal;
      carouselCaption.appendChild(captionText);

      carouselItem.appendChild(img);
      carouselItem.appendChild(carouselCaption);
      carouselInner.appendChild(carouselItem);
    });

    carousel.appendChild(carouselIndicators);
    carousel.appendChild(carouselInner);

    // Create carousel controls
    const prevButton = document.createElement("button");
    prevButton.classList.add("carousel-control-prev");
    prevButton.type = "button";
    prevButton.dataset.bsTarget = "#carouselExampleIndicators";
    prevButton.dataset.bsSlide = "prev";
    prevButton.innerHTML =
      '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>';

    const nextButton = document.createElement("button");
    nextButton.classList.add("carousel-control-next");
    nextButton.type = "button";
    nextButton.dataset.bsTarget = "#carouselExampleIndicators";
    nextButton.dataset.bsSlide = "next";
    nextButton.innerHTML =
      '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>';

    carousel.appendChild(prevButton);
    carousel.appendChild(nextButton);

    carouselContainer.appendChild(carousel);
  } catch (error) {
    console.error(error);
  }
};

window.addEventListener("load", carouselFromAPI);
