import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";
// 컴포넌트가 돔에서 마운트나 언마운트되는 즉시 추가되거나 제거되기 때문에 스타일 적용이 불편합니다.
// 이때 react - transition - group을 사용하면 마운트될 때 언마운트될 때 생명주기와 관련지어 전환 효과를 쉽게 적용할 수 있습니다.

const SideDrawer = (props) => {
  const content = (
    <CSSTransition //애니메이션 효과를 부여
      in={props.show} //발동 조건
      timeout={200} //전환 효과 재생 시간
      classNames="slide-in-left" //래핑하고 있는 엘리먼트에 적용되는 className
      mountOnEnter //in 어트리뷰트 값이 true라면 함수의 반환값에 작성된 엘리먼트를 돔에 mount
      unmountOnExit //in 어트리뷰트 값이 false일 때 함수의 반환값에 작성된 엘리먼트를 돔에서 unmount
    >
      <aside className="side-drawer" onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
