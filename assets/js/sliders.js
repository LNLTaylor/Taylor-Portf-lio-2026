function createSlider(trackClass, nextClass, prevClass) {

    const track = document.querySelector(trackClass);

    document.querySelector(nextClass)
        .addEventListener("click", () => {

            track.scrollBy({
                left: 450,
                behavior: "smooth"
            });

        });

    document.querySelector(prevClass)
        .addEventListener("click", () => {

            track.scrollBy({
                left: -450,
                behavior: "smooth"
            });

        });

}

createSlider(
    ".area-track",
    ".area-next",
    ".area-prev"
);

createSlider(
    ".skill-track",
    ".skill-next",
    ".skill-prev"
);