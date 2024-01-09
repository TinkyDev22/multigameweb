/* ---- Selección de botones desde HTML ---- */

// Botones y vistas principales

// Vista principal de seleccion de mascotas.
const sectionSelectPet = document.getElementById('select-pet')
// Sección con los botones de selección de mascotas
const cardsContainer = document.getElementById('cards-container')
// Botón para confirmar la selección de mascotas una vez clickeada alguna.
const buttonPetPlayer = document.getElementById('button-pet')

// Pestaña de detalle en el área de combate.

// Vista principal de seleccion de ataques.
const sectionSelectAttack = document.getElementById('select-attack')
// Sección que incluye el botón de reinicio del juego.
const sectionRestart = document.getElementById('restart')
// Botón de reinicio del juego una vez finalizada la batalla.
const restartButton = document.getElementById('button-restart')

// Botones de elementos de los ataques.
const attacksContainer = document.getElementById('attacks-container')

// Span en el detalle del combate con el nombre de la mascota del jugador.
const spanNamePetPlayer = document.getElementById('name-pet-player')
// Span en el detalle del combate con las vidas del jugador.
const spanLivesPetPlayer = document.getElementById('lives-pet-player')
// Listado de ataques del jugador.
const playerAttacks = document.getElementById('player-attacks')

// Span en el detalle del combate con el nombre de la mascota del enemigo.
const spanNamePetEnemy = document.getElementById('name-pet-enemy')
// Span en el detalle del combate con las vidas del enemigo.
const spanLivesPetEnemy = document.getElementById('lives-pet-enemy')
// Listado de ataques del enemigo.
const enemyAttacks = document.getElementById('enemy-attacks')

// Espacio de mensaje con el resultado del combate.
const scoreSection = document.getElementById('scores')

/* ---- Variables globales ---- */

// Array que contiene todos los mokepones.
let mokepones = []
// Array que contiene la generación de botones del combate
let buttons = []

// Variables globales que almacenan los ataques escogidos por el jugador y el enemigo.
let enemyAttack = []

// Ataques que selecciona el jugador
let playerAttack = []

//
let choiseAttackEnemy

//
let indexPlayerAttack
let indexEnemyAttack

// Almacenamiento de botones de selección de mascotas luego de ejecutarse en "initGame".
let inputHipodoge
let inputCapipepo
let inputRatigueya

// Almacenamiento de botones de ataques de mascotas luego de ejecutarse en "showAttacks".
let attacksMokepons
let buttonFire
let buttonWater
let buttonEarth

// Almacenamiento del nombre de la mascota del jugador
let petPlayer

// Vidas
let victoriesPlayer = 0
let victoriesEnemy = 0

// Variable que almacena un string con la generación del boton de la mascota seleccionada en el string de mokepones. Se utiliza en "initGame".
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
    // Toma la función de valores aleatorios "randomNumber" y pasa como parámetro la longitu del array "mokepones".
    let randomEnemy = randomNumber( 0 , mokepones.length - 1 )
    // Selección de la mascota del enemigo.
    spanNamePetEnemy.innerHTML = mokepones[randomEnemy].name
    choiseAttackEnemy = mokepones[randomEnemy].attacks
    secuenceAttacks()
}
// Mostrar ataques
function showAttacks(attacks) {
    attacks.forEach(attack => {
        attacksMokepons = `
        <button class="button-attacks BAttacks" id="${attack.id}">${attack.name}</button>
        `
        attacksContainer.innerHTML += attacksMokepons
    })

    buttonFire = document.getElementById('button-fire')
    buttonWater = document.getElementById('button-water')
    buttonEarth = document.getElementById('button-earth')

    // Para no repetir ID del HTML, se utiliza una clase de CSS. Este arreglo trae todos los botones.
    buttons = document.querySelectorAll('.BAttacks')
}
function secuenceAttacks() {
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target.textContent === 'Fuego') {
                playerAttack.push('Fuego')
                console.log(playerAttack)
                button.style.background = '#112f58'
                button.disabled = true
            } else if (e.target.textContent === 'Agua') {
                playerAttack.push('Agua')
                console.log(playerAttack)
                button.style.background = '#112f58'
                button.disabled = true
            } else if (e.target.textContent === 'Tierra') {
                playerAttack.push('Tierra')
                console.log(playerAttack)
                button.style.background = '#112f58'
                button.disabled = true
            }
            // Se coloca dentro del flujo para que no se elija primero el ataque enemigo y despues el jugador elija. Si se coloca por dentro del ForEach y por Fuera del IF se ejecuta 5 veces la misma.
            randomEnemyAttack()
        })
    });
}
// Selección aleatoria de ataque enemigo
function randomEnemyAttack() {
    let randomAttack = randomNumber( 0 , choiseAttackEnemy.length - 1 )
    
    if (randomAttack == 0 || randomAttack == 1) {
        enemyAttack.push('Fuego')
    } else if (randomAttack == 3 || randomAttack == 4) {
        enemyAttack.push('Agua')
    } else {
        enemyAttack.push('Tierra')
    }
    console.log(enemyAttack)
    initCombat()
}
function initCombat() {
    if (playerAttack.length === 5) {
        combat()
    }
}
// auxiliar
function oponentsValues(player, enemy) {
    indexPlayerAttack = playerAttack[player]
    indexEnemyAttack = enemyAttack[enemy]
}
// Resultado de los combates entre mascotas.
function combat() {
    for (let i = 0; i < playerAttack.length; i++) {
        if (playerAttack[i] === enemyAttack[1]) {
            oponentsValues(i, i)
            createMessage('Empate')
        } else if (playerAttack[i] === 'Fuego' && enemyAttack[i] === 'Tierra') {
            oponentsValues(i, i)
            createMessage('Ganaste')
            victoriesPlayer++
            spanLivesPetPlayer.innerHTML = victoriesPlayer
        } else if (playerAttack[i] === 'Agua' && enemyAttack[i] === 'Fuego') {
            oponentsValues(i, i)
            createMessage('Ganaste')
            victoriesPlayer++
            spanLivesPetPlayer.innerHTML = victoriesPlayer
        } else if (playerAttack[i] === 'Tierra' && enemyAttack[i] === 'Agua') {
            oponentsValues(i, i)
            createMessage('Ganaste')
            victoriesPlayer++
            spanLivesPetPlayer.innerHTML = victoriesPlayer
        } else {
            oponentsValues(i, i)
            createMessage('Perdiste')
            victoriesEnemy++
            spanLivesPetEnemy.innerHTML = victoriesEnemy
        }
    }
    victories();
}
// Revisar vidas
function victories() {
    if (victoriesPlayer === victoriesEnemy) {
        createFinalMessage("EMPATE")
    } else if (victoriesPlayer > victoriesEnemy){
        createFinalMessage("GANASTE")
    } else {
        createFinalMessage("PERDISTE")
    }
}
// Mensaje de elecciones de jugadores.
function createMessage(combatResult) {
    scoreSection.innerHTML = combatResult;

    let playerNotification = document.createElement('p')
    playerNotification.innerHTML = indexPlayerAttack
    playerAttacks.appendChild(playerNotification)

    let enemyNotification = document.createElement('p')
    enemyNotification.innerHTML = indexEnemyAttack
    enemyAttacks.appendChild(enemyNotification)
}
// Mensaje de resultado final
function createFinalMessage(finalResult) {
    scoreSection.innerHTML = finalResult
    // Aparición de botón reiniciar
    sectionRestart.style.display = 'flex'
}
// Reiniciar juego
function restartGame() {
    location.reload();
}
// Ejecución del código cuando el DOM finalice la carga.
window.addEventListener('load', initGame);