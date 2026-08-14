pipeline {

    agent any

    stages {

        stage('Test AWS CLI') {
            steps {
                bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\Amazon\\AWSCLIV2\\aws.exe" --version'
            }
        }

        stage('Test AWS Identity') {
            steps {
                bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\Amazon\\AWSCLIV2\\aws.exe" sts get-caller-identity'
            }
        }
    }
}