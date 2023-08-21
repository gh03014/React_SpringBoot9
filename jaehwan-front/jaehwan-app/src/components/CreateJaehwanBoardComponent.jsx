import React, { Component } from 'react';
import JaehwanBoardService from '../service/JaehwanBoardService';
import { useNavigate as UseNavigate, useParams as UseParams} from 'react-router-dom';

class CreateJaehwanBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            no: this.props.params.no,
            type: '',
            title: '',
            contents: '',
            memberNo: ''
        }

        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentsHandler = this.changeContentsHandler.bind(this);
        this.changeMemberNoHandler = this.changeMemberNoHandler.bind(this);
        this.createBoard = this.createBoard.bind(this);
    }

    changeTypeHandler = (event) => {
        this.setState({type: event.target.value});
    }
    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    } 
    changeContentsHandler = (event) => {
        this.setState({contents: event.target.value});
    } 
    changeMemberNoHandler = (event) => {
        this.setState({memberNo: event.target.value});
    } 

    createBoard = (event) => {
        const navigate = this.props.navigate;

        event.preventDefault();
        let board = {
            type: this.state.type,
            title: this.state.title,
            contents: this.state.contents,
            memberNo: this.state.memberNo
        };
        console.log("board => "+ JSON.stringify(board));

        if (this.state.no === '_create') {
            JaehwanBoardService.createBoard(board).then(res => {
                //this.props.history.push('/board');
                navigate('/board');
            });
        } else {
            JaehwanBoardService.updateBoard(this.state.no, board).then(res => {
                navigate('/board');
            });
        }
    }
 
    cancel() {
        const navigate = this.props.navigate;
        navigate('/board');
        //this.props.history.push('/board');
    }

    getTitle() {
        if (this.state.no === '_create') {
            return <h3 className="text-center">새글을 작성해주세요</h3>
        } else {
            return <h3 className="text-center">{this.state.no}글을 수정 합니다.</h3>
        }
    }

    componentDidMount() {
        if (this.state.no === '_create') {
            return
        } else {
            JaehwanBoardService.getOneBoard(this.state.no).then( (res) => {
                let board = res.data;
                console.log("board => "+ JSON.stringify(board));
                
                this.setState({
                        type: board.type,
                        title: board.title,
                        contents: board.contents,
                        memberNo: board.memberNo
                    });
            });
        }
    }

    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">새글을 작성해주세요</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Type </label>
                                        <select placeholder="type" name="type" className="form-control" 
                                        value={this.state.type} onChange={this.changeTypeHandler}>
                                            <option value="1">자유게시판</option>
                                            <option value="2">질문과 답변</option>
                                        </select>
                                    </div>
                                    <div className = "form-group">
                                        <label> Title </label>
                                        <input type="text" placeholder="title" name="title" className="form-control" 
                                        value={this.state.title} onChange={this.changeTitleHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Contents  </label>
                                        <textarea placeholder="contents" name="contents" className="form-control" 
                                        value={this.state.contents} onChange={this.changeContentsHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> MemberNo  </label>
                                        <input placeholder="memberNo" name="memberNo" className="form-control" 
                                        value={this.state.memberNo} onChange={this.changeMemberNoHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.createBoard}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
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
      const params = UseParams(); //URL 로 전달받은 파라미터
      return <Component {...props} navigate={navigate} params={params}/>;
    }
}

export default withHookClassComponent(CreateJaehwanBoardComponent);