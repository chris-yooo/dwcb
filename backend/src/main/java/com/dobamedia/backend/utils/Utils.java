package com.dobamedia.backend.utils;

import com.dobamedia.backend.security.UserSecurityConfig;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Component
public class Utils {

    public String addUUIDasString() {
        return UUID.randomUUID().toString();
    }

    public String addPasswordBcrypt(String password) {
        return UserSecurityConfig.passwordEncoder.encode(password);
    }

    public String addUUIDasString8Chars() {
        return UUID.randomUUID().toString().substring(0, 8);
    }

    public String addLocalDateTimeFormatted() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy, HH:mm:ss");
        return now.format(formatter);
    }
}
