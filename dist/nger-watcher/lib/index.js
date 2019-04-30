Object.defineProperty(exports, "__esModule", { value: true });
const chokidar_1 = require("chokidar");
function watcher(path, callback) {
    chokidar_1.watch(path).on('all', (event, path) => {
        delete require.cache[path];
        callback && callback(event, path);
    });
}
exports.watcher = watcher;
