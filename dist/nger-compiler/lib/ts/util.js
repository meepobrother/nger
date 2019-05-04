"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mergeVisitors(visitors, that) {
    if (visitors && visitors.length > 0) {
        if (visitors.length === 1) {
            return visitors[0];
        }
        else {
            const newVisitor = {};
            visitors.map(visit => {
                Object.keys(visit).map(key => {
                    // 拿到一个方法
                    const oldMethod = newVisitor[key];
                    const mth = visit[key].bind(that);
                    let newMethod;
                    // 如果老的方法存在
                    if (oldMethod) {
                        newMethod = (...args) => {
                            oldMethod(...args);
                            mth(...args);
                        };
                    }
                    else {
                        newMethod = mth;
                    }
                    newVisitor[key] = newMethod;
                });
            });
            return newVisitor;
        }
    }
    return {};
}
exports.mergeVisitors = mergeVisitors;
