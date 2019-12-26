
document.addEventListener("DOMContentLoaded",function () {
    const coll = document.getElementsByClassName("collapsible");

    for (let i = 0; i < coll.length; i++) {
        coll[i].classList.toggle("inactive");
        coll[i].nextElementSibling.classList.toggle("inactive");
        coll[i].addEventListener("click", function() {
            coll[i].classList.toggle("inactive");
            coll[i].nextElementSibling.classList.toggle("inactive");
        });
    }


    const navbar = document.getElementById("navbar");
    const sticky = navbar.offsetTop;

    const h=navbar.offsetHeight;

    window.onscroll=function () {
        if (window.pageYOffset >= sticky) {
            document.body.style.paddingTop=h+'px';
            navbar.classList.add("sticky")
        } else {
            document.body.style.paddingTop=0;
            navbar.classList.remove("sticky");
        }
    }
});

