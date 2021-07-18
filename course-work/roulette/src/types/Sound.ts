import {
    addChipSoundRef,
    chooseChipSoundRef, dzenRef,
    jackpotMoneySoundRef,
    loseSoundRef, noBetsOnSpotsRef, notEnoughMoneySoundRef,
    pressButtonSoundRef, putSomeBetsSoundRef, spinningRouletteRef, winSoundRef, resultsRef
} from '../utilities/sounds'


export class Sound {
    public static playAddChip(voiceTurnedOn: boolean): void {
        voiceTurnedOn && addChipSoundRef.play()
    }

    public static playPressButtonAddChip(voiceTurnedOn: boolean): void {
        voiceTurnedOn && pressButtonSoundRef.play()
    }

    public static playChooseChip(voiceTurnedOn: boolean): void {
        voiceTurnedOn && chooseChipSoundRef.play()
    }

    public static playJackpotMoney(voiceTurnedOn: boolean): void {
        voiceTurnedOn && jackpotMoneySoundRef.play()
    }

    public static playLose(voiceTurnedOn: boolean): void {
        voiceTurnedOn && loseSoundRef.play()
    }

    public static playWin(voiceTurnedOn: boolean): void {
        voiceTurnedOn && winSoundRef.play().finally(() =>
            Sound.playJackpotMoney(voiceTurnedOn))
    }

    public static playPutBets(voiceTurnedOn: boolean): void {
        voiceTurnedOn && putSomeBetsSoundRef.play()
    }

    public static playNotEnoughMoney(voiceTurnedOn: boolean): void {
        voiceTurnedOn && notEnoughMoneySoundRef.play()
    }

    public static playNoBets(voiceTurnedOn: boolean): void {
        voiceTurnedOn && noBetsOnSpotsRef.play()
    }

    public static playDzen(voiceTurnedOn: boolean): void {
        voiceTurnedOn && dzenRef.play()
    }

    public static playSpinningRoulette(voiceTurnedOn: boolean): void {
        voiceTurnedOn && spinningRouletteRef.play()
    }

    public static playResultAnnouncement(voiceTurnedOn: boolean, result: number): void {
        voiceTurnedOn && resultsRef[result].play()
    }
}