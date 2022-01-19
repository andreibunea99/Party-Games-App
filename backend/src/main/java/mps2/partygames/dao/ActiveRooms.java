package mps2.partygames.dao;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "ActiveRooms")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ActiveRooms {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ID;
    @Column(name = "admin_id")
    private Integer adminId;
    @Column(name = "number_of_players")
    private Integer numberOfPlayers;
    @Column(name = "room_name")
    private String roomName;
    @Column(name = "room_type")
    private String roomType;
    @Column(name = "maximum_number_of_players")
    private Integer maximumNumberOfPlayers;
    // joc ales
    @Column(name = "game")
    private String game;
    @Column(name = "status")
    private String status;


}
