import Bar from "@/modules/bar";
import Launcher from "@/modules/launcher";
import NavBar from "@/modules/navbar";
import NotifPopups from "@/modules/notifpopups";
import Osds from "@/modules/osds";
import ScreenCorners, { BarScreenCorners } from "@/modules/screencorners";
import Session from "@/modules/session";
import SideBar from "@/modules/sidebar";
import Calendar from "@/services/calendar";
import Monitors from "@/services/monitors";
import Palette from "@/services/palette";
import Players from "@/services/players";
import Schemes from "@/services/schemes";
import Wallpapers from "@/services/wallpapers";
import { execAsync, idle, timeout, writeFileAsync } from "astal";
import { App } from "astal/gtk3";
import { style } from "config";
import { initConfig, updateConfig } from "config/funcs";

const isLayer = (name: string) =>
    ["base", "mantle", "crust"].includes(name) || name.startsWith("surface") || name.startsWith("overlay");

const applyTransparency = (name: string, hex: string) => {
    if (style.transparency.get() === "off" || !isLayer(name)) return hex;
    const amount = style.transparency.get() === "high" ? 0.58 : 0.78;
    return `color.change(${hex}, $alpha: ${amount})`;
};

const applyVibrancy = (hex: string) => (style.vibrant.get() ? `color.scale(${hex}, $saturation: 40%)` : hex);

const getVars = () => {
    const vars = { light: Palette.get_default().mode === "light", borders: style.borders.get() };
    return Object.entries(vars)
        .map(([k, v]) => `$${k}: ${v}`)
        .join(";");
};

const styleLoader = new (class {
    #running = false;
    #dirty = false;

    async run() {
        this.#dirty = true;
        if (this.#running) return;
        this.#running = true;
        while (this.#dirty) {
            this.#dirty = false;
            await this.#run();
        }
        this.#running = false;
    }

    async #run() {
        const schemeColours = Object.entries(Palette.get_default().colours)
            .map(([name, hex]) => `$${name}: ${applyVibrancy(applyTransparency(name, hex))};`)
            .join("\n");
        await writeFileAsync(`${SRC}/scss/scheme/_index.scss`, `@use "sass:color";\n${getVars()};\n${schemeColours}`);
        App.apply_css(await execAsync(`sass ${SRC}/style.scss`), true);
    }
})();

export const loadStyleAsync = () => styleLoader.run();

App.start({
    instanceName: "caelestia",
    icons: "assets/icons",
    async main() {
        try {
            const now = Date.now();

            await initConfig();

            loadStyleAsync().catch(console.error);
            Palette.get_default().connect("notify::colours", () => loadStyleAsync().catch(console.error));
            Palette.get_default().connect("notify::mode", () => loadStyleAsync().catch(console.error));

            <Launcher />;
            <Osds />;
            <Session />;
            Monitors.get_default().applyAll(m => <NotifPopups monitor={m} />);
            Monitors.get_default().applyAll(m => <SideBar monitor={m} />);
            Monitors.get_default().applyAll(m => <NavBar monitor={m} />);
            Monitors.get_default().applyAll(m => <Bar monitor={m} />);
            Monitors.get_default().applyAll(m => <ScreenCorners monitor={m} />);
            Monitors.get_default().applyAll(m => <BarScreenCorners monitor={m} />);

            // Init services
            timeout(5000, () => {
                idle(() => Schemes.get_default());
                idle(() => Wallpapers.get_default());
                idle(() => Calendar.get_default());
            });

            console.log(`Caelestia started in ${Date.now() - now}ms`);
        } catch (e) {
            console.error(e);
        }
    },
    requestHandler(request, res) {
        if (request === "reload-css") loadStyleAsync().catch(console.error);
        else if (request === "reload-config") updateConfig();
        else if (request.startsWith("show")) App.get_window(request.split(" ")[1])?.show();
        else if (request.startsWith("toggle"))
            App.toggle_window(request.split(" ")[1] + Monitors.get_default().active.id);
        else if (request === "media play-pause") Players.get_default().lastPlayer?.play_pause();
        else if (request === "media next") Players.get_default().lastPlayer?.next();
        else if (request === "media previous") Players.get_default().lastPlayer?.previous();
        else if (request === "media stop") Players.get_default().lastPlayer?.stop();
        else if (request.startsWith("media")) {
            const player = Players.get_default().lastPlayer;
            const key = request.split(" ")[1];
            if (player === null) return res("No media");
            if (key in player) return res(player[key as keyof typeof player]);
            return res(`Invalid key: ${key}`);
        } else if (request.startsWith("brightness")) {
            const value = request.split(" ")[1];
            const num = parseFloat(value) / (value.includes("%") ? 100 : 1);
            if (isNaN(num)) return res("Syntax: brightness <value>[%][+ | -]");
            if (value.includes("+")) Monitors.get_default().active.brightness += num;
            else if (value.includes("-")) Monitors.get_default().active.brightness -= num;
            else Monitors.get_default().active.brightness = num;
        } else return res("Unknown command: " + request);

        console.log(`Request handled: ${request}`);
        res("OK");
    },
});
