import { FC } from 'react';

interface ButtonProps {
    className: string;
}

const Button: FC<ButtonProps> = ({ className, ...props }) => {
    return <button className={className} {...props}/>
}