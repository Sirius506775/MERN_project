import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

//Portal은 컴포넌트를 렌더링 할 때, 부모 컴포넌트의 DOM 외부에 존재하는 DOM 노드에 렌더링된다.
//즉, 외부에 존재하는 DOM 노드가 React App DOM 계층에 존재하는 것 처럼 연결

const Backdrop = props => {
  return ReactDOM.createPortal( 
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
