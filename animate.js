
anime({
    targets: "#border",
    rotate: [1, 0, -1],
    loop: true,
    direction: "alternate"
})

anime({
    targets: ".piece",
    scale: [1.1, 1.3, 1, 0.7, 1],
    loop: true,
    direction: "alternate"
})

anime({
    targets: ".nick1",
    translateX: "-528.3px",
    duration: 2000,
    easing: "linear",
    loop: true,
})
anime({
    targets: ".nick2",
    translateX: "+528.3px",
    duration: 2000,
    easing: "linear",
    loop: true,
})

anime({
    targets: ".main-text",
    fontWeight: [100, 900, 100],
    duration: 2000,
    delay: 0,
    easing: "linear",
    loop: true,
})