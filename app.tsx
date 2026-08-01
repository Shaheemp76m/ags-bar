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
          namespace="agsbar"
          exclusivity={Astal.Exclusivity.EXCLUSIVE}
          visible hexpand anchor={TOP | LEFT | RIGHT}
          layer={Astal.Layer.TOP}>
          <box hexpand valign={Gtk.Align.CENTER}>
            <box>
              <Archlogo />
            </box>
            <box hexpand spacing={4} halign={Gtk.Align.CENTER}>
              <Clock />
              <Workspaces />
              <Battery />
            </box>
            <box halign={Gtk.Align.END}>
              <Wifi />
            </box>
          </box>
        </window>
        <Launcher />
      </>
    )
  }
})
