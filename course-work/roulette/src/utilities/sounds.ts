export const resultsRef: Array<HTMLAudioElement> = Array<HTMLAudioElement>()

for (let counter: number = 0; counter <= 36; ++counter) {
    resultsRef.push(new Audio(`/files/sounds/results/${counter}.mp3`))
}


export const addChipSoundRef: HTMLAudioElement = new Audio('/files/sounds/addChip.mp3')
export const pressButtonSoundRef: HTMLAudioElement = new Audio('/files/sounds/pressButton.mp3')
export const backgroundMusicSoundRef: HTMLAudioElement = new Audio('/files/sounds/background.mp3')
export const chooseChipSoundRef: HTMLAudioElement = new Audio('/files/sounds/chooseChip.mp3')
export const jackpotMoneySoundRef: HTMLAudioElement = new Audio('/files/sounds/jackpot.mp3')
export const loseSoundRef: HTMLAudioElement = new Audio('/files/sounds/youLose.mp3')
export const winSoundRef: HTMLAudioElement = new Audio('/files/sounds/youWin.mp3')
export const putSomeBetsSoundRef: HTMLAudioElement = new Audio('/files/sounds/makeSomeBets.mp3')
export const notEnoughMoneySoundRef: HTMLAudioElement = new Audio('/files/sounds/notEnoughMoney.mp3')
export const noBetsOnSpotsRef: HTMLAudioElement = new Audio('/files/sounds/noBetsOnTheSpots.mp3')
export const dzenRef: HTMLAudioElement = new Audio('/files/sounds/dzen.mp3')
export const spinningRouletteRef: HTMLAudioElement = new Audio('/files/sounds/rouletteSpinning.mp3')
export const winningMoney: HTMLAudioElement = new Audio('/files/sounds/plusWinMoney.mp3')

pressButtonSoundRef.volume = 0.4

jackpotMoneySoundRef.volume = 0.5

dzenRef.volume = 0.1

spinningRouletteRef.volume = 0.35