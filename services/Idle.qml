pragma Singleton

import Quickshell
import Quickshell.Io
import QtQuick

Singleton {
    id: root

    property bool inhibitIdle: false

    function toggleIdle(): void {
        inhibitIdle = !inhibitIdle;

        if (inhibitIdle) {
            inhibitIdleProc.running = true;
        } else {
            inhibitIdleProc.running = false;
        }
    }

    Process {
        id: inhibitIdleProc
        running: root.inhibitIdle
        command: [`${Quickshell.shellRoot}/assets/inhibit-idle.py`]
    }
}
