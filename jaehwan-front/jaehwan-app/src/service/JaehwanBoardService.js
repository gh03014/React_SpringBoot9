import axios from 'axios';

const BOARD_API_BASE_URL = "http://localhost:8080/api/board"; 

class JaehwanBoardService {

    //게시판 목록 출력
    getBoards(p_num) {
        console.log(axios.get(BOARD_API_BASE_URL + "?p_num="+ p_num));
        return axios.get(BOARD_API_BASE_URL + "?p_num="+ p_num);
    }

    //글 작성하기
    createBoard(board) {
        return axios.post(BOARD_API_BASE_URL, board);
    }

    //글 상세보기
    getOneBoard(no) {
        return axios.get(BOARD_API_BASE_URL + "/" + no);
    }

    //글 수정하기
    updateBoard(no, board) {
        return axios.put(BOARD_API_BASE_URL + "/" + no, board);
    }

    //글 삭제하기
    deleteBoard(no) {
        return axios.delete(BOARD_API_BASE_URL + "/" + no);
    }
}

const JaehwanBoardServiceExport = new JaehwanBoardService();

export default JaehwanBoardServiceExport;