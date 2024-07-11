package com.diploma.git.backend.ssh;

import org.eclipse.jgit.transport.sshd.SshdSessionFactory;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Collections;
import java.util.List;

public final class CustomSshSessionFactory extends SshdSessionFactory {


    public static final Path SSH_DIR = Path.of("~/.ssh/");

    private final Path privateKeyFile;
    private final byte[] sshKey;

    public CustomSshSessionFactory(byte[] sshKey) {
        this.sshKey = sshKey;
        privateKeyFile = Path.of("id_rsa", SSH_DIR.toString());
    }

    @Override
    public File getSshDirectory() {
        try {
            return Files.createDirectories(SSH_DIR).toFile();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    // Return paths to private key files
    @Override
    protected List<Path> getDefaultIdentities(File sshDir) {
        try {
            Files.write(privateKeyFile, sshKey);
            return Collections.singletonList(privateKeyFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return Collections.emptyList();
    }

}
