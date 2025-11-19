pipeline {
    agent {
        kubernetes {
            inheritFrom 'docker'
        }
    }

    environment {
        REGISTRY = 'harbor.mingi.kr'
        PROJECT = 'prompt-dma'
        IMAGE_NAME = 'frontend'
        REPOSITORY = "${REGISTRY}/${PROJECT}/${IMAGE_NAME}"

        GIT_HASH = sh(
            script: 'git rev-parse --short HEAD',
            returnStdout: true
        ).trim()
    }

    tools {
        nodejs 'node 24.11.0'
    }

    stages {
        stage('Build Nextjs') {
            steps {
                container('docker') {
                    script {
                        withCredentials([usernamePassword(
                            credentialsId: 'harbor-credential',
                            usernameVariable: 'HARBOR_USER',
                            passwordVariable: 'HARBOR_PASS'
                        )]) {
                            sh "echo \$PASS | docker login ${REGISTRY} --username \$USER --password-stdin"
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