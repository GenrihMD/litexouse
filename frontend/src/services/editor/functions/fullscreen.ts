export function toggleFullscreen(elem: HTMLElement) {
    if (!document.fullscreenElement) {
        elem.requestFullscreen()
            .catch((err: Error) => {
                console.warn(
                    `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
                );
            });
    } else {
        document.exitFullscreen();
    }
}




