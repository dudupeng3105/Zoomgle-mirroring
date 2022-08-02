package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 게임방 모델 정의.
 */
@NoArgsConstructor // 매개변수가 없는 생성자 구현
@AllArgsConstructor // 클래스의 모든 멤버 변수를 매개변수로 받는 생성자 구현
@Data // 클래스 멤버 변수의 Getter/Setter 메서드 구현
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "room")
public class Room {
    // 게임 Seq
    @Id // 기본키
    @GeneratedValue(strategy = GenerationType.AUTO) // id 자동 생성
    @Column(name = "room_seq")
    private long roomSeq;

    // 방장
    @Column(name = "host", nullable = false)
    private String host;

    // 게임 시작 날짜/시간
    @Column(name = "date", nullable = false)
    private String date;

    // 최대 인원 수
    @Column(name = "max", nullable = false)
    private int max;

    // 현재 인원 수 <- default value로 0을 주고싶음.
    @Column(name = "cnt", nullable = false)
    private int cnt;

    // MVP 회원 Seq
    @Column(name = "mvp", nullable = true)
    private String mvp;

    // 등록일
    @CreationTimestamp
    @Column(name = "REG_DTM", nullable = false)
    private LocalDateTime REG_DTM;

    // 수정일
    @UpdateTimestamp
    @Column(name = "MOD_DTM", nullable = true)
    private LocalDateTime MOD_DTM;
}