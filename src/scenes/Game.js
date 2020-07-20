import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  /** @type {Phaser.Physics.Arcade.StaticGroup} */
  floor;

  /** @type {Phaser.Physics.Arcade.Sprite} */
  player;

  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  cursors;

  /** @type {Phaser.Physics.Arcade.Group} */
  bills;

  billsCollected;

  constructor() {
    super('game');
  }

  init() {
    this.billsCollected = 0;
  }

  preload() {
    this.load.image('background', './assets/backgroundColorGrass.png');
    this.load.image('platform', './assets/ground_grass.png');
    this.load.image('player', './assets/character_femaleAdventurer_idle.png');
    this.load.image('money', './assets/money.png');
  }

  create() {
    this.add.image(this.scale.width / 2, this.scale.height / 2, 'background').setScale(0.65);

    this.floor = this.physics.add
      .staticImage(this.scale.width / 2, this.scale.height - 30, 'platform')
      .setScale(2)
      .refreshBody();

    this.player = this.physics.add.sprite(this.scale.width / 2, this.scale.height - 250, 'player');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.floor, this.player);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.bills = this.physics.add.group({
      // allowGravity: false,
      gravityY: 8,
    });

    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(0, this.scale.width);
      const y = -Phaser.Math.Between(0, 100) * i;

      const bill = this.bills.create(x, y, 'money');
      bill.scale = 0.35;
    }
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-150);
    }

    this.bills.children.iterate((bill) => {
      if (bill.y >= this.scale.height) {
        bill.y = 0 - Phaser.Math.Between(0, 300);
        bill.x = Phaser.Math.Between(0, this.scale.width);
        bill.setVelocityY(0);
      }
    });
  }
}
