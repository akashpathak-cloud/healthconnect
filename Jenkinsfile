pipeline {

    agent any

    stages {

        stage('Test AWS CLI') {
            steps {
 stage('Test AWS CLI') {
    steps {
        withCredentials([usernamePassword(
            credentialsId: 'healthconnect-aws',
            usernameVariable: 'AWS_ACCESS_KEY_ID',
            passwordVariable: 'AWS_SECRET_ACCESS_KEY'
        )]) {

            bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\Amazon\\AWSCLIV2\\aws.exe" --version'

            bat '"C:\\Users\\patha\\AppData\\Local\\Programs\\Amazon\\AWSCLIV2\\aws.exe" sts get-caller-identity'
        }
    }
}
            }
        }
    }
}