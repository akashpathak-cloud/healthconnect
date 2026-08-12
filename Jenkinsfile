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
                bat 'docker-compose build'
            }
        }

        stage('Deploy Test Environment') {
            steps {
                bat 'docker-compose down'
                bat 'docker-compose up -d'
            }
        }

        stage('Health Check') {
            steps {
                bat 'curl -f http://localhost:9090'
            }
        }
    }
}