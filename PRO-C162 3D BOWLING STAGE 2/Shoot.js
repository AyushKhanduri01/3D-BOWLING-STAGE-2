// Creating Balls Component
AFRAME.registerComponent("balls", {
    //Calling our throwBalls Function() in Init
    //First function to be called
    init: function () {
      this.throwBalls();
    },

    // Creating our ThrowBalls function
    throwBalls: function () {

      // Adding Event Listener which will keep record of every event
      // If the event is pressing of a  ' z '  key then
      window.addEventListener("keydown", (e) => {

        if (e.key === "z" || e.key === "Z") {
          // a new entity should be created
          var ball = document.createElement("a-entity");
          
          // setting attributes to the entity
          ball.setAttribute("geometry", {
            primitive: "sphere",
            radius: 1,

          });
  
          // adding more properites to the entity
          ball.setAttribute("material", "color", "black");
          ball.setAttribute("dynamic-body", {shape:'sphere', mass:0})


          tex_Obj = document.querySelector("#ballTexture")
          tex_Source = tex_Obj.getAttribute("src")

          ball.setAttribute("src", tex_Source)

  
          var cam = document.querySelector("#camera");
  
          pos = cam.getAttribute("position");
  
          ball.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z-2,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
          //get the camera direction as Three.js Vector
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
  
          //set the velocity and it's direction
          ball.setAttribute("velocity", direction.multiplyScalar(-3));
  
          var scene = document.querySelector("#scene");
  
          ball.addEventListener("collide", this.removeBall)
          scene.appendChild(ball);
        }
      });
    },
    removeBall: function(e){
      console.log(e.detail.target.el)
      console.log(e.detail.body.el)

      var element = e.detail.target.el
      var elementHit = e.detail.body.el

      if(elementHit.id.includes("box")){
        elementHit.setAttribute("material", {
          opacity:0.6,
          transparent:true
        })
      }
      
      var impulse = new CANNON.Vec3(-2, 2, 1)
      var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute("position"))
    
      elementHit.body.applyImpulse(impulse, worldPoint)

      var scene = document.querySelector("#scene")
      scene.removeChild(element)
    }
  });

