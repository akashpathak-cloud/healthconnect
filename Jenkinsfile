pipeline {

    agent any

    stages {

        stage('Test AWS CLI') {
            steps {
                withCredentials([usernamePassword(
    credentialsId: 'healthconnect-aws',
    usernameVariable: 'AWS_ACCESS_KEY_ID',
    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
)]) {
    bat 'aws --version'
    bat 'aws sts get-caller-identity'
}
            }
        }
    }
}