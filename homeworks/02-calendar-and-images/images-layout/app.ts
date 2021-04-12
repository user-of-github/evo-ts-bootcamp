type Data = {
    link: string,
    description: string
}


const LoadFromJSON = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok)
        console.log(new Error(`Error`))
    else
        return await response.json()
}

const RenderPhotos = (array: Data[], container: HTMLElement) => {
    array.forEach((item: Data) => {
        container.textContent += item.link.toString()
    })
}

const Run = (rawData, container: HTMLElement) => rawData.then((arr: Data[]) => RenderPhotos(arr, container))

const Init = (): void => {
    const imagesContainer: HTMLElement = document.getElementById('app__images')
    const DataURL: string = 'database.json'
    Run(LoadFromJSON(DataURL), imagesContainer)
}


Init()

