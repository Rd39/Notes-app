const Notes = require('./notes.js')
const yargs = require('yargs')
const chalk = require('chalk')

yargs.command({
    command: 'add',
    describe: 'Adding a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        Notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'delete',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        Notes.deleteNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'Listing the notes',
    handler() {
        Notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'Reading the note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        Notes.readNote(argv.title)
    }
})

yargs.parse()