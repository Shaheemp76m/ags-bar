import { Astal, Gdk, Gtk } from "ags/gtk4"
import { createBinding } from "gnim";
import launcherState from "../services/launcher-state";
import Gio from "gi://Gio"

export default function launcher() {
  const { TOP, LEFT } = Astal.WindowAnchor;
  const isOpen = createBinding(launcherState, "is-open")
  const applist = Gio.AppInfo.get_all().filter(app => app.should_show())
  const controller = new Gtk.EventControllerKey()
  let listBox = Gtk.Box
  controller.connect("key-pressed", (_, key) => {
    if (key === Gdk.KEY_Escape) {
      launcherState.isOpen = false
      return true
    }
    if (key === Gdk.KEY_j) {
      listBox.child_focus
      return true
    }
    if (key === Gdk.KEY_k) {
      return true
    }
    return false
  })
  const button: Gtk.Button[] = []
  const appWidgets = applist.map(app => {
    let btn: Gtk.Button
    return (
      <button
        onClicked={() => {
          app.launch([], null)
          launcherState.isOpen = false
        }}
        class={"appbutton"}
        vexpand={false}
        height_request={30}>
        <box class={"application"} spacing={3}>
          <label label={app.get_name()} class={"appname"} />
        </box>
      </button>
    )
  });
  return (
    <window
      class={"appwindow"}
      keymode={Astal.Keymode.EXCLUSIVE}
      anchor={TOP | LEFT}
      visible={isOpen}
      namespace="agsapplauncher"
    >
      {controller}
      <scrolledwindow
        hscrollbarPolicy={Gtk.PolicyType.NEVER}
        vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
        hasFrame={false}
        vexpand
        hexpand
      >
        <box
          $={(self) => listBox = self}
          class={"applauncher"} orientation={Gtk.Orientation.VERTICAL} spacing={3}>
          {appWidgets}
        </box>
      </scrolledwindow>
    </window>
  )
}
