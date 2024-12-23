const numberOfParticles = 100;
let snowflakeInterval;
let isTabActive = true;
const snowflakes = [];
const maxSnowflakes = 100;
const pauseWhenNotActive = true;

function createSnowflake() {
  const snowContainer = document.querySelector(".snow-container");
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.style.left = `${Math.random() * 100}vw`;
  snowflake.style.width = `${Math.random() * 10 + 5}px`;
  snowflake.style.height = snowflake.style.width;
  snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
  snowContainer.appendChild(snowflake);

  snowflake.addEventListener("animationend", () => {
    snowflake.remove();
    snowflakes.splice(snowflakes.indexOf(snowflake), 1);
  });

  snowflakes.push(snowflake);
  console.log("Snowflake created:", snowflake); // Debugging line
}

function generateSnowflakes() {
  const interval = 5000 / numberOfParticles;

  clearInterval(snowflakeInterval);
  snowflakeInterval = setInterval(() => {
    if (isTabActive && snowflakes.length < maxSnowflakes) {
      requestAnimationFrame(createSnowflake);
    }
  }, interval);
}

function handleVisibilityChange() {
  if (!pauseWhenNotActive) return;

  isTabActive = !document.hidden;
  if (isTabActive) {
    generateSnowflakes();
  } else {
    clearInterval(snowflakeInterval);
  }
}

generateSnowflakes();

window.addEventListener("resize", () => {
  clearInterval(snowflakeInterval);
  setTimeout(generateSnowflakes, 1000);
});

document.addEventListener("visibilitychange", handleVisibilityChange);
