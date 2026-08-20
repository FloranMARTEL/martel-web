// Enregistrement obligatoire du plugin
gsap.registerPlugin(MorphSVGPlugin);
console.log("test")

// Lancement de la transition fluide entre votre rectangle et le texte MARTEWEL
gsap.set("#morph-target", {
    morphSVG: "#text-shape"
});

const MARTELWEBANIM = gsap.to("#morph-target", {
    duration: 20,
    morphSVG: "#morph-target",
    paused: true
});

const hammerOne = document.querySelector(".hamer.one");
const hammerTow = document.querySelector(".hamer.two");
const hammerThree = document.querySelector(".hamer.three");


const tl = gsap.timeline({
    paused: true,
    repeat: -1,
});


const originOne = { x: -470, y: -609 }
const originTow = { x: 428, y: -629 }
const originThree = { x: 125, y: -745, rotate: -26 }
const coefDuraction = 0.8
    gsap.timeline().to(".intro", {
    top: "66%",
    duration: 1

}).to(hammerOne, {
    x: originOne.x,
    y: originOne.y,
    scaleX: -3,
    scaleY: 3,
    duration: 0.8,
    rotation: 45,
    ease: "power2.inOut",
    onComplete: () => {
        tl.play();
    }
}).to(hammerTow, {
    x: originTow.x,
    y: originTow.y,
    scaleX: 3,
    scaleY: 3,
    duration: 0.8,
    rotation: -45,
    ease: "power2.inOut",

}).to(hammerThree, {
    x: originThree.x,
    y: originThree.y,
    scaleX: 3,
    scaleY: 3,
    duration: 0.8,
    rotation: originThree.rotate,
    ease: "power2.inOut",

})

function targetImpact(target) {
    const clone = target.cloneNode(true);

    target.parentNode.appendChild(clone);

    gsap.set(clone, {
        position: "absolute",
        left: target.offsetLeft,
        top: target.offsetTop,
        width: target.offsetWidth,
        height: target.offsetHeight
    });

    gsap.timeline({
        onComplete: () => {
            clone.remove();
        }
    })
        .to(clone, {
            scale: 1.3,
            opacity: 0,
            duration: 0.3 * coefDuraction
        })

    MARTELWEBANIM.progress(
        Math.min(MARTELWEBANIM.progress() + 0.02, 1)
    );
}

tl.impact = () => {
    return tl.to(".iron", {
        scale: 0.9,
        duration: 0.06 * coefDuraction,
        ease: "power4.in"
    })
        .to(".iron", {
            scale: 1,
            duration: 0.15 * coefDuraction,
            ease: "back.out(3)"
        }).call(targetImpact, [document.querySelector(".iron")], "<")


}

tl.hit_hammerOne = () => {
    return tl.to(hammerOne, {
        x: originOne.x - 100,
        y: originOne.y - 100,
        rotation: 0,
        duration: 0.3 * coefDuraction,
        ease: "power2.out"
    })
        .to(hammerOne, {
            x: originOne.x + 200,
            y: originOne.y + 200,
            rotation: 96,
            duration: 0.12 * coefDuraction,
            ease: "power4.in"
        }).impact()
        .to(hammerOne, {
            rotation: 90,
            duration: 0.25 * coefDuraction,
            ease: "elastic.out(1, 0.5)"
        }, "<").to(hammerOne, {
            x: originOne.x,
            y: originOne.y,
            duration: 0.5 * coefDuraction,
            rotation: 45
        })
}


tl.hit_hammerTow = () => {
    return tl.to(hammerTow, {
        x: originTow.x + 100,
        y: originTow.y - 100,
        rotation: 0,
        duration: 0.3 * coefDuraction,
        ease: "power2.out"
    })
        .to(hammerTow, {
            x: originTow.x - 200,
            y: originTow.y + 220,
            rotation: -96,
            duration: 0.12 * coefDuraction,
            ease: "power4.in"
        }).impact()
        .to(hammerTow, {
            rotation: -90,
            duration: 0.25 * coefDuraction,
            ease: "elastic.out(1, 0.5)"
        }, "<").to(hammerTow, {
            x: originTow.x,
            y: originTow.y,
            duration: 0.5 * coefDuraction,
            rotation: -45
        })
}


tl.hit_hammerThree = (revers) => {

    let coef = 1
    if (revers == true) {
        coef = -1
    }

    return tl.to(hammerThree, {
        x: originThree.x * coef + 100 * coef,
        y: originThree.y - 100,
        rotation: 0,
        duration: 0.3 * coefDuraction,
        ease: "power2.out"
    })
        .to(hammerThree, {
            x: originThree.x * coef - 50 * coef,
            y: originThree.y + 336,
            rotation: -96 * coef,
            duration: 0.12 * coefDuraction,
            ease: "power4.in"
        }).impact()
        .to(hammerThree, {
            rotation: -90 * coef,
            duration: 0.25 * coefDuraction,
            ease: "elastic.out(1, 0.5)"
        }, "<").to(hammerThree, {
            x: originThree.x * coef * (-1),
            y: originThree.y,
            scaleX: 3 * coef * -1,
            duration: 0.5 * coefDuraction,
            rotation: originThree.rotate * coef * (-1)
        })
}

tl.hit_hammerOne()
    .hit_hammerTow()
    .hit_hammerThree()
    .hit_hammerOne()
    .hit_hammerTow()
    .hit_hammerThree(true)


