/**
 * this iterative algorithm returns the matrix of paths given as a parameter the adjacency matrix n*n
 * @param {Array n*n} adjacencyMatrix
 * @returns the PathsMatix
 */

// const A1 =
//   [
//     [1, 1, 0, 0, 0, 0],
//     [0, 0, 1, 0, 0, 0],
//     [0, 0, 0, 1, 0, 1],
//     [0, 0, 1, 0, 1, 0],
//     [0, 0, 0, 1, 0, 1],
//     [0, 0, 0, 0, 0, 0],
//   ]

// const pathsMAtrix = graphPathsMatrixGenerator(A1)
// console.table(pathsMAtrix)

function graphPathsMatrixGenerator(adjacencyMatrix) {
  const n = adjacencyMatrix.length
  const matrix = n => {
    let nmatrix = []
    for (let i = 0; i < n; i++) {
      nmatrix[i] = []
      for (let j = 0; j < n; j++) {
        nmatrix[i][j] = 0

      }
    }
    return nmatrix
  }
  const matrixMultiplication = (matrix1, matrix2, n) => {

    let newMatrix = matrix(n)
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        let sum = 0
        for (let k = 0; k < n; k++) {
          sum += matrix1[i][k] * matrix2[k][j]
        }
        newMatrix[i][j] = sum
      }
    }
    return newMatrix
  }

  const matrixExponentiation = (adjacencyMatrix, n) => {
    let transitionMatrix = adjacencyMatrix
    let BMatrix = matrix(n)

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < transitionMatrix.length; j++) {
        for (let k = 0; k < transitionMatrix[j].length; k++) {
          BMatrix[j][k] += transitionMatrix[j][k]
        }
      }
      transitionMatrix = matrixMultiplication(transitionMatrix, adjacencyMatrix, n)
    }
    return BMatrix
  }
  const graphPaths = (matrix) => {
    let graphPathsMatrix = []
    for (let i = 0; i < matrix.length; i++) {
      graphPathsMatrix[i] = []
      for (let j = 0; j < matrix[i].length; j++) {
        graphPathsMatrix[i][j] = (matrix[i][j] != 0) ? 1 : 0
      }
    }
    return graphPathsMatrix
  }
  return graphPaths(matrixExponentiation(adjacencyMatrix, n))
}