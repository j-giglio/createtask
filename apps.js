///////////////////// LEVELS

let levels = [
//level one
  {
    startX: 120,
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
        sprite: blockPlaceHolder,
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
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: -400,
        y: 0,
        startX: -400,
        startY: 0,
        width: 1800,
        height: 66,
        color: "black",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 950,
        y: 400,
        startX: 950,
        startY: 400,
        width: 300,
        height: 46,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 1370,
        y: 290,
        startX: 1370,
        startY: 290,
        width: 300,
        height: 46,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 1720,
        y: 235,
        startX: 1720,
        startY: 235,
        width: 300,
        height: 46,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: normalBlock,
      },
      {
        x: 2120,
        y: 435,
        startX: 2120,
        startY: 435,
        width: 46,
        height: 46,
        color: "green",
        sprite: blockPlaceHolder,
        onCollision: teleporter,
        deltaX: -1850,
        deltaY: -300,
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
    projectiles: [

    ]
  },
//level two
]

///////////////////// OBJECTS

let user = {
  x: null,
  y: null,
  width: 28,
  height: 62,
  // walkLeft: false,
  // walkRight: false,
  walking: 0, /// 0 is still, 1 is left, 2 is right.
  speed: 2,
  isJumping: false,
  jumpSpeed: 6,
  baseJumpSpeed: 6,
  jumpStart: null,
  jumpHeight: 166,
  hangTime: 25,
  hangCounter: 0,
  offGround: false,
  isCrouching: false,
  sprite: null,
};

let userPellet = {
  x: null,
  y: null,

};

///////////////////// ELEMENTS

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

///////////////////// VARIABLES

let currentLevel = 0;
let mobile = [user];
let onScreenThings = [];
let tickCount = 0;
let gforce = 2;
let leftScrollMargin = 120;
let rightScrollMargin = 284;

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
  tickCount = (tickCount >= 100000000) ? 0 : tickCount + 1;
  resetAttributes();
  adjustCamera();
  loadEntities();
  // getOnScreenThings();
  mobile.forEach((d) => {
    collision(d);
  });
  move();
  gravity();

  //  these are rendering functions, should be put into a more efficient function later
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // user.sprite;
  updateSprites();
  drawThings();
    // if (tickCount % 10 === 0) {
    //   console.log(mobile);
    // }
};

function resetAttributes() {
  mobile.forEach((c) => {
    c.offGround = /*(e.y + e.height >= this.y && e.y + e.height <= this.y + e.speed && e.x)*/ true
  });
}

function adjustCamera() {
  if (user.x < rightScrollMargin) {
    user.x += 2;
    levels[currentLevel].blocks.forEach((block) => {
      block.x += 2;
    });
  }

  if (user.x > leftScrollMargin) {
    user.x -= 2;
    levels[currentLevel].blocks.forEach((block) => {
      block.x -= 2;
    });
  }
}

function loadEntities() {
  mobile = [user];
  levels[currentLevel].enemies.forEach((enemy) => {
    if (enemy.x + enemy.width > 0 && enemy.x <= canvas.width) {
      mobile.push(enemy);
    }
  });
  onScreenThings = mobile.concat();
  levels[currentLevel].blocks.forEach((block) => {
    if (block.x + block.width > 0 && block.x < canvas.width) {
      onScreenThings.push(block);
    }
  });
};

function collision(e) {
  onScreenThings.forEach((thing) => {
    if (e.x < thing.x + thing.width &&           ///
        e.x + e.width > thing.x &&               ///
        e.y < thing.y + thing.height &&          ///https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection November 4 2019
        e.y + e.height > thing.y - 1 &&          /// -1 added to fix a gravity/collision detection bug
        thing != user) {
      thing.onCollision(e);
    }
  });
}

