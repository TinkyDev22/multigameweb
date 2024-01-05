/* ---- Selección de botones desde HTML ---- */

const sectionSelectPet = document.getElementById('select-pet')
const sectionSelectAttack = document.getElementById('select-attack')
const buttonPetPlayer = document.getElementById('button-pet')
const restartButton = document.getElementById('button-restart')
const spanNamePetPlayer = document.getElementById('name-pet-player')
const spanNamePetEnemy = document.getElementById('name-pet-enemy')
const spanLivesPetPlayer = document.getElementById('lives-pet-player')
const spanLivesPetEnemy = document.getElementById('lives-pet-enemy')
const scoreSection = document.getElementById('scores')
const playerAttacks = document.getElementById('player-attacks')
const enemyAttacks = document.getElementById('enemy-attacks')
const sectionRestart = document.getElementById('restart')
const cardsContainer = document.getElementById('cards-container')
const attacksContainer = document.getElementById('attacks-container')

/* ---- Variables globales ---- */

// Mokepones
let mokepones = []

// Ataques
let playerAttack
let enemyAttack

// Almacenamiento de botones de selección de mascotas
let inputHipodoge
let inputCapipepo
let inputRatigueya

// Almacenamiento de botones de ataques de mascotas
let attacksMokepons
let buttonFire
let buttonWater
let buttonEarth

// Almacenamiento del nombre de la mascota del jugador
let petPlayer

// Vidas
let playerLives = 3
let enemyLives = 3

//
let mokeponOption

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

// Añadido de mokepones en el array
mokepones.push(hipodoge, capipepo, ratigueya)

/* ---- Funciones auxiliares ---- */

// Valores aleatorios
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// Extraer del arreglo de mokepones los ataques de la mascota
function extractAttack(petPlayer) {
    let attacks
    for (let i = 0; i < mokepones.length; i++) {
        if (petPlayer === mokepones[i].name) {
            attacks = mokepones[i].attacks
        }        
    }
    showAttacks(attacks)
}

/* ---- Funciones del juego ---- */

// Ejecución de funciones de inicio del juego
function initGame() {
    // Ocultación de secciones de selección de ataque y reinicio de juego
    sectionSelectAttack.style.display = 'none'
    sectionRestart.style.display = 'none'

    // Inicialización de mokepones
    mokepones.forEach((mokepon) => {
        mokeponOption = `
        <input type="radio" name="pets" id="${mokepon.name}">
        <label class="select-pet-label" for="${mokepon.name}">
                <p>${mokepon.name}</p>
                <img src="${mokepon.picture}" alt="${mokepon.name}">
            </label>
        `
        cardsContainer.innerHTML += mokeponOption

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })

    buttonPetPlayer.addEventListener('click', selectPetPlayer)
    restartButton.addEventListener('click', restartGame)
}

// Selección aleatoria de mascota jugador
function selectPetPlayer() {
    // Aparición de los elementos en pantalla
    sectionSelectAttack.style.display = 'flex'
    // Ocultación de elección de mascotas
    sectionSelectPet.style.display = 'none'
    // Selección de la mascota del jugador
    // inputHipodoge.id toma el nombre del objeto creado al comienzo
    if (inputHipodoge.checked) {
        spanNamePetPlayer.innerHTML = inputHipodoge.id
        petPlayer = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanNamePetPlayer.innerHTML = inputCapipepo.id
        petPlayer = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanNamePetPlayer.innerHTML = inputRatigueya.id
        petPlayer = inputRatigueya.id
    } else {
        alert('Selecciona una Mascota')
    }
    extractAttack(petPlayer)
    selectPetEnemy()
}
// Selección aleatoria de mascota enemiga.
function selectPetEnemy() {
    // Valor aleatorio para el valor del ataque enemigo.
    let randomEnemy = randomNumber( 0 , mokepones.length - 1 )
    // Selección de la mascota del enemigo.
    spanNamePetEnemy.innerHTML = mokepones[randomEnemy].name
}
// Mostrar ataques
function showAttacks(attacks) {
    attacks.forEach(attack => {
        attacksMokepons = `
        <button class="button-attacks" id="${attack.id}">${attack.name}</button>
        `
        attacksContainer.innerHTML += attacksMokepons
    })

    buttonFire = document.getElementById('button-fire')
    buttonWater = document.getElementById('button-water')
    buttonEarth = document.getElementById('button-earth')

    buttonFire.addEventListener('click', FireAttack)
    buttonWater.addEventListener('click', WaterAttack)
    buttonEarth.addEventListener('click', EarthAttack)
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