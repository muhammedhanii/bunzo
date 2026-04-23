package com.bunzo.backend.config;

import com.bunzo.backend.entity.*;
import com.bunzo.backend.repository.CategoryRepository;
import com.bunzo.backend.repository.ProductRepository;
import com.bunzo.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;

@Configuration
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Value("${app.admin.email:admin@bunzo.com}")
    private String adminEmail;
    @Value("${app.admin.password:}")
    private String adminPassword;

    @Override
    public void run(String... args) {
        if (categoryRepository.count() == 0) {
            Category signature = new Category();
            signature.setName("Signature");
            signature.setDescription("Premium crafted burgers");
            signature = categoryRepository.save(signature);

            Category classics = new Category();
            classics.setName("Classic");
            classics.setDescription("Iconic Bunzo flavor line");
            classics = categoryRepository.save(classics);

            Product p1 = new Product();
            p1.setName("Neon Truffle Stack");
            p1.setDescription("Double wagyu patty with truffle aioli.");
            p1.setPrice(new BigDecimal("18.90"));
            p1.setImageUrl("/images/neon-truffle-stack.jpg");
            p1.setCategory(signature);
            p1.setFeatured(true);

            Product p2 = new Product();
            p2.setName("Blue Flame Classic");
            p2.setDescription("Angus burger with midnight house sauce.");
            p2.setPrice(new BigDecimal("14.50"));
            p2.setImageUrl("/images/blue-flame-classic.jpg");
            p2.setCategory(classics);
            p2.setFeatured(true);

            productRepository.save(p1);
            productRepository.save(p2);
        }

        if (userRepository.count() == 0 && !adminPassword.isBlank()) {
            AppUser admin = new AppUser();
            admin.setFullName("Bunzo Admin");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setRole(Role.ROLE_ADMIN);
            userRepository.save(admin);
        }
    }
}
