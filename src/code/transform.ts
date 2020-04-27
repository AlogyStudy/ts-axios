import { AxiosTransformer } from "../types";

export default function transfrom(data: any, headers: any, fns?: AxiosTransformer | AxiosTransformer[] ) {
    if (!fns) {
        return data
    }
    if (!Array.isArray(fns)) {
        fns = [fns]
    }
    fns.map(fn => {
        data = fn(data, headers) // 管道式链式调用
    })
    return data
}
