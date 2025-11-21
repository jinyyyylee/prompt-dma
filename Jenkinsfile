pipeline {
    agent {
        kubernetes {
            inheritFrom 'docker'
        }
    }

    environment {
        GIT_REPO = 'https://github.com/jinyyyylee/prompt-dma.git'
        GIT_BRANCH = 'master'

        REGISTRY = 'harbor.mingi.kr'
        PROJECT = 'prompt-dma'
        IMAGE_NAME = 'frontend-dev'
        REPOSITORY = "${REGISTRY}/${PROJECT}/${IMAGE_NAME}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: "${GIT_BRANCH}", url: "${GIT_REPO}"

                script {
                    env.GIT_HASH = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                }
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                container('docker') {
                    script {
                        withCredentials([usernamePassword(
                            credentialsId: 'harbor-credential',
                            usernameVariable: 'HARBOR_USER',
                            passwordVariable: 'HARBOR_PASS'
                        )]) {
                            sh "echo ${HARBOR_PASS} | docker login ${REGISTRY} --username ${HARBOR_USER} --password-stdin"
                            sh '''
                                docker buildx build \
                                -t ${REPOSITORY}:${GIT_HASH} \
                                -t ${REPOSITORY}:latest \
                                --file ./Dockerfile \
                                . \
                                --push
                            '''
                        }
                    }
                }
            }
        }
    }
}