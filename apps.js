///////////////////// LEVELS

let levels = [
//level one
  {
    blocks: [
      {
        x: 0,
        y: 470,
        width: 800,
        height: 30,
        color: "green",
      },
      {
        x: 350,
        y: 400,
        width: 50,
        height: 70,
        color: "brown",
      },
    ],
    enemies: [

    ]
  },
//level two
]

///////////////////// OBJECTS

let user = {
  x: 30,
  y: 410,
  walkLeft: false,
  walkRight: false,
  touchLeft: false,
  touchRight: false,
  touchUp: false,
  touchDown: false,
  isJumping: false,
  speed: 3,
  canFall: false,
  jump: function() {
    user.canFall = true;
  },
  standing: userStanding,
  },

}

///////////////////// VARIABLES

let currentLevel = 0;
let mobile = [user];
let onScreenThings = [];

///////////////////// ELEMENTS

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

///////////////////// EVENT LISTENERS

canvas.onclick = runTicks;
// document.getElementsByClassName("inactive").onclick = runTicks;
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

///////////////////// ENGINE

function runTicks() {
  console.log("ghjf");
  document.getElementsByClassName("inactive").className = "active";
  setInterval(perTick, 1)
};

function perTick() {
  getMobile();
  getOnScreenThings();
  mobile.forEach((d) => {
    collision(d);
  });

  move();
  gravity();
  //  these are rendering functions
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  user.standing();
  drawBlocks();
};

function drawBlocks() {
  levels[currentLevel].blocks.forEach((block) => {
    if (block.x <= canvas.width) {
      ctx.beginPath();
      ctx.rect(block.x, block.y, block.width, block.height);
      ctx.fillStyle = block.color;
      ctx.fill()
      ctx.closePath();
    }
  });
}

function collision(e) {
  onScreenThings.forEach((thing) => {
    // collisions from the left
    if (e.x + e.width === thing.x && e.y >= thing.y && e.y <= thing.y + thing.height && e.y + e.height >= thing.y && e.y + e.height <= thing.y + thing.height) {
      if (levels[currentLevel].blocks.includes(thing)) {
        e.walkLeft = false;
      }
      if (levels[currentLevel].enemies.includes(thing)) {
        userDeath()
      }
    }

    // collisions from the right

  });
}

function gravity() {

};

function userDeath() {

}

function move() {
  mobile.forEach((c) => {
    if (c.walkLeft) {
      c.x -= c.speed;
    };

    if (c.walkRight) {
      c.x += c.speed;
    };
  });
};

function getMobile() {
  mobile = [user];
  (levels[currentLevel].enemies.forEach((enemy) => {
    if(enemy.x + enemy.width > 0 && enemy.x < 801)
  });
}

function keyDown(a) {
  if (a.key === "ArrowRight"){
    user.walkLeft = false;
    user.walkRight = true;
  };

  if (a.key === "ArrowLeft"){
    user.walkRight = false;
    user.walkLeft = true;
  };

  if (a.key === "ArrowUp"){
    user.isJumping = true;
  };
};

function keyUp(b) {
  if (b.key === "ArrowRight"){
    user.walkRight = false;
  };

  if (b.key === "ArrowLeft"){
    user.walkLeft = false;
  };
}

///////////////////// SPRITES

function userStanding() {
  ctx.beginPath();
  ctx.rect(user.x, user.y, 25, 60);
  ctx.fillStyle = "black";
  ctx.fill()
  ctx.closePath();
},
