package com.petcarehub.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffCreateRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String mobileNumber;
    private String address;
    private List<String> roles;
}
