type Data = {
    link: string,
    title: string
}

const IMAGE_BLOCK_HEIGHT: number = 200

const LoadFromJSON = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok)
        console.log(new Error(`Error`))
    else
        return await response.json()
}

const ImageBlock = (newImage: HTMLImageElement, title: string): HTMLDivElement => {

    const appImageBlock: HTMLDivElement = document.createElement('div')
    appImageBlock.classList.add('app__image-block')

    const appImageBlockSpan: HTMLSpanElement = document.createElement('span')
    appImageBlockSpan.classList.add('app__image-block-description')
    appImageBlockSpan.textContent = title.toString()

    appImageBlock.appendChild(newImage)
    appImageBlock.appendChild(appImageBlockSpan)

    return appImageBlock
}

const RenderPhotos = (array: Data[], container: HTMLDivElement): void => {
    array.sort(() => Math.random() - 0.5)
    array.forEach((item: Data) => {
        const newImage: HTMLImageElement = new Image()
        newImage.src = item.link
        newImage.alt = item.title
        newImage.classList.add('app__image-block-img')
        newImage.style.width = (newImage.width / (newImage.height / IMAGE_BLOCK_HEIGHT)).toString() + 'px'
        newImage.style.height = IMAGE_BLOCK_HEIGHT.toString() + 'px'

        newImage.onload = () => container.insertAdjacentElement('beforeend', ImageBlock(newImage, item.title))
    })
}

const Run = (rawData, container: HTMLDivElement): void => rawData.then((arr: Data[]) => RenderPhotos(arr, container))


const Init = (): void => {
    const imagesContainer: HTMLDivElement = document.getElementById('app__images') as HTMLDivElement,
        DataURL: string = 'database.json'

    Run(LoadFromJSON(DataURL), imagesContainer)
}


document.addEventListener('DOMContentLoaded', Init)

