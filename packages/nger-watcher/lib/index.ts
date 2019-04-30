import { watch } from 'chokidar';
export function watcher(path: string, callback?: (eventName: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir', path: string) => void) {
    watch(path).on('all', (event, path) => {
        delete require.cache[path];
        callback && callback(event, path)
    })
}
