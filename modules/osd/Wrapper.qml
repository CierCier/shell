import "root:/config"
import QtQuick

Item {
    id: root

    required property bool osdVisible
    required property Item content
    property bool shouldBeVisible

    visible: width > 0
    width: 0

    states: State {
        name: "visible"
        when: root.osdVisible

        PropertyChanges {
            root.width: content.width
            root.shouldBeVisible: true
        }
    }

    transitions: [
        Transition {
            from: ""
            to: "visible"

            SequentialAnimation {
                PropertyAction {
                    target: root
                    property: "shouldBeVisible"
                }
                NumberAnimation {
                    target: root
                    property: "width"
                    duration: Appearance.anim.durations.large
                    easing.type: Easing.BezierSpline
                    easing.bezierCurve: Appearance.anim.curves.emphasizedDecel
                }
            }
        },
        Transition {
            from: "visible"
            to: ""

            SequentialAnimation {
                NumberAnimation {
                    target: root
                    property: "width"
                    duration: Appearance.anim.durations.normal
                    easing.type: Easing.BezierSpline
                    easing.bezierCurve: Appearance.anim.curves.emphasizedAccel
                }
                PropertyAction {
                    target: root
                    property: "shouldBeVisible"
                }
            }
        }
    ]
}
