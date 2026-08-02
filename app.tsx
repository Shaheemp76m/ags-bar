import app from "ags/gtk4/app"
import style from "./style.scss"
import { Astal, Gtk } from "ags/gtk4"
import Battery from "./widget/battery"
import Launcher from "./widget/launcher"
import Workspaces from "./widget/workspaces"
import Wifi from "./widget/wifi"
import Clock from "./widget/clock"
import Archlogo from "./widget/archlogo"
import launcherState from "./services/launcher-state"

app.start({
  css: style,
  requestHandler(args: string[], response) {
    print(args)
    if (args[0] === "launcher") (
      launcherState.isOpen = true
    )
    response("ok")
  },
  main() {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;
    return (
      <>
        <window
          namespace={"agsbar"}
          exclusivity={Astal.Exclusivity.EXCLUSIVE}
          visible hexpand anchor={TOP | LEFT | RIGHT}
          layer={Astal.Layer.TOP}>
          <centerbox hexpand>
            <box $type="start">
              <Archlogo />
            </box>
            <box spacing={4} $type="center">
              <Clock />
              <Workspaces />
              <Battery />
            </box>
            <box $type="end">
              <Wifi />
            </box>
          </centerbox>
        </window>
        <Launcher />
      </>
    )
  }
})
