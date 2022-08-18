package com.ssafy.common.cumtomObject;

import com.ssafy.db.entity.Player;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomInfoAndPhoto {
    RoomInfoInterface roomInfoInterface;
    List<PhotoInfo> photoUrls;
    List<Player> players;
}
