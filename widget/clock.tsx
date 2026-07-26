import { createPoll } from "ags/time"

export default function launcher() {
  const clock = createPoll("", 1000, "date '+%H:%M'");
  return (
    <label label={clock} class={"clock"} />
  )
}
