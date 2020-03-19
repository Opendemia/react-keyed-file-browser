import React from 'react'
import Moment from 'moment'
import { storiesOf } from '@storybook/react'
import FileBrowser, { FileRenderers, FolderRenderers, Groupers, Icons } from '../src'
import './stories'

storiesOf('FileBrowser', module)
  .add('Simple Flat & Read-Only Example', () => (
    <FileBrowser
      files={[
        {
          key: 'animals/',
          modified: +Moment().subtract(1, 'hours'),
          size: 0,
          citationID: "1234"
        },
        {
          key: 'animals/dog.png',
          modified: +Moment().subtract(1, 'hours'),
          size: 0,
          used: true,
          course: "test",
          flag: {"Pink": "test"}
        },
        {
          key: 'cat.png',
          modified: +Moment().subtract(1, 'hours'),
          size: 1.5 * 1024 * 1024,
          used: true,
          citationID: "1234"
        },
        {
          key: 'kitten.png',
          modified: +Moment().subtract(3, 'days'),
          size: 545 * 1024,
          used: true,
          course: "test",
          citationID: "1235",
          flag: {"Pink": "Test"}
        },
        {
          key: 'elephant.png',
          modified: +Moment().subtract(3, 'days'),
          size: 52 * 1024,
          used: true,
          course: "test"
        }
      ]}
      citations ={[
        {
          citationId: "1234",
          quotes:[{quote: "Test", comment: "new comment"}]
        },
        {
          citationId: "1235",
          quotes:[{quote: "Test"}]
        }
      ]}
      onUsedChange={(event) => {console.log(event)}}
    />
  ))
  .add('Different Renderers and Groupers', () => (
    <FileBrowser
      icons={Icons.FontAwesome(4)}
      files={[
        {
          key: 'cat.js',
          modified: +Moment().subtract(1, 'hours'),
          size: 1.5 * 1024 * 1024, 
          used: true
        },
        {
          key: 'kitten.png',
          modified: +Moment().subtract(3, 'days'),
          size: 545 * 1024,
          used: true
        },
        {
          key: 'elephant.png',
          modified: +Moment().subtract(3, 'days'),
          size: 52 * 1024,
          used: true
        },
        {
          key: 'dog.png',
          modified: +Moment().subtract(1, 'hours'),
          size: 1.5 * 1024 * 1024,
          used: true
        },
        {
          key: 'turtle.png',
          modified: +Moment().subtract(3, 'months'),
          size: 545 * 1024,
          used: true
        },
        {
          key: 'gecko.png',
          modified: +Moment().subtract(2, 'days'),
          size: 52 * 1024,
          used: true
        },
        {
          key: 'centipede.png',
          modified: +Moment().subtract(0.5, 'hours'),
          size: 1.5 * 1024 * 1024,
          used: true
        },
        {
          key: 'possum.png',
          modified: +Moment().subtract(32, 'days'),
          size: 545 * 1024,
          used: true
        },
      ]}
      renderStyle="list"
      headerRenderer={null}
      group={Groupers.GroupByModifiedRelative}
      fileRenderer={FileRenderers.ListThumbnailFile}
      folderRenderer={FolderRenderers.ListThumbnailFolder}
    />
  ))
  .add('Group By Folder', () => (
    <FileBrowser
      icons={Icons.FontAwesome(4)}
      files={[
        {
          key: 'animals/',
          modified: +Moment().subtract(1, 'hours'),
          size: 0,
          citationID: "1234"
        },
        {
          key: 'animals/dog.png',
          modified: +Moment().subtract(1, 'hours'),
          size: 0,
          used: true,
          course: "test",
          flag: {"color": "Pink"}
        },
        {
          key: 'cat.png',
          modified: +Moment().subtract(1, 'hours'),
          size: 1.5 * 1024 * 1024,
          used: true,
          citationID: "1234"
        },
        {
          key: 'kitten.png',
          modified: +Moment().subtract(3, 'days'),
          size: 545 * 1024,
          used: true,
          course: "test",
          citationID: "1235",
          flag: {"color": "Red"}
        },
        {
          key: 'elephant.png',
          modified: +Moment().subtract(3, 'days'),
          size: 52 * 1024,
          used: true,
          course: "test"
        }
      ]}
      citations ={[
        {
          citationId: "1234",
          quotes:[{quote: "Test", comment: "new comment"}]
        },
        {
          citationId: "1235",
          quotes:[{quote: "Test"}]
        }
      ]}
      renderStyle="list"
      onDownloadFile={() => {}}
      headerRenderer={null}
      group={Groupers.GroupByFolder}
      fileRenderer={FileRenderers.ListThumbnailFile}
      folderRenderer={FolderRenderers.ListThumbnailFolder}
      onUsedChange={(event) => {console.log(event)}}
    />
  ))
