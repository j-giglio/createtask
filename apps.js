///////////////////// CONSTANTS /////////////////////////////////////

let user = {
  x: 30,
  y: 350,
  canFall: false,
  jump: function() {
    user.canFall = true;
  },
  standing: function() {
    ctx.beginPath();
    ctx.rect(user.x, user.y, 50, 120);
    ctx.fill()
    ctx.closePath();
  },

}

///////////////////// APP STATE (VARIABLES) /////////////////////////



///////////////////// CACHED ELEMENT REFERENCES /////////////////////

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

///////////////////// EVENT LISTENERS ///////////////////////////////

canvas.onclick = runTicks;
document.addEventListener("keydown", keys);

///////////////////// ENGINE /////////////////////////////////////

function runTicks() {
  setInterval(perTick, 1)
};

function perTick() {
  gravity()
  //  these are rendering functions
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  user.standing()
}

function gravity() {

}

function keys(a) {
  if (a.key === "ArrowRight"){
    user.x++;
  };
  if (a.key === "ArrowLeft"){
    user.x--;
  };
  if (a.key === "ArrowUp"){
    user.jump();
  };
};

///////////////////// LEVELS /////////////////////////////////////
