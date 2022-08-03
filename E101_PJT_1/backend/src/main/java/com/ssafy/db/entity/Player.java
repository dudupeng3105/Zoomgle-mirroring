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
 * 게임 참여자 모델 정의.
 */
@NoArgsConstructor // 매개변수가 없는 생성자 구현
@AllArgsConstructor // 클래스의 모든 멤버 변수를 매개변수로 받는 생성자 구현
@Data // 클래스 멤버 변수의 Getter/Setter 메서드 구현
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "player")
public class Player {
    // 게임 참여자 Seq
    @Id // 기본키
    @GeneratedValue(strategy = GenerationType.AUTO) // id 자동 생성
    @Column(name = "player_seq")
    private long playerSeq;

    // 게임방 코드
    @Column(name = "room_code", nullable = false)
    private long roomCode;

    // 게임 참여자
    @Column(name = "user", nullable = false)
    private String user;

    // 등록일
    @CreationTimestamp
    @Column(name = "REG_DTM", nullable = false)
    private LocalDateTime REG_DTM;

    // 수정일
    @UpdateTimestamp
    @Column(name = "MOD_DTM", nullable = true)
    private LocalDateTime MOD_DTM;
}
