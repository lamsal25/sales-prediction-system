import React from 'react';

export default function Button({ padT, padL, textSize, bgColor, color, title, event, borderRadius }) {
  const style = {
    paddingTop: padT,
    paddingLeft: padL,
    paddingBottom: padT,
    paddingRight: padL,
    backgroundColor: bgColor,
    color: color,
    fontSize: textSize,
    borderRadius: borderRadius,
  };

  return (
    <div>
      <button style={style} onClick={event} className="btn border-2 border-white uppercase hover:scale-105 transition-all flex items-center gap-x-1">
        {title}
      </button>
    </div>
  );
}
