package com.dobamedia.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public User addUser(@Valid @RequestBody DtoNewUser dtoNewUser) {
        return userService.addUser(dtoNewUser);
    }

    @GetMapping("/me")
    public String me() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @GetMapping("/{username}")
    public User profile(@PathVariable String username) {
        String usernameFromSession = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        if (!usernameFromSession.equals(username)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "The username you want to display not equals to your session username");
        }
        return userService.getUserDetails(username);
    }

    @PutMapping("/{username}")
    public User updateUserProfile(@PathVariable String username, @Valid @RequestBody DtoUpdateUser dtoUpdateUser) {
        String usernameFromSession = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        if (!usernameFromSession.equals(username) || !usernameFromSession.equals(dtoUpdateUser.username())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "The profile username you want to update not equals to your session username!");
        }
        return userService.updateUserProfile(dtoUpdateUser);
    }

    @PutMapping("/username/{username}")
    public User profileUsernameUpdate(@PathVariable String username, @RequestBody DtoUpdateUsername dtoUpdateUsername) {
        String usernameFromSession = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        if (!usernameFromSession.equals(username) || !usernameFromSession.equals(dtoUpdateUsername.username())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "The username you want to update not equals to your session username!");
        }
        return userService.updateUserName(dtoUpdateUsername);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable String id) {
        String usernameFromSession = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        User userFromRepo = userService.findByUsername(usernameFromSession);
        if (!id.equals(userFromRepo.id())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The username you want to delete not found!");
        }
        userService.deleteUser(id);
    }

    @GetMapping("/login")
    public String login() {
        return "OK";
    }

    @GetMapping("/logout")
    public void logout(HttpSession httpSession) {
        httpSession.invalidate();
    }
}
