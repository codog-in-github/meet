import { Asset, ImageAsset } from './Asset.class'
import { rect } from './config.type'
import Meet from './Meet.class'

export default abstract class Stage {
    public readonly canvas: HTMLCanvasElement = document.createElement('canvas')
    protected ctx: CanvasRenderingContext2D
    protected lifetime: number = Stage.LIFETIME_ONLOAD
    public readonly keepAlife: boolean = false
    public readonly singleton: boolean = false
    public readonly id: string | null = null
    public readonly syncRender: boolean = true
    protected meet: Meet | null = null

    protected static readonly defaultConfg: rect = {
        w: 500,
        h: 500,
        l: 0,
        t: 0,
    }
    public static readonly LIFETIME_ONLOAD: number = 0
    public static readonly LIFETIME_LOADED: number = 1

    protected config: rect

    protected images: Map<string, ImageAsset> = new Map()

    constructor (config?: rect) {
        if(!config) {
            config = this.defaultConfg()
        }
        let c: rect = { ...config }
        for(const key in Stage.defaultConfg) {
            if(config[key] !== null) {
                c[key] = config[key]
            } else if(Stage.defaultConfg[key] !== null) {
                c[key] = Stage.defaultConfg[key]
            }
        }
        this.config = c
        const ctx = this.canvas.getContext('2d')
        if(ctx) {
            this.ctx = ctx
        } else {
            throw new Error('getContext2d failt')
        }
    }

    public mount (meet: Meet) {
        this.meet = meet
        this.meet.loadStage(this)
    }

    public is (id: string) : boolean {
        return this.id === id
    }

    public load(render: Function): Promise<any> {
        render.apply(this)
        const assets: Promise<any>[] = []
        for(const asset of this.images.values()) {
            assets.push(asset.load())
        }
        return Promise.all(assets)
    }

    abstract loadingRender (): void

    abstract render (): void

    protected defaultConfg (): rect {
        return {
            w: 500,
            h: 500,
            l: 0,
            t: 0,
        }
    }
}
