const buttons = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".service-card");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const category = button.dataset.category;

        cards.forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {

                card.style.display = "flex";

            } else {

                card.style.display = "none";

            }

        });

    });



});

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".service-card").forEach(card => {

        if(card.dataset.category !== "web") {
            card.style.display = "none";
        }

    });

});


const filterBtns =
document.querySelectorAll(".skill-filter");

const categories =
document.querySelectorAll(".habilidade-categoria");

filterBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        filterBtns.forEach(button =>
            button.classList.remove("active")
        );

        btn.classList.add("active");

        const target =
        btn.dataset.target;

        categories.forEach(category => {

            category.classList.remove(
                "active-skill"
            );

            if (
                category.dataset.category ===
                target
            ) {

                category.classList.add(
                    "active-skill"
                );

            }

        });

    });

});