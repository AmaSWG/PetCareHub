package com.petcarehub.payment.service;

import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    public String[] createCheckoutSession(Long referenceId, String referenceType, Double amount) {
        try {
            long unitAmount = Math.round(amount * 100);

            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(frontendUrl + "/payment-success?session_id={CHECKOUT_SESSION_ID}&type=" + referenceType)
                    .setCancelUrl(frontendUrl + "/payment-cancel?refId=" + referenceId + "&type=" + referenceType)
                    .putMetadata("referenceId", String.valueOf(referenceId))
                    .putMetadata("referenceType", referenceType)
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity(1L)
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("lkr")
                                                    .setUnitAmount(unitAmount)
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName(referenceType + " Payment")
                                                                    .build()
                                                    )
                                                    .build()
                                    )
                                    .build()
                    )
                    .build();

            Session session = Session.create(params);
            return new String[]{session.getUrl(), session.getId(), session.getPaymentIntent()};

        } catch (Exception e) {
            throw new RuntimeException("Stripe session creation failed", e);
        }
    }
}