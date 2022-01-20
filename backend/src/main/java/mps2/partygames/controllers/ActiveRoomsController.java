package mps2.partygames.controllers;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import mps2.partygames.dao.ActiveRooms;
import mps2.partygames.service.ActiveRoomsService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/PartyGames")
public class ActiveRoomsController {

    @Autowired
    ActiveRoomsService activeRoomsService;

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
}
