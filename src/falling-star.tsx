import "./components/falling-star.css";

const starsContainer = document.querySelector(".falling-stars")!;
function createStar(): void {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.left = `${Math.random() * 100}%`;
  star.style.animationDuration = `${15 + Math.random() * 50}s`;

  star.innerHTML = `
    <svg viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg">
    <polygon 
        points="5,0 5.8,5 9,8 5.8,11 5,16 4.2,11 1,8 4.2,5"
        fill="#EEE8AA" />
    </svg>
  `;
  starsContainer.appendChild(star);
  setTimeout(() => star.remove(), 15000);
}

setInterval(createStar, 500);
const Star = () => {
  return <div className="falling-stars" aria-hidden="true"></div>;
};

export default Star;
