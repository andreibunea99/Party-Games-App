package mps2.partygames.repository;

import mps2.partygames.dao.ActiveRooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActiveRoomsRepository extends JpaRepository<ActiveRooms, Integer> {
    List<ActiveRooms> findAll();
    ActiveRooms findByRoomName(String roomName);
    ActiveRooms findByID(Integer id);

}
