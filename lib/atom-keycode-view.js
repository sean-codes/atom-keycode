'use babel';

export default class AtomKeycodeView {

  constructor(serializedState) {
    // Create root element
   //  var statusBarRight = document.getElementsByClassName('status-bar-right')[0]
   //  var button = `
   //    <div class="icon icon-keyboard" id="atom-keycode-btn"></div>
   //  `
   //  this.element.appendChild(message);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
