import React, { Component } from 'react';
import JaehwanBoardService from '../service/JaehwanBoardService';
import { useNavigate as UseNavigate} from 'react-router-dom';


class ListJaehwanBoardComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            p_num: 1,
            paging: {},
            boards: []
        }
		
        this.createBoard = this.createBoard.bind(this);
    }

    componentDidMount() {
        JaehwanBoardService.getBoards(this.state.p_num).then((res) => {
            this.setState({ 
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                boards: res.data.list});
        });
    }

    createBoard() {
        const navigate = this.props.navigate;
        navigate('/create-board/_create');
    }

    readBoard(no) {
        const navigate = this.props.navigate;
        navigate(`/read-board/${no}`);
    }

    //해당 페이지 번호에 해당하는 대이터만 출력
    listBoard(p_num) {
        console.log("pageNum : "+ p_num);
        JaehwanBoardService.getBoards(p_num).then((res) => {
            console.log(res.data);
            this.setState({ 
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                boards: res.data.list});
        });
    }

    // 페이지 번호 버튼 하단에 생성
    viewPaging() {
        const pageNums = [];

        for (let i = this.state.paging.pageNumStart; i <= this.state.paging.pageNumEnd; i++ ) {
            pageNums.push(i);
        }

        let style = {
            background:"orange"
        }

        return (pageNums.map((page) => 
            page === this.state.p_num
                ? <button className="page-link"  style={style}  key={page.toString()} onClick = {() => this.listBoard(page)}>{page}</button>
                : <button className="page-link" key={page.toString()} onClick = {() => this.listBoard(page)}>{page}</button>
        ));
        
    }

    //이전 페이지번호로 이동
    isPagingPrev(){
        if (this.state.p_num != 1) {
            return (
                    <button className="page-link" onClick = {() => this.listBoard( (this.state.paging.currentPageNum - 1) )} tabindex="-1">Previous</button>
            );
        }
    }

    //다음 페이지번호로 이동
    isPagingNext(){
        if (this.state.paging.next) {
            return (
                    <button className="page-link" onClick = {() => this.listBoard( (this.state.paging.currentPageNum + 1) )} tabIndex="-1">Next</button>
            );
        }
    }

    //첫페이지로 이동 (1페이지)
    isMoveToFirstPage() {
        if (this.state.p_num != 1) {
            return (
                <button className="page-link" onClick = {() => this.listBoard(1)} tabIndex="-1">Move to First Page</button>
            );
        }
    }

    //마지막 페이지로 이동
    isMoveToLastPage() {
        if (this.state.p_num != this.state.paging.pageNumCountTotal) {
            return (
                <button className="page-link" onClick = {() => this.listBoard( (this.state.paging.pageNumCountTotal) )} tabIndex="-1">LastPage({this.state.paging.pageNumCountTotal})</button>
            );
        }
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Boards List</h2>

				<div className = "row">
                    <button className="btn btn-primary" onClick={this.createBoard}> 글 작성</button>
                </div>

                <div className ="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>글 번호</th>
                                <th>타이틀 </th>
                                <th>작성자 </th>
                                <th>작성일 </th>
                                <th>갱신일 </th>
                                <th>좋아요수</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.boards.map(
                                    board => 
                                    <tr key = {board.no}>
                                        <td> {board.no} </td>
                                        <td> <a onClick = {() => this.readBoard(board.no)}>{board.title} </a></td>
                                        <td> {board.memberNo} </td>
                                        <td> {board.createdTime} </td>
                                        <td> {board.updatedTime} </td>
                                        <td> {board.likes} </td>
                                        <td> {board.counts} </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className ="row">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            
                            {
                                this.isMoveToFirstPage()
                            }
                            {
                                this.isPagingPrev()
                            }
                            {
                                this.viewPaging()
                            }
                            {
                                this.isPagingNext()
                            }
                            {
                                this.isMoveToLastPage()
                            }
                            
                        </ul>
                    </nav>
                </div>
            </div>    
        );
    }
}

//기존의 Class 컴포넌트에서는 Hooks사용할 수 없다.
//기존의 Class 컴포넌트 구조를 유지하면서 Fuction 함수에서 Class구조를 감싸고 재호출하는 방식으로 Hooks를 사용할 수 있다. 
function withHookClassComponent(Component) {
    return function WrappedComponent(props) {
      //const myHookValue = useMyHook();
      const navigate = UseNavigate();
      return <Component {...props} navigate={navigate} />;
    }
}

export default withHookClassComponent(ListJaehwanBoardComponent);