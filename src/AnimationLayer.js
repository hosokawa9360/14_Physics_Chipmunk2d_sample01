var AnimationLayer = cc.Layer.extend({
   spriteSheet: null,
   runningAction: null,
   sprite: null,
   sprite2: null,
   space: null,
   body: null,
   body2: null,
   shape: null,
   shape2: null,
   ctor: function(space) {
      this._super();
      this.space = space;
      this.init();

      this.addPhysicsCircle(winSize.width / 3,winSize.height / 2,50,10);
      this.addPhysicsCircle(winSize.width / 5,winSize.height / 4,-10,-50);
   },
   init: function() {
      this._super();

      this.sprite = new cc.PhysicsSprite("res/CloseNormal.png");
      var contentSize = this.sprite.getContentSize();
      // init body
      this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
      this.body.p = cc.p(winSize.width / 2, winSize.height / 2);
      this.space.addBody(this.body);
      //init shape
      this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
      this.shape.setElasticity(0.5);
      this.shape.setFriction(0.5);

      this.space.addShape(this.shape);

      this.sprite.setBody(this.body);
      this.addChild(this.sprite);

      this.body.applyImpulse(cp.v(0, 50), cp.v(0, 0)); //run speed

   },


   addPhysicsCircle: function(px,py,ix,iy) {

      this.sprite2 = new cc.PhysicsSprite("res/CloseSelected.png");
      // this.sprite2.setScale(0.1,0.1);

      var contentSize = this.sprite.getContentSize();
      // init body
      var ballMass=1
      var ballRadius = contentSize.width*0.8
      this.body2= new cp.Body( ballMass,
         cp.momentForCircle( ballMass, 0, ballRadius, cp.v(0,0) ) );

    //  this.body2 = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
      this.body2.p = cc.p(px,py);
      this.space.addBody(this.body2);
      //init shape
    //  this.shape2 = new cp.BoxShape(this.body2, contentSize.width - 14, contentSize.height);
    this.shape2 = new cp.CircleShape(
      this.body2, this.sprite2.width * 0.5, cc.p(0 ,0));

      this.shape2.setElasticity(0.5);
      this.shape2.setFriction(0.5);

      this.space.addShape(this.shape2);

      this.sprite2.setBody(this.body2);
      this.addChild(this.sprite2);

      this.body2.applyImpulse(cp.v(ix, iy), cp.v(1, 0)); //run speed

   }
});
