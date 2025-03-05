import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'danger'; 
  size?: 'small' | 'medium' | 'large'; 
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'h-10 rounded-md font-semibold cursor-pointer transition-all ease-in-out duration-200';

  const variantStyles = {
    primary: 'bg-gray-500 text-white hover:bg-gray-600 disabled:bg-gray-300',
    outline:
      'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white disabled:border-gray-300 disabled:text-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300',
  };

  const sizeStyles = {
    small: 'px-4 py-2 text-sm',
    medium: 'p-6 py-3 text-md',
    large: 'px-8 py-4 text-lg',
  };

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
    props.disabled ? 'opacity-50 cursor-not-allowed' : ''
  } ${className}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
