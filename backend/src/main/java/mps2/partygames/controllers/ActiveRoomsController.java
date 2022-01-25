package mps2.partygames.controllers;

import com.google.gson.*;
import mps2.partygames.dao.ActiveRooms;
import mps2.partygames.dao.Player;
import mps2.partygames.dao.PlayerDetails;
import mps2.partygames.service.ActiveRoomsService;
import mps2.partygames.service.PlayerService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;


@CrossOrigin(origins = "*")
@Controller
//@RequestMapping("/PartyGames")
public class ActiveRoomsController {

    @Autowired
    ActiveRoomsService activeRoomsService;

    @Autowired
    PlayerService playerService;

    @RequestMapping(value = "/getRoomsList", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<String> getRoomsList() {
            List<ActiveRooms> roomsList = activeRoomsService.findAll();
            JsonObject jsonObject = new JsonObject();
            JsonArray array = new JsonArray();
            for (ActiveRooms rooms : roomsList) {
                Gson gson = new Gson();
                String json = gson.toJson(rooms);
                array.add(json);
            }

            jsonObject.add("rooms", array);
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);

    }

    @RequestMapping(value = "/addRoom", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> addRoom(@RequestBody String body){
        System.out.println(body);
        JsonObject jsonObject = JsonParser.parseString(body).getAsJsonObject();
        String name = jsonObject.get("name").getAsString();
        String type = jsonObject.get("type").getAsString();
        String admin = jsonObject.get("admin").getAsString();
        String maxNumberOfPlayers = jsonObject.get("maxNumberOfPlayers").getAsString();

        activeRoomsService.save(new ActiveRooms(admin, name, type, Integer.parseInt(maxNumberOfPlayers)));
        JSONObject json = new JSONObject();
        json.put("ok", "true");
        return new ResponseEntity<>(json.toString(), HttpStatus.OK);
    }

    // get roomDetails/id - response {players: [(name, score)], guestsNr, guestScore}
    @RequestMapping(value = "/roomDetails/{idCamera}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<String> getRoomDetails(@PathVariable String idCamera) {

        System.out.println("INTRU IN CAMERA: " + idCamera);
        List<Player> players = playerService.findAll();
        JsonArray array = new JsonArray();
        System.out.println(idCamera);
        for(Player player : players) {
            if (player.getRoomId() != null && player.getRoomId() == Integer.parseInt(idCamera)) {
                Gson gson = new Gson();
                String json = gson.toJson(Arrays.asList(new PlayerDetails(player.getPlayerId(), player.getScore())));
                array.add(json);
            }
        }
        System.out.println(array.size());
        Gson gson = new Gson();
        String numberOfGuests = gson.toJson(activeRoomsService.findById(Integer.parseInt(idCamera)).getGuestsNumber());

        String guestsScore = gson.toJson(activeRoomsService.findById(Integer.parseInt(idCamera)).getGuestsScore());

        JsonElement guestsNr = new JsonParser().parse(numberOfGuests);
        JsonElement guestScore = new JsonParser().parse(guestsScore);
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("players", array);
        jsonObject.add("guestsNr", guestsNr);
        jsonObject.add("guestScore", guestScore);

        return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);

    }


}
