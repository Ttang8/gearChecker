const NECKLACE = 1
const RING = 2
const BOOT = 3
const HIGHPRIORITY = 1
const MIDPRIORITY = 2
const LOWPRIORITY = 3

let priority = {
    1:'High Priority',
    2:'Mid Priority',
    3:'Low Priority'
}

const ATTACK = 1
const CRITDMG = 2
const CRITRATE = 3
const DEFENSE = 4
const EFFECT = 5
const EFFRES = 6
const HEALTH = 7
const SPEED = 8
const FATTACK = 9
const FDEFENSE = 10
const FHEALTH = 11

let error = document.getElementById('error')
let results = document.getElementById('results')

let attackPercent = document.querySelector("input[name='attack_percent']")
let defensePercent = document.querySelector("input[name='defense_percent']")
let healthPercent = document.querySelector("input[name='health_percent']")
let attackFlat = document.querySelector("input[name='attack_flat']")
let defenseFlat = document.querySelector("input[name='defense_flat']")
let healthFlat = document.querySelector("input[name='health_flat']")
let critPercent = document.querySelector("input[name='crit_chance']")
let critDamage = document.querySelector("input[name='crit_damage']")
let speed = document.querySelector("input[name='speed']")
let effectiveness = document.querySelector("input[name='effectiveness']")
let effResis = document.querySelector("input[name='eff_resist']")

let def = document.createElement('div')
def.classList.add('center')
def.classList.add('font-45px')
def.innerHTML = 'Results:'

let subStats = {
    1:'Attack%',
    2:'Crit Damage',
    3:'Crit Rate',
    4:'Defense%',
    5:'Effectiveness',
    6:'Effect Resistance',
    7:'Health%',
    8:'Speed',
    9:'Flat Attack',
    10:'Flat Defense',
    11:'Flat Health'
}

let dps = {
    name:'DPS',
    1:[ATTACK,CRITDMG,CRITRATE],
    2:[ATTACK],
    3:[ATTACK,SPEED]
}

let dpsSub = {
    1:[ATTACK,CRITDMG,CRITRATE],
    2:[FATTACK,SPEED],
    3:[EFFECT,HEALTH]
}

let tankHealer = {
    name:'Tank/Healer',
    1:[HEALTH,DEFENSE],
    2:[HEALTH,DEFENSE,EFFRES],
    3:[SPEED,HEALTH,DEFENSE]
}

let tankHealerSub = {
    1:[HEALTH,DEFENSE,SPEED],
    2:[EFFRES,FHEALTH,FDEFENSE],
    3:[EFFECT]
}

let debuff = {
    name:'debuffer',
    1:[HEALTH,DEFENSE,CRITRATE,CRITDMG],
    2:[EFFECT,HEALTH,ATTACK],
    3:[SPEED]
}

let debuffSub = {
    1:[EFFECT,SPEED],
    2:[HEALTH],
    3:[DEFENSE,CRITRATE,CRITDMG,ATTACK]
}

let bruiser = {
    name:'bruiser',
    1:[CRITDMG,CRITRATE],
    2:[ATTACK,HEALTH,DEFENSE,EFFECT],
    3:[SPEED,HEALTH,ATTACK]
}

let bruiserSub = {
    1:[HEALTH,DEFENSE,CRITRATE,CRITDMG],
    2:[ATTACK,EFFECT],
    3:[FHEALTH,FDEFENSE,FATTACK,EFFRES]
}

let opener = {
    name:'opener',
    1:[CRITRATE,HEALTH,ATTACK],
    2:[EFFECT,HEALTH,ATTACK],
    3:[SPEED]
}

let openerSub = {
    1:[SPEED],
    2:[EFFECT,ATTACK,HEALTH],
    3:[CRITRATE,CRITDMG]
}

let roles = [dps,tankHealer,debuff,bruiser,opener]

// let subS = document.getElementById("sub-stats")
// for(let i=1;i<=4;i++) {
//     let sel = document.createElement("select")
//     sel.name = `substat-${i}`
//     sel.id = `substat-${i}`
//     sel.classList.add('space-2')
//     let na = document.createElement("option")
//     na.value = 0
//     na.innerHTML = 'none'
//     sel.appendChild(na)
//         for (let key in subStats) {
//             let opt = document.createElement("option")
//             opt.value = key
//             opt.innerHTML = subStats[key]
//             sel.appendChild(opt)
//         }
//     subS.appendChild(sel)
// }

// let mainS = document.getElementById('mainStat')
// for (let k in subStats) {
//     let option = document.createElement("option")
//     option.value = k
//     option.innerHTML = subStats[k]
//     mainS.appendChild(option)
// }

