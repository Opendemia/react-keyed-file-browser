// @ts-nocheck
import React from "react";
import ClassNames from "classnames";
import { DragSource, DropTarget } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";

import BaseFile, { BaseFileConnectors } from "./../base-file.js";
import ReactTooltip from 'react-tooltip'

class RawTableFile extends BaseFile {


  constructor(props) {
    super(props)
    this.state = { isRenaming: false, newName: this.getName() }
  }

  render() {
    const checkboxClasses = this.props.used ? 'fac fac-checkbox-o fac-success ml-2 float-right used1' : 'fac fac-checkbox-o fac-success ml-2 float-right test11'

    const {
      isDragging,
      isOver,
      isSelected,
      action,
      url,
      browserProps,
      connectDragPreview,
      depth,
      fileKey
    } = this.props;

    const icon =
      browserProps.icons[this.getFileType()] || browserProps.icons.File;

    let name

    if (this.state.isRenaming) {
      name = (
        <form className="renaming" onSubmit={this.handleRenameSubmit}>
          {icon}
          <input
            ref={el => {
              this.newNameRef = el;
            }}
            type="text"
            value={this.state.newName}
            onChange={this.handleNewNameChange}
            onBlur={this.handleCancelEdit}
            autoFocus
          />
        </form>
      );
    } else {
      name = (
        <a href={url || "#"} download="download" onClick={this.handleFileClick}>
          {icon}
          {this.getName()}
        </a>
      );
    }

    let draggable = <div>{name}</div>;
    if (typeof browserProps.moveFile === "function") {
      draggable = connectDragPreview(draggable);
    }

    //random number is generated to keep id's unique so check boxes will function correctly
    let randomId = "box-" + this.getName() + "-" + Math.floor(Math.random() * 10000000000)
    let row = (
      <tbody>
        <tr
          className={ClassNames("file", {
            pending: action,
            dragging: isDragging,
            dragover: isOver,
            selected: isSelected
          })}
          onClick={this.handleItemClick}
          onDoubleClick={this.handleItemDoubleClick}
        >
          <td className="name">
            <div style={{ paddingLeft: depth * 16 + "px" }}>{draggable}</div>
          </td>

          {/* <td> 
          { this.props.label &&
            <span className={`mb-1 badge badge-pill badge-${this.props.label}`}> </span> 
          }
        </td> */}

          <td>

            <div className={checkboxClasses}>
              <span></span>
              <input
                id={randomId}
                type="checkbox"
                mytype="styled"
                name="used"
                value="1"
                style={{ display: "none", paddingTop: ".7rem !important" }}
                checked={this.props.used}
                onChange={this.handleUsedEdit}
              />
              <label htmlFor={randomId} />
              <ReactTooltip id="renameFile" className="tooltip tooltip-inner">
              </ReactTooltip>
            </div>

          </td>
          <td>
            <div className="row pl-1">
              <div className={checkboxClasses}>
                <span></span>
                <input
                  id={randomId}
                  type="checkbox"
                  mytype="styled"
                  name="used"
                  value="1"
                  style={{ display: "none", paddingTop: ".7rem !important" }}
                  checked={this.props.used}
                  onChange={this.handleUsedEdit}
                />
                <label htmlFor={randomId} />
                <ReactTooltip id="renameFile" className="tooltip tooltip-inner">
                </ReactTooltip>
              </div>
              <button
                className="btn btn-transparent pr-0"
                onClick={() => { this.setState({ isRenaming: !this.state.isRenaming }) }}
                data-tip data-for="renameFile"
              >
                {browserProps.icons.Rename}
              </button>
              <ReactTooltip id="renameFile" className="tooltip tooltip-inner">
                <span>Rename File</span>
              </ReactTooltip>
              <button
                className="btn btn-transparent pr-0"
                onClick={() => this.handleDeleteSubmit([fileKey])}
                data-tip data-for="deleteFile"
              >
                {browserProps.icons.Delete}
              </button>
              <ReactTooltip id="deleteFile" className="tooltip tooltip-inner">
                <span>Delete File</span>
              </ReactTooltip>
            </div>
          </td>
        </tr>
        {isSelected && this.props.course ? (
          <tr>
            <td style={{ paddingTop: '0rem !important' }}>
              <div style={{ fontWeight: 600, marginLeft: '1rem' }}>Course: {this.props.course}</div>
            </td>
          </tr>
        ) : null}
      </tbody>
    );

    return this.connectDND(row);
  }
}

@DragSource(
  "file",
  BaseFileConnectors.dragSource,
  BaseFileConnectors.dragCollect
)
@DropTarget(
  ["file", "folder", NativeTypes.FILE],
  BaseFileConnectors.targetSource,
  BaseFileConnectors.targetCollect
)
class TableFile extends RawTableFile { }

export default TableFile;
export { RawTableFile };
