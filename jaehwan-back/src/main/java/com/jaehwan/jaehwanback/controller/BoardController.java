package com.jaehwan.jaehwanback.controller;

import com.jaehwan.jaehwanback.model.Board;
import com.jaehwan.jaehwanback.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class BoardController {

    @Autowired
    private BoardService boardService;

    // 게시판 목록 출력
    // 페이징 처리를 할 수 있도록 수정
    @GetMapping("/board")
    public ResponseEntity<Map> getAllBoards(@RequestParam(value = "p_num", required=false) Integer p_num) {
        if (p_num == null || p_num <= 0) p_num = 1;

        return boardService.getPagingBoard(p_num);
    }

    //글 작성하기
    @PostMapping("/board")
    public Board createBoard(@RequestBody Board board) {
        return boardService.createBoard(board);
    }

    @GetMapping("/board/{no}")
    public ResponseEntity<Board> getBoardByNo(
            @PathVariable Integer no) {

        return boardService.getBoard(no);
    }

    //글 수정하기
    @PutMapping("/board/{no}")
    public ResponseEntity<Board> updateBoardByNo(
            @PathVariable Integer no, @RequestBody Board board){

        return boardService.updateBoard(no, board);
    }

    //글 삭제하기
    @DeleteMapping("/board/{no}")
    public ResponseEntity<Map<String, Boolean>> deleteBoardByNo(@PathVariable Integer no) {
        return boardService.deleteBoard(no);
    }
}