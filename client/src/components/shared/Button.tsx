import { FC } from 'react';

interface ButtonProps {
    className: string;
}

export const Button: FC<ButtonProps> = ({ className, ...props }) => {
    return <button
    
    className={className} 
    {...props}
    />
}