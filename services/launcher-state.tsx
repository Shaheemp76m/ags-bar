import GObject from "gi://GObject"

const LauncherState = GObject.registerClass({
  Properties: {
    "is-open": GObject.ParamSpec.boolean(
      "is-open",
      "is-open",
      "",
      GObject.ParamFlags.READWRITE,
      false,
    ),
  },
}, class LauncherState extends GObject.Object {
  private _isOpen = false
  private _selectedindex = 0
  get isOpen() {
    return this._isOpen
  }
  set isOpen(value: boolean) {
    if (this._isOpen === value) return
    this._isOpen = value
    this.notify("is-open")
  }
  toggle() {
    this.isOpen = !this.isOpen
  }
})

const launcherState = new LauncherState()
export default launcherState
