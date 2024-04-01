const bets=[10 ,20, 30, 50, 100, 200, 500, 1000, 2000, 3000, 5000], randImgs=[];
let i=0, points=0, myImages=[], stopped=true, autoplay=false;

class Fruit{
    constructor(elem, name, three, four, five){
        this.element=elem;
        this.name=name;
        this.threeWin = three;
        this.fourWin = four;
        this.fiveWin = five;
    }
}
const cherry = new Fruit(document.querySelector("#cherry"), "cherry", 4, 10, 40);
const lemon = new Fruit(document.querySelector("#lemon"), "lemon", 4, 10, 40);
const orange = new Fruit(document.querySelector("#orange"), "orange", 4, 10, 40);
const plum = new Fruit(document.querySelector("#plum"), "plum", 4, 10, 40);
const grape = new Fruit(document.querySelector("#grape"), "grape", 10, 40, 100);
const watermelon = new Fruit(document.querySelector("#watermelon"), "watermelon", 10, 40, 100);
const star = new Fruit(document.querySelector("#star"), "star", 2, 10, 50);
const seven = new Fruit(document.querySelector("#seven"), "seven", 20, 200, 1000);

myImages[0]=cherry;
myImages[1]=lemon;
myImages[2]=orange;
myImages[3]=plum;
myImages[4]=grape;
myImages[5]=watermelon;
myImages[6]=star;
myImages[7]=seven;

const closeWelcomeBtn = document.querySelector("#closeWelcome");
const welcomeSection = document.querySelector("#welcomeSection");
closeWelcomeBtn.addEventListener("click", () => welcomeSection.style.display="none");

const infoBtn = document.querySelector("#infobtn");
const closeWinningBtn = document.querySelector("#closeWin");
const winningSection=document.querySelector("#winningSection");
const panel=document.querySelectorAll(".winDetails span:nth-of-type(2)");

function updateWinningPanel(){
        for(let j=0;j<panel.length;j++){
            let elemClass=panel[j].getAttribute("class");
            if(elemClass==="twoMinWin") panel[j].innerText=bets[i];
            if(elemClass==="threeMinWin") panel[j].innerText= 4*bets[i];
            if(elemClass==="fourMinWin") panel[j].innerText= 10*bets[i];
            if(elemClass==="fiveMinWin") panel[j].innerText= 40*bets[i];
            if(elemClass==="threeMedWin") panel[j].innerText= 10*bets[i];
            if(elemClass==="fourMedWin") panel[j].innerText= 40*bets[i];
            if(elemClass==="fiveMedWin") panel[j].innerText= 100*bets[i];
            if(elemClass==="threeMaxWin") panel[j].innerText= 20*bets[i];
            if(elemClass==="fourMaxWin") panel[j].innerText= 200*bets[i];
            if(elemClass==="fiveMaxWin") panel[j].innerText= 1000*bets[i];
            if(elemClass==="threeStars") panel[j].innerText=2*bets[i];
            if(elemClass==="fourStars") panel[j].innerText= 10*bets[i];
            if(elemClass==="fiveStars") panel[j].innerText= 50*bets[i];
    }
}

infoBtn.addEventListener("click", function(){
    updateWinningPanel();
    winningSection.style.display="flex";
});
closeWinningBtn.addEventListener("click", ()=> winningSection.style.display="none");


const upBet = document.querySelector("#raisebet");
const lowBet = document.querySelector("#lowerbet");
const bet=document.querySelector("#bet");
upBet.addEventListener("click", function(){
    if (points>0){
        if(i<bets.length-1 && bets[i+1]<=points) i++;
        else i=0;
        bet.innerText=bets[i];
    } else return;
})
lowBet.addEventListener("click", function(){
    if(points>0){
        if(i==0){
            i=bets.length-1;
            while(bets[i]>points){
                i--;
            }
        }else i--;
        bet.innerText=bets[i];
    }else return;
    
    bet.innerText=bets[i];
})


const credit=document.querySelector("#credit");
const addCash=document.querySelector("#addcash");
addCash.addEventListener("keydown", function(ev){
    if(ev.key=="Enter"){
        let money=parseInt(addCash.value);
        if(isNaN(money)) addCash.value="";
        else{
            credit.innerHTML= parseInt(credit.innerText) + (money/0.002);
            points=parseInt(credit.innerText);
            addCash.value="";
        }
    }
})


const maxBet= document.querySelector("#maxbtn");
maxBet.addEventListener("click", function(){
    (points>=5000)?i=10:
        (points>=3000)?i=9:
            (points>=2000)?i=8:
                (points>=1000)?i=7:
                    (points>=500)?i=6:
                        (points>=200)?i=5:
                            (points>=100)?i=4:
                                (points>=50)?i=3:
                                    (points>=30)?i=2:
                                        (points>=20)?i=1:i=0;
    bet.innerText=bets[i];
})




