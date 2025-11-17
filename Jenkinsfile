pipeline {
    agent {
        kubernetes {
            label 'buildas'
        }
    }

    tools {
        nodejs 'node 24.11.0'
    }

    stages {
        stage('Init') {
            steps {
                sh 'node -v'
                sh 'buildas --version'
            }
        }
    }
}