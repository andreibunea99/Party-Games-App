package mps2.partygames.repository;

import mps2.partygames.dao.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Integer> {
    Player findPlayerByPlayerId(String playerId);
}
