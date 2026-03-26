
export * from "@Protocol/channels/main/settings/constants";

export enum CAP {
    PASSWORD_SECURITY = 1,
    RFX7,
    JPEG,
    MULTI_CODEC,
    EXTENDED_SURFACE,
    PROXY,
    COMPOSE,
}


export enum Events {
    //status 
    ERROR = 'error',
    DISCONNECT = 'disconnect',
    //connection
    CONNECT = 'connect',
    CAPABILITIES = 'capabilities',
    SECURITY_PASSWORD = 'security.password',
    SECURITY_NONE = 'security.none',
    //settings
    LOCAL_SETTINGS_UPDATE = "localSettings.update",
    LOCAL_SETTINGS_WASM  = 'localSettings.wasm',
    LOCAL_SETTINGS_MOUSE_QUANTUM = 'localSettings.mouseQuantum',
    LOCAL_SETTINGS_IGNORE_FRAME = 'localSettings.ignoreFrame',
    LOCAL_SETTINGS_RESIZE = 'localSettings.resize',
    LOCAL_SETTINGS_RESIZE_CANVAS = 'localSettings.resizeCanvas',
    SETTINGS_UPDATE = 'settings.update',
    SETTINGS_GEOMETRY = 'settings.geometry',
    SETTINGS_KEYBOARD = 'settings.keyboard',
    SETTINGS_NETWORK_AUTODETECT = 'settings.networkAutodetect',
    SETTINGS_COMPRESSION = 'settings.compression',
    SETTINGS_FRAME_RATE = 'settings.frameRate',
    SETTINGS_FRAME_WINDOW = 'settings.frameWindow',
    SETTINGS_SCALING = 'settings.scaling',
    SETTINGS_BIG_BLOCK_IMAGE_FORMAT = 'settings.bigBlockImageFormat',
    SETTINGS_SMALL_BLOCK_IMAGE_FORMAT = 'settings.smallBlockImageFormat',
    SETTINGS_BIG_BLOCK_SIZE = 'settings.bigBlockMinimumSize',
    SETTINGS_HIGH_QUALITY_UPGRADES = 'settings.highQualityUpgrades',
    //mouse
    MOUSE_DOWN = 'mouse.down',
    MOUSE_UP = 'mouse.up',
    MOUSE_MOVE = 'mouse.move',
    MOUSE_WHEEL = 'mouse.wheel',

    CLIENTCOMM = 'clientcomm',
    CLIPBOARD = 'clipboard',

}