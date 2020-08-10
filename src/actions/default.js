import React from 'react'
import PropTypes from 'prop-types'

const Actions = (props) => {
  const {
    selectedItems,
    isFolder,
    icons,
    nameFilter,

    canCreateFolder,
    onCreateFolder,

    canRenameFile,
    onRenameFile,

    canRenameFolder,
    onRenameFolder,

    canDeleteFile,
    onDeleteFile,

    canDeleteFolder,
    onDeleteFolder,

    canDownloadFile,
    onDownloadFile,

    onCreateSource,

  } = props

  /** @type any */
  let actions;

  // adding an additional action, add new citation
  if (!nameFilter) {
    actions = (
        <button
          onClick={onCreateSource}
          className="btn btn-success btn-block btn-file"
        >
          {icons.Add}
          &nbsp;New Source {selectedItems.length >0 ? <span>testing</span>}
        </button>
    )
  }


  //else {
  //     if (isFolder && canCreateFolder && !nameFilter) {
  //       actions.push(
  //         <li key="action-add-folder">
  //           <a
  //             onClick={onCreateFolder}
  //             href="#"
  //             role="button"
  //           >
  //             {icons.Folder}
  //             &nbsp;Add Subfolder
  //           </a>
  //         </li>
  //       )
  //     }


  if (actions) {
    actions = (<div className="item-actions col-12">{actions}</div>)
  } else {
    actions = (<ul className="item-actions">&nbsp;</ul>)
  }

  return actions
}

Actions.propTypes = {
  selectedItems: PropTypes.arrayOf(PropTypes.object),
  isFolder: PropTypes.bool,
  icons: PropTypes.object,
  nameFilter: PropTypes.string,

  canCreateFolder: PropTypes.bool,
  onCreateFolder: PropTypes.func,

  canRenameFile: PropTypes.bool,
  onRenameFile: PropTypes.func,

  canRenameFolder: PropTypes.bool,
  onRenameFolder: PropTypes.func,

  canDeleteFile: PropTypes.bool,
  onDeleteFile: PropTypes.func,

  canDeleteFolder: PropTypes.bool,
  onDeleteFolder: PropTypes.func,

  canDownloadFile: PropTypes.bool,
  onDownloadFile: PropTypes.func,

  canAddSource: PropTypes.bool,
  onCreateSource: PropTypes.func,
}

Actions.defaultProps = {
  selectedItems: [],
  isFolder: false,
  icons: {},
  nameFilter: '',

  canCreateFolder: false,
  onCreateFolder: null,

  canRenameFile: false,
  onRenameFile: null,

  canRenameFolder: false,
  onRenameFolder: null,

  canDeleteFile: false,
  onDeleteFile: null,

  canDeleteFolder: false,
  onDeleteFolder: null,

  canDownloadFile: false,
  onDownloadFile: null,

  onCreateSource: null,
}

export default Actions
