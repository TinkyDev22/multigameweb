let playerAttack;
let enemyAttack;
let playerLives = 3;
let enemyLives = 3;
// Selección de botones desde HTML.
function initGame() {
    // Ocultar sección de ataque.
    let sectionSelectAttack = document.getElementById('select-attack');
    sectionSelectAttack.style.display = 'none';
    // Ocultar sección reiniciar.
    let sectionRestart = document.getElementById('restart');
    sectionRestart.style.display = 'none';
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
    // button-restart
    let restartButton = document.getElementById('button-restart');
    restartButton.addEventListener('click', restartGame);
}
// Valores aleatorios.
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// Selección aleatoria de mascota jugador.
function selectPetPlayer() {
    // Aparición de los elementos en pantalla.
    let sectionSelectAttack = document.getElementById('select-attack');
    sectionSelectAttack.style.display = 'flex';
    // Ocultación de elección de mascotas
    let sectionSelectPet = document.getElementById('select-pet');
    sectionSelectPet.style.display = 'none';
    // variables de validación para selección de mascotas.
    let inputHipodoge = document.getElementById('hipodoge');
    let inputCapipepo = document.getElementById('capipepo');
    let inputRatigueya = document.getElementById('ratigueya');
    // Selección del nombre de la mascota del jugador.
    let spanNamePetPlayer = document.getElementById('name-pet-player');
    // Selección de la mascota del jugador.
    if (inputHipodoge.checked) {
        // HIpodoge
        // alert('Seleccionaste a Hipodoge');
        spanNamePetPlayer.innerHTML = 'Hipodoge';
    } else if (inputCapipepo.checked) {
        // Capipepo
        // alert('Seleccionaste a Capipepo');
        spanNamePetPlayer.innerHTML = 'Capipepo';
    } else if (inputRatigueya.checked) {
        // Ratigueya
        // alert('Seleccionaste a Ratigueya');
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
    let spanLivesPetPlayer = document.getElementById('lives-pet-player');
    let spanLivesPetEnemy = document.getElementById('lives-pet-enemy');

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
    let scoreSection = document.getElementById('scores');
    let playerAttacks = document.getElementById('player-attacks');
    let enemyAttacks = document.getElementById('enemy-attacks');

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
    let messageSection = document.getElementById('scores');
    messageSection.innerHTML = finalResult;

    // Deshabilitación de botones del juego
    let buttonFire = document.getElementById('button-fire');
    buttonFire.disabled = true;
    let buttonWater = document.getElementById('button-water');
    buttonWater.disabled = true;
    let buttonEarth = document.getElementById('button-earth');
    buttonEarth.disabled = true;

    // Aparición de botón reiniciar
    let sectionRestart = document.getElementById('restart');
    sectionRestart.style.display = 'flex';
}
// Reiniciar juego
function restartGame() {
    location.reload();
}
// Ejecución del código cuando el DOM finalice la carga.
window.addEventListener('load', initGame);