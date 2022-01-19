package mps2.partygames.dao;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.sql.In;

import javax.persistence.*;

@Table(name = "Player")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ID;
    @Column(name = "id_player")
    private String playerId;
    @Column(name = "score")
    private Integer score;
    @Column(name = "is_admin")
    private Boolean isAdmin;
    @Column(name = "is_guest")
    private Boolean isGuest;
}
