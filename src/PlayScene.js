var WALLS_WIDTH = 5;
var WALLS_ELASTICITY = 1.9; // 弾性係数を設定
var WALLS_FRICTION = 0.5; // 摩擦係数を設定

var winSize;
var PlayScene = cc.Scene.extend({
   space: null,
   // init space of chipmunk
   initPhysics: function() {
      this.space = new cp.Space();
      // Gravity
      this.space.gravity = cp.v(0, 0);
      // set up Walls
      // var wallBottom = new cp.SegmentShape(this.space.staticBody,
      //    cp.v(0, g_groundHeight), // start point
      //    cp.v(4294967295, g_groundHeight), // MAX INT:4294967295
      //    0); // thickness of wall
      // this.space.addStaticShape(wallBottom);
   },

   addWallsAndGround: function() {
      leftWall = new cp.SegmentShape(this.space.staticBody,
         new cp.v(10, 0), new cp.v(10, winSize.height),
         WALLS_WIDTH);
      leftWall.setElasticity(WALLS_ELASTICITY);
      leftWall.setFriction(WALLS_FRICTION);
      this.space.addStaticShape(leftWall);

      rightWall = new cp.SegmentShape(this.space.staticBody,
         new cp.v(winSize.width-10, winSize.height),
         new cp.v(winSize.width-10, 0), WALLS_WIDTH);
      rightWall.setElasticity(WALLS_ELASTICITY);
      rightWall.setFriction(WALLS_FRICTION);
      this.space.addStaticShape(rightWall);

      bottomWall = new cp.SegmentShape(this.space.staticBody,
         new cp.v(0, 10), new cp.v(winSize.width, 10),
         WALLS_WIDTH);
      bottomWall.setElasticity(WALLS_ELASTICITY);
      bottomWall.setFriction(WALLS_FRICTION);
      this.space.addStaticShape(bottomWall);

      upperWall = new cp.SegmentShape(this.space.staticBody,
         new cp.v(0, winSize.height-10),
         new cp.v(winSize.width, winSize.height-10),
         WALLS_WIDTH);
      upperWall.setElasticity(WALLS_ELASTICITY);
      upperWall.setFriction(WALLS_FRICTION);
      this.space.addStaticShape(upperWall);
   },

   addDebugNode: function() {
      this._debugNode = new cc.PhysicsDebugNode.create(this.space); // 物体の形状を表示するデバッグノードを作成
      this._debugNode.setVisible(true); // 表示する
      this.addChild(this._debugNode, 100); // 自ノード（レイヤー）の最前面に追加
   },

   onEnter: function() {
      this._super();
      winSize = cc.director.getWinSize();
      this.initPhysics();

      //add three layer in the right order
      var backgroundLayer = cc.LayerGradient.create(cc.color(0xdf, 0x9f, 0x83, 255), cc.color(0xfa, 0xf7, 0x9f, 255));
      this.addChild(backgroundLayer);

      this.addWallsAndGround();
      this.addDebugNode();

      //this.addChild(new BackgroundLayer());
      this.addChild(new AnimationLayer(this.space));

      this.scheduleUpdate();

   },
   update: function(dt) {
      // chipmunk step
      this.space.step(dt);
   }
});
