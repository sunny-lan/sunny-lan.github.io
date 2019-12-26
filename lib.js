function getCoords(elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}

document.addEventListener("DOMContentLoaded", function () {
    const coll = document.getElementsByClassName("collapsible");

    for (let i = 0; i < coll.length; i++) {
        coll[i].classList.toggle("inactive");
        coll[i].nextElementSibling.classList.toggle("inactive");
        coll[i].addEventListener("click", function () {
            coll[i].classList.toggle("inactive");
            coll[i].nextElementSibling.classList.toggle("inactive");
        });
    }


    const navbar = document.getElementById("navbar");
    const sticky = navbar.offsetTop;

    const h = navbar.offsetHeight;

    window.onscroll = function () {
        if (window.pageYOffset >= sticky) {
            document.body.style.paddingTop = h-10 + 'px';
            navbar.classList.add("sticky")
        } else {
            document.body.style.paddingTop = 0;
            navbar.classList.remove("sticky");
        }
    };


    const tabsets = document.getElementsByClassName("tabs");
    for (let i = 0; i < tabsets.length; i++) {
        const tabset = tabsets[i];
        const tabs = tabset.getElementsByClassName('tab');
        const blocks = [];
        for (let j = 0; j < tabs.length; j++) {
            const tab = tabs[j];
            const block = document.getElementById(tab.attributes['data-tab-id'].value);
            blocks.push(block);
            if (!block) throw new Error('Tab does not have matching block');
            if (!tab.attributes['data-default']) {
                block.classList.add('inactive');
                tab.classList.add('inactive');
            }
            tab.onclick = function () {
                // console.log("re");
                window.scrollTo({
                    top: getCoords(tabset).top,
                    left: 0,
                    behavior: 'smooth'
                });

                for (let k = 0; k < tabs.length; k++) {
                    blocks[k].classList.add('inactive');
                    tabs[k].classList.add('inactive');
                }
                block.classList.remove('inactive');
                tabs[j].classList.remove('inactive');
            }
        }
    }
});

