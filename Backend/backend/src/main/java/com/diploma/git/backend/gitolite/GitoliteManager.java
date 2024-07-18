package com.diploma.git.backend.gitolite;

import gitolite.manager.models.ConfigManager;
import org.eclipse.jgit.errors.UnsupportedCredentialItem;
import org.eclipse.jgit.transport.CredentialItem;
import org.eclipse.jgit.transport.CredentialsProvider;
import org.eclipse.jgit.transport.URIish;
import org.springframework.web.context.annotation.ApplicationScope;

import java.io.IOException;


public class GitoliteManager {

    private ConfigManager configManager;


    public GitoliteManager() {
        String gitRepoPath = null;
        gitRepoPath = "ssh://git@" + System.getenv("GIT_SERVER_URL") + "/gitolite-admin.git";
        configManager = ConfigManager.create(gitRepoPath);
    }

    public ConfigManager getConfigManager(){
        return configManager;
    }
}
