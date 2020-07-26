// @ts-nocheck
import React from 'react'
import ClassNames from 'classnames'
import { DragSource, DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

import BaseFolder, { BaseFolderConnectors } from './../base-folder.js'
import { BaseFileConnectors } from './../base-file.js'
import ReactTooltip from 'react-tooltip'

class RawTableFolder extends BaseFolder {

  constructor(props) {
    super(props)

    this.state = { isRenaming: false, newName: this.getName() }
  }


  render() {
    const {
      isOpen, isDragging, isDraft, isOver, isSelected,
      action, browserProps, connectDragPreview, depth, fileKey
    } = this.props

    const icon = browserProps.icons[isOpen ? 'FolderOpen' : 'Folder']

    let name

    if (this.state.isRenaming || isDraft) {
      name = (
        <div>
          <form className="renaming" onSubmit={this.handleRenameSubmit}>
            {icon}
            <input
              type="text"
              ref={el => { this.newNameRef = el }}
              value={this.state.newName}
              onChange={this.handleNewNameChange}
              onBlur={this.handleCancelEdit}
              autoFocus
            />
          </form>
        </div>
      )
    } else {
      name = (
        <div>
          <a onClick={this.toggleFolder}>
            {icon}
            {this.getName()}
          </a>
        </div>
      )
    }

    let draggable = (
      <div>
        {name}
      </div>
    )
    if (typeof browserProps.moveFile === 'function') {
      draggable = connectDragPreview(draggable)
    }

    const folder = (
      <tr
        className={ClassNames('folder', {
          pending: action,
          dragging: isDragging,
          dragover: isOver,
          selected: isSelected,
        })}
        onClick={this.handleFolderClick}
        onDoubleClick={this.handleFolderDoubleClick}
      >
        <td className="name">
          <div style={{ paddingLeft: (depth * 16) + 'px' }}>
            {draggable}
          </div>
        </td>
        <td />
        <td>
          <div className="row pl-1">
            <button
              className="btn btn-transparent pr-0"
              onClick={() => { this.setState({ isRenaming: !this.state.isRenaming }) }}
              data-tip data-for="renameFolder"
            >
              {browserProps.icons.Rename}
            </button>
            <ReactTooltip id="renameFolder" className="tooltip tooltip-inner">
              <span>Rename Folder</span>
            </ReactTooltip>
            <button
              className="btn btn-transparent pr-0"
              onClick={() => this.handleDeleteSubmit([fileKey])}
              data-tip data-for="deleteFolder"
            >
              {browserProps.icons.Delete}
            </button>
            <ReactTooltip id="deleteFolder" className="tooltip tooltip-inner">
              <span>Delete Folder</span>
            </ReactTooltip>
          </div>
        </td>
      </tr>
    )

    return this.connectDND(folder)
  }
}

@DragSource('folder', BaseFolderConnectors.dragSource, BaseFolderConnectors.dragCollect)
@DropTarget(
  ['file', 'folder', NativeTypes.FILE],
  BaseFileConnectors.targetSource,
  BaseFileConnectors.targetCollect
)
class TableFolder extends RawTableFolder { }

export default TableFolder
export { RawTableFolder }
