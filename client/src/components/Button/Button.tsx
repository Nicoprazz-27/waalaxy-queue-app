import { useState } from "react";
import ColorStyles from "../../types/color-styles";
import './Button.css';


function Button({text, onClick, colorStyles = {color: '', hoverColor: '', onClickColor: ''}}: {text: string, onClick: CallableFunction, colorStyles?: ColorStyles}): JSX.Element{

  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  
  const handleMouseEnter = (): void => {
    setIsHovered(true);
  };
  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  const handleMouseUp = (): void => {   
    setIsMouseDown(false);
  };
  const handleMouseDown = (): void => {
    setIsMouseDown(true);
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: isMouseDown ? colorStyles.onClickColor : (isHovered ? colorStyles.hoverColor : colorStyles.color)
  }

  return (
    <button 
      className="button"
      style={buttonStyle}
      onClick={ ()=>onClick()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      {text}
    </button>
  );
}

export default Button;