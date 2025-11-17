pipeline {
    agent {
        kubernetes {
            inheritFrom 'buildah'
        }
    }

    environment {
        REGISTRY = 'harbor.mingi.kr'
        PROJECT = 'prompt-dma'
        IMAGE_NAME = 'frontend'
        REPOSITORY = "${REGISTRY}/${PROJECT}/${IMAGE_NAME}"

        GIT_HASH = sh(
            script: 'git rev-parse --short HEAD'
            returnStdout: true
        ).trim()
    }

    tools {
        nodejs 'node 24.11.0'
    }

    stages {
        stage('Build Nextjs') {
            steps {
                container('buildah') {
                    sh '''
                        buildah bud \
                        --isolation chroot \
                        --layers \
                        -f Dockerfile \
                        -t ${REPOSITORY} .
                    '''
                    sh "buildah tag ${REPOSITORY} ${REPOSITORY}:${GIT_HASH}"
                    sh "buildah tag ${REPOSITORY} ${REPOSITORY}:latest"
                }
            }
        }

        stage('Push to Harbor') {
            steps {
                container('buildah') {
                    script {
                        withCredentials([usernamePassword(
                            credentialId: 'harbor-credential'
                            usernameVariable: 'HARBOR_USER',
                            passwordVariable: 'HARBOR_PASS'
                        )]) {
                            sh "buildah login -u "$HARBOR_USER" -p "$HARBOR_PASS" harbor.mingi.kr"

                            sh "buildah push ${REPOSITORY}:${GIT_HASH}"
                            sh "buildah push ${REPOSITORY}:latest"
                        }
                    }
                }
            }
        }
    }
}