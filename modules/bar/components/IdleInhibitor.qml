import "root:/widgets"
import "root:/services"
import "root:/utils"
import "root:/config"

import QtQuick
import Quickshell

MaterialIcon {
    text: Idle.inhibitIdle ? "visibility" : "visibility_off"
    color: Idle.inhibitIdle ? Colours.palette.m3onSurface : Colours.palette.m3outlineVariant
    font.bold: true
    font.pointSize: Appearance.font.size.normal

    StateLayer {
        anchors.fill: undefined
        anchors.centerIn: parent
        anchors.horizontalCenterOffset: 1

        implicitWidth: parent.implicitHeight + Appearance.padding.small * 2
        implicitHeight: implicitWidth

        radius: Appearance.rounding.full

        function onClicked(): void {
            Idle.toggleIdle();
        }
    }
}
