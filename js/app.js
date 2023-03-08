const menu = document.querySelector(".menu")
const openMenuBTN = document.querySelector(".open-menu")
const closeMenuBTN = document.querySelector(".close-menu")


/*esta funcion asigna/quita la clase menu_opened a la clase menu*/
function toggleMenu() {
    menu.classList.toggle("menu_opened");
}

/*cdo se produce el evento click en el open-menu, ejecuta la funcion*/
openMenuBTN.addEventListener("click", toggleMenu);
/*cdo se produce el evento click en el close-menu, ejecuta la funcion*/
closeMenuBTN.addEventListener("click", toggleMenu);

/*al seleccionar cualquier elemento href del menu, que comience por "#" */
const menuLinks = document.querySelectorAll('.menu a[href^="#"]');

/*target es el elemento del DOM que observo en cada momento*/
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute("id");
/*al elemento le extraigo el href#, por ejemplo, #profile*/        
            const menuLink = document.querySelector(`.menu a[href="#${id}"]`);
/*si interactúa con entry, le agrego la clase "selected"*/
/*esa clase le pone la barra de subrayado en el menu*/
/*al interceptar una nueva seccion, elimina "selected" de la anterior*/
/*y agrega "selected" a la nueva seccion*/
            if (entry.isIntersecting) {
                document.querySelector(".menu a.selected").classList.remove("selected");
                menuLink.classList.add("selected");
            }
        });
    },
    {rootMargin: "-30% 0px -70% 0px"}
);

/*recorre todos los elementos href, y al hacer click en cualquiera, */
/*se ejecuta y remueve la clase "menu_opened" (cierra el menu)*/
menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", function() {
        menu.classList.remove("menu_opened");
    })
    const hash = menuLink.getAttribute("href");
    const target = document.querySelector(hash);
    if (target) {
        observer.observe(target);
    }
})

