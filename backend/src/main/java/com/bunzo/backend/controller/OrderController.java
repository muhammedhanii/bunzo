package com.bunzo.backend.controller;

import com.bunzo.backend.dto.OrderRequest;
import com.bunzo.backend.entity.Order;
import com.bunzo.backend.entity.OrderStatus;
import com.bunzo.backend.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<List<Order>> getMine(Principal principal) {
        return ResponseEntity.ok(orderService.getCurrentUserOrders(principal));
    }

    @PostMapping
    public ResponseEntity<Order> create(@RequestBody @Valid OrderRequest request, Principal principal) {
        return ResponseEntity.ok(orderService.createOrder(request, principal));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getAll() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> updateStatus(@PathVariable Long id, @RequestParam OrderStatus status) {
        return ResponseEntity.ok(orderService.updateStatus(id, status));
    }
}
