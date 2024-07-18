package com.diploma.git.backend.ssh;

import org.apache.sshd.client.SshClient;
import org.apache.sshd.client.session.ClientSession;
import org.eclipse.jgit.errors.TransportException;
import org.eclipse.jgit.transport.CredentialsProvider;
import org.eclipse.jgit.transport.RemoteSession;
import org.eclipse.jgit.transport.SshSessionFactory;
import org.eclipse.jgit.transport.URIish;
import org.eclipse.jgit.transport.sshd.SshdSessionFactory;
import org.eclipse.jgit.util.FS;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Collections;
import java.util.List;

public final class CustomSshSessionFactory extends SshSessionFactory {


    public static final Path SSH_DIR = Path.of("~/.ssh/");

    private final Path privateKeyFile;
    private final byte[] sshKey;

    public CustomSshSessionFactory(byte[] sshKey) {
        this.sshKey = sshKey;
        privateKeyFile = Path.of("id_rsa", SSH_DIR.toString());
    }


    @Override
    public RemoteSession getSession(URIish uri, CredentialsProvider credentialsProvider, FS fs, int tms) throws TransportException {
        // Use Apache Mina SSHD to establish SSH connection
        SshClient client = SshClient.setUpDefaultClient();
        client.start();

        try {
            ClientSession session = client.connect("git",uri.getHost(), uri.getPort())
                    .verify(tms)
                    .getSession();

            session.addPasswordIdentity("your_ssh_private_key_or_password");
            session.auth().verify(tms);

            return (RemoteSession) session;
        } catch (IOException e) {
            throw new TransportException(uri, "Error connecting to SSH server", e);
        }
    }

    @Override
    public String getType() {
        return "";
    }
}
