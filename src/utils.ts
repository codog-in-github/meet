export function deepCopy<T extends Object>(obj: T):T {
    return JSON.parse(JSON.stringify(obj))
}

export function loadImage (path: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img: HTMLImageElement = new Image()
        img.onload = () => {
            resolve(img)
        }
        img.onerror = e => {
            reject(e)
        }
        img.src = path
    })
}

export function loadModule (path: string, isModule: boolean = false) : Promise<any>{
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = path
        script.onload = resolve
        script.onerror = reject
    })
}