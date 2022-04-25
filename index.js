
function functionViewOnLoad() {
    window.scroll(10000-window.innerWidth/2,19900);
    var element = document.getElementById("conteneurFusee");
    element.style.left=5000+window.innerWidth/2.25+"px";
    element.style.top=20000+"px";

    maFonction();
}

function leftArrowPressed(vitesse) {
    var element = document.getElementById("conteneurFusee");
    element.style.transform = 'rotate(-90deg)';
    element.style.left =(parseInt(element.style.left) - vitesse)+"px";
    console.log("gauche");
}
function rightArrowPressed(vitesse) {
    var element = document.getElementById("conteneurFusee");
    element.style.transform = 'rotate(90deg)';
    element.style.left =(parseInt(element.offsetLeft) + vitesse)+"px";

    console.log("droite");
}
function upArrowPressed(vitesse) {
    
    var element = document.getElementById("conteneurFusee");
    element.style.transform = 'rotate(0deg)';
    element.style.top = (parseInt(element.style.top) - vitesse)+"px";
    console.log("haut");
}
function downArrowPressed(vitesse) {
    var element = document.getElementById("conteneurFusee");
    element.style.transform = 'rotate(180deg)';
    element.style.top = (parseInt(element.offsetTop) + vitesse)+"px";
    console.log("bas");
}

function maFonction(event){
    const vitesse=25;
    const NombreCercle=50;
    var element = document.getElementById("conteneurFusee");
    window.scroll(parseInt(element.style.left)- window.innerWidth/2.25,parseInt(element.style.top)-window.innerHeight/2.25); 
    console.log(parseInt(element.style.left));
    console.log("top "+parseInt(element.style.top));
    displayPlanete();
    switch(event.code) {
        case "KeyS":
        case "ArrowDown":
            event.preventDefault();
            downArrowPressed(vitesse);
            direction=1;
            circleInRectangle(1);
            break;
        case "KeyW":
        case "ArrowUp":
            event.preventDefault();
            upArrowPressed(vitesse);
            circleInRectangle(2);
            break;
        case "KeyA":
        case "ArrowLeft":
            event.preventDefault();
            leftArrowPressed(vitesse);
            circleInRectangle(3);
            break;
        case "KeyD":
        case "ArrowRight":
            event.preventDefault();
            rightArrowPressed(vitesse);
            circleInRectangle(4);
            break;
    }
    event.stopPropagation();
}

  function circleInRectangle(direction){
    var rect = document.getElementById("conteneurFusee");
    var body=document.body
    var rectStyle = window.getComputedStyle(rect);
    var circle=document.createElement("div");
    var minLeft=0;
    var maxLeft=0;
    var minTop=0;
    var maxTop=0;

    if(direction==1){
        var minLeft=(parseInt(rectStyle.left));
        var maxLeft=(parseInt(rectStyle.left)+parseInt(100));
        var minTop=(parseInt(rectStyle.top));
        var maxTop=(parseInt(rectStyle.top)-parseInt(100));
    }
    if(direction==2){
        var minLeft=(parseInt(rectStyle.left));
        var maxLeft=(parseInt(rectStyle.left)+parseInt(100));
        var minTop=(parseInt(rectStyle.top)+parseInt(100));
        var maxTop=(parseInt(rectStyle.top)+parseInt(200));
    }
    if(direction==3){
        var minLeft=(parseInt(rectStyle.left)+parseInt(100));
        var maxLeft=(parseInt(rectStyle.left)+parseInt(200));
        var minTop=(parseInt(rectStyle.top)+parseInt(10));
        var maxTop=(parseInt(rectStyle.top)+parseInt(100));
    }
    if(direction==4){
        var minLeft=(parseInt(rectStyle.left)-parseInt(100));
        var maxLeft=(parseInt(rectStyle.left));
        var minTop=(parseInt(rectStyle.top)+parseInt(10));
        var maxTop=(parseInt(rectStyle.top)+parseInt(100));
    }
        circle.id="rond";
        circle.style.backgroundImage="url(image/fumee.png)";
        circle.style.backgroundPosition="center";
        circle.style.backgroundSize="cover";
        circle.style.width="2rem";
        circle.style.height="2rem";
        circle.style.position="absolute";   
        circle.style.zIndex="-5";
        circle.style.left=  NombreRandom(minLeft,maxLeft)+"px";
        circle.style.top=  NombreRandom(minTop,maxTop)+"px";
        circle.style.borderRadius="5rem";

        body.appendChild(circle);
  }
function NombreRandom(min,max){
    return Math.random() * (max - min + 1) + min;
}

function displayPlanete(){
    var galaxie = document.getElementById("galaxie");
    var element2 = document.getElementById("conteneurFusee")
    var element = window.getComputedStyle(element2);
    var galaxieStyle =window.getComputedStyle(galaxie);
    var milieuX=parseInt(element.left)+parseInt(element.width)/2;
    var milieuY=parseInt(element.top)+parseInt(element.height)/2;
    var tabPlanete = document.getElementsByClassName("planete");
    var tabPlaneteStyle = window.getComputedStyle(tabPlanete[1]);
    if( milieuX>parseInt(galaxieStyle.left)
        && milieuX <parseInt(galaxieStyle.left)+parseInt(galaxieStyle.width)
        && milieuY<parseInt(galaxieStyle.top)+parseInt(galaxieStyle.height)
        && milieuY>parseInt(galaxieStyle.top)){
            changeOpacity(1);
        }
        else{
            changeOpacity(0);
        }
}
function changeOpacity(opaciteFinal){
    var tabPlanete = document.getElementsByClassName("planete");
    var tabPlaneteStyle = window.getComputedStyle(tabPlanete[1]);
    Array.from(tabPlanete).forEach((t,index) =>
            {
            t.animate([
                    {
                        opacity : tabPlaneteStyle.opacity,
                    },
                    {
                        opacity : opaciteFinal,
                    }],2000);
                t.style.opacity=opaciteFinal; 
            });
}