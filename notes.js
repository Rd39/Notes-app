const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicatenote = notes.find((note) => note.title === title)
    if (!duplicatenote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.inverse('New Note Added'))
    }
    else {
        console.log(chalk.inverse.red('Duplicate title found'))
    }
}

const deleteNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title != title)
    if (notes.length === notesToKeep.length) {
        const msg = chalk.red.inverse('No Note found!')
        console.log(msg)
    }
    else {
        const msg = chalk.green.inverse('Note Deleted!')
        console.log(msg)
        saveNotes(notesToKeep)
    }
}

const listNotes = () => {
    console.log(chalk.bold('Your Notes:'))
    const notes = loadNotes()
    var i = 1
    notes.forEach((note) => {
        console.log(i + '. ' + note.title)
        i++
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const readNote = notes.find((note) => note.title === title)
    if (readNote) {
        console.log(chalk.bold.inverse('Title:') +(' ') + chalk.bold(readNote.title))
        console.log(chalk.bold.inverse('Body:') +(' ') + readNote.body)
    }
    else {
        console.log(chalk.red.inverse("No Such Note Found!"))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    deleteNote: deleteNote,
    listNotes: listNotes,
    readNote: readNote
}