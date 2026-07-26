import Hyprland from "gi://AstalHyprland"
import { createBinding } from "gnim"

export default function Battery() {
  const hyprland = Hyprland.get_default()
  const focusedworkspace = createBinding(hyprland, "focusedWorkspace")
  const activeworkspace = focusedworkspace.as(
    ws => ws.get_id()
  )
  const ws1class = activeworkspace.as(
    id => id === 1 ? "workspace-active" : "workspace-buttons"
  )
  const ws2class = activeworkspace.as(
    id => id === 2 ? "workspace-active" : "workspace-buttons"
  )
  const ws3class = activeworkspace.as(
    id => id === 3 ? "workspace-active" : "workspace-buttons"
  )
  const ws4class = activeworkspace.as(
    id => id === 4 ? "workspace-active" : "workspace-buttons"
  )
  const ws5class = activeworkspace.as(
    id => id === 5 ? "workspace-active" : "workspace-buttons"
  )
  return (
    <box class={"workspaces"} spacing={2} visible>
      <button class={ws1class}>
        <label label={"1"} />
      </button>
      <button class={ws2class}>
        <label label={"2"} />
      </button>
      <button class={ws3class}>
        <label label={"3"} />
      </button>
      <button class={ws4class}>
        <label label={"4"} />
      </button>
      <button class={ws5class}>
        <label label={"5"} />
      </button>
    </box>
  )
}
