import React, { Component } from 'react';
import JaehwanBoardService from '../service/JaehwanBoardService';
import { useNavigate as UseNavigate, useParams as UseParams} from 'react-router-dom';

class ReadJaehwanBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            no: this.props.params.no,
            board: {}
        }

    }

    componentDidMount() {
        JaehwanBoardService.getOneBoard(this.state.no).then( res => {
            this.setState({board: res.data});
        });
    }

    returnBoardType(typeNo) {
        let type = null;
        if (typeNo == 1) {
            type = "자유게시판";

        } else if (typeNo == 2 ) {
            type = "질문과 답변 게시판";

        } else {
            type = "타입 미지정";
        }

        return (
            <div className = "row">
                <label> Board Type : </label> {type}
            </div>
        )

    }

    returnDate(cTime, uTime) {
        return (
            <div className = "row">
                <label>생성일 : [ {cTime} ] / 최종 수정일 : [ {uTime} ] </label>
            </div>
        )
    }

    goToList() {
        const navigate = this.props.navigate;
        navigate('/board');
    }

    goToUpdate(){
        const navigate = this.props.navigate;
        const no = this.state.no
        navigate(`/create-board/${no}`);
    }

    goToDelete = async function () {
        const navigate = this.props.navigate;
        if(window.confirm("정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구 할 수 없습니다.")) {
            JaehwanBoardService.deleteBoard(this.state.no).then( res => {
                console.log("delete result => "+ JSON.stringify(res));
                if (res.status == 200) {
                    navigate('/board');
                } else {
                    alert("글 삭제가 실패했습니다.");
                }
            });

        }
    }

    render() {
        return (
            <div>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className ="text-center"> Read Detail</h3>
                    <div className = "card-body">
                            {this.returnBoardType(this.state.board.type)} 
                            <div className = "row">      
                                <label> Title </label> : {this.state.board.title}
                            </div>

                            <div className = "row">
                                <label> Contents </label> : <br></br>
                                <textarea value={this.state.board.contents} readOnly/> 
                            </div >

                            <div className = "row">
                                <label> MemberNo  </label>: 
                                {this.state.board.memberNo}
                            </div>

                            {this.returnDate(this.state.board.createdTime, this.state.board.updatedTime) }

                            <button className="btn btn-primary" onClick={this.goToList.bind(this)} style={{marginLeft:"10px"}}>글 목록으로 이동</button>
                            <button className="btn btn-info" onClick={this.goToUpdate.bind(this)} style={{marginLeft:"10px"}}>글 수정하기</button>
                            <button className="btn btn-danger" onClick={() => this.goToDelete()} style={{marginLeft:"10px"}}>글 삭제하기</button>
                    </div>
                </div>

            </div>
        );
    }
}

//기존의 Class 컴포넌트에서는 Hooks사용할 수 없다.
//기존의 Class 컴포넌트 구조를 유지하면서 Fuction 함수에서 Class구조를 감싸고 재호출하는 방식으로 Hooks를 사용할 수 있다. 
function withHookClassComponent(Component) {
    return function WrappedComponent(props) {
      const navigate = UseNavigate();
      const params = UseParams(); //URLfh 전달받은 파라미터
      return <Component {...props} navigate={navigate} params={params}/>;
    }
}

export default withHookClassComponent(ReadJaehwanBoardComponent);