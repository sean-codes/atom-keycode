'use babel';

import AtomKeycodeView from './atom-keycode-view';
import { CompositeDisposable } from 'atom';

export default {
  activate(state) {
   this.icon = document.createElement('icon')
   this.icon.setAttribute('class', 'inline-block atom-keycode-icon-container')
   this.icon.innerHTML = `
      <icon class="icon icon-keyboard atom-keycode-icon"></icon>
      <icon class="icon atom-keycode-display"></icon>
   `
   this.icon.addEventListener('click', () => {
      atom.clipboard.write(document.getElementsByClassName('atom-keycode-display')[0].innerHTML)
   })
   document.body.addEventListener('keyup', (e) => {
      document.getElementsByClassName('atom-keycode-display')[0].innerHTML = e.keyCode
   })
  },
  deactivate() {
    this.atomKeycodeView.destroy();
  },

  consumeStatusBar(statusBar){
     statusBar.addRightTile({item: this.icon, priority: -1000})
   }
};
