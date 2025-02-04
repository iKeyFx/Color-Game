import { useEffect, useState } from "react";
import styled from "styled-components";
import ReactConfetti from "react-confetti";

const ColorGameBox = styled.div`
  text-align: center;
  color: #272424;
`;

const ScoreDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-around;
`;

const TargetBox = styled.div`
  background-color: ${(props) => props.color};
  width: 100%;
  height: 150px;
  margin: 10px auto;

  @media (max-width: 650px) {
    height: 100px;
  }
`;

const Button = styled.button`
  width: 80px;
  height: 40px;
  background-color: ${(props) => props.color};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: transform 0.1s ease, box-shadow 0.2s ease;

  &:focus {
    transform: scale(0.9);
    box-shadow: 0 0 10px ${(props) => props.color};
  }

  @media (max-width: 650px) {
    width: 100%;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 650px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 350px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ResetButton = styled.button`
  background-color: red;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  color: white;
  &:hover {
  }
`;

const H2Div = styled.div`
  width: 100%;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h2 {
    min-width: 300px;
    text-align: center;
    white-space: nowrap;
  }

  span {
    margin-bottom: 10px;
  }
`;
function App() {
  const [score, setScore] = useState(0);

  const getTargetColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const [targetColor, setTargetColor] = useState(getTargetColor());
  const [colorOptions, setColorOptions] = useState([]);

  useEffect(() => {
    const incorrectColors = Array.from({ length: 5 }, () => getTargetColor());
    const allColors = [...incorrectColors, targetColor].sort(
      () => Math.random() - 0.5
    );
    setColorOptions(allColors);
  }, [targetColor]);

  const [gameStatus, setGameStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleNewGame = () => {
    setScore(0);
    setTargetColor(getTargetColor());
    setDisabled(false);
    setShowConfetti(false);
  };
  const handleAnwerClick = (color) => {
    if (color === targetColor) {
      setScore((prev) => prev + 1);
      setGameStatus("You Got It✅");
      setShowConfetti(true);
      setDisabled(true);
      setTimeout(() => {
        setGameStatus("");
        setTargetColor(getTargetColor());
        setDisabled(false);
        setShowConfetti(false);
      }, 3000);
    } else {
      setGameStatus("Opps, Wrong Answer❌");
      setDisabled(true);
      setTimeout(() => {
        setGameStatus("");
        setDisabled(false);
      }, 2000);
    }
  };
  return (
    <ColorGameBox data-test-id="colorGameBox">
      {showConfetti && <ReactConfetti />}
      <H2Div>
        <h2 data-test-id="gameInstruction">Guess The Correct Color!</h2>
        {gameStatus && <span data-test-id="gameStatus">{gameStatus}</span>}
      </H2Div>
      <ScoreDiv>
        <div data-test-id="score">Score: {score}</div>
        <ResetButton data-test-id="newGameButton" onClick={handleNewGame}>
          New Game
        </ResetButton>
      </ScoreDiv>
      <TargetBox data-test-id="colorBox" color={targetColor}></TargetBox>
      <ButtonDiv>
        {colorOptions.map((color, i) => (
          <Button
            key={i}
            data-test-id="colorOptions"
            color={color}
            onClick={() => handleAnwerClick(color)}
            disabled={disabled}
          ></Button>
        ))}
      </ButtonDiv>
    </ColorGameBox>
  );
}

export default App;