function handleSubmit() {
    clearError()
    clearResults()

    let gearScore = 0

    let currentAttackPercent = parseInt(attackPercent.value);
    let currentDefensePercent = parseInt(defensePercent.value);
    let currentHealthPercent = parseInt(healthPercent.value);
    let currentAttackFlat = parseInt(attackFlat.value);
    let currentDefenseFlat = parseInt(defenseFlat.value);
    let currentHealthFlat = parseInt(healthFlat.value);
    let currentCritPercent = parseInt(critPercent.value);
    let currentCritDamage = parseInt(critDamage.value);
    let currentSpeed = parseInt(speed.value);
    let currentEffectiveness = parseInt(effectiveness.value);
    let currentEffResist = parseInt(effResis.value);

    gearScore += currentAttackPercent ? currentAttackPercent : 0
    gearScore += currentDefensePercent ? currentDefensePercent : 0
    gearScore += currentHealthPercent ? currentHealthPercent : 0
    gearScore += currentEffectiveness ? currentEffectiveness : 0
    gearScore += currentEffResist ? currentEffResist : 0
    gearScore += currentSpeed ? (currentSpeed*(8/4)) : 0
    gearScore += currentCritPercent ? (currentCritPercent*(8/5)) : 0
    gearScore += currentCritDamage ? (currentCritDamage*(8/7)) : 0
    gearScore += currentAttackFlat ? (currentAttackFlat * (3.46 / 39)) : 0
    gearScore += currentDefenseFlat ? (currentDefenseFlat * (4.99 / 31)) : 0
    gearScore += currentHealthFlat ? (currentHealthFlat * (3.09 / 174)) : 0
    let el = document.createElement('div')
    el.classList.add('center')
    el.classList.add('font-45px')
    el.innerHTML = gearScore
    results.appendChild(el)
    // let result = checkGear()
    // result.forEach(role => {
    //     checkSubStats(role)
    // })
}

function checkActiveStat(substatValue) {
    if (substatValue > 0) {
        return true
    }
    return false
}

function checkGear() {
    let gear = document.getElementById('rightSideGear').value
    let mS = document.getElementById('mainStat').value
    let array = []

    if(gear > 0) {
        if(mS == 0) {
            writeError('Must choose a main stat')
            return
        }
        
        roles.forEach(role => {       
            role[gear].forEach(stat => {
                if(stat == mS) {
                    array.push(role)
                }
            })
        })
    } else {
        array = roles
    }
    return array;
}

function checkSubStats(role) {
    let subOne = document.getElementById('substat-1');
    let subTwo = document.getElementById('substat-2');
    let subThree = document.getElementById('substat-3');
    let subFour = document.getElementById('substat-4');
    let subArr = [subOne,subTwo,subThree,subFour]
    let subStat;
    let hpc = 0;
    let mpc = 0;
    let lpc = 0;
    let priorityArray = []

    let el = document.createElement('div')
    el.classList.add('flex','column','space')
    let nameEl = document.createElement('div')

    switch(role.name) {
        case 'DPS':
            subStat = dpsSub
            break;
        case 'Tank/Healer':
            subStat = tankHealerSub
            break;
        case 'debuffer':
            subStat = debuffSub
            break;
        case 'bruiser':
            subStat = bruiserSub
            break;
        case 'opener':
            subStat = openerSub
            break;
    }
    
    for(let prior in subStat) {
        let ar = subStat[prior]
        
        subArr.forEach(sub => {
            
            if (ar.includes(parseInt(sub.value))) {
                switch(parseInt(prior)) {
                    case 1:
                        hpc += 1
                        break;
                    case 2:
                        mpc += 1
                        break;
                    case 3:
                        lpc += 1
                        break;
                }
                let subEl = document.createElement('div')
                subEl.innerHTML = `${priority[prior]}: ${subStats[sub.value]}`
                priorityArray.push(subEl)
            }
        })
    }

    nameEl.innerHTML = `Role: ${role.name} `
    // if(hpc < 2 || (hpc+mpc+lpc < 3)) {
    //     let di = document.createElement('div')
    //     di.innerHTML = 'not good'
    //     el.appendChild(nameEl)
    //     el.appendChild(di)
    //     results.appendChild(el)
    //     return
    // }

    if(hpc > 0) {
        nameEl.innerHTML = nameEl.innerHTML.concat(`${hpc} High Priority `)
    }
    if(mpc > 0) {
        nameEl.innerHTML = nameEl.innerHTML.concat(`${mpc} Mid Priority `)
    }    
    if(lpc > 0) {
        nameEl.innerHTML = nameEl.innerHTML.concat(`${lpc} Low Priority `)
    }
    
    el.appendChild(nameEl)
    
    priorityArray.forEach( ell => {
        el.appendChild(ell)
    })
    results.appendChild(el)
}

function clearError() {
    error.innerHTML = ''
}

function handleReset() {
    attackPercent.value = ''
    defensePercent.value = ''
    healthPercent.value = ''
    attackFlat.value = ''
    defenseFlat.value = ''
    healthFlat.value = ''
    critPercent.value = ''
    critDamage.value = ''
    speed.value = ''
    effectiveness.value = ''
    effResis.value = ''
    clearResults()
}

function writeError(string) {
    error.innerHTML = string
}

function clearResults() {
    results.innerHTML = ''
    results.appendChild(def)
}

function writeResult(){

}