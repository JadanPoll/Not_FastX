
export enum SETTINGS {
    KEYBOARD = 1,
    GEOMETRY,
    AUTOMATIC_ADJUST,
    COMPRESSION,
    FRAME_RATE,
    FRAME_WINDOW,
    SMALL_BLOCK_FORMAT,
    BIG_BLOCK_FORMAT,
    BIG_BLOCK_MIN_SIZE,
    HIGH_QUALITY_UPGRADES,


}; 
export const DEFAULT_SETTINGS = {
    [SETTINGS.KEYBOARD]: { layout: 0x00000409, type: (navigator.appVersion.indexOf('Mac') !== -1 ) ? 0x00000008 : 0x00000004 },
    [SETTINGS.GEOMETRY]:  { width: window.innerWidth, height: window.innerHeight },
    [SETTINGS.AUTOMATIC_ADJUST]: { enabled: true },
    [SETTINGS.COMPRESSION]: { current: 5 },
    [SETTINGS.FRAME_RATE]: { current: 30 },
    [SETTINGS.FRAME_WINDOW]: { current: 2 },
    [SETTINGS.BIG_BLOCK_FORMAT]: (!('ImageBitmap' in window) || !('createImageBitmap' in window)) ? { codecId: 2 } : { codecId: 3 },
    [SETTINGS.SMALL_BLOCK_FORMAT]: { codecId: 3 },
    [SETTINGS.BIG_BLOCK_MIN_SIZE]: { width: 64, height: 64 },
    [SETTINGS.HIGH_QUALITY_UPGRADES]: { enabled: true }

}; 