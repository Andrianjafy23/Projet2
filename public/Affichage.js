const DEST = document.getElementById('DEST');
const DEPART = document.getElementById('DEPART');
const HRDEPART = document.getElementById('HRDEPART');
const btn = document.getElementById('nb');
const Affiche = document.getElementById('Affiche');

let un;
let deux;
let trois;

const obj = {};
let x = 0;
let valeur ;

btn.addEventListener('click' , () => {
    x++;
    const tab = [];
    un = DEST.value;
    deux = DEPART.value;
    trois = HRDEPART.value;

    tab.push( un , deux , trois );
    obj.push( tab );
    
    console.log(obj);
});

