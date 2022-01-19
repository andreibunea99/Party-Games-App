package mps2.partygames.service;

import mps2.partygames.dao.ActiveRooms;
import mps2.partygames.repository.ActiveRoomsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActiveRoomsService {
    @Autowired
    ActiveRoomsRepository activeRoomsRepository;
    public ActiveRooms save(ActiveRooms activeRooms){
        return activeRoomsRepository.save(activeRooms);
    }
}
