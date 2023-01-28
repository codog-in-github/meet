import Stage from './Stage.class'
import { rect } from './config.type'
import Controller from './Controller.class'

export default class Meet {
    protected root: HTMLElement
    protected stages: Stage[] = []
    protected currentStage: number | null = null
    public controller: Controller = new Controller()

    constructor (root: HTMLElement, config?: rect) {
        this.root = root
        if(!root.style.position) {
            root.style.position = 'relative'
        }
    }

    public loadStage(stage: Stage) {
        stage.load(stage.loadingRender).then(stage.render.bind(stage))
        this.root.appendChild(stage.canvas)
        this.stages.push(stage)
        this.currentStage = this.stages.length - 1
    }

    public backStage () {
        if (this.stages.length > 1) {
            if (this.stages[this.stages.length - 1].keepAlife) {

            } else {
                this.stages.shift()
                // this.currentStage -= 1
            }
        } else {
            console.warn(
                'stages is at least 1'
            )
        }
    }
}
