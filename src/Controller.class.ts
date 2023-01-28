
export default class Controller  {
    private eventsHandlers: Map<string, handler[]> = new Map()

    constructor () {
        const keydownEvents: Array<'keyup' | 'keydown'> = ['keyup', 'keydown']
        keydownEvents.forEach(name => {
            window.addEventListener(name, e => {
                const eventsHandlers = this.eventsHandlers.get(e.code)
                if(eventsHandlers && eventsHandlers.length > 0) {
                    eventsHandlers.map(callback => callback(name, e))
                }
            })
        })

    }

    on (key: string, callback: handler ): void {
        const handlers = this.eventsHandlers.get(key)
        if(handlers) {
            handlers.push(callback)
        } else {
            this.eventsHandlers.set(key, [ callback ])
        }
    }

    off (key: string, callback: handler) {
        const handlers = this.eventsHandlers.get(key)
        if(handlers) {
            const index = handlers.findIndex(cb => cb === callback)
            if(index !== -1) {
                handlers.slice(index, 1)
            }
        }
    }
}

type handler = (type: string, event?: KeyboardEvent) => void