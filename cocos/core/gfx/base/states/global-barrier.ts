/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

/**
 * @packageDocumentation
 * @module gfx
 */

import { murmurhash2_32_gc } from '../../../utils/murmurhash2_gc';
import { GFXObject, ObjectType, GlobalBarrierInfo } from '../define';

/**
 * @en GFX global barrier.
 * @zh GFX 全局内存屏障。
 */
export class GlobalBarrier extends GFXObject {
    get info (): Readonly<GlobalBarrierInfo> { return this._info; }
    get hash (): number { return this._hash; }

    protected _info: GlobalBarrierInfo = new GlobalBarrierInfo();
    protected _hash = 0;

    constructor (info: GlobalBarrierInfo, hash: number) {
        super(ObjectType.GLOBAL_BARRIER);
        this._info.copy(info);
        this._hash = hash;
    }

    static computeHash (info: GlobalBarrierInfo) {
        let res = 'prev:';
        for (let i = 0; i < info.prevAccesses.length; ++i) {
            res += ` ${info.prevAccesses[i]}`;
        }
        res += 'next:';
        for (let i = 0; i < info.nextAccesses.length; ++i) {
            res += ` ${info.nextAccesses[i]}`;
        }

        return murmurhash2_32_gc(res, 666);
    }
}
