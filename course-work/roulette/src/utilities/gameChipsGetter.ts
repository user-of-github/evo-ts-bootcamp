import {Chip} from '../types/Chip'
import {ChipType} from '../types/SingleChip'

export const getGameChips = (): Array<Chip> => [
    {chip: ChipType.CHIP_1, active: true, index: 0},
    {chip: ChipType.CHIP_5, active: false, index: 1},
    {chip: ChipType.CHIP_10, active: false, index: 2},
    {chip: ChipType.CHIP_25, active: false, index: 3},
    {chip: ChipType.CHIP_50, active: false, index: 4},
    {chip: ChipType.CHIP_100, active: false, index: 5}
]
