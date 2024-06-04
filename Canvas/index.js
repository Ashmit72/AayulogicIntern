const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

let x = 200;
let y = 200;
let dx = 2; 

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height); 
  c.beginPath();
  c.arc(x, y, 30, 0, Math.PI * 2, false);
  c.strokeStyle = "blue";
  c.stroke();
  x = x+dx;
  if (x + 30 > canvas.width || x - 30 < 0) {
    dx = -dx;
  }
}

animate();
