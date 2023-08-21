package com.jaehwan.jaehwanback.service;

import com.jaehwan.jaehwanback.exception.ResourceNotFoundException;
import com.jaehwan.jaehwanback.model.Board;
import com.jaehwan.jaehwanback.repository.BoardRepository;
import com.jaehwan.jaehwanback.util.PagingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public int findAllCount() {
        return (int) boardRepository.count();
    }

    // 페이징처리를 적용한 게시판 목록 데이터 조회
    public ResponseEntity<Map> getPagingBoard(Integer p_num) {
        Map result = null;

        // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )
        PagingUtil pu = new PagingUtil(p_num, 5, 5);
        System.out.println("페이징처리 start");
        System.out.println(pu);
        System.out.println(pu.getCurrentPageNum());
        System.out.println(pu.getObjectStartNum());
        System.out.println(pu.getObjectEndNum());
        List<Board> list = boardRepository.findByNoFromToEnd(pu.getObjectStartNum(), pu.getObjectEndNum());
        System.out.println(list);
        System.out.println("페이징처리 end");
        pu.setObjectCountTotal(findAllCount());
        pu.setCalcForPaging();

        System.out.println("p_num : "+p_num);
        System.out.println(pu.toString());

        //if (list == null || list.size() == 0) {
        //    return null;
        //}

        result = new HashMap<>();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }

    // 게시판 목록 출력
    public List<Board> getAllBoard() {
        return boardRepository.findAll();
    }

    //글 작성하기
    public Board createBoard(Board board) {
        return boardRepository.save(board);
    }

    //글 상세보기
    public ResponseEntity<Board> getBoard(Integer no) {
        Board board = boardRepository.findById(no)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by no : ["+no+"]"));
        return ResponseEntity.ok(board);
    }

    //글 수정하기
    public ResponseEntity<Board> updateBoard(Integer no, Board updatedBoard) {
        //수정하고자 하는 데이터가 존재하는지 조회
        Board board = boardRepository.findById(no)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by no : ["+no+"]"));

        //수정한 내용으로 DTO 셋팅
        board.setType(updatedBoard.getType());
        board.setTitle(updatedBoard.getTitle());
        board.setContents(updatedBoard.getContents());
        board.setUpdatedTime(new Date());

        Board endUpdatedBoard = boardRepository.save(board); //데이터 수정
        return ResponseEntity.ok(endUpdatedBoard);
    }

    //글 삭제하기
    public ResponseEntity<Map<String, Boolean>> deleteBoard(Integer no) {
        //존재한는 데이터인지 조회하여 확인, 없으면 exception 예외 처리한다.
        Board board = boardRepository.findById(no)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by no : ["+no+"]"));

        boardRepository.delete(board); //데이터 삭제
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted Board Data by id : ["+no+"]", Boolean.TRUE); //데이터 삭제 성공여부 전달
        return ResponseEntity.ok(response);
    }
}