import React from 'react';

type TButton = {
  children: React.ReactNode;
  type?: 'button' |'submit' |'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<TButton> = ({ children, type = 'button', ...props }) => {
  return <button type={type} {...props} >{children}</button>
}

export default Button;
