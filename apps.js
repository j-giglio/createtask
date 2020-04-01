///////////////////// CONSTANTS /////////////////////////////////////

let user = {
  x: 30,
  y: 350,
  standing: function() {
    ctx.beginPath();
    ctx.rect(user.x, user.y, 50, 120);
    ctx.fill()
    ctx.closePath();
    console.log("yee");
  }
}

///////////////////// APP STATE (VARIABLES) /////////////////////////



///////////////////// CACHED ELEMENT REFERENCES /////////////////////

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

///////////////////// EVENT LISTENERS ///////////////////////////////

canvas.onclick = runTicks

///////////////////// ENGINE /////////////////////////////////////

function runTicks() {
  setInterval(perTick, 1)
};

function perTick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // canvas.className = (canvas.className === "active") ? "inactive" : "active"
  // console.log(canvas.className);
  user.standing()
}

///////////////////// LEVELS /////////////////////////////////////
