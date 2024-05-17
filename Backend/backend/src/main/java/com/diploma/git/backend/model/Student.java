package com.diploma.git.backend.model;

import java.util.List;

public class Student {
    private String cip;
    private String nom;
    private String prenom;
    private String courriel;
    private List<Project> projets;

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

    public List<Project> getProjets() {
        return projets;
    }

    public void setProjets(List<Project> projets) {
        this.projets = projets;
    }
}
