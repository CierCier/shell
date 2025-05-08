import "root:/services"
import "root:/config"
import QtQuick
import QtQuick.Shapes

Shape {
    id: root

    required property Item wrapper
    readonly property real rounding: BorderConfig.rounding
    readonly property real roundingX: Math.min(rounding, wrapper.width / 2)
    readonly property real wrapperWidth: wrapper.width - 1 // Pixel issues :sob:

    preferredRendererType: Shape.CurveRenderer
    opacity: Colours.transparency.enabled ? Colours.transparency.base : 1

    ShapePath {
        strokeWidth: -1
        fillColor: BorderConfig.colour

        startX: root.wrapperWidth

        PathArc {
            relativeX: -root.roundingX
            relativeY: root.rounding
            radiusX: root.roundingX
            radiusY: root.rounding
        }
        PathLine {
            x: root.roundingX
            relativeY: 0
        }
        PathArc {
            relativeX: -root.roundingX
            relativeY: root.rounding
            radiusX: root.roundingX
            radiusY: root.rounding
            direction: PathArc.Counterclockwise
        }
        PathLine {
            y: root.wrapper.height - root.rounding * 2
        }
        PathArc {
            relativeX: root.roundingX
            relativeY: root.rounding
            radiusX: root.roundingX
            radiusY: root.rounding
            direction: PathArc.Counterclockwise
        }
        PathLine {
            x: root.wrapperWidth - root.roundingX
            relativeY: 0
        }
        PathArc {
            relativeX: root.roundingX
            relativeY: root.rounding
            radiusX: root.roundingX
            radiusY: root.rounding
        }

        Behavior on fillColor {
            ColorAnimation {
                duration: Appearance.anim.durations.normal
                easing.type: Easing.BezierSpline
                easing.bezierCurve: Appearance.anim.curves.standard
            }
        }
    }
}
