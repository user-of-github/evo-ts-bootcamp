import {
    addChipSoundRef,
    chooseChipSoundRef, dzenRef,
    jackpotMoneySoundRef,
    loseSoundRef, noBetsOnSpotsRef, notEnoughMoneySoundRef,
    pressButtonSoundRef, putSomeBetsSoundRef, spinningRouletteRef,
    winSoundRef, resultsRef, winningMoney
} from '../utilities/sounds'


export class Sound {
    public static backgroundAudioRef: HTMLAudioElement | null = null

    public static playAddChip(): void {
        addChipSoundRef.play()
    }

    public static playPressButton(): void {
        pressButtonSoundRef.play()
    }

    public static playChooseChip(): void {
        chooseChipSoundRef.play()
    }

    public static playJackpotMoney(): void {
        jackpotMoneySoundRef.play()
    }

    public static playLose(): void {
        loseSoundRef.play()
    }

    public static playWin(): void {
        winSoundRef.play().finally(() =>
            Sound.playJackpotMoney())
    }

    public static playPutBets(): void {
        putSomeBetsSoundRef.play()
    }

    public static playNotEnoughMoney(): void {
        notEnoughMoneySoundRef.play()
    }

    public static playNoBets(): void {
        noBetsOnSpotsRef.play()
    }

    public static playDzen(): void {
        dzenRef.play()
    }

    public static playSpinningRoulette(): void {
        spinningRouletteRef.play()
    }

    public static playResultAnnouncement(result: number): void {
        resultsRef[result].play()
    }

    public static playWinningMoney(): void {
        winningMoney.play()
    }

    public static stopWinningMoney(): void {
        winningMoney.pause()
    }


    public static backgroundMusicOn(): void {
        if (Sound.backgroundAudioRef !== null) {
            Sound.backgroundAudioRef.volume = 0.66
        }
    }

    public static backgroundMusicOff(): void {
        if (Sound.backgroundAudioRef !== null) {
            Sound.backgroundAudioRef.volume = 0
        }
    }

    public static stopSpinningRouletteSound(): void {
        spinningRouletteRef.pause()
        spinningRouletteRef.currentTime = 0
    }
}
