pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Start Application') {
            steps {
                bat 'docker compose up -d'
            }
        }
    }
}