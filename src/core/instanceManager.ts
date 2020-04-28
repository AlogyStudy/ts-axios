import { ResolvedFn, RejectedFn } from '../types'

interface Intercepotr<T> {
    resolved: ResolvedFn<T>
    rejected?: RejectedFn
}

export default class InterfaceManager<T> {
    private interceptors: Array<Intercepotr<T> | null>

    constructor() {
        this.interceptors = []
    }

    use(resolved: ResolvedFn<T>, rejected: RejectedFn): number {
        this.interceptors.push({
            resolved,
            rejected
        })
        return this.interceptors.length - 1
    }

    forEach(fn: (interceptor: Intercepotr<T>) => void) {
        this.interceptors.forEach(interceptor => {
            if (interceptor !== null) {
                fn(interceptor)
            }
        })
    }

    eject(id: number) {
        if (this.interceptors[id]) {
            this.interceptors[id] = null
        } 
    }
}
