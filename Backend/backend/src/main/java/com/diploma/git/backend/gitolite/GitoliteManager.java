package com.diploma.git.backend.gitolite;

import gitolite.ManagedConfig;
import gitolite.ManagedConfigFactory;

import java.io.IOException;


public class GitoliteManager {

    private ManagedConfig configManager;

    public GitoliteManager() {
        ManagedConfigFactory factory = new ManagedConfigFactory();
        try {
            configManager = factory.init("git@" + System.getenv("GIT_SERVER_URL") + ":gitolite-admin");
        } catch (InterruptedException | IOException e) {
            System.err.println("Couln't clone admin repository.");
        }
    }

    public ManagedConfig getConfigManager(){
        return configManager;
    }
}
