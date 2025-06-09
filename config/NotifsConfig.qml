pragma Singleton

import Quickshell
import QtQuick

Singleton {
    readonly property bool expire: true
    readonly property int defaultExpireTimeout: 5000
    readonly property real clearThreshold: 0.3
    readonly property int expandThreshold: 20
    readonly property bool actionOnClick: true
    readonly property Sizes sizes: Sizes {}

    component Sizes: QtObject {
        readonly property int width: 400
        readonly property int image: 42
        readonly property int badge: 16
    }
}
