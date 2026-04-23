package com.bunzo.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/uploads")
public class ImageUploadController {
    private static final long MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
    private static final List<String> ALLOWED_CONTENT_TYPES = List.of(
            "image/jpeg",
            "image/png",
            "image/webp"
    );

    @Value("${UPLOAD_DIR:/tmp/bunzo-uploads}")
    private String uploadDir;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> upload(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Uploaded file is empty");
        }
        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new IllegalArgumentException("File exceeds maximum size of 5MB");
        }
        if (!ALLOWED_CONTENT_TYPES.contains(file.getContentType())) {
            throw new IllegalArgumentException("Only JPEG, PNG, and WEBP images are allowed");
        }

        String fileName = StringUtils.cleanPath(file.getOriginalFilename() == null ? "upload" : file.getOriginalFilename());
        String extension = "";
        int index = fileName.lastIndexOf('.');
        if (index > -1) {
            extension = fileName.substring(index);
        }

        Path targetDir = Path.of(uploadDir);
        Files.createDirectories(targetDir);

        String generatedName = UUID.randomUUID() + extension;
        Path target = targetDir.resolve(generatedName);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        return ResponseEntity.ok(Map.of("fileName", generatedName, "path", target.toString()));
    }
}
