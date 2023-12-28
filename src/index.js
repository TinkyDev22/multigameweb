let playerAttack;
let enemyAttack;
// Selección de elementos desde HTML.
function initGame() {
    // button-pet
    let buttonPetPlayer = document.getElementById('button-pet');
    buttonPetPlayer.addEventListener('click', selectPetPlayer);
    // button-fire
    let buttonFire = document.getElementById('button-fire');
    buttonFire.addEventListener('click', FireAttack);
    // button-water
    let buttonWater = document.getElementById('button-water');
    buttonWater.addEventListener('click', WaterAttack);
    // button-earth
    let buttonEarth = document.getElementById('button-earth');
    buttonEarth.addEventListener('click', EarthAttack);
}
// Valores aleatorios.
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// Selección aleatoria de mascota jugador.
function selectPetPlayer() {
    // variables de validación para selección de mascotas.
    let inputHipodoge = document.getElementById('hipodoge');
    let inputCapipepo = document.getElementById('capipepo');
    let inputRatigueya = document.getElementById('ratigueya');
    // Selección del nombre de la mascota del jugador.
    let spanNamePetPlayer = document.getElementById('name-pet-player');
    // Selección de la mascota del jugador.
    if (inputHipodoge.checked) {
        // HIpodoge
        alert('Seleccionaste a Hipodoge');
        spanNamePetPlayer.innerHTML = 'Hipodoge';
    } else if (inputCapipepo.checked) {
        // Capipepo
        alert('Seleccionaste a Capipepo');
        spanNamePetPlayer.innerHTML = 'Capipepo';
    } else if (inputRatigueya.checked) {
        // Ratigueya
        alert('Seleccionaste a Ratigueya');
        spanNamePetPlayer.innerHTML = 'Ratigueya';
    } else {
        alert('Selecciona una Mascota');
    }
    // Ejecución de la variable de las mascotas enemigas.
    selectPetEnemy();
}
// Selección aleatoria de mascota enemiga.
function selectPetEnemy() {
    // Valor aleatorio para el valor del ataque enemigo.
    let randomEnemy = randomNumber(1,3);
    // Selección de la mascota del enemigo.
    let spanNamePetEnemy = document.getElementById('name-pet-enemy');
    if (randomEnemy == 1) {
        // Hipodoge
        spanNamePetEnemy.innerHTML = 'Hipodoge';
    } else if (randomEnemy == 2) {
        // Capipepo
        spanNamePetEnemy.innerHTML = 'Capipepo';
    } else {
        // Ratigueya
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
        createMessage(' Empate');
    } else if (playerAttack == 'Fuego' && enemyAttack == 'Tierra') {
        createMessage(' Ganaste');
    } else if (playerAttack == 'Agua' && enemyAttack == 'Fuego') {
        createMessage(' Ganaste');
    } else if (playerAttack == 'Tierra' && enemyAttack == 'Agua'){
        createMessage(' Ganaste');
    } else {
        createMessage(' Perdiste');
    }
}
// Mensaje de elecciones de jugadores.
function createMessage(combatResult) {
    let messageSection = document.getElementById('messages');

    let messageElement = document.createElement('p');
    messageElement.innerHTML = 'Tu mascota atacó con ' + playerAttack + '. La mascota enemiga atacó con ' + enemyAttack + '.' + combatResult;

    messageSection.appendChild(messageElement);
}
// Ejecución del código cuando el DOM finalice la carga.
window.addEventListener('load', initGame);