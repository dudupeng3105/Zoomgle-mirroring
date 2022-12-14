package com.ssafy.common.cumtomObject;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvitationInfo {
    private long invitationSeq;
    private long roomCode;
    private String sender;
    private String receiver;
    private int year;
    private int month;
    private int day;
    private int hour;
    private int minute;
    private int second;
}