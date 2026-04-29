package com.petcarehub.cart.repository;

import com.petcarehub.cart.entity.CustomerOrder;
import com.petcarehub.cart.enums.OrderStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<CustomerOrder, Long> {
    @EntityGraph(attributePaths = {"pet", "items", "items.product"})
    Optional<CustomerOrder> findByOrderIdAndUser_UserId(Long orderId, Long userId);

    List<CustomerOrder> findByUser_UserIdAndOrderStatusOrderByCreatedAtDesc(Long userId, OrderStatus orderStatus);

    @EntityGraph(attributePaths = {"pet", "items", "items.product"})
    List<CustomerOrder> findByOrderStatusOrderByCreatedAtDesc(OrderStatus orderStatus);

    @EntityGraph(attributePaths = {"pet", "items", "items.product"})
    List<CustomerOrder> findByOrderStatusInOrderByCreatedAtDesc(List<OrderStatus> orderStatuses);
    
    // Owner billing: Get all orders for a specific owner
    @EntityGraph(attributePaths = {"pet"})
    List<CustomerOrder> findByUser_UserIdOrderByCreatedAtDesc(Long userId);

    @Query("SELECT COUNT(oi) > 0 FROM CustomerOrder o JOIN o.items oi WHERE o.user.userId = :userId AND oi.product.productId = :productId AND o.paymentStatus = 'PAID'")
    boolean hasPurchasedProduct(@Param("userId") Long userId, @Param("productId") Long productId);
}
