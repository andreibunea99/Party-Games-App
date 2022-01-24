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
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*")
@Controller
//@RequestMapping("/PartyGames")
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
        JsonObject jsonObject = JsonParser.parseString(body).getAsJsonObject();
        String idCamera = jsonObject.get("idCamera").getAsString();
        // trebuie ca playerul sa existe!!!!!!
        String username = "";
        String password = "";
        try {
            password = jsonObject.get("password").getAsString();
        } catch (Exception e) {

        }
        if (!password.equals("") && ! password.equals("password")) {
            JSONObject jsonObject1 = new JSONObject();
            jsonObject1.put("ok", "false");
            return new ResponseEntity<>(jsonObject1.toString(), HttpStatus.OK);
        }
        try {
            username = jsonObject.get("username").getAsString();
            Player player = playerService.findByIdPlayer(username);
            JSONObject jsonObject1 = new JSONObject();
            if (player == null) {
                jsonObject1.put("ok", "false");

                return new ResponseEntity<>(jsonObject1.toString(), HttpStatus.OK);
            }
            // camera trebuie sa existe!!!!!!
            // cand intra intr-o camera se seteaza si scorul la 0
            playerService.update(player.getPlayerId(), Integer.parseInt(idCamera));
            activeRoomsService.update(Integer.parseInt(idCamera));

            jsonObject1.put("ok", "true");
        }catch (Exception e) {

        }
        // atunci e guest si il adaug la lista de guests
        if (username.equals("")) {
            activeRoomsService.updateGuests(Integer.parseInt(idCamera));
        }
        JSONObject jsonObject1 = new JSONObject();
        jsonObject1.put("ok", "true");
        return new ResponseEntity<>(jsonObject1.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = "/addGuest", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> addGuest(@RequestBody String body){
        //TODO aici trebuie sa primesc si id-ul camerei
        JsonObject jsonObject = JsonParser.parseString(body).getAsJsonObject();
        String idCamera = jsonObject.get("idRoom").getAsString();
        activeRoomsService.updateGuests(Integer.parseInt(idCamera));
        JSONObject jsonObject1 = new JSONObject();
        jsonObject1.put("ok", "true");

        return new ResponseEntity<>(jsonObject1.toString(), HttpStatus.OK);

    }

    @RequestMapping(value = "/changePlayerRoom", method = RequestMethod.PUT)
    @ResponseBody
    //TODO trebuie sa primesc id-ul camerei din care vrea sa fie mutat si id-ul camerei in care vrea sa fie mutat
    public ResponseEntity<String> changePlayerRoom(@RequestBody String body) {
        JsonObject jsonObject = JsonParser.parseString(body).getAsJsonObject();
        String idCamera = jsonObject.get("idCamera").getAsString();
        String idCameraNoua = jsonObject.get("idCameraNoua").getAsString();
        String idPlayer = jsonObject.get("idPlayer").getAsString();
        activeRoomsService.deletePlayer(idPlayer, Integer.parseInt(idCamera));
        playerService.update(idPlayer, Integer.parseInt(idCameraNoua));

        JSONObject jsonObject1 = new JSONObject();
        jsonObject1.put("ok", "true");
        return new ResponseEntity<>(jsonObject1.toString(), HttpStatus.OK);
    }


}
