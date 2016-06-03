var Config = {
};

Config.data = {};
Config.DATA_DIR_NAME = ".pencil";
Config.STENCILS_DIR_NAME = "stencils";
Config.PRIVATE_STENCILS_DIR_NAME = "privateCollection";
Config.CONFIG_FILE_NAME = "config.json";

Config.getDataPath = function () {
    return path.join(os.homedir(), Config.DATA_DIR_NAME);
};

Config.getDataFilePath = function (name) {
    return path.join(Config.getDataPath(), name);
};
Config._save = function () {
    fs.writeFileSync(Config.getDataFilePath(Config.CONFIG_FILE_NAME), JSON.stringify(Config.data, null, 4), "utf8");
};
Config._load = function () {
    var json = fs.readFileSync(Config.getDataFilePath(Config.CONFIG_FILE_NAME), "utf8");
    try {
        Config.data = JSON.parse(json);
    } catch (e) {
        console.error(e);
    }
};

Config.set = function (name, value) {
    Config.data[name] = value;
    Config._save();
    window.globalEventBus.broadcast("config-change", { name: name, value: value });
    return;
};

Config.get = function (name, defaultValue) {
    if (typeof(Config.data[name]) != "undefined") return Config.data[name];
    return defaultValue;
};
Config.getLocale = function () {
};

Config.registerEvent = function () {

}

try {
    fs.mkdirSync(Config.getDataPath());
} catch(e) {
    if ( e.code != 'EEXIST' ) throw e;
}

Config._load();
