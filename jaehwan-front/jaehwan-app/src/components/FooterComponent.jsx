import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <footer className="footer">
                    <span className="text-muted">JaehwanBoard 2023 </span>

                </footer>
            </div>
        );
    }
}

//기존의 Class 컴포넌트에서는 Hooks사용할 수 없다.
//기존의 Class 컴포넌트 구조를 유지하면서 Fuction 함수에서 Class구조를 감싸고 재호출하는 방식으로 Hooks를 사용할 수 있다. 
function withHookClassComponent(Component) {
    return function WrappedComponent(props) {
      //const myHookValue = useMyHook();
      return <Component {...props}  />;
    }
}

export default withHookClassComponent(FooterComponent);