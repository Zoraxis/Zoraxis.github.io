anime({
  targets: "#border",
  rotate: [1, 0, -1],
  loop: true,
  direction: "alternate",
});

anime({
  targets: ".piece",
  scale: [1.1, 1.3, 1, 0.7, 1],
  loop: true,
  direction: "alternate",
});

anime({
  targets: ".nick1",
  translateX: "-528.3px",
  duration: 2000,
  easing: "linear",
  loop: true,
});
anime({
  targets: ".nick2",
  translateX: "+528.3px",
  duration: 2000,
  easing: "linear",
  loop: true,
});

anime({
  targets: ".main-text:hover",
  fontWeight: [100, 900, 100],
  duration: 2000,
  delay: 0,
  easing: "linear",
  loop: true,
});

document.querySelectorAll(".main-text").forEach((item) => {
  item.addEventListener("click", (event) => {
    switch (item.innerText) {
      case "Zoraxis":
        anime({
          targets: "#main-text-1-bg",
          opacity: [0, 1],
          height: ["2.5rem", "120vh"],
          translateY: ["0rem", "-20vh"],
          duration: 500,
        });
        break;
      case "DrZork":
        window.location.href = "https://drzork.github.io";
        break;
      case "Vasyl Berestov":
        window.location.href = "https://vasylberestov.github.io";
        break;
    }
  });
});
