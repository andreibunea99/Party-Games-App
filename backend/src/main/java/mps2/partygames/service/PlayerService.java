package mps2.partygames.service;

import mps2.partygames.dao.Player;
import mps2.partygames.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {

    @Autowired
    PlayerRepository playerRepository;
    public Player save(Player player) {
        return playerRepository.save(player);
    }
}
