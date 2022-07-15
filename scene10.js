/*          ATENÇÃO!!!

O Último exer cicio destina-se a utilização de imagens locais nos projetos.

Porém, é necessário instalar no  CMD da pasta local , seja WINDOWS ou LINUX, o seguinte comando:

npm install http-server -g
http-server -p 3000 --cors

ASSIM, será gerado um IP Local com destino ao projeto realizado e também a imagem desejada.

COM ISSO, pegue a URL e substitua no 'loader.load()'
*/

//para carregar uma textura...
const loader = new THREE.TextureLoader();

// o 'map' da a textura e o 'normal' da noção de profundidade
//   TEXTURA

const polyester = new THREE.MeshStandardMaterial(
    {
    // consultar o slide do curso e o documento no github( texture )
    
    normalMap: loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/polyester/normal.jpg') , map: loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/polyester/basecolor.jpg') 
    
    }
); 

const wood = new THREE.MeshStandardMaterial({
    map:loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/wood/basecolor.jpg'),

    normalMap: loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/wood/normal.jpg'),  side:THREE.DoubleSide
    
});

const metal = new THREE.MeshStandardMaterial({
    
    map:loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/metal/basecolor.jpg'),
    
    //precisa ligar a transparência para a opacidade.
    alphaMap:loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/metal/opacity.jpg'),
    
    transparent:true, side:THREE.DoubleSide,

    //mostras os pontos mais e menos metálicos
    metalnessMap:loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/metal/metallic.jpg'),

    //mostra
    emissiveMap:loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/metal/emissive.jpg'),

    
    //mostra
    normalMap:loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/metal/normal.jpg'),

 
    //mostra
    aoMap:loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/metal/occlusion.jpg'),

 
    //mostra
    roughnessMap:loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/metal/roughness.jpg')

});



const ball = new THREE.Mesh(
    new THREE.SphereBufferGeometry(1.0,60,60),polyester

    // new THREE.MeshPhysicalMaterial({
    //     color: 0xFFFFFF
    // })
);

ball.position.x = 1;
ball.position.y = 2;
ball.castShadow = true; 
scene.add(ball);

const floor = new THREE.Mesh( 
    new THREE.PlaneBufferGeometry(10,10), metal
    // new THREE.MeshPhysicalMaterial({
    //     // color: 0xFFFFFF
    //      side: THREE.DoubleSide, metalness: 0.48, roughness: 0.57

    // })
);

floor.rotation.x = THREE.MathUtils.degToRad(-90);
floor.receiveShadow = true; //chão recebe sombra

scene.add(floor);

const shadowlight = new THREE.PointLight(
    0xffffff,10 //em candelas
    
);


shadowlight.position.y = 5;
shadowlight.castShadow = true; //luz gera sombra
shadowlight.target = ball; //segue a bola
scene.add(shadowlight);


x3.add(ball, { label: 'Ball'});
x3.add(floor, {label: 'Floor'});
x3.add(shadowlight, {label: 'Shadow'}/* {helper:{visible: false}}*/ );


renderer.setAnimationLoop(() => {
 
    x3.tick();

    x3.fps(() =>  {
        
        renderer.render(scene,camera);
    })

});


