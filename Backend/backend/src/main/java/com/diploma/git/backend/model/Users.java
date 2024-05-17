package com.diploma.git.backend.model;

public class Users {
    private String cip;
    private String nom;
    private String prenom;
    private String courriel;
    private boolean isTuteur;

    public String getCip() {
        return cip;
    }

    public void setCip(String cip) {
        this.cip = cip;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getCourriel() {
        return courriel;
    }

    public void setCourriel(String courriel) {
        this.courriel = courriel;
    }

    public boolean isTuteur() {
        return isTuteur;
    }

    public void setTuteur(boolean tuteur) {
        isTuteur = tuteur;
    }
}
