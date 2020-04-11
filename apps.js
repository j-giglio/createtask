///////////////////// LEVELS

let levels = [
//level one
  {
    startX: 30,
    startY: 410,
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
      {
        x: 450,
        y: 300,
        type: 1/*enemy1*/,

      },
    ],
  },
//level two
]

///////////////////// OBJECTS

let user = {
  x: null,
  y: null,
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
  sprite: null,
};

// let enemy1 = {
//   sprite:
// };

///////////////////// VARIABLES

let currentLevel = 0;
let mobile = [user];
let onScreenThings = [];
let tickCount = 0;
let sprUserWalkingFrame = 1;


///////////////////// ELEMENTS

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

///////////////////// EVENT LISTENERS

canvas.onclick = runTicks;
// document.getElementsByClassName("inactive").onclick = startGame;
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

///////////////////// ENGINE

function runTicks() {
  if (canvas.className === "inactive") {
    user.x = levels[currentLevel].startX;
    user.y = levels[currentLevel].startY;
    canvas.className = "active";
    setInterval(perTick, 1)
  };
};

function perTick() {
  tickCount++;
  getMobile();
  getOnScreenThings();
  mobile.forEach((d) => {
    collision(d);
  });
  move();
  gravity();
  //  these are rendering functions
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  user.sprite;
  drawBlocks();
  updateSprites();
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
    console.log(e.x /*+ e.width === thing.x*/);

    if (e.x + e.width === thing.x && e.y >= thing.y && e.y <= thing.y + thing.height && e.y + e.height >= thing.y && e.y + e.height <= thing.y + thing.height) {
      if (levels[currentLevel].blocks.includes(thing)) {
        // console.log(levels[currentLevel].blocks.includes(thing));
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
  console.log("dead");
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
  levels[currentLevel].enemies.forEach((enemy) => {
    if (enemy.x + enemy.width > 0 && enemy.x < 801 && (enemy.walkLeft || enemy.walkRight)) {
      mobile.push(enemy);
    }
  });
};

function getOnScreenThings() {
  // mobile.forEach((thing) => {
  //   onScreenThings.push(thing)
  // });
  onScreenThings = mobile.concat();
    levels[currentLevel].blocks.forEach((block) => {
    if (block.x + block.width > 0 && block.x < 801) {
      onScreenThings.push(block);
    }
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

function updateSprites() {
  user.sprite = (user.walkLeft || user.walkRight) ? sprUserWalking() : sprUserStanding();
  // enemies.forEach((thing) => {
  //
  // });
  //
}

function sprUserStanding() {
  ctx.beginPath();
  ctx.rect(user.x, user.y, 25, 60);
  ctx.fillStyle = "black";
  ctx.fill()
  ctx.closePath();
}

function sprUserWalking() {

  if (tickCount % 200 === 0) {
    sprUserWalkingFrame = (sprUserWalkingFrame === 1) ? 2 : 1
  }

  // console.log(which);
  if (sprUserWalkingFrame === 1) {
    ctx.beginPath();
    ctx.rect(user.x, user.y, 25, 60);
    ctx.fillStyle = "red";
    ctx.fill()
    ctx.closePath();
  } else {
    ctx.beginPath();
    ctx.rect(user.x, user.y, 25, 60);
    ctx.fillStyle = "blue";
    ctx.fill()
    ctx.closePath();
  }
}

function sprEnemyOne() {
  ctx.beginPath();
  ctx.rect(user.x, user.y, 25, 30);
  ctx.fillStyle = "blue";
  ctx.fill()
  ctx.closePath();
}
///////////////////// AIs
