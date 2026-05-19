const menu_toggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-navigation");

    menu_toggle.addEventListener("click", function () {
        navigation.classList.toggle("active");
    });