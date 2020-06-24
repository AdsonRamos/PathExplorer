import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/styles'

export default class AStar extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      gameBoard: [[]],
      board: [],
      nRows: 10,
      nCols: 10,
      board: [[]],
      styles: [[]],
      touchablesGrid: [[]]
    }
  }

  componentDidMount() {

    let gameBoard = [[]]
    for (let i = 0; i < this.state.nRows; i++) {
      gameBoard[i] = []
      for (let j = 0; j < this.state.nCols; j++) {
        gameBoard[i][j] = { i, j, visited: false, f: 0, g: 0, h: 0, destiny: false, obstacle: false, parent: undefined, origin: false }
      }
    }

    const originI = 2
    const originJ = 0

    const destI = 2
    const destJ = 7

    gameBoard[originI][originJ].origin = true
    gameBoard[destI][destJ].destiny = true
    gameBoard[0][2].obstacle = true
    gameBoard[1][2].obstacle = true
    gameBoard[2][2].obstacle = true
    gameBoard[3][2].obstacle = true
    gameBoard[4][2].obstacle = true
    gameBoard[5][3].obstacle = true
    gameBoard[6][4].obstacle = true
    gameBoard[7][5].obstacle = true
    gameBoard[5][6].obstacle = true
    gameBoard[5][7].obstacle = true
    gameBoard[5][8].obstacle = true
    gameBoard[6][9].obstacle = true
    gameBoard[4][5].obstacle = true
    gameBoard[3][5].obstacle = true
    gameBoard[2][5].obstacle = true
    gameBoard[1][5].obstacle = true
    gameBoard[1][6].obstacle = true
    gameBoard[1][7].obstacle = true
    gameBoard[1][8].obstacle = true
    gameBoard[2][8].obstacle = true
    gameBoard[3][8].obstacle = true
    gameBoard[3][7].obstacle = true
    gameBoard[7][0].obstacle = true
    gameBoard[7][1].obstacle = true

    let styles = this.state.styles

    for (let i = 0; i < this.state.nRows; i++) {
      styles[i] = []
      for (let j = 0; j < this.state.nCols; j++) {
        if (gameBoard[i][j].obstacle) {
          styles[i][j] = 1
        } else if (gameBoard[i][j].destiny) {
          styles[i][j] = 2
        } else if (gameBoard[i][j].origin) {
          styles[i][j] = 3
        } else {
          styles[i][j] = 0
        }
      }
    }

    this.setState({ styles, gameBoard })

    this.setBoard()

  }

  getColor(n) {
    if (n == 0) return styles.tileGrid
    else if (n == 1) return styles.tileBlocker
    else if (n == 2) return styles.tileDestiny
    else if (n == 3) return styles.tileOrigin
    else if (n == 4) return styles.tilePath
  }

  changeTileColor = (row, col) => {

    let styles = this.state.styles.slice()
    styles[row][col] = 4

    this.setState({ styles })

    this.setBoard()
  }

  setBoard = () => {
    let board = []
    let touchablesGrid = [[]]
    for (let i = 0; i < this.state.nRows; i++) {
      touchablesGrid[i] = []
      for (let j = 0; j < this.state.nCols; j++) {
        touchablesGrid[i].push(<TouchableOpacity style={this.getColor(this.state.styles[i][j])} key={this.state.nRows * i + j}></TouchableOpacity>)
      }
      board.push(<View style={{ flexDirection: 'row' }} key={i}>{touchablesGrid[i]}</View>)
    }
    this.setState({ board, touchablesGrid })
  }

  aStar = (finalPosition) => {
    let openedList = []
    let matrix = this.state.gameBoard
    let startPosition = { i: 2, j: 0 }

    // calcula as distâncias manhattan
    const destI = finalPosition.i
    const destJ = finalPosition.j

    for (let i = 0; i < this.state.nRows; i++) {
      for (let j = 0; j < this.state.nCols; j++) {
        if (!matrix[i][j].destiny && !matrix[i][j].obstacle) {
          matrix[i][j].h = Math.abs(i - destI) + Math.abs(j - destJ)
        }
      }
    }

    let i = startPosition.i
    let j = startPosition.j

    let current = matrix[i][j]

    while (!current.destiny) {
      current.visited = true

      let adjacentsPositions = this.getAdjacentsPositions({ i: current.i, j: current.j })

      adjacentsPositions.forEach(pos => {
        if (!matrix[pos.i][pos.j].visited && !matrix[pos.i][pos.j].obstacle) {
          openedList.push(matrix[pos.i][pos.j])
          matrix[pos.i][pos.j].parent = current
          matrix[pos.i][pos.j].g = current.g + 1
          matrix[pos.i][pos.j].f = matrix[pos.i][pos.j].g + matrix[pos.i][pos.j].h
        }
      })

      openedList.sort((a, b) => (a.f < b.f) ? -1 : 1)
      current = openedList.shift()

    }

    // drawing path
    let current2 = current
    while (!(current2.i == i && current2.j == j)) {

      i = current2.i
      j = current2.j
      if (!current2.destiny && !current2.origin) {
        this.changeTileColor(i, j)
      }
      current2 = current2.parent
      if (current2 == undefined) break
    }

    return current

  }

  showComputedValues = () => {
    let s = ""
    for (let i = 0; i < this.state.nRows; i++) {
      for (let j = 0; j < this.state.nCols; j++) {
        s += this.state.gameBoard[i][j].f + " "
      }
      console.log(s)
      s = ""
    }
  }

  getAdjacentsPositions = (position) => {
    const i = position.i
    const j = position.j
    let positions = []
    if (i > 0 && j > 0 && i < this.state.nRows - 1 && j < this.state.nCols - 1) {
      positions.push({ i: i - 1, j: j })
      positions.push({ i: i + 1, j: j })
      positions.push({ i: i, j: j - 1 })
      positions.push({ i: i, j: j + 1 })
    } else {
      if (i == 0) {
        if (j == 0) {
          positions.push({ i: i + 1, j: j })
          positions.push({ i: i, j: j + 1 })
        } else if (j == this.state.nCols - 1) {
          positions.push({ i: i, j: j - 1 })
          positions.push({ i: i + 1, j: j })
        } else {
          positions.push({ i: i, j: j - 1 })
          positions.push({ i: i + 1, j: j })
          positions.push({ i: i, j: j + 1 })
        }
      } else if (i == this.state.nRows - 1) {
        if (j == 0) {
          positions.push({ i: i - 1, j: j })
          positions.push({ i: i, j: j + 1 })
        } else if (j == this.state.nCols - 1) {
          positions.push({ i: i, j: j - 1 })
          positions.push({ i: i - 1, j: j })
        } else {
          positions.push({ i: i, j: j - 1 })
          positions.push({ i: i - 1, j: j })
          positions.push({ i: i, j: j + 1 })
        }
      } else {
        if (j == 0) {
          positions.push({ i: i - 1, j: j })
          positions.push({ i: i, j: j + 1 })
          positions.push({ i: i + 1, j: j })
        } else if (j == this.state.nCols - 1) {
          positions.push({ i: i - 1, j: j })
          positions.push({ i: i, j: j - 1 })
          positions.push({ i: i + 1, j: j })
        }
      }
    }
    return positions
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ paddingBottom: 2, fontSize: 23, fontStyle: 'italic' }}>Vamos resolver usando A*?</Text>
        <Text style={{ margin: 10, fontSize: 14, fontStyle: 'italic' }}>O bloco vermelho é o destino. Blocos em rosa são obstáculos. A origem é o bloco verde claro. Desenhe o grid e clique em resolver</Text>

        {this.state.board}

        <TouchableOpacity style={styles.button} onPress={() => { this.aStar({ i: 2, j: 7 }) }}>
          <Text>Resolver</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
