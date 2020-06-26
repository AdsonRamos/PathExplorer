import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/styles'

export default class BFS extends React.Component {

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
        // gameBoard[5][3].obstacle = true
        // gameBoard[6][4].obstacle = true
        // gameBoard[7][5].obstacle = true
        // gameBoard[5][6].obstacle = true
        // gameBoard[5][7].obstacle = true
        // gameBoard[5][8].obstacle = true
        // gameBoard[6][9].obstacle = true
        // gameBoard[4][5].obstacle = true
        // gameBoard[3][5].obstacle = true
        // gameBoard[2][5].obstacle = true
        // gameBoard[1][5].obstacle = true
        // gameBoard[1][6].obstacle = true
        // gameBoard[1][7].obstacle = true
        // gameBoard[1][8].obstacle = true
        // gameBoard[2][8].obstacle = true
        // gameBoard[3][8].obstacle = true
        // gameBoard[3][7].obstacle = true
        // gameBoard[7][0].obstacle = true
        // gameBoard[7][1].obstacle = true

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

    executeBFS = () => {
        let m = this.state.nRows
        let n = this.state.nCols

        let matrix = this.state.gameBoard

        let V = m * n;

        const g1 = new GrafoBFS(V);

        let q = []
        let nodes = []
        let start = 0

        for (let i = 0; i < V; i++) {
            nodes.push({ i: parseInt(i / n), j: i % (n), label: i, destiny: matrix[parseInt(i / n)][i % (n)].destiny, obstacle: matrix[parseInt(i / n)][i % (n)].obstacle, visited: false, cost: 0 })
        }

        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (matrix[i][j].origin) {
                    start = n * i + j
                    var originI = i
                    var originJ = j
                }
                if (j != n - 1 && (!matrix[i][j].obstacle && !matrix[i][j + 1].obstacle)) {
                    g1.addEdge(n * i + j, n * i + j + 1);
                    g1.addEdge(n * i + j + 1, n * i + j);
                }
                if (i != m - 1 && (!matrix[i][j].obstacle && !matrix[i + 1][j].obstacle)) {
                    g1.addEdge(n * i + j, n * (i + 1) + j);
                    g1.addEdge(n * (i + 1) + j, n * i + j);
                }
            }
        }

        q.push(nodes[start])
        nodes[start].visited = true
        let minCost = Infinity

        while (q.length > 0) {
            var current = q.shift()
            for (let i = 0; i < g1.listaAdjacencia[current.label].length; i++) {
                if (!nodes[g1.listaAdjacencia[current.label][i].label].visited) {

                    nodes[g1.listaAdjacencia[current.label][i].label].visited = true
                    nodes[g1.listaAdjacencia[current.label][i].label].cost = 1 + current.cost
                    nodes[g1.listaAdjacencia[current.label][i].label].parent = current
                    if (nodes[g1.listaAdjacencia[current.label][i].label].cost < minCost
                        && nodes[g1.listaAdjacencia[current.label][i].label].destiny) {
                        minCost = nodes[g1.listaAdjacencia[current.label][i].label].cost
                        // chegou no destino
                        var destiny = nodes[g1.listaAdjacencia[current.label][i].label]
                    }
                    q.push(nodes[g1.listaAdjacencia[current.label][i].label])
                }
            }
        }

        let current2 = destiny.parent

        while (!(current2.i == originI && current2.j == originJ)) {
            let i = current2.i
            let j = current2.j
            this.changeTileColor(i, j)
            current2 = current2.parent
        }
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

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ paddingBottom: 2, fontSize: 23, fontStyle: 'italic' }}>Vamos resolver usando BFS?</Text>
                <Text style={{ margin: 10, fontSize: 14, fontStyle: 'italic' }}>O bloco vermelho é o destino. Blocos em rosa são obstáculos. A origem é o bloco verde claro. Desenhe o grid e clique em resolver</Text>

                {this.state.board}

                <TouchableOpacity style={styles.button} onPress={() => this.executeBFS()}>
                    <Text>Resolver</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class GrafoBFS {
    vertices
    listaAdjacencia = [[]]
    constructor(vertices) {
        this.vertices = vertices
        for (let i = 0; i < vertices; i++) {
            this.listaAdjacencia[i] = []
        }
    }

    addEdge(u, v) {
        this.listaAdjacencia[u].push({ label: v, visited: false, cost: 0 })
    }
}