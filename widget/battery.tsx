import AstalBattery from "gi://AstalBattery"
import { Astal, Gtk } from "ags/gtk4"
import { createBinding, createComputed } from "gnim"

export default function Battery() {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;
  const battery = AstalBattery.get_default()
  const percentage = createBinding(battery, "percentage").as(
    p => `${Math.floor(p * 100)}%`
  )
  const batper = createBinding(battery, "percentage")
  const charging = createBinding(battery, "charging")
  const chargingicon = charging.as(c => c ? "󱐋" : "")
  const showBattery = createComputed(
    [batper, charging],
    (batper, charging) => !(batper === 1 && charging)
  )
  return (
    <button class={"battery"} visible={showBattery}>
      <box>
        <label label={chargingicon} class={"chargingicon"} />
        <label label={percentage} class={"batteryper"} />
      </box>
    </button>
  )
}
