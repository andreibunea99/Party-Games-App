package mps2.partygames.service;

import mps2.partygames.dao.ActiveRooms;
import mps2.partygames.repository.ActiveRoomsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActiveRoomsService {
    @Autowired
    ActiveRoomsRepository activeRoomsRepository;
    public ActiveRooms save(ActiveRooms activeRooms){
        return activeRoomsRepository.save(activeRooms);
    }
    public List<ActiveRooms> findAll(){return activeRoomsRepository.findAll();}
    public ActiveRooms findByRoomName(String roomName) {
        return  activeRoomsRepository.findByRoomName(roomName);
    }
    public void update(String name) {
        ActiveRooms activeRooms = activeRoomsRepository.findByRoomName(name);
        activeRooms.setNumberOfPlayers(activeRooms.getNumberOfPlayers() + 1);
        activeRoomsRepository.save(activeRooms);

    }
    public void updateGuests(String name) {
        ActiveRooms activeRooms = activeRoomsRepository.findByRoomName(name);
        activeRooms.setGuestsNumber(activeRooms.getGuestsNumber() + 1);
        activeRoomsRepository.save(activeRooms);
    }
}
