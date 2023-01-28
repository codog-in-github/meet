
export class ImageAsset implements Asset {

    private url: string = ''
    public result: HTMLImageElement | null = null

    constructor (url: string) {
        this.url = url
    }

    load ():Promise<HTMLImageElement> {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const img: HTMLImageElement = new Image()
            img.onload = () => {
                this.result = img
                resolve(img)
            }
            img.onerror = e => {
                reject(e)
            }
            img.src = this.url
        })
    }
}

export interface Asset {
    result: any
    load () : Promise<any>
}