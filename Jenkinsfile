pipeline {
    agent any

    stages {

        stage('Test AWS CLI') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'healthconnect-aws'
                ]]) {
                    bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\Amazon\\AWSCLIV2\\aws.exe" --version'
                    bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\Amazon\\AWSCLIV2\\aws.exe" sts get-caller-identity'
                }
            }
        }

stage('Test Docker') {
    steps {
        bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\Docker\\Docker\\resources\\bin\\docker.exe" --version'
        bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\Docker\\Docker\\resources\\bin\\docker.exe" info'
        bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\Docker\\Docker\\resources\\bin\\docker-compose.exe" --version'
    }
}

stage('Build Docker Images') {
    steps {
        bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\Docker\\Docker\\resources\\bin\\docker-compose.exe" build'
    }
}

    }
}