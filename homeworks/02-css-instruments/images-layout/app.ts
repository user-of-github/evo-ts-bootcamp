type Data = {
    link: string,
    title: string
}

const LoadFromJSON = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok)
        console.log(new Error(`Error`))
    else
        return await response.json()
}

const Card = (link: string, title: string): string => (`
    <div class="app__image-block">
        <img class="app__image-block-img" src="${link}" alt="image">
        <span class="app__image-block-description">${title}</span
    </div>
`)

const RenderPhotos = (array: Data[], container: HTMLElement): void =>
    array.forEach((item: Data) =>
        container.insertAdjacentHTML('beforeend', Card(item.link, item.title)))

const Run = (rawData, container: HTMLElement): void => rawData.then((arr: Data[]) => RenderPhotos(arr, container))


const Init = (): void => {
    const imagesContainer: HTMLElement = document.getElementById('app__images')
    const DataURL: string = 'database.json'

    Run(LoadFromJSON(DataURL), imagesContainer)
}


Init()

