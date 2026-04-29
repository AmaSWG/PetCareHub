package com.petcarehub.cart.controller;

import com.petcarehub.cart.dto.OrderDTO;
import com.petcarehub.cart.dto.OrderItemDTO;
import com.petcarehub.cart.entity.CustomerOrder;
import com.petcarehub.cart.enums.OrderStatus;
import com.petcarehub.cart.service.OrderManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderManagementService orderService;

    @GetMapping("/owner/{userId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByOwner(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getOrdersByUser(userId).stream()
                .map(this::mapToDTO).collect(Collectors.toList()));
    }

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders().stream()
                .map(this::mapToDTO).collect(Collectors.toList()));
    }

    @GetMapping("/pending")
    public ResponseEntity<List<OrderDTO>> getPendingOrders() {
        return ResponseEntity.ok(orderService.getPendingOrders().stream()
                .map(this::mapToDTO).collect(Collectors.toList()));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long orderId) {
        return ResponseEntity.ok(mapToDTO(orderService.getOrderById(orderId)));
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderDTO> updateOrderStatus(@PathVariable Long orderId, @RequestParam String status) {
        OrderStatus newStatus = OrderStatus.valueOf(status.toUpperCase());
        return ResponseEntity.ok(mapToDTO(orderService.updateOrderStatus(orderId, newStatus)));
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<OrderDTO> cancelOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(mapToDTO(orderService.cancelOrder(orderId, "Cancelled via management console", "ROLE_ADMIN", null)));
    }

    @PutMapping("/{orderId}/verify-payment")
    public ResponseEntity<OrderDTO> verifyPayment(@PathVariable Long orderId) {
        return ResponseEntity.ok(mapToDTO(orderService.verifyPayment(orderId)));
    }

    @GetMapping("/{orderId}/receipt")
    public ResponseEntity<byte[]> getPaymentReceipt(@PathVariable Long orderId) {
        CustomerOrder order = orderService.getOrderById(orderId);
        byte[] receipt = orderService.getPaymentReceipt(orderId);
        
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, order.getPaymentReceiptContentType())
                .body(receipt);
    }

    @GetMapping("/check-purchase")
    public ResponseEntity<Boolean> hasPurchasedProduct(@RequestParam Long userId, @RequestParam Long productId) {
        return ResponseEntity.ok(orderService.hasPurchasedProduct(userId, productId));
    }

    private OrderDTO mapToDTO(CustomerOrder order) {
        var dto = OrderDTO.builder()
                .orderId(order.getOrderId())
                .orderNumber(order.getOrderNumber())
                .userId(order.getUser() != null ? order.getUser().getUserId() : null)
                .petId(order.getPet() != null ? order.getPet().getPetId() : null)
                .ownerFullName(order.getOwnerFullName())
                .ownerEmail(order.getOwnerEmail())
                .contactNumber(order.getContactNumber())
                .pickupDate(order.getPickupDate())
                .additionalNotes(order.getAdditionalNotes())
                .subTotal(order.getSubTotal())
                .pickupFee(order.getPickupFee())
                .total(order.getTotal())
                .orderStatus(order.getOrderStatus().name())
                .paymentStatus(order.getPaymentStatus().name())
                .paymentMethod(order.getPaymentMethod() != null ? order.getPaymentMethod().name() : null)
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .orderItems(order.getItems().stream().map(item -> OrderItemDTO.builder()
                        .orderItemId(item.getOrderItemId())
                        .productId(item.getProduct() != null ? item.getProduct().getProductId() : null)
                        .productName(item.getProductName())
                        .productPrice(item.getProductPrice())
                        .quantity(item.getQuantity())
                        .lineTotal(item.getLineTotal())
                        .build()).collect(Collectors.toList()))
                .build();

        // Fetch cancellation details if cancelled
        if (order.getOrderStatus() == OrderStatus.CANCELLED) {
            var cancellation = orderService.getOrderCancellation(order.getOrderId());
            if (cancellation != null) {
                dto.setCancellationReason(cancellation.getReason());
                dto.setCancelledBy(cancellation.getCancelledBy());
            }
        }

        return dto;
    }
}
