class ImageAsset {
    constructor(url) {
        this.url = '';
        this.result = null;
        this.url = url;
    }
    load() {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.result = img;
                resolve(img);
            };
            img.onerror = e => {
                reject(e);
            };
            img.src = this.url;
        });
    }
}

class Controller {
    constructor() {
        this.eventsHandlers = new Map();
        const keydownEvents = ['keyup', 'keydown'];
        keydownEvents.forEach(name => {
            window.addEventListener(name, e => {
                const eventsHandlers = this.eventsHandlers.get(e.code);
                if (eventsHandlers && eventsHandlers.length > 0) {
                    eventsHandlers.map(callback => callback(name, e));
                }
            });
        });
    }
    on(key, callback) {
        const handlers = this.eventsHandlers.get(key);
        if (handlers) {
            handlers.push(callback);
        }
        else {
            this.eventsHandlers.set(key, [callback]);
        }
    }
    off(key, callback) {
        const handlers = this.eventsHandlers.get(key);
        if (handlers) {
            const index = handlers.findIndex(cb => cb === callback);
            if (index !== -1) {
                handlers.slice(index, 1);
            }
        }
    }
}

class Meet {
    constructor(root, config) {
        this.stages = [];
        this.currentStage = null;
        this.controller = new Controller();
        this.root = root;
        if (!root.style.position) {
            root.style.position = 'relative';
        }
    }
    loadStage(stage) {
        stage.load(stage.loadingRender).then(stage.render.bind(stage));
        this.root.appendChild(stage.canvas);
        this.stages.push(stage);
        this.currentStage = this.stages.length - 1;
    }
    backStage() {
        if (this.stages.length > 1) {
            if (this.stages[this.stages.length - 1].keepAlife) ;
            else {
                this.stages.shift();
                // this.currentStage -= 1
            }
        }
        else {
            console.warn('stages is at least 1');
        }
    }
}

class Stage {
    constructor(config) {
        this.canvas = document.createElement('canvas');
        this.lifetime = Stage.LIFETIME_ONLOAD;
        this.keepAlife = false;
        this.singleton = false;
        this.id = null;
        this.syncRender = true;
        this.meet = null;
        this.images = new Map();
        if (!config) {
            config = this.defaultConfg();
        }
        let c = Object.assign({}, config);
        for (const key in Stage.defaultConfg) {
            if (config[key] !== null) {
                c[key] = config[key];
            }
            else if (Stage.defaultConfg[key] !== null) {
                c[key] = Stage.defaultConfg[key];
            }
        }
        this.config = c;
        const ctx = this.canvas.getContext('2d');
        if (ctx) {
            this.ctx = ctx;
        }
        else {
            throw new Error('getContext2d failt');
        }
    }
    mount(meet) {
        this.meet = meet;
        this.meet.loadStage(this);
    }
    is(id) {
        return this.id === id;
    }
    load(render) {
        render.apply(this);
        const assets = [];
        for (const asset of this.images.values()) {
            assets.push(asset.load());
        }
        return Promise.all(assets);
    }
    defaultConfg() {
        return {
            w: 500,
            h: 500,
            l: 0,
            t: 0,
        };
    }
}
Stage.defaultConfg = {
    w: 500,
    h: 500,
    l: 0,
    t: 0,
};
Stage.LIFETIME_ONLOAD = 0;
Stage.LIFETIME_LOADED = 1;

class MainStage extends Stage {
    constructor() {
        super();
        this.id = 'main';
        this.images.set('name', new ImageAsset('./n_jl.png'));
    }
    loadingRender() { }
    render() {
        const asset = this.images.get('name');
        this.ctx.drawImage(asset === null || asset === void 0 ? void 0 : asset.result, 0, 0);
    }
}
const div = document.getElementById('app');
if (div) {
    div.style.height = '500px';
    div.style.width = '500px';
    const meet = new Meet(div);
    const s = new MainStage();
    s.mount(meet);
}
