import { Astal, Gdk, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app"
import { createBinding } from "gnim";
import launcherState from "../services/launcher-state";
import Gio from "gi://Gio"

export default function launcher() {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;
  const isOpen = createBinding(launcherState, "is-open")
  const applist = Gio.AppInfo.get_all()
  const controller = new Gtk.EventControllerKey()
  controller.connect("key-pressed", (_, key) => {
    if (key === Gdk.KEY_Escape)
      launcherState.isOpen = false
  })
  const appWidgets = applist.slice(0, 10).map(app => (
    <button
      onClicked={() => {
      app.launch([], null)
      launcherState.isOpen = false
    }} 
      class={"appbutton"}
      vexpand={false}
      height_request={30}>
      <box class={"application"} spacing={4}>
        <image gicon={app.get_icon()} class={"appicon"} pixelSize={30}/>
        <label label={app.get_name()} class={"appname"} />
      </box>
    </button>
  ));
  return (
    <window
      class={"appwindow"}
      anchor={TOP | LEFT}
      visible={isOpen}
      setup={(win) => {
          win.add_controller(controller)
        }}
    >
      <box class={"applauncher"} orientation={Gtk.Orientation.VERTICAL} spacing={3}>
        {appWidgets}
      </box>
    </window>
  )
}
