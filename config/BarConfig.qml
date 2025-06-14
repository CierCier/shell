pragma Singleton
import QtQuick
import Quickshell

Singleton {
    id: root

    readonly property Sizes sizes: Sizes {}
    readonly property Workspaces workspaces: Workspaces {}
    readonly property Clock clock: Clock {}

    component Sizes: QtObject {
        property int innerHeight: 30
        property int windowPreviewSize: 200
        property int trayMenuWidth: 300
        property int batteryWidth: 200
    }

    component Workspaces: QtObject {
        // property string label: "󰫣 "
        // property string occupiedLabel: "󰫢 "
        // property string activeLabel: "󰫢 "

        property int shown: 5
        property bool rounded: true
        property bool activeIndicator: true
        property bool occupiedBg: false
        property bool showWindows: false
        property bool activeTrail: true
    }

    component Clock: QtObject {
        property bool use24HourFormat: true
        property string hour24Format: "hh\nmm"
        property string hour12Format: "hh\nmm\naP"
    }
}
