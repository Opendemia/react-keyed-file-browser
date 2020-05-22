import React from 'react'
import Moment from 'moment'
import { storiesOf } from '@storybook/react'
import { State, Store } from '@sambego/storybook-state'
import FileBrowser, { FileRenderers, FolderRenderers, Groupers, Icons } from '../src'
import './stories'

const files = [
  {
    key: 'animals/',
    modified: +Moment().subtract(1, 'hours'),
    size: 0,
  },
  {
    key: 'animals/dog.png',
    modified: +Moment().subtract(1, 'hours'),
    size: 0,
  },
  {
    key: 'cat.png',
    modified: +Moment().subtract(1, 'hours'),
    size: 1.5 * 1024 * 1024,
  },
  {
    key: 'kitten.png',
    modified: +Moment().subtract(3, 'days'),
    size: 545 * 1024,
  },
  {
    key: 'elephant.png',
    modified: +Moment().subtract(3, 'days'),
    size: 52 * 1024,
  },
]

const store = new Store({ files })

storiesOf('FileBrowser', module)
  .add('Simple Flat & Read-Only Example', () => (
    <FileBrowser
<<<<<<< HEAD
      files={files}
=======
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
          label: {"Pink": "test"}
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
          label: {"Pink": "Test"}
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
>>>>>>> c81a6291d96336141f7774b2f5696365543a03b0
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
      onDownloadFile={() => { }}
      headerRenderer={null}
      group={Groupers.GroupByFolder}
      fileRenderer={FileRenderers.ListThumbnailFile}
      folderRenderer={FolderRenderers.ListThumbnailFolder}
      onUsedChange={(event) => {console.log(event)}}
    />
  ))
  .add('Simple Flat & Read-Only Example With Bulk Actions', () => (
    <State store={store}>
      {state => (
        <FileBrowser
          icons={Icons.FontAwesome(4)}
          onCreateFolder={key => {
            store.set({
              files: store.get('files').concat([{
                key: key,
              }]),
            })
          }}
          onCreateFiles={(files, prefix) => {
            const newFiles = store.get('files').map((file) => {
              let newKey = prefix
              if (prefix !== '' && prefix.substring(prefix.length - 1, prefix.length) !== '/') {
                newKey += '/'
              }
              newKey += file.name
              return {
                key: newKey,
                size: file.size,
                modified: +Moment(),
              }
            })

            const uniqueNewFiles = []
            newFiles.map((newFile) => {
              let exists = false
              state.files.map((existingFile) => {
                if (existingFile.key === newFile.key) {
                  exists = true
                }
              })
              if (!exists) {
                uniqueNewFiles.push(newFile)
              }
            })
            store.set({
              files: store.get('files').concat(uniqueNewFiles),
            })
          }}
          onMoveFolder={(oldKey, newKey) => {
            const newFiles = []
            store.get('files').map((file) => {
              if (file.key.substr(0, oldKey.length) === oldKey) {
                newFiles.push({
                  ...file,
                  key: file.key.replace(oldKey, newKey),
                  modified: +Moment(),
                })
              } else {
                newFiles.push(file)
              }
            })
            store.set({
              files: newFiles,
            })
          }}
          onMoveFile={(oldKey, newKey) => {
            const newFiles = []
            store.get('files').map((file) => {
              if (file.key === oldKey) {
                newFiles.push({
                  ...file,
                  key: newKey,
                  modified: +Moment(),
                })
              } else {
                newFiles.push(file)
              }
            })
            store.set({
              files: newFiles,
            })
          }}
          onRenameFolder={(oldKey, newKey) => {
            const newFiles = []
            store.get('files').map((file) => {
              if (file.key.substr(0, oldKey.length) === oldKey) {
                newFiles.push({
                  ...file,
                  key: file.key.replace(oldKey, newKey),
                  modified: +Moment(),
                })
              } else {
                newFiles.push(file)
              }
            })
            store.set({
              files: newFiles,
            })
          }}
          onRenameFile={(oldKey, newKey) => {
            const newFiles = []
            store.get('files').map((file) => {
              if (file.key === oldKey) {
                newFiles.push({
                  ...file,
                  key: newKey,
                  modified: +Moment(),
                })
              } else {
                newFiles.push(file)
              }
            })
            store.set({
              files: newFiles,
            })
          }}
          onDeleteFolder={folderKeys => {
            const newFiles = []
            store.get('files').map(file => {
              if (!folderKeys.find(folderKey => file.key.substr(0, folderKey.length) === folderKey)) {
                newFiles.push(file)
              }
            })
            store.set({
              files: newFiles,
            })
          }}
          onDeleteFile={fileKeys => {
            store.set({
              files: store.get('files').filter(file => !fileKeys.includes(file.key)),
            })
          }}
          onDownloadFile={fileKeys => {
            console.log('Downloading files: ', fileKeys)
          }}
          files={state.files}
        />
      )}
    </State>
  ))
