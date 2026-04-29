package com.petcarehub.user.controller;

import com.petcarehub.product.repository.ProductRepository;
import com.petcarehub.cart.repository.OrderRepository;
import com.petcarehub.user.dto.UserResponse;
import com.petcarehub.user.entity.Role;
import com.petcarehub.user.entity.User;
import com.petcarehub.user.repository.UserRepository;
import com.petcarehub.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    // Create a new staff or vet (Admin only)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> createStaffMember(@RequestBody Map<String, Object> request) {
        log.info("[AdminController] Received request to create staff member: {}", request.get("email"));
        
        try {
            User user = User.builder()
                    .firstName((String) request.get("firstName"))
                    .lastName((String) request.get("lastName"))
                    .email((String) request.get("email"))
                    .password((String) request.get("password"))
                    .mobileNumber((String) request.get("mobileNumber"))
                    .address((String) request.get("address"))
                    .enabled(true)
                    .build();

            // Handle roles
            Set<Role> roles = new HashSet<>();
            List<String> rolesList = (List<String>) request.get("roles");
            if (rolesList != null) {
                for (String r : rolesList) {
                    try {
                        roles.add(Role.valueOf(r));
                    } catch (Exception e) {
                        log.warn("Invalid role received: {}", r);
                    }
                }
            }
            if (roles.isEmpty()) roles.add(Role.ROLE_STAFF);
            user.setRoles(roles);

            UserResponse createdUser = userService.register(user);
            log.info("Successfully created staff member: {}", createdUser.getEmail());
            return ResponseEntity.ok(createdUser);
        } catch (Exception e) {
            log.error("Failed to create staff member: {}", e.getMessage());
            throw new RuntimeException("Failed to create user: " + e.getMessage());
        }
    }

    // Get all users (Admin only)
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userRepository.findAll()
                .stream()
                .map(userService::toUserResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Long>> getStats() {
        Map<String, Long> stats = new HashMap<>();
        try {
            stats.put("totalUsers", userRepository.count());
            stats.put("totalProducts", productRepository.count());
            stats.put("totalOrders", orderRepository.count());
            
            // Optimized counts
            long vetCount = userRepository.findAll().stream()
                    .filter(u -> u.getRoles().contains(Role.ROLE_VET) || u.getRoles().contains(Role.VET))
                    .count();
            long staffCount = userRepository.findAll().stream()
                    .filter(u -> u.getRoles().contains(Role.ROLE_STAFF) || u.getRoles().contains(Role.STAFF))
                    .count();
            
            stats.put("vets", vetCount);
            stats.put("staff", staffCount);
        } catch (Exception e) {
            log.error("Error fetching admin stats: {}", e.getMessage());
        }
        return ResponseEntity.ok(stats);
    }
}
