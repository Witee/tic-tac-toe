import React from 'react';
import Board from '../components/Board';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [Array(9).fill('')],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick = i => {
    const { history, xIsNext, stepNumber } = this.state;

    const newHistory = history.slice(0, stepNumber + 1);

    const current = newHistory[newHistory.length - 1];

    if (this.calculateWinner(current) || current[i]) return;

    const newSquares = current.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';

    newHistory.push(newSquares);

    this.setState({ history: newHistory, xIsNext: !xIsNext, stepNumber: newHistory.length - 1 });
  };

  calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i += 1) {
      const [a, b, c] = lines[i];

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  jumpTo = step => {
    this.setState({ stepNumber: step, xIsNext: step % 2 === 0 });
  };

  render() {
    const { history, xIsNext, stepNumber } = this.state;

    const current = history[stepNumber];

    const winner = this.calculateWinner(current);

    let status;
    if (winner) {
      status = `Winner is: ${winner}`;
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : `Go to game start`;

      return (
        <li key={step}>
          <button type="button" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current} onClick={this.handleClick} />
        </div>

        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default App;
