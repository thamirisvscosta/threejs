//console.log(THREE);   testando a funcionalidade apenas ...

const  options = {
    targetSelector:'#scene', width: 800, height: 600, backgroundColor: 0x323232
}

// cores em hexadecimal,pode utilizar o colorpicker (troque "#" por "0x")

const renderer = new THREE.WebGLRenderer(
    // tira a impressão de serrilhado do cubo
    {antialias: true}
);

// melhora a qualidade
renderer.setPixelRatio(window.devicePixelRatio)

renderer.setSize(options.width, options.height);

document.querySelector(options.targetSelector).appendChild(renderer.domElement);

// colocando a cena dentro do setup ...

const  scene =  new THREE.Scene();
scene.background = new THREE.Color(options.backgroundColor);

// criando uma camera...

const camera = new THREE.PerspectiveCamera(50, options.width / options.height);

camera.position.x = 4;
camera.position.y = 5;
camera.position.z = 8;



// colocando luz no cubo...

// luz ambiente...

// const light = new THREE.AmbientLight(
//     0xbaf200, 0.9
// );

//   luz hemisferica ...

const light = new THREE.HemisphereLight(
    0xFFFFFF, 0x000000, 0.3
); //0.2 é a intensidade

scene.add(light);

// threex3 teste
// console.log(THREEx3);
// console.log(THREE.OrbitControls);

const x3 = new THREEx3(
    {
        THREE,
        OrbitControls:  THREE.OrbitControls, camera, renderer, scene },
        // mexa o mouse para ver o campo 3d
        //TIRANDO O GRID E O EIXO
    {
        grid:{visible:false}, 
        axes:{visible:false}
    },  
  
);

// mostra detalhes da camera...
x3.add(camera, {open: false});

// adicionando lampada...

x3.add(light,{helper:{visible:false}})

renderer.shadowMap.enabled = true;

//sombra  mais suave  no objeto...
//cuidado com a performance  e o fps
//deixa realista... respeitando as  leis da física

renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//efeito HDR...(visualização dos objetos da cena)

renderer.physicallyCorrectLights = true;

renderer.toneMaping = THREE.ACESFilmicToneMapping;

renderer.toneMaping = THREE.CineonToneMapping;