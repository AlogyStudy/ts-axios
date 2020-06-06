import { AxiosRequestConfig } from "../types";
import { isPlainObject, deepMerge } from "../helpers/util";

const starts = Object.create(null)

const startKeysFromVal2 = ['url', 'params', 'data']

const startKeysDeepMerge = ['headers', 'auth']

startKeysFromVal2.map(key => {
    starts[key] = fromValu2Strat
})

startKeysDeepMerge.map(key => {
    starts[key] = deepMergeStart
})

export default function mergetConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig {
    if (!config2) {
        config2 = {}
    }
    const config = Object.create(null)

    for (let key in config2) {
        mergetFiled(key)
    }

    for (let key in config1) {
        if (!config2[key]) {
            mergetFiled(key)
        }
    }

    function mergetFiled(key: string): void {
        const strat = starts[key] || defaultStart
        config[key] = strat(config1[key], config2![key])
    }

    return config
}

/**
 * 默认策略，优先取value2中的值
 * @param val1 
 * @param val2 
 */
function defaultStart(val1: any, val2: any): any {
    return typeof val2 !== 'undefined' ? val2 : val1
}

/**
 * 只取val2中的配置
 * @param val1 
 * @param val2 
 */
function fromValu2Strat(val1: any, val2: any): any {
    if (typeof val2 !== 'undefined') return val2
}

/**
 * 深度合并
 * @param val1 
 * @param val2 
 */
function deepMergeStart(val1: any, val2: any): any {
    if (isPlainObject(val2)) {
        return deepMerge(val1, val2)
    } else if (typeof val2 !== 'undefined') {
        return val2
    } else if (isPlainObject(val1)) {
        return deepMerge(val1)
    } else if (typeof val1 !== 'undefined') {
        return val1
    }
}