function move() {
  mobile.forEach((c) => {
    if (c.walk === 1) {
      if (c === user && c.x <= leftScrollMargin) {
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

    if (c.walk === 2) {
      if (c === user && c.x + c.width >= rightScrollMargin) {
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

    if (c.isJumping) {
      if (c.y - c.jumpHeight === c.jumpHeight * .85) {
        c.jumpSpeed /= 2
      }

      c.y -= c.jumpSpeed

      // if (c.y <= c.jumpStart - c.jumpHeight) {
      //   c.isJumping = false;
      // }

      if (c.jumpSpeed === 0) {
        c.hangCounter++
      }

      if (c.hangTime === c.hangCounter) {
        c.isJumping = false;
        c.hangCounter === 0;
      }

      if (c.y <= c.jumpStart - c.jumpHeight) {
        c.jumpSpeed = 0;
      }
    };

    ////just for debugging
    // if (c.isCrouching) {
    //   c.y += c.;
    // };
  });
};

function gravity() {
  mobile.forEach((c) => {
    if (c.offGround && !c.isJumping && c.x >= 0 && c.x <= canvas.width) {
      c.y += gforce;
    }
  });
};

function userDeath() {
  console.log("dead");
}

function drawThings() {
  // levels[currentLevel].blocks.forEach((block) => {
  //   if (block.x <= canvas.width) {
  //     ctx.beginPath();
  //     ctx.rect(block.x, block.y, block.width, block.height);
  //     ctx.fillStyle = block.color;
  //     ctx.fill()
  //     ctx.closePath();
  //   }
  // });
  onScreenThings.forEach((thing) => {
    thing.sprite()
  });

}

function keyDown(a) {
  // console.log(a);

  switch (a.code) {
    case "KeyD":
      user.walk = 2;
      break;
    case "KeyA":
      user.walk = 1;;
      break;
    case "KeyW":
      break;
    case "Keys":
      user.isCrouching = true;
      break;
    case "Space":
      if (!user.isJumping && !user.offGround){
        user.jumpStart = user.y;
        user.isJumping = true;
        user.jumpSpeed = user.baseJumpSpeed;
        user.hangCounter = 0;
      };
      break;
    case "Comma":
      let pell = Object.create(userPellet);
      pell.x = user.x + user.width + 2
      levels[currentLevel].projectiles.push(pell)
      break;
  }
};

function keyUp(b) {
  switch (b.code) {
    case "KeyD":
      if (user.walk === 2) {
        user.walk = 0;
      }
      break;
    case "KeyA":
      if (user.walk === 1){
        user.walk = 0;
      }
      break;
    case "KeyW":
      break;
    case "Keys":
      user.isCrouching = false;
      break;
  }
}

///////////////////// COLLISION

function normalBlock(e) {
  /////// left side of /this/
  if (e.x + e.width <= this.x + e.speed && e.x + e.width >= this.x) {
    e.x = this.x - 1 - e.width;
  }

  /////// right side of /this/
  if (e.x >= this.x + this.width - e.speed && e.x <= this.x + this.width) {
    e.x =  this.x + this.width + 1;
  }

  /////// underneath /this/
  if (e.y <= this.y + this.height && e.y >= this.y + this.height - e.jumpSpeed) {
    e.isJumping = false;
    e.y = this.y + this.height + 1;
  }

  /////// above /this/
  if (e.y + e.height >= this.y && e.y + e.height <= this.y + gforce) {
    // console.log(user.isCrouching);
    // user.isCrouching = false;
    e.y = this.y - e.height;
    if (e.offGround) {
      e.offGround = false;
    }
  }
}

function teleporter(e) {
  /////// left side of /this/
  if (e.x + e.width <= this.x + e.speed && e.x + e.width >= this.x) {
    e.x = this.x - 1 - e.width;
  }

  /////// right side of /this/
  if (e.x >= this.x + this.width - e.speed && e.x <= this.x + this.width) {
    e.x =  this.x + this.width + 1;
  }

  /////// underneath /this/
  if (e.y <= this.y + this.height && e.y >= this.y + this.height - e.jumpSpeed) {
    e.isJumping = false;
    e.y = this.y + this.height + 1;
  }

  /////// above /this/
  if (e.y + e.height >= this.y && e.y + e.height <= this.y + gforce) {
    e.x += this.deltaX
    e.y += this.deltaY
  }
}

///////////////////// SPRITES

function updateSprites() {
  user.sprite = (user.walk > 0) ? sprUserWalking : sprUserStanding;
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

function blockPlaceHolder() {
  ctx.beginPath();
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.fillStyle = this.color;
  ctx.fill()
  ctx.closePath();
}

///////////////////// AIs
