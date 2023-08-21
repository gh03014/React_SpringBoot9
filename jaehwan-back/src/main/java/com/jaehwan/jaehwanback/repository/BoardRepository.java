package com.jaehwan.jaehwanback.repository;

import com.jaehwan.jaehwanback.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    //페이징처리를 적용한 게시판 목록 출력
    @Query("select b from Board b where b.no > :startNo and b.no <= :endNo")
    List<Board> findByNoFromToEnd(@Param("startNo") Integer objectStartNum, @Param("endNo") Integer objectCountPerPage);
}
