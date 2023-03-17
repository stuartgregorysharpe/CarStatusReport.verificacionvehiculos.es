const { readFile, writeFile } = require('fs').promises
const path = require('node:path')
const { SALT, ROOT_PATH, USERS_JSON_PATH } = require('../config')
const hashPassword = require('../helpers/hashPassword')

class Users {
  constructor (path) {
    this.path = path
    this.users = null
  }

  async load () {
    let file
    try {
      file = await readFile(this.path)
    } catch (error) {
      if (error.code === 'ENOENT') {
        await this.updateUserFile('[]')
        file = await readFile(this.path)
      } else {
        throw error
      }
    }
    this.users = JSON.parse(file)
  }

  async updateUserFile (stringContent) {
    let content
    if (stringContent) {
      content = stringContent
    } else {
      content = JSON.stringify(this.users)
    }
    await writeFile(this.path, content)
  }

  getUsers () {
    return this.users
  }

  getUsernames () {
    return this.users.map(obj => obj.username)
  }

  getUserIndex (username) {
    try {
      if (!this.users) throw new Error('array de usuarios undefined, ejecutar load()')
      if (!username) throw new Error(`usuario ${username} invalido`)
      const index = this.users.findIndex(user => user.username === username)

      if (index === -1) throw new Error(`usuario ${username} no encontrado`)

      return index
    } catch (error) {
      throw error
    }
  }

  getUserObject (username) {
    try {
      return this.users[this.getUserIndex(username)]
    } catch (error) {
      throw error
    }
  }

  async addUser (newUserObejct) {
    try {
      if (!this.users) throw new Error('array de usuarios undefined, ejecutar load()')

      const { username, password } = newUserObejct
      if (!newUserObejct || !username || !password) throw new Error(`Objeto debe ser de la forma {username, password}. Objecto recibido: ${JSON.stringify(newUserObejct)}`)

      newUserObejct.username = newUserObejct.username.replace(/\s+/g, '')
      newUserObejct.password = await hashPassword(newUserObejct.password, SALT)

      this.users.push(newUserObejct)

      await this.updateUserFile()
    } catch (error) {
      throw error
    }
  }

  async deleteUser (username) {
    this.users.splice(this.getUserIndex(username), 1)
    await this.updateUserFile()
  }

  async updateUser (userObejct) {
    try {
      const userIndex = this.getUserIndex(userObejct.username)

      const hashedPassword = await hashPassword(userObejct.password, SALT)
      userObejct.password = hashedPassword

      this.users[userIndex] = { ...this.users[userIndex], ...userObejct }

      await this.updateUserFile()
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

module.exports = new Users(path.join(ROOT_PATH, USERS_JSON_PATH))
