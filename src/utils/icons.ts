import { Apps } from "@/services/apps";
import { Gio } from "astal";
import { Gdk, Gtk } from "astal/gtk4";
import type AstalApps from "gi://AstalApps";

export const osIcons: Record<string, string> = {
    almalinux: "",
    alpine: "",
    arch: "",
    archcraft: "",
    arcolinux: "",
    artix: "",
    centos: "",
    debian: "",
    devuan: "",
    elementary: "",
    endeavouros: "",
    fedora: "",
    freebsd: "",
    garuda: "",
    gentoo: "",
    hyperbola: "",
    kali: "",
    linuxmint: "󰣭",
    mageia: "",
    openmandriva: "",
    manjaro: "",
    neon: "",
    nixos: "",
    opensuse: "",
    suse: "",
    sles: "",
    sles_sap: "",
    "opensuse-tumbleweed": "",
    parrot: "",
    pop: "",
    raspbian: "",
    rhel: "",
    rocky: "",
    slackware: "",
    solus: "",
    steamos: "",
    tails: "",
    trisquel: "",
    ubuntu: "",
    vanilla: "",
    void: "",
    zorin: "",
};

export const weatherIcons: Record<string, string> = {
    warning: "󰼯",
    sunny: "󰖙",
    clear: "󰖔",
    partly_cloudy: "󰖕",
    partly_cloudy_night: "󰼱",
    cloudy: "󰖐",
    overcast: "󰖕",
    mist: "󰖑",
    patchy_rain_nearby: "󰼳",
    patchy_rain_possible: "󰼳",
    patchy_snow_possible: "󰼴",
    patchy_sleet_possible: "󰙿",
    patchy_freezing_drizzle_possible: "󰙿",
    thundery_outbreaks_possible: "󰙾",
    blowing_snow: "󰼶",
    blizzard: "󰼶",
    fog: "󰖑",
    freezing_fog: "󰖑",
    patchy_light_drizzle: "󰼳",
    light_drizzle: "󰼳",
    freezing_drizzle: "󰙿",
    heavy_freezing_drizzle: "󰙿",
    patchy_light_rain: "󰼳",
    light_rain: "󰼳",
    moderate_rain_at_times: "󰖗",
    moderate_rain: "󰼳",
    heavy_rain_at_times: "󰖖",
    heavy_rain: "󰖖",
    light_freezing_rain: "󰙿",
    moderate_or_heavy_freezing_rain: "󰙿",
    light_sleet: "󰙿",
    moderate_or_heavy_sleet: "󰙿",
    patchy_light_snow: "󰼴",
    light_snow: "󰼴",
    patchy_moderate_snow: "󰼴",
    moderate_snow: "󰼶",
    patchy_heavy_snow: "󰼶",
    heavy_snow: "󰼶",
    ice_pellets: "󰖒",
    light_rain_shower: "󰖖",
    moderate_or_heavy_rain_shower: "󰖖",
    torrential_rain_shower: "󰖖",
    light_sleet_showers: "󰼵",
    moderate_or_heavy_sleet_showers: "󰼵",
    light_snow_showers: "󰼵",
    moderate_or_heavy_snow_showers: "󰼵",
    light_showers_of_ice_pellets: "󰖒",
    moderate_or_heavy_showers_of_ice_pellets: "󰖒",
    patchy_light_rain_with_thunder: "󰙾",
    moderate_or_heavy_rain_with_thunder: "󰙾",
    moderate_or_heavy_rain_in_area_with_thunder: "󰙾",
    patchy_light_snow_with_thunder: "󰼶",
    moderate_or_heavy_snow_with_thunder: "󰼶",
};

export const desktopEntrySubs: Record<string, string> = {
    Firefox: "firefox",
};

const categoryIcons: Record<string, string> = {
    WebBrowser: "web",
    Printing: "print",
    Security: "security",
    Network: "chat",
    Archiving: "archive",
    Compression: "archive",
    Development: "code",
    IDE: "code",
    TextEditor: "edit_note",
    Audio: "music_note",
    Music: "music_note",
    Player: "music_note",
    Recorder: "mic",
    Game: "sports_esports",
    FileTools: "files",
    FileManager: "files",
    Filesystem: "files",
    FileTransfer: "files",
    Settings: "settings",
    DesktopSettings: "settings",
    HardwareSettings: "settings",
    TerminalEmulator: "terminal",
    ConsoleOnly: "terminal",
    Utility: "build",
    Monitor: "monitor_heart",
    Midi: "graphic_eq",
    Mixer: "graphic_eq",
    AudioVideoEditing: "video_settings",
    AudioVideo: "music_video",
    Video: "videocam",
    Building: "construction",
    Graphics: "photo_library",
    "2DGraphics": "photo_library",
    RasterGraphics: "photo_library",
    TV: "tv",
    System: "host",
};

export const getAppCategoryIcon = (nameOrApp: string | AstalApps.Application) => {
    const categories =
        typeof nameOrApp === "string"
            ? Gio.DesktopAppInfo.new(`${nameOrApp}.desktop`)?.get_categories()?.split(";") ??
              Apps.fuzzy_query(nameOrApp)[0]?.categories
            : nameOrApp.categories;
    if (categories)
        for (const [key, value] of Object.entries(categoryIcons)) if (categories.includes(key)) return value;
    return "terminal";
};

export const lookupIcon = (name: string) => {
    const display = Gdk.Display.get_default();
    return display ? Gtk.IconTheme.get_for_display(display).has_icon(name) : false;
};
