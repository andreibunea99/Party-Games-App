package mps2.partygames.service;

import mps2.partygames.dao.Player;
import mps2.partygames.repository.ActiveRoomsRepository;
import mps2.partygames.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {

    @Autowired
    PlayerRepository playerRepository;
    @Autowired
    ActiveRoomsService activeRoomsService;
    public Player save(Player player) {
        return playerRepository.save(player);
    }
    public Player findByIdPlayer(String idPlayer){ return playerRepository.findPlayerByPlayerId(idPlayer);}
    public List<Player> findAll() { return playerRepository.findAll();}
    public void update(String username, Integer id) {
        Player player = playerRepository.findPlayerByPlayerId(username);
        player.setRoomId(activeRoomsService.findById(id).getID());
        playerRepository.save(player);
    }
}
