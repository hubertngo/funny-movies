import initials from 'initials';
import React from 'react';

import { UserOutlined } from '@ant-design/icons';

const defaultColors = [
  '#2ecc71', // emerald
  '#3498db', // peter river
  '#8e44ad', // wisteria
  '#e67e22', // carrot
  '#e74c3c', // alizarin
  '#1abc9c', // turquoise
  '#2c3e50', // midnight blue
];

function sumChars(str: string) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}

type Props = {
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  name?: any;
  borderRadius?: string;
  src?: string;
  srcset?: string;
  color?: string;
  colors?: string[];
  size?: number;
};

const Avatar = (props: Props) => {
  const {
    borderRadius = '100%',
    src,
    srcset,
    name,
    color,
    colors = defaultColors,
    size = 32,
    style = {},
    onClick,
    className,
  } = props;

  const abbr = initials(name).slice(-2);

  const imageStyle = {
    display: 'block',
    width: size + 'px',
    height: size + 'px',
    borderRadius,
  };

  const innerStyle = {
    width: size + 'px',
    height: size + 'px',
    borderRadius,
    fontSize: size * 0.3,
    backgroundColor: '#ccc',
  };

  let inner;

  if (src || srcset) {
    inner = <img style={imageStyle} src={src} srcSet={srcset} alt={name} />;
  } else if (name) {
    let background;
    if (color) {
      background = color;
    } else {
      // pick a deterministic color from the list
      const i = sumChars(name) % colors.length;
      background = colors[i];
    }

    innerStyle.backgroundColor = background;

    inner = abbr;
  } else {
    innerStyle.backgroundColor = '#ccc';
    innerStyle.fontSize = size * 0.5;

    inner = <UserOutlined />;
  }

  return (
    <div
      aria-label={name}
      className={className}
      style={{
        ...{
          boxSizing: 'border-box',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid #e8e8e8',
          color: '#fff',
          background: '#fff',
        },
        ...innerStyle,
        ...style,
      }}
      onClick={onClick}
    >
      {inner}
    </div>
  );
};

export default Avatar;
