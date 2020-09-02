'use babel';

import { CompositeDisposable } from 'atom';

const CLICK_ACTIONS = {
   write: 'write',
   copy: 'copy',
   both: 'both'
}

export default {
   activate(state) {
      this.capture = false
      this.icon = document.createElement('icon')
      this.icon.setAttribute('class', 'inline-block atom-keycode-icon-container')
      this.icon.innerHTML = `
         <icon class="icon icon-keyboard atom-keycode-icon"></icon>
         <icon class="icon atom-keycode-display"></icon>
      `
      
      this.icon.addEventListener('mouseover', () => { this.capture = true })
      this.icon.addEventListener('mouseout', () => { this.capture = false })
      this.icon.addEventListener('click', () => {
         const keyValue = document.getElementsByClassName('atom-keycode-display')[0].innerHTML
         const action = atom.config.get('atom-keycode.clickAction')
         
         if (action === CLICK_ACTIONS.write || action === CLICK_ACTIONS.both) {
            const textEditor = atom.workspace.activePaneContainer.getActiveTextEditor()
            if (textEditor) textEditor.insertText(keyValue)
         }
         
         if (action === CLICK_ACTIONS.copy || action === CLICK_ACTIONS.both) {
            atom.clipboard.write(keyValue)
         }
      })
      document.body.addEventListener('keydown', (e) => {
         if (this.capture) {
            e.preventDefault()
            e.stopPropagation()
         }
         document.getElementsByClassName('atom-keycode-display')[0].innerHTML = e.keyCode
      })
   },
   
   deactivate() {
      this.atomKeycodeView.destroy();
   },

   consumeStatusBar(statusBar) {
      statusBar.addRightTile({ item: this.icon, priority: -1000 })
   }
};
