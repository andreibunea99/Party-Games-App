package mps2.partygames.controllers;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import mps2.partygames.dao.ActiveRooms;
import mps2.partygames.dao.Player;
import mps2.partygames.service.ActiveRoomsService;
import mps2.partygames.service.PlayerService;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("/PartyGames")
public class PlayerController {

    @Autowired
    PlayerService playerService;
    @Autowired
    ActiveRoomsService activeRoomsService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> registerUser(@RequestBody String body) {
        JsonObject jsonObject = JsonParser.parseString(body).getAsJsonObject();
        String username = jsonObject.get("username").getAsString();
        String password = jsonObject.get("password").getAsString();
        playerService.save(new Player(username, password));

        JSONObject json = new JSONObject();
        json.put("ok", "true");

        return new ResponseEntity<>(json.toString(), HttpStatus.OK);

    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> login(@RequestBody String body){
        JsonObject jsonObject = JsonParser.parseString(body).getAsJsonObject();
        String username = jsonObject.get("username").getAsString();
        String password = jsonObject.get("password").getAsString();
        JSONObject json = new JSONObject();

        if (!playerService.findByIdPlayer(username).getPassword().equals(password)) {
            json.put("ok", "false");
        } else {
            json.put("ok", "true");
        }

        return new ResponseEntity<>(json.toString(), HttpStatus.OK);
    }
    @RequestMapping(value = "/addPlayer", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> addPlayer(@RequestBody String body){
        //TODO aici trebuie sa primesc si numele camerei
        JsonObject jsonObject = JsonParser.parseString(body).getAsJsonObject();
        String username = jsonObject.get("username").getAsString();
        String name = jsonObject.get("name").getAsString();
        // trebuie ca playerul sa existe!!!!!!
        Player player = playerService.findByIdPlayer(username);
        JSONObject jsonObject1 = new JSONObject();
        if (player == null) {
            jsonObject1.put("ok", "false");

            return new ResponseEntity<>(jsonObject1.toString(), HttpStatus.OK);
        }
        // camera trebuie sa existe!!!!!!
        playerService.update(player.getPlayerId(), name);
        activeRoomsService.update(name);

        jsonObject1.put("ok", "true");

        return new ResponseEntity<>(jsonObject1.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = "/addGuest", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> addGuest(@RequestBody String body){
        //TODO aici trebuie sa primesc si numele camerei
        JsonObject jsonObject = JsonParser.parseString(body).getAsJsonObject();
        String name = jsonObject.get("name").getAsString();
        activeRoomsService.updateGuests(name);
        JSONObject jsonObject1 = new JSONObject();
        jsonObject1.put("ok", "true");

        return new ResponseEntity<>(jsonObject1.toString(), HttpStatus.OK);


    }



}
