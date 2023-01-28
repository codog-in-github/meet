import { ImageAsset } from './Asset.class'
import Meet from './Meet.class'
import Stage from './Stage.class'


class MainStage extends Stage {
    public readonly id: string = 'main'
    
    constructor () {
        super()
        this.images.set('name', new ImageAsset('./n_jl.png'))
    }

    public loadingRender () {}
    

    public render(): void {
        const asset = this.images.get('name')
        this.ctx.drawImage(asset?.result, 0, 0)
    }
}
const div = document.getElementById('app')
if(div) {
    div.style.height = '500px'
    div.style.width = '500px'
    const meet = new Meet(div)
    const s = new MainStage()
    s.mount(meet)
}
