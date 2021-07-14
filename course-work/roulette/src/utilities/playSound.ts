const addChipSound: HTMLAudioElement = new Audio('/sounds/addChip.mp3')
const pressButtonSound: HTMLAudioElement = new Audio('/sounds/pressButton.mp3')

export const playAddChipSound = (): void => {
    addChipSound.play()
}

export const playPressButtonSound = (): void => {
    pressButtonSound.play()
}
