///////////////////// LEVELS

let levels = [
//level one
  {
    startX: 30,
    startY: 408,
    blocks: [
      {
        x: 0,
        y: 470,
        startX: 0,
        startY: 470,
        width: 800,
        height: 30,
        color: "green",
        onCollision: normalBlock,
      },
      {
        x: 351,
        y: 400,
        startX: 351,
        startY: 400,
        width: 50,
        height: 70,
        color: "brown",
        onCollision: normalBlock,
      },
    ],
    enemies: [
      {
        x: 450,
        y: 300,
        type: 1/*enemy1*/,

      },
    ],
    // pickups: [];
    // projectiles: [];
  },
//level two
]

///////////////////// OBJECTS

let user = {
  x: null,
  y: null,
  width: 28,
  height: 62,
  walkLeft: false,
  walkRight: false,
  canWalkLeft: true,
  canWalkRight: true,
  // touchLeft: false,
  // touchRight: false,
  // touchUp: false,
  // touchDown: false,
  isJumping: false,
  isCrouching: false,
  speed: 2,
  canFall: false,
  jump: function() {
    user.canFall = true;
  },
  sprite: null,
};

let enemy1 = {
  sprite: 1,
};

///////////////////// ELEMENTS

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

///////////////////// VARIABLES

let currentLevel = 0;
let mobile = [user];
let onScreenThings = [];
let tickCount = 0;
// let leftScrollMargin = 30;
// let rightScrollMargin = canvas.width /2;
//////Sprite Animation Counters

let sprUserWalkingFrame = 1;

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
  resetAttributes();
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
  if (tickCount % 500 === 0) {
    console.log(onScreenThings)
  }
};

function resetAttributes() {
  user.canWalkLeft = true;
  user.canWalkRight = true;
}

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
    if (e.x < thing.x + thing.width &&           ///
        e.x + e.width > thing.x &&               ///
        e.y < e.y + thing.height &&              ///https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection November 4 2019
        e.y + e.height > thing.y &&              ///
        thing != user) {                         ///
      // if (levels[currentLevel].entities.blocks.includes(thing)) {
      //   e.canWalkRight = false;
      //   e.canWalkLeft = false;
      //   if (e.x + e.width === thing.x + 2) {
      //     e.x -= e.speed;
      //   }
      // } else {
      //   e.canWalkRight = true;
      //   e.canWalkLeft = true;
      // }
      // if (levels[currentLevel].entities.enemies.includes(thing)) {
      //   userDeath()
      // }
      thing.onCollision(e);
    }
  });
}

function gravity() {

};

function userDeath() {
  console.log("dead");
}

function move() {
  mobile.forEach((c) => {
    if (c.walkLeft && c.canWalkLeft) {
      if (c === user && c.x <= 120/*leftScrollMargin*/) {
        levels[currentLevel].blocks.forEach((block) => {
          block.x += user.speed;
        });
        levels[currentLevel].enemies.forEach((enemy) => {
          enemy.x += user.speed;
        });
        // for (let type in levels[currentLevel].entities) {
        //   console.log(type[0]);
        //   type.forEach((entity) => {
        //     entity.x += user.speed;
        //   });
        // };
      } else {
        c.x -= c.speed;
      }
    };

    if (c.walkRight && c.canWalkRight) {
      if (c === user && c.x + c.width >= 284/*rightScrollMargin*/) {
        levels[currentLevel].blocks.forEach((block) => {
          block.x -= user.speed;
        });

        levels[currentLevel].enemies.forEach((enemy) => {
          enemy.x -= user.speed;
        });
        // for (let type in levels[currentLevel].entities) {
        //
        //   type.forEach((entity) => {
        //     entity.x += user.speed;
        //   });
        // };
      } else {
        c.x += c.speed;
      }
    };

    // if (c.walkLeft) {
    //   c.x -= c.speed;
    // };
    //
    // if (c.walkRight) {
    //   c.x += c.speed;
    // };

    ////just for debugging
    if (c.isJumping) {
      c.y -= c.speed;
    };

    if (c.isCrouching) {
      c.y += c.speed;
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

  if (a.key === "ArrowDown"){
    user.isCrouching = true;
  };
};

function keyUp(b) {
  if (b.key === "ArrowRight"){
    user.walkRight = false;
  };

  if (b.key === "ArrowLeft"){
    user.walkLeft = false;
  };

  if (b.key === "ArrowUp"){
    user.isJumping = false;
  };

  if (b.key === "ArrowDown"){
    user.isCrouching = false;
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
  ctx.rect(user.x, user.y, user.width, user.height);
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
    ctx.rect(user.x, user.y, user.width, user.height);
    ctx.fillStyle = "red";
    ctx.fill()
    ctx.closePath();
  } else {
    ctx.beginPath();
    ctx.rect(user.x, user.y, user.width, user.height);
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

///////////////////// onCollision

function normalBlock(e) {
    e.canWalkRight = false;
    e.canWalkLeft = false;
    /////// left side of /this/
    if (e.x + e.width <= this.x + e.speed && e.x + e.width >= this.x) {
      e.x = this.x - 1 - e.width;
      e.canWalkRight = true;
    }
    /////// right side of /this/
    // console.log(e.x + "     " + e.speed + "      " + e.width + "      " + this.x + "      " + this.width);
    if (e.x >= this.x + this.width - e.speed && e.x <= this.x + this.width) {
      e.x =  this.x + this.width + 1;
      e.canWalkLeft = true;
    }
  // } else {
  //   e.canWalkRight = true;
  //   e.canWalkLeft = true;
}

///////////////////// AIs
