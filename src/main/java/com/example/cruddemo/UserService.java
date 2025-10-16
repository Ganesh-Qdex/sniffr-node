package com.example.cruddemo;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class UserService {
    private final Map<Long, User> users = new HashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    public List<User> getAllUsers() {
        return new ArrayList<>(users.values());
    }

    public Optional<User> getUserById(Long id) {
        return Optional.ofNullable(users.get(id));
    }

    public User createUser(User user) {
        Long id = idGenerator.getAndIncrement();
        user.setId(id);
        users.put(id, user);
        return user;
    }

    public Optional<User> updateUser(Long id, User updatedUser) {
        if (users.containsKey(id)) {
            updatedUser.setId(id);
            users.put(id, updatedUser);
            return Optional.of(updatedUser);
        }
        return Optional.empty();
    }

    public boolean deleteUser(Long id) {
        return users.remove(id) != null;
    }
}
