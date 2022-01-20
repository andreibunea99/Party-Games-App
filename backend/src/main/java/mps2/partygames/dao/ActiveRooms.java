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
    private String adminId;
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
    @Column(name= "guests_score")
    private Integer guestsScore;
    @Column(name = "guests_number")
    private Integer guestsNumber;

    public ActiveRooms(String adminId, String roomName, String roomType, Integer maximumNumberOfPlayers) {
        this.adminId = adminId;
        this.roomName = roomName;
        this.roomType = roomType;
        this.maximumNumberOfPlayers = maximumNumberOfPlayers;
        this.setNumberOfPlayers(0);
        this.setGuestsScore(0);
        this.setGuestsNumber(0);
    }

    public ActiveRooms(Integer guestsNumber) {
        this.guestsNumber = guestsNumber;
    }
}
