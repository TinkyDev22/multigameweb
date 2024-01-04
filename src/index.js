/* ---- Selección de botones desde HTML ---- */

const sectionSelectPet = document.getElementById('select-pet')
const sectionSelectAttack = document.getElementById('select-attack')
const buttonPetPlayer = document.getElementById('button-pet')
const inputHipodoge = document.getElementById('hipodoge')
const inputCapipepo = document.getElementById('capipepo')
const inputRatigueya = document.getElementById('ratigueya')
const buttonFire = document.getElementById('button-fire')
const buttonWater = document.getElementById('button-water')
const buttonEarth = document.getElementById('button-earth')
const restartButton = document.getElementById('button-restart')
const spanNamePetPlayer = document.getElementById('name-pet-player')
const spanNamePetEnemy = document.getElementById('name-pet-enemy')
const spanLivesPetPlayer = document.getElementById('lives-pet-player')
const spanLivesPetEnemy = document.getElementById('lives-pet-enemy')
const scoreSection = document.getElementById('scores')
const playerAttacks = document.getElementById('player-attacks')
const enemyAttacks = document.getElementById('enemy-attacks')
const sectionRestart = document.getElementById('restart')

/* ---- Variables globales ---- */

// Mokepones
let mokepones = []

// Ataques
let playerAttack
let enemyAttack

// Vidas
let playerLives = 3
let enemyLives = 3

/* ---- Clases ---- */

// Clase principal de mokepones
class Mokepon {
    constructor(name, picture, lives) {
        this.name = name
        this.picture = picture
        this.lives = lives
        this.attacks = []
    }
}

// Creación de los mokepones
let hipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5)

// Añadido de mokepones en el array
mokepones.push(hipodoge, capipepo, ratigueya)

// Añadido de ataques a los mokepones
hipodoge.attacks.push(
    { id: 'button-water', name: 'Agua' },
    { id: 'button-water', name: 'Agua' },
    { id: 'button-water', name: 'Agua' },
    { id: 'button-earth', name: 'Tierra'},
    { id: 'button-fire', name: 'Fuego' },
)
capipepo.attacks.push(
    { id: 'button-earth', name: 'Tierra'},
    { id: 'button-earth', name: 'Tierra'},
    { id: 'button-earth', name: 'Tierra'},
    { id: 'button-water', name: 'Agua' },
    { id: 'button-fire', name: 'Fuego' },
)
ratigueya.attacks.push(
    { id: 'button-fire', name: 'Fuego' },
    { id: 'button-fire', name: 'Fuego' },
    { id: 'button-fire', name: 'Fuego' },
    { id: 'button-earth', name: 'Tierra'},
    { id: 'button-water', name: 'Agua' },
)

/* ---- Funciones auxiliares ---- */

// Valores aleatorios
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/* ---- Funciones del juego ---- */

// Ejecución de funciones de inicio del juego
function initGame() {    
    // Ocultación de secciones de selección de ataque y reinicio de juego
    sectionSelectAttack.style.display = 'none'
    sectionRestart.style.display = 'none'
    buttonPetPlayer.addEventListener('click', selectPetPlayer)
    buttonFire.addEventListener('click', FireAttack)
    buttonWater.addEventListener('click', WaterAttack)
    buttonEarth.addEventListener('click', EarthAttack)
    restartButton.addEventListener('click', restartGame)
}

// Selección aleatoria de mascota jugador
function selectPetPlayer() {
    // Aparición de los elementos en pantalla
    sectionSelectAttack.style.display = 'flex';
    // Ocultación de elección de mascotas
    sectionSelectPet.style.display = 'none';
    // Selección de la mascota del jugador
    if (inputHipodoge.checked) {
        spanNamePetPlayer.innerHTML = 'Hipodoge';
    } else if (inputCapipepo.checked) {
        spanNamePetPlayer.innerHTML = 'Capipepo';
    } else if (inputRatigueya.checked) {
        spanNamePetPlayer.innerHTML = 'Ratigueya';
    } else {
        alert('Selecciona una Mascota');
    }
    selectPetEnemy();
}
// Selección aleatoria de mascota enemiga.
function selectPetEnemy() {
    // Valor aleatorio para el valor del ataque enemigo.
    let randomEnemy = randomNumber(1,3);
    // Selección de la mascota del enemigo.
    if (randomEnemy == 1) {
        spanNamePetEnemy.innerHTML = 'Hipodoge';
    } else if (randomEnemy == 2) {
        spanNamePetEnemy.innerHTML = 'Capipepo';
    } else {
        spanNamePetEnemy.innerHTML = 'Ratigueya';
    }
}
// Valores de ataque de mascotas.
function FireAttack() {
    playerAttack = 'Fuego';
    randomEnemyAttack();
}
function WaterAttack() {
    playerAttack = 'Agua';
    randomEnemyAttack();
}
function EarthAttack() {
    playerAttack = 'Tierra';
    randomEnemyAttack();
}
// Selección aleatoria de ataque enemigo
function randomEnemyAttack() {
    let randomAttack = randomNumber(1,3);
    
    if (randomAttack == 1) {
        enemyAttack = 'Fuego'
    } else if (randomAttack == 2) {
        enemyAttack = 'Agua'
    } else {
        enemyAttack = 'Tierra'
    }

    combat();
}
// Resultado de los combates entre mascotas.
function combat() {
    if (playerAttack == enemyAttack) {
        createMessage('Empate');
    } else if (playerAttack == 'Fuego' && enemyAttack == 'Tierra') {
        createMessage('Ganaste');
        enemyLives--;
        spanLivesPetEnemy.innerHTML = enemyLives;
    } else if (playerAttack == 'Agua' && enemyAttack == 'Fuego') {
        createMessage('Ganaste');
        enemyLives--;
        spanLivesPetEnemy.innerHTML = enemyLives;
    } else if (playerAttack == 'Tierra' && enemyAttack == 'Agua'){
        createMessage('Ganaste');
        enemyLives--;
        spanLivesPetEnemy.innerHTML = enemyLives;
    } else {
        createMessage('Perdiste');
        playerLives--;
        spanLivesPetPlayer.innerHTML = playerLives;
    }

    lives();
}
// Revisar vidas
function lives() {
    if (enemyLives == 0) {
        createFinalMessage("Felicitaciones! Ganaste!");
    } else if (playerLives == 0){
        createFinalMessage("Lo siento, has perdido...");
    }
}
// Mensaje de elecciones de jugadores.
function createMessage(combatResult) {
    scoreSection.innerHTML = combatResult;

    let playerNotification = document.createElement('p');
    playerNotification.innerHTML = playerAttack;
    playerAttacks.appendChild(playerNotification);

    let enemyNotification = document.createElement('p');
    enemyNotification.innerHTML = enemyAttack;
    enemyAttacks.appendChild(enemyNotification);
}
// Mensaje de resultado final
function createFinalMessage(finalResult) {
    scoreSection.innerHTML = finalResult;
    // Deshabilitación de botones del juego
    buttonFire.disabled = true;
    buttonWater.disabled = true;
    buttonEarth.disabled = true;
    // Aparición de botón reiniciar
    sectionRestart.style.display = 'flex';
}
// Reiniciar juego
function restartGame() {
    location.reload();
}
// Ejecución del código cuando el DOM finalice la carga.
window.addEventListener('load', initGame);