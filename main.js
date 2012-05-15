// parameters
var width = 640;
var height = 480;

function random_color() {
  return Math.random() * 0.5 + 0.3;
}

// init
enchant();

window.onload = function() {
  var game = new Game(width, height);
  game.fps = 24;

  game.onload = function() {
    var scene = new Scene3D();
    scene.backgroundColor = [0.0, 0.0, 0.3, 1.0];

    // directional light
    var light = new DirectionalLight();
    light.directionX =  0.0;
    light.directionY = -1.0;
    light.directionZ = -1.0;
    light.color = [0.7, 0.7, 0.7];
    scene.setDirectionalLight(light);
    
    // camera
    var camera = new Camera3D();
    camera.x = 0;
    camera.y = 16;
    camera.z = -16;
    camera.centerX = 0;
    camera.centerY = 0;
    camera.centerZ = 1;
    scene.setCamera(camera);
    
    // bar chart container
    var root = Sprite3D();
    scene.addChild(root);
    
    // bar charts (5 x 5)
    var bars = [];
    for (var z = -2; z <= 2; ++z) {
      for (var x = -2; x <= 2; ++x) {
        var bar = new Cube();
        bar.x = 1.0 * x;
        bar.y = 0.0;
        bar.z = 1.0 * z;
        bar.scale(.5, 1, .5);
        var r = random_color();
        var g = random_color();
        var b = random_color();
        bar.mesh.texture.ambient = [r, g, b, 0.5];
        bar.mesh.texture.diffuse = [r, g, b, 0.5];
        bar.mesh.texture.specular = [0.1, 0.1, 0.1, 0.5];
		
        root.addChild(bar);
        bars.push(bar);
      }
    }
    
    // score data (5x5)
    var scores = [];
    for (var i = 0; i < 25; ++i) {
	  scores.push(Math.floor(Math.random() * 6) * 100);
	}
    
    // enterframe action
    var frame_count = 0;
    var end_frame_count = 100;
    var max_frame_count = 300;
    game.addEventListener("enterframe", function(e) {
      // bar chart animation
      var p = (frame_count * 1.0 / end_frame_count);
      if (p >= 1.0) p = 1.0;
      for (var i = 0; i < bars.length; ++i) {
		var y = scores[i] / 500.0 * 4.0 * p;
		bars[i].scaleY = y;
		bars[i].y = bars[i].scaleY / 2.0;
      }
      frame_count ++;
      if (frame_count >= max_frame_count) frame_count = 0;
      
      // rotation animation
      var rot_y = new mat4.create();
      var m = new mat4.create();
      mat4.identity(rot_y);
      mat4.rotateY(rot_y, 0.02);
      mat4.multiply(root.rotation, rot_y, m);
      root.rotation = m;
    });
  };
  
  game.start();
};
