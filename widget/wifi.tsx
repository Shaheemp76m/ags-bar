import Network from "gi://AstalNetwork"
import { createBinding } from "gnim"

export default function launcher() {
  const network = Network.get_default()
  const wifi = network.wifi
  const ssid = createBinding(wifi, "ssid").as(
    s => s ?? "Disconnected"
  )
  return (
    <box spacing={2}>
      <button class={"signal"}>
        <label label={""} />
      </button>
      <button class={"wifi"}>
        <label label={ssid} class={"ssid"} />
      </button>
    </box>
  )
}
