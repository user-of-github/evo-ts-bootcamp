export const addChipSound: HTMLAudioElement = new Audio('/sounds/addChip.mp3')
export const pressButtonSound: HTMLAudioElement = new Audio('/sounds/pressButton.mp3')
const backgroundMusicSound: HTMLAudioElement = new Audio('/sounds/background.mp3')
export const spinBallSound: HTMLAudioElement = new Audio('/sounds/ballSpinning.mp3')
export const chooseChipSound: HTMLAudioElement = new Audio('/sounds/chooseChip.mp3')
export const jackpotMoneySound: HTMLAudioElement = new Audio('/sounds/jackpot.mp3')
export const loseSound: HTMLAudioElement = new Audio('/sounds/youLose.mp3')
export const winSound: HTMLAudioElement = new Audio('/sounds/youWin.mp3')
export const putSomeBetsSound: HTMLAudioElement = new Audio('/sounds/makeSomeBets.mp3')
export const notEnoughMoneySound: HTMLAudioElement = new Audio('/sounds/notEnoughMoney.mp3')
export const noBetsOnSpots: HTMLAudioElement = new Audio('/sounds/noBetsOnTheSpots.mp3')

addChipSound.volume = 1
pressButtonSound.volume = 0.2

backgroundMusicSound.volume = 0.2
backgroundMusicSound.loop = true
backgroundMusicSound.autoplay = true

jackpotMoneySound.volume = 0.5