function shuffle(){
    for(let k=0;k<15;k++){
        let n = Math.floor(Math.random()*8);
        randImgs[k]=myImages[n].element;
    }
}
const newImg = (elem, k) => {
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            elem.style.opacity=0;
            setTimeout(()=>{
                elem.setAttribute("class", "newImg");
                elem.setAttribute("src", randImgs[k].getAttribute("src"));
                elem.style.opacity=1;
            }, "750");
            resolve();
        }, "250")
    })
}

async function spin(){
    if(stopped) return;
    points-=bets[i];
    credit.innerText=points;
    shuffle();
    let k=0;
    for(let img of reelImgs){
        await newImg(img,k);
        k++;
    }
    setTimeout(()=> {
        if(autoplay){
            win();
            if(points>=bets[i]) spin();
            else{
                auto.style.display="inline-block";
                stop.style.display="none";
            }
        }else win();
    }, "600");
    
}
function lowerBet(){
    while(i>0 && bets[i]>points){
        i--;
    }
    bet.innerText=bets[i];
}

const start=document.querySelector("#startbtn");
const reelImgs=document.querySelectorAll(".reel img");
start.addEventListener("click", ()=>{
    stopped=false;
    autoplay=false;
    if(points>=bets[i]) {
        spin();
    }else lowerBet();
})

const auto=document.querySelector("#autobtn");
const stop=document.querySelector("#stopbtn");
auto.addEventListener("click", ()=>{
    if(points>=bets[i]){
        stopped=false;
        autoplay=true;
        auto.style.display="none";
        stop.style.display="inline-block";
        spin();
    } else lowerBet();
})
stop.addEventListener("click", ()=>{
    stopped=true;
    autoplay=false;
    auto.style.display="inline-block";
    stop.style.display="none";
})

function getFruit(fruitId){
    let x=0;
    while(x<myImages.length-1 && myImages[x].name!==fruitId){
        x++;
    }
    return x;
}
function checkLine(k){
    let nb=1;
    for(let l=k+3;l<15;l+=3){
        if(randImgs[k].id===randImgs[l].id){
            nb++;
        }else break;
    }
    return nb;
}
function checkDiagonal(k){
    let nb=1;
    if(randImgs[k].id===randImgs[4].id){
        nb++;
        console.log(`2 of a kind nb: ${nb}`);
        if((k==0 && randImgs[k].id===randImgs[8].id)||(k==2 && randImgs[k].id===randImgs[6].id)){
            nb++;
            console.log(`3 of a kind nb: ${nb}`);
            if(randImgs[k].id===randImgs[10].id){
                nb++;
                console.log(`4 of a kind nb: ${nb}`);
                if((k==0 && randImgs[k].id===randImgs[12].id)||(k==2 && randImgs[k].id===randImgs[14].id)){
                    nb++;
                    console.log(`5 of a kind nb: ${nb}`);
                }
            }
        }
    }
    return nb;
}

function win(){
    let amountWon=0, fruit, nbElem;
    for(let k=0;k<3;k++){
        nbElem = checkLine(k);
        // console.log(`Nb elem este: ${nbElem}`);
        if(nbElem>1) {
            fruit = getFruit(randImgs[k].id);
            if (nbElem==2 && fruit==0) {amountWon+=bets[i]; console.log(`2 of a kind - line: ${amountWon}`);}
            else if(nbElem==3){
                amountWon+=myImages[fruit].threeWin*bets[i];
                console.log(`3 of a kind - line: ${amountWon}`);
            }else if(nbElem==4){
                amountWon+=myImages[fruit].fourWin*bets[i];
                console.log(`4 of a kind - line: ${amountWon}`);
            } else if(nbElem==5){
                amountWon+=myImages[fruit].fiveWin*bets[i];
                console.log(`5 of a kind - line: ${amountWon}`);
            }
        }
        if(k%2===0) {
            nbElem=checkDiagonal(k);
            if(nbElem>1) {
                fruit = getFruit(randImgs[k].id);
                if(nbElem==2 && fruit==0) {amountWon+=bets[i]; console.log(`2 of a kind - diagonal: ${amountWon}`);}
                else if(nbElem==3){
                    amountWon+=myImages[fruit].threeWin*bets[i];
                    console.log(`3 of a kind - diagonal: ${amountWon}`);
                }else if(nbElem==4){
                    amountWon+=myImages[fruit].fourWin*bets[i];
                    console.log(`4 of a kind - diagonal: ${amountWon}`);
                } else if (nbElem==5){
                    amountWon+=myImages[fruit].fiveWin*bets[i];
                    console.log(`5 of a kind - diagonal: ${amountWon}`);
                }
            }
        }
    }
    points+=amountWon;
    credit.innerText=points;
}


