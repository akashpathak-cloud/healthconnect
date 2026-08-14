pipeline {
    agent any

    stages {

        stage('Test AWS CLI') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-healthconnect'
                ]]) {
                    bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\Amazon\\AWSCLIV2\\aws.exe" --version'
                    bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\Amazon\\AWSCLIV2\\aws.exe" sts get-caller-identity'
                }
            }
        }

        stage('Test Docker') {
    steps {
        bat 'docker --version'
        bat 'docker compose version'
    }
}

        stage('Build Docker Images') {
            steps {
                bat 'docker compose build'
            }
        }

    }
}