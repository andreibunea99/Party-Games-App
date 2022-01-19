package mps2.partygames.repository;

import mps2.partygames.dao.ActiveRooms;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActiveRoomsRepository extends JpaRepository<ActiveRooms, Integer> {
}
