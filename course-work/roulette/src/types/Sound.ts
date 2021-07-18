import {
    addChipSoundRef,
    chooseChipSoundRef, dzenRef,
    jackpotMoneySoundRef,
    loseSoundRef, noBetsOnSpotsRef, notEnoughMoneySoundRef,
    pressButtonSoundRef, putSomeBetsSoundRef, spinningRouletteRef,
    winSoundRef, resultsRef, winningMoney
} from '../utilities/sounds'


export class Sound {
    public static playAddChip(voiceTurnedOn: boolean): void {
        addChipSoundRef.play()
    }

    public static playPressButton(voiceTurnedOn: boolean): void {
        pressButtonSoundRef.play()
    }

    public static playChooseChip(voiceTurnedOn: boolean): void {
        chooseChipSoundRef.play()
    }

    public static playJackpotMoney(voiceTurnedOn: boolean): void {
        jackpotMoneySoundRef.play()
    }

    public static playLose(voiceTurnedOn: boolean): void {
        loseSoundRef.play()
    }

    public static playWin(voiceTurnedOn: boolean): void {
        winSoundRef.play().finally(() =>
            Sound.playJackpotMoney(voiceTurnedOn))
    }

    public static playPutBets(voiceTurnedOn: boolean): void {
        putSomeBetsSoundRef.play()
    }

    public static playNotEnoughMoney(voiceTurnedOn: boolean): void {
        notEnoughMoneySoundRef.play()
    }

    public static playNoBets(voiceTurnedOn: boolean): void {
        noBetsOnSpotsRef.play()
    }

    public static playDzen(voiceTurnedOn: boolean): void {
        dzenRef.play()
    }

    public static playSpinningRoulette(voiceTurnedOn: boolean): void {
        spinningRouletteRef.play()
    }

    public static playResultAnnouncement(voiceTurnedOn: boolean, result: number): void {
        resultsRef[result].play()
    }

    public static playWinningMoney(): void {
        winningMoney.play()
    }

    public static stopWinningMoney(): void {
        winningMoney.pause()
    }
}