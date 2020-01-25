import React from "react";
import Moment from "moment";
import ClassNames from "classnames";
import { DragSource, DropTarget } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";

import BaseFile, { BaseFileConnectors } from "./../base-file.js";
import { fileSize } from "./utils.js";

class RawTableFile extends BaseFile {
  render() {
    const {
      isDragging,
      isDeleting,
      isRenaming,
      isOver,
      isSelected,
      action,
      url,
      browserProps,
      connectDragPreview,
      depth,
      size,
      modified,
      used,
      course
    } = this.props;

    const icon =
      browserProps.icons[this.getFileType()] || browserProps.icons.File;
    const inAction = isDragging || action;

    let name;
    if (!inAction && isDeleting) {
      name = (
        <form className="deleting" onSubmit={this.handleDeleteSubmit}>
          <a
            href={url || "#"}
            download="download"
            onClick={this.handleFileClick}
          >
            {icon}
          </a>
          <div>
            <button type="submit">Confirm Deletion</button>
          </div>
        </form>
      );
    } else if (!inAction && isRenaming) {
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
          <td>
            <div class="fac fac-checkbox-o fac-success ">
              <span></span>
              <input
                id={"box-example"+this.getName()}
                type="checkbox"
                name="used"
                value="1"
                style={{ display: "none" }}
                checked={this.props.used}
                onChange={this.handleUsedEdit}
              ></input>
              <label for={"box-example"+this.getName()}></label>
            </div>
          </td>
        </tr>
        {isSelected && this.props.course ? (
          <tr>
            <td>{this.props.course}</td>
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
class TableFile extends RawTableFile {}

export default TableFile;
export { RawTableFile };
