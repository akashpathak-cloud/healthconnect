pipeline {

    agent any

    stages {

        stage('Test AWS Version') 
        {
            steps {
                bat 'aws --version'
                bat 'aws sts get-caller-identity'
            }
        }
    }
}