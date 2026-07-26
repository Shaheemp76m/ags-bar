import { Gtk } from "ags/gtk4"
import launcherState from "../services/launcher-state"

export default function launcher() {
  return(
    <button
      halign={Gtk.Align.START} 
      class={"archbutton"}
      onClicked={() => launcherState.toggle()}
    >
      <label label="󰣇" />
    </button>
  )
}
