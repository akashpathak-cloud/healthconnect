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
        bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" --version'
        bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" info'
        bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker-compose.exe" --version'
    }
}

stage('Build Docker Images') {
    steps {
        bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker-compose.exe" build'
    }
}

stage('Push Images to ECR') {
    steps {
        withCredentials([
            [$class: 'AmazonWebServicesCredentialsBinding',
             credentialsId: 'healthconnect-aws']
        ]) {

            bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\Amazon\\AWSCLIV2\\aws.exe" ecr get-login-password --region ap-south-2 | "C:\\Users\\patha\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" login --username AWS --password-stdin 808431466583.dkr.ecr.ap-south-2.amazonaws.com'

            bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" tag healthconnect-ci-healthconnect-api:latest 808431466583.dkr.ecr.ap-south-2.amazonaws.com/healthconnect-api:latest'

            bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" tag healthconnect-ci-healthconnect-web:latest 808431466583.dkr.ecr.ap-south-2.amazonaws.com/healthconnect-web:latest'

            bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" push 808431466583.dkr.ecr.ap-south-2.amazonaws.com/healthconnect-api:latest'

            bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" push 808431466583.dkr.ecr.ap-south-2.amazonaws.com/healthconnect-web:latest'
        }
    }
}

    }
}