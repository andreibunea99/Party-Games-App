package mps2.partygames.service;

import mps2.partygames.dao.Player;
import mps2.partygames.repository.ActiveRoomsRepository;
import mps2.partygames.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public void update(String username, String roomName) {
        Player player = playerRepository.findPlayerByPlayerId(username);
        player.setRoomId(activeRoomsService.findByRoomName(roomName).getID());
        playerRepository.save(player);
    }
}
