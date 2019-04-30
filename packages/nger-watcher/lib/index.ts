import { watch } from 'chokidar'
export function watcher(path: string) {
    watch(path).on('all', (event, path) => {
        console.log({ event, path })
        delete require.cache[path];
        require(path)
    })
}
