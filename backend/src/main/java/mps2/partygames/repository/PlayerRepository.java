package mps2.partygames.repository;

import mps2.partygames.dao.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Integer> {
    Player findPlayerByPlayerId(String playerId);
    List<Player> findAll();
    void deletePlayerByPlayerId(String playerId);
}